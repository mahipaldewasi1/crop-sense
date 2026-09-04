from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
from transformers import AutoImageProcessor
from optimum.onnxruntime import ORTModelForImageClassification

import numpy as np
import io

app = FastAPI(title="CropSense ML Service")

MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
ONNX_DIR = "onnx_model"


# ---------------------------------------------------------
# LOAD PRE-EXPORTED MODEL AT STARTUP
# ---------------------------------------------------------
# The onnx_model/ folder is committed to the repo (produced once by
# export_model.py on your local machine). This means startup here is
# just loading files off disk — no Hugging Face download, no ONNX
# export, and no torch dependency needed in production at all.

model = ORTModelForImageClassification.from_pretrained(ONNX_DIR)
processor = AutoImageProcessor.from_pretrained(ONNX_DIR)


# ---------------------------------------------------------
# CROP -> MODEL LABELS
# ---------------------------------------------------------

CROP_LABELS = {
    "apple": [
        "Apple Scab",
        "Apple with Black Rot",
        "Cedar Apple Rust",
        "Healthy Apple",
    ],

    "cherry": [
        "Cherry with Powdery Mildew",
        "Healthy Cherry Plant",
    ],

    "maize": [
        "Corn (Maize) with Cercospora and Gray Leaf Spot",
        "Corn (Maize) with Common Rust",
        "Corn (Maize) with Northern Leaf Blight",
        "Healthy Corn (Maize) Plant",
    ],

    "grape": [
        "Grape with Black Rot",
        "Grape with Esca (Black Measles)",
        "Grape with Isariopsis Leaf Spot",
        "Healthy Grape Plant",
    ],

    "peach": [
        "Peach with Bacterial Spot",
        "Healthy Peach Plant",
    ],

    "bell_pepper": [
        "Bell Pepper with Bacterial Spot",
        "Healthy Bell Pepper Plant",
    ],

    "potato": [
        "Potato with Early Blight",
        "Potato with Late Blight",
        "Healthy Potato Plant",
    ],

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
    "strawberry": [
    "Strawberry with Leaf Scorch",
    "Healthy Strawberry Plant",
],
}



def normalize_crop(value: str) -> str:
    return value.strip().lower()

def get_crop_for_label(label: str):
    for crop_name, labels in CROP_LABELS.items():
        if label in labels:
            return crop_name

    return None
def softmax(values):
    arr = np.array(values, dtype=np.float64)
    exp = np.exp(arr - np.max(arr))
    return exp / exp.sum()


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
        # -------------------------------------------------
        # 1. VALIDATE CROP
        # -------------------------------------------------

        crop_key = normalize_crop(crop)

        if crop_key not in CROP_LABELS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported crop: {crop}",
            )

        # -------------------------------------------------
        # 2. READ IMAGE
        # -------------------------------------------------

        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Empty image",
            )

        # -------------------------------------------------
        # 3. OPEN IMAGE
        # -------------------------------------------------

        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        # -------------------------------------------------
        # 4. PREPROCESS
        # -------------------------------------------------

        inputs = processor(
            images=image,
            return_tensors="np"
        )

        # -------------------------------------------------
        # 5. RUN MODEL
        # -------------------------------------------------

        outputs = model(**inputs)
        logits = outputs.logits[0]

        # -------------------------------------------------
        # 6. ORIGINAL MODEL PREDICTIONS
        #    ALL 38 CLASSES
        # -------------------------------------------------

        all_probabilities = softmax(
            logits.tolist()
        )

        overall_results = []

        for index, probability in enumerate(
            all_probabilities.tolist()
        ):
            label = model.config.id2label[index]

            overall_results.append(
                {
                    "label": label,
                    "score": probability,
                    "crop": get_crop_for_label(label),
                }
            )

        overall_results = sorted(
            overall_results,
            key=lambda x: x["score"],
            reverse=True,
        )

        # -------------------------------------------------
        # 7. BEST OVERALL MODEL PREDICTION
        # -------------------------------------------------

        best_overall = overall_results[0]

        predicted_label = best_overall["label"]
        predicted_crop = best_overall["crop"]
        raw_confidence = best_overall["score"]

        # -------------------------------------------------
        # 8. CHECK SELECTED CROP VS MODEL CROP
        # -------------------------------------------------

        crop_match = (
            predicted_crop == crop_key
        )

        # -------------------------------------------------
        # 9. SELECTED CROP PREDICTIONS
        #
        # Kept for compatibility with the existing
        # frontend/backend features.
        # -------------------------------------------------

        allowed_labels = set(
            CROP_LABELS[crop_key]
        )

        crop_items = []

        for index, logit in enumerate(
            logits.tolist()
        ):
            label = model.config.id2label[index]

            if label in allowed_labels:
                crop_items.append(
                    {
                        "label": label,
                        "logit": logit,
                        "index": index,
                    }
                )

        if not crop_items:
            raise HTTPException(
                status_code=500,
                detail="No classes found for selected crop",
            )

        # -------------------------------------------------
        # 10. CROP-ONLY PROBABILITIES
        #
        # Kept for existing top_predictions compatibility.
        # We DO NOT use this for the main confidence anymore.
        # -------------------------------------------------

        crop_logits = [
            item["logit"]
            for item in crop_items
        ]

        crop_probabilities = softmax(
            crop_logits
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

        # -------------------------------------------------
        # 11. RETURN
        # -------------------------------------------------

        return {
            "status": (
                "success"
                if crop_match
                else "crop_mismatch"
            ),

            # Crop selected by user
            "crop": crop_key,

            # Crop predicted by the original 38-class model
            "predicted_crop": predicted_crop,

            # Whether model prediction belongs to
            # the crop selected by the user
            "crop_match": crop_match,

            # Main prediction comes directly from
            # the original 38-class model
            "disease": predicted_label,

            # IMPORTANT:
            # This is now the ORIGINAL 38-class confidence,
            # not the inflated crop-only confidence.
            "confidence": round(
                raw_confidence * 100,
                2,
            ),

            # Existing selected-crop predictions
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

            # Original model predictions
            # across all 38 classes
            "overall_predictions": [
                {
                    "label": item["label"],
                    "confidence": round(
                        item["score"] * 100,
                        2,
                    ),
                    "crop": item["crop"],
                }
                for item in overall_results[:10]
            ],
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )