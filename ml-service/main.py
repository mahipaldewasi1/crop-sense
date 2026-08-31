from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
import numpy as np
import onnxruntime as ort
import io
import os
import urllib.request

app = FastAPI(title="FasalSaathi ML Service")

# Same fine-tuned MobileNetV2 model, but served as a small ONNX model
# instead of loading PyTorch + Transformers.
MODEL_URL = (
    "https://huggingface.co/onnx-community/"
    "mobilenet_v2_1.0_224-plant-disease-identification-ONNX/"
    "resolve/main/onnx/model_int8.onnx"
)
MODEL_PATH = os.path.join("/tmp", "fasalsaathi_mobilenet_v2_int8.onnx")

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

ID2LABEL = [
    "Apple Scab",
    "Apple with Black Rot",
    "Cedar Apple Rust",
    "Healthy Apple",
    "Healthy Blueberry Plant",
    "Cherry with Powdery Mildew",
    "Healthy Cherry Plant",
    "Corn (Maize) with Cercospora and Gray Leaf Spot",
    "Corn (Maize) with Common Rust",
    "Corn (Maize) with Northern Leaf Blight",
    "Healthy Corn (Maize) Plant",
    "Grape with Black Rot",
    "Grape with Esca (Black Measles)",
    "Grape with Isariopsis Leaf Spot",
    "Healthy Grape Plant",
    "Orange with Citrus Greening",
    "Peach with Bacterial Spot",
    "Healthy Peach Plant",
    "Bell Pepper with Bacterial Spot",
    "Healthy Bell Pepper Plant",
    "Potato with Early Blight",
    "Potato with Late Blight",
    "Healthy Potato Plant",
    "Healthy Raspberry Plant",
    "Healthy Soybean Plant",
    "Squash with Powdery Mildew",
    "Strawberry with Leaf Scorch",
    "Healthy Strawberry Plant",
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
]

def normalize_crop(value: str) -> str:
    return value.strip().lower()

def ensure_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading lightweight ONNX model...")
        urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
        print("ONNX model downloaded.")
    return MODEL_PATH

# Load the ONNX model once. This avoids PyTorch/Transformers memory usage.
session = ort.InferenceSession(
    ensure_model(),
    providers=["CPUExecutionProvider"],
)

INPUT_NAME = session.get_inputs()[0].name
print(f"FasalSaathi ONNX model ready. Input: {INPUT_NAME}")

def preprocess(image: Image.Image) -> np.ndarray:
    # Match the Hugging Face model's preprocessing:
    # 1. Resize shortest edge to 256
    # 2. Center crop to 224x224
    # 3. Normalize using mean/std = 0.5
    image = image.convert("RGB")

    width, height = image.size

    # Resize shortest side to 256 while preserving aspect ratio
    if width < height:
        new_width = 256
        new_height = int(height * 256 / width)
    else:
        new_height = 256
        new_width = int(width * 256 / height)

    image = image.resize(
        (new_width, new_height),
        Image.Resampling.BILINEAR
    )

    # Center crop to 224x224
    left = (new_width - 224) // 2
    top = (new_height - 224) // 2
    right = left + 224
    bottom = top + 224

    image = image.crop((left, top, right, bottom))

    # Convert to [0, 1]
    array = np.asarray(image, dtype=np.float32) / 255.0

    # Hugging Face model uses mean/std = 0.5
    mean = np.array(
        [0.5, 0.5, 0.5],
        dtype=np.float32
    )

    std = np.array(
        [0.5, 0.5, 0.5],
        dtype=np.float32
    )

    array = (array - mean) / std

    # HWC -> CHW
    array = np.transpose(array, (2, 0, 1))

    # Add batch dimension
    return np.expand_dims(array, axis=0).astype(np.float32)

def softmax(values):
    values = np.asarray(values, dtype=np.float32)
    values = values - np.max(values)
    exp_values = np.exp(values)
    return exp_values / np.sum(exp_values)

@app.get("/")
def root():
    return {
        "status": "FasalSaathi ML service running",
        "model": "MobileNetV2 ONNX INT8",
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "MobileNetV2 ONNX INT8",
    }

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    crop: str = Form("tomato"),
):
    try:
        crop_key = normalize_crop(crop)

        if crop_key not in CROP_LABELS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported crop: {crop}",
            )

        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Empty image",
            )

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_tensor = preprocess(image)

        outputs = session.run(None, {INPUT_NAME: image_tensor})
        logits = np.asarray(outputs[0][0], dtype=np.float32)

        allowed_labels = set(CROP_LABELS[crop_key])
        crop_items = []

        for index, logit in enumerate(logits):
            label = ID2LABEL[index]
            if label in allowed_labels:
                crop_items.append({
                    "label": label,
                    "logit": float(logit),
                    "index": index,
                })

        if not crop_items:
            raise HTTPException(
                status_code=500,
                detail="No classes found for selected crop",
            )

        crop_logits = np.array(
            [item["logit"] for item in crop_items],
            dtype=np.float32,
        )
        crop_probabilities = softmax(crop_logits)

        crop_results = []
        for item, probability in zip(crop_items, crop_probabilities):
            crop_results.append({
                "label": item["label"],
                "score": float(probability),
            })

        best = max(
            crop_results,
            key=lambda item: item["score"],
        )

        return {
            "status": "success",
            "crop": crop_key,
            "disease": best["label"],
            "confidence": round(best["score"] * 100, 2),
            "top_predictions": [
                {
                    "label": item["label"],
                    "confidence": round(item["score"] * 100, 2),
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
        print(f"Prediction error: {exc}")
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )
