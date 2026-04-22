import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

/*
ImageUpload Component
Features:
- Drag & Drop upload
- File validation
- Image preview
- Analyze button
*/

const ImageUpload = ({ onAnalyze, loading }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  /*
  File validation
  */
  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const validTypes = ["image/jpeg", "image/png"];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Only JPG and PNG images are allowed.");
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return false;
    }

    setError(null);
    return true;
  };

  /*
  Handle file drop
  */
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  /*
  Handle analyze button
  */
  const handleAnalyze = () => {
    if (file) {
      onAnalyze(file);
    } else {
      setError("Please upload an image first.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Upload Box */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition 
        ${isDragActive ? "border-blue-400 bg-gray-800" : "border-gray-600 bg-gray-900"}`}
      >
        <input {...getInputProps()} />

        <FiUploadCloud size={40} className="mx-auto mb-3 text-gray-400" />

        {isDragActive ? (
          <p className="text-gray-300">Drop the image here...</p>
        ) : (
          <p className="text-gray-400">
            Drag & Drop image here or click to upload
          </p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Supported: JPG, PNG (Max 5MB)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="mt-6 text-center">
          <img
            src={preview}
            alt="preview"
            className="mx-auto rounded-lg max-h-64 shadow-lg"
          />
        </div>
      )}

      {/* Analyze Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
