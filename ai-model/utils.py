import numpy as np
from PIL import Image


"""
Utility functions for AI image detection
These helpers handle:
- image loading
- preprocessing
- statistical analysis
"""


def load_image(image_path):
    """
    Load image and convert to RGB
    """
    image = Image.open(image_path).convert("RGB")
    return image


def image_to_array(image):
    """
    Convert PIL image to numpy array
    """
    return np.array(image)


def calculate_statistics(image_array):
    """
    Compute basic image statistics
    """
    mean_pixel = np.mean(image_array)
    std_pixel = np.std(image_array)

    return {
        "mean": float(mean_pixel),
        "std": float(std_pixel)
    }


def detect_noise_pattern(std_value):
    """
    Very simple heuristic for simulated AI detection
    Lower noise → likely AI generated
    Higher noise → likely real camera image
    """

    if std_value < 60:
        return "AI Generated", "Low noise pattern detected which is common in AI generated images"
    else:
        return "Real", "Natural noise and pixel variation detected"