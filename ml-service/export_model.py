"""
Run this ONCE on your local machine to pre-export the model to ONNX.
This is NOT part of the deployed service — it just produces the
`onnx_model/` folder, which you commit to your repo so Render never
has to download + export the model on startup again.

Usage:
    python export_model.py
"""

from optimum.onnxruntime import ORTModelForImageClassification
from transformers import AutoImageProcessor

MODEL_ID = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
ONNX_DIR = "onnx_model"

print(f"Downloading and exporting {MODEL_ID} to ONNX...")

model = ORTModelForImageClassification.from_pretrained(MODEL_ID, export=True)
model.save_pretrained(ONNX_DIR)

processor = AutoImageProcessor.from_pretrained(MODEL_ID)
processor.save_pretrained(ONNX_DIR)

print(f"Done. Exported files are in ./{ONNX_DIR}/")
print("Commit this folder to your repo, then deploy the updated main.py.")