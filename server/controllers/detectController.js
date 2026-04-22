import { spawn } from "child_process";
import path from "path";

/*
Controller: detectImage

Steps
1. Receive uploaded image from multer
2. Send image path to Python AI model
3. Python returns prediction JSON
4. Send response back to frontend
*/

export const detectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    const imagePath = req.file.path;

    /*
    Path to Python model
    */
    const pythonScript = path.join(process.cwd(), "../ai-model/model.py");

    /*
    Spawn Python process
    */
    const pythonProcess = spawn("python", [pythonScript, imagePath]);

    let resultData = "";

    /*
    Collect output from Python
    */
    pythonProcess.stdout.on("data", (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    /*
    When Python process finishes
    */
    pythonProcess.on("close", () => {
      try {
        const result = JSON.parse(resultData);

        res.json({
          prediction: result.prediction,
          confidence: result.confidence,
          explanation: result.explanation,
        });
      } catch (err) {
        res.status(500).json({
          error: "Failed to parse AI model response",
        });
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Detection failed",
    });
  }
};
