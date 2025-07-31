import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";

export interface UploadImageResponse {
  key: string;
  url: string;
  isPublic: boolean;
}

export const uploadRoomImages = async (
  files: File[]
): Promise<UploadImageResponse[]> => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("isPublic", "true");

    const response = await axios.post<UploadImageResponse[]>(
      `${BASE_URL}images/rooms`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
    
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("No se pudieron subir las imágenes.");
  }
};
