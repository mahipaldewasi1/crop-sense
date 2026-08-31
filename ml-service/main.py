from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
from transformers import AutoImageProcessor
from optimum.onnxruntime import ORTModelForImageClassification

import torch
import io
import os

app = FastAPI(title="CropSense ML Service")

MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
ONNX_DIR = "onnx_model"


# ---------------------------------------------------------
# LOAD / EXPORT MODEL ONCE AT STARTUP
# ---------------------------------------------------------
# If the ONNX version doesn't exist on disk yet, export it from the
# original HF checkpoint the first time the service starts, then
# reuse the cached ONNX files on every subsequent boot.

if not os.path.exists(ONNX_DIR):
    model = ORTModelForImageClassification.from_pretrained(MODEL_ID, export=True)
    model.save_pretrained(ONNX_DIR)

    processor = AutoImageProcessor.from_pretrained(MODEL_ID)
    processor.save_pretrained(ONNX_DIR)
else:
    model = ORTModelForImageClassification.from_pretrained(ONNX_DIR)

processor = AutoImageProcessor.from_pretrained(ONNX_DIR)


# ---------------------------------------------------------
# CROP -> MODEL LABELS
# ---------------------------------------------------------

CROP_LABELS = {
    "tomato": [
        "Tomato with Bacterial Spot",
        "Tomato with Early Blight",
        "Tomato with Late Blight",
        "Tomato with Leaf Mold",
        "Tomato with Septoria Leaf Spot",
        "Tomato with Spider Mites or Two-spotted Spider Mite",
        "Tomato with Target Spot",
        "Tomato Yellow Leaf Curl Virus",
        "Tomato Mosaic Virus",
        "Healthy Tomato Plant",
    ],

    "potato": [
        "Potato with Early Blight",
        "Potato with Late Blight",
        "Healthy Potato Plant",
    ],

    "maize": [
        "Corn (Maize) with Cercospora and Gray Leaf Spot",
        "Corn (Maize) with Common Rust",
        "Corn (Maize) with Northern Leaf Blight",
        "Healthy Corn (Maize) Plant",
    ],
}


def normalize_crop(value: str) -> str:
    return value.strip().lower()


# ---------------------------------------------------------
# BASIC ROUTES
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "CropSense ML service running",
        "model": MODEL_ID,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": MODEL_ID,
    }


# ---------------------------------------------------------
# PREDICTION
# ---------------------------------------------------------

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    crop: str = Form("tomato"),
):
    try:
        # 1. Validate crop
        crop_key = normalize_crop(crop)

        if crop_key not in CROP_LABELS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported crop: {crop}",
            )

        # 2. Read image
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Empty image",
            )

        # 3. Open image
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        # 4. Preprocess using the model's OWN processor config
        #    (correct resize + normalization for this exact checkpoint,
        #    instead of hardcoded ImageNet mean/std)
        inputs = processor(images=image, return_tensors="pt")

        # 5. Run model (ONNX Runtime under the hood, no torch training graph)
        outputs = model(**inputs)

        logits = outputs.logits[0]

        # 6. Get classes belonging to selected crop
        allowed_labels = set(CROP_LABELS[crop_key])

        crop_items = []

        for index, logit in enumerate(logits.tolist()):
            label = model.config.id2label[index]

            if label in allowed_labels:
                crop_items.append(
                    {
                        "label": label,
                        "logit": logit,
                        "index": index,
                    }
                )

        # 7. Make sure we found crop classes
        if not crop_items:
            raise HTTPException(
                status_code=500,
                detail="No classes found for selected crop",
            )

        # 8. Softmax only across selected crop classes
        crop_logits = torch.tensor(
            [item["logit"] for item in crop_items]
        )

        crop_probabilities = torch.softmax(
            crop_logits,
            dim=0,
        )

        crop_results = []

        for item, probability in zip(
            crop_items,
            crop_probabilities.tolist(),
        ):
            crop_results.append(
                {
                    "label": item["label"],
                    "score": probability,
                }
            )

        # 9. Pick best prediction
        best = max(
            crop_results,
            key=lambda item: item["score"],
        )

        # 10. Return result
        return {
            "status": "success",
            "crop": crop_key,
            "disease": best["label"],
            "confidence": round(
                best["score"] * 100,
                2,
            ),
            "top_predictions": [
                {
                    "label": item["label"],
                    "confidence": round(
                        item["score"] * 100,
                        2,
                    ),
                }
                for item in sorted(
                    crop_results,
                    key=lambda x: x["score"],
                    reverse=True,
                )[:5]
            ],
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )