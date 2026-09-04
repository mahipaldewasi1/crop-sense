from datasets import load_dataset
from pathlib import Path
from PIL import Image

# ============================================================
# CropSense Disease Guide
# PlantVillage Tiny -> Disease Guide images
# ============================================================

OUTPUT_DIR = Path("public/disease-images")

# Exact PlantVillage Tiny class_label -> CropSense folder/file
MAPPING = {
    # Tomato
    "Tomato___Early_blight": ("tomato", "early-blight"),
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": (
        "tomato", "yellow-leaf-curl-virus"
    ),
    "Tomato___Bacterial_spot": ("tomato", "bacterial-spot"),
    "Tomato___Late_blight": ("tomato", "late-blight"),
    "Tomato___Leaf_Mold": ("tomato", "leaf-mold"),
    "Tomato___Septoria_leaf_spot": ("tomato", "septoria-leaf-spot"),
    "Tomato___Spider_mites Two-spotted_spider_mite": (
        "tomato", "spider-mites"
    ),
    "Tomato___Target_Spot": ("tomato", "target-spot"),
    "Tomato___Tomato_mosaic_virus": (
        "tomato", "mosaic-virus"
    ),

    # Potato
    "Potato___Early_blight": ("potato", "early-blight"),
    "Potato___Late_blight": ("potato", "late-blight"),

    # Maize
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": (
        "maize", "cercospora-gray-leaf-spot"
    ),
    "Corn_(maize)___Common_rust_": (
        "maize", "common-rust"
    ),
    "Corn_(maize)___Northern_Leaf_Blight": (
        "maize", "northern-leaf-blight"
    ),

    # Apple
    "Apple___Apple_scab": ("apple", "apple-scab"),
    "Apple___Black_rot": ("apple", "black-rot"),
    "Apple___Cedar_apple_rust": (
        "apple", "cedar-apple-rust"
    ),

    # Cherry
    "Cherry_(including_sour)___Powdery_mildew": (
        "cherry", "powdery-mildew"
    ),

    # Grape
    "Grape___Black_rot": ("grape", "black-rot"),
    "Grape___Esca_(Black_Measles)": ("grape", "esca"),
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": (
        "grape", "isariopsis-leaf-spot"
    ),

    # Peach
    "Peach___Bacterial_spot": (
        "peach", "bacterial-spot"
    ),

    # Bell Pepper
    "Pepper,_bell___Bacterial_spot": (
        "bell-pepper", "bacterial-spot"
    ),

    # Strawberry
    "Strawberry___Leaf_scorch": (
        "strawberry", "leaf-scorch"
    ),
}

# Number of reference images per disease
IMAGES_PER_DISEASE = 3


# ============================================================
# Load dataset
# ============================================================

print()
print("==============================================")
print(" CropSense Disease Guide Image Downloader")
print("==============================================")
print()

print("Loading PlantVillage Tiny...")
print()

dataset = load_dataset(
    "geraldmc/plantvillage-tiny",
    revision="v0.1.0",
    split="train",
)

print(f"Dataset loaded: {len(dataset)} images")
print()


# ============================================================
# Create folders
# ============================================================

for crop, _ in MAPPING.values():
    (OUTPUT_DIR / crop).mkdir(
        parents=True,
        exist_ok=True
    )


# ============================================================
# Verify classes
# ============================================================

available_classes = set(dataset["class_label"])

print("Checking required classes...")
print("----------------------------------------------")

missing_classes = []

for class_name in MAPPING:

    if class_name in available_classes:
        print(f"[FOUND]   {class_name}")
    else:
        print(f"[MISSING] {class_name}")
        missing_classes.append(class_name)

print("----------------------------------------------")
print()


# ============================================================
# Save images
# ============================================================

saved = {
    class_name: 0
    for class_name in MAPPING
}


for index, row in enumerate(dataset):

    class_name = row["class_label"]

    if class_name not in MAPPING:
        continue

    if saved[class_name] >= IMAGES_PER_DISEASE:
        continue

    crop, filename = MAPPING[class_name]

    output_folder = OUTPUT_DIR / crop

    image_number = saved[class_name] + 1

    output_file = (
        output_folder /
        f"{filename}-{image_number}.jpg"
    )

    try:

        image = row["image"]

        if not isinstance(image, Image.Image):
            image = Image.open(image)

        image = image.convert("RGB")

        image.save(
            output_file,
            "JPEG",
            quality=92
        )

        saved[class_name] += 1

        print(
            f"[SAVED] {filename}-{image_number}.jpg"
        )

    except Exception as e:

        print(
            f"[ERROR] {class_name}: {e}"
        )


# ============================================================
# Summary
# ============================================================

print()
print("==============================================")
print(" COMPLETE")
print("==============================================")
print()

total = 0

for class_name, count in saved.items():

    crop, filename = MAPPING[class_name]

    if count > 0:
        print(
            f"[OK] {crop}/{filename}: "
            f"{count} images"
        )
        total += count

    else:
        print(
            f"[MISSING] {crop}/{filename}: "
            f"0 images"
        )

print()
print(f"Total reference images saved: {total}")
print()
print(
    "Images location:"
)
print(OUTPUT_DIR.resolve())
print()