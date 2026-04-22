import sys
import json
import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
from torchvision.models import efficientnet_b0

# HuggingFace (optional)
try:
    from transformers import AutoImageProcessor, AutoModelForImageClassification
    HF_AVAILABLE = True
except:
    HF_AVAILABLE = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ai_detector_model.pth")

# -----------------------
# Load your trained model
# -----------------------

custom_model = efficientnet_b0(weights=None)
custom_model.classifier[1] = nn.Linear(custom_model.classifier[1].in_features, 2)

custom_model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
custom_model.eval()

# -----------------------
# Load HuggingFace model
# -----------------------

hf_model = None
hf_processor = None

if HF_AVAILABLE:
    try:
        hf_processor = AutoImageProcessor.from_pretrained("umm-maybe/AI-image-detector")
        hf_model = AutoModelForImageClassification.from_pretrained("umm-maybe/AI-image-detector")
        hf_model.eval()
    except:
        hf_model = None
        hf_processor = None

# -----------------------
# Image preprocessing
# -----------------------

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

def analyze_image(image_path):

    image = Image.open(image_path).convert("RGB")

    # -----------------------
    # Custom model prediction
    # -----------------------
def analyze_image(image_path):

    image = Image.open(image_path).convert("RGB")

    # Test Time Augmentation
    images = [
        image,
        image.transpose(Image.FLIP_LEFT_RIGHT)
    ]

    ai_scores = []
    real_scores = []

    for img in images:
        img_tensor = transform(img).unsqueeze(0)

        with torch.no_grad():
            outputs = custom_model(img_tensor)
            probs = torch.softmax(outputs, dim=1)[0]

        real_scores.append(probs[0].item())
        ai_scores.append(probs[1].item())

    custom_ai = sum(ai_scores) / len(ai_scores)
    custom_real = sum(real_scores) / len(real_scores)

    # -----------------------
    # HuggingFace prediction
    # -----------------------

    if hf_model and hf_processor:

        inputs = hf_processor(images=image, return_tensors="pt")

        with torch.no_grad():
            hf_outputs = hf_model(**inputs)

        hf_probs = torch.softmax(hf_outputs.logits, dim=1)[0]

        hf_ai = hf_probs[1].item()
        hf_real = hf_probs[0].item()

        ai_score = (custom_ai + hf_ai) / 2
        real_score = (custom_real + hf_real) / 2

    else:
        ai_score = custom_ai
        real_score = custom_real

    # -----------------------
    # Final decision
    # -----------------------

    if ai_score > real_score:
        prediction = "AI Generated"
        confidence = ai_score * 100
        explanation = "AI generation artifacts detected"
    else:
        prediction = "Real"
        confidence = real_score * 100
        explanation = "Image resembles natural photography"

    return {
        "prediction": prediction,
        "confidence": round(confidence,2),
        "explanation": explanation
    }

def main():
    image_path = sys.argv[1]
    result = analyze_image(image_path)
    print(json.dumps(result))

if __name__ == "__main__":
    main()