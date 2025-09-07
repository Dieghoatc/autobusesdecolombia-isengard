import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

export async function markImageMutation(formData: FormData){
    try {
        const response = await axios.post(`${API_URL}/photo/mark/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: 'arraybuffer',
            timeout: 30000,
            maxBodyLength: Infinity,  
            maxContentLength: Infinity,
          });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
