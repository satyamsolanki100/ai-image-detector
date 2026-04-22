import axios from "axios";

/*
Create Axios instance for API calls
*/
const api = axios.create({
  baseURL: "https://ai-image-detector-6xwe.onrender.com", // backend server
});

/*
Send image to backend for AI detection
*/
export const detectImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/detect", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default api;
