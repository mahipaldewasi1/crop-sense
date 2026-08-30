from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
from transformers import AutoModelForImageClassification
from torchvision import transforms
import torch
import io

app = FastAPI(title="CropSense ML Service")

MODEL_ID = "yanami3/agri-plant-disease-resnet50"


# ---------------------------------------------------------
# LOAD MODEL ONCE AT STARTUP
# ---------------------------------------------------------

model = AutoModelForImageClassification.from_pretrained(MODEL_ID)
model.eval()


# ---------------------------------------------------------
# IMAGE PREPROCESSING
# ---------------------------------------------------------

transform = transforms.Compose(
    [
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ]
)


# ---------------------------------------------------------
# CROP -> MODEL LABELS
# ---------------------------------------------------------

CROP_LABELS = {
    "tomato": [
        "Tomato___Bacterial_spot",
        "Tomato___Early_blight",
        "Tomato___Late_blight",
        "Tomato___Leaf_Mold",
        "Tomato___Septoria_leaf_spot",
        "Tomato___Spider_mites Two-spotted_spider_mite",
        "Tomato___Target_Spot",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
        "Tomato___Tomato_mosaic_virus",
        "Tomato___healthy",
    ],
    "potato": [
        "Potato___Early_blight",
        "Potato___Late_blight",
        "Potato___healthy",
    ],
    "maize": [
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
        "Corn_(maize)___Common_rust_",
        "Corn_(maize)___Northern_Leaf_Blight",
        "Corn_(maize)___healthy",
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

        # 4. Preprocess
        image_tensor = transform(image).unsqueeze(0)

        # 5. Run model
        with torch.no_grad():
            outputs = model(pixel_values=image_tensor)

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

        # 8. IMPORTANT:
        #    Softmax only across the selected crop's classes
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