import { useState, useEffect } from "react";
import { ComoboboxList } from "./components/combobox";
import { InputFile } from "./components/Input-file/InputFile";

import { Button } from "@/components/ui/button";
import styles from "./MarkPhoto.module.css";

export function MarkPhoto() {
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [originalImagePreview, setOriginalImagePreview] = useState("");

  const downloadMarkedImage = () => {
    if (imagePreviewUrl) {
      const link = document.createElement("a");
      link.href = imagePreviewUrl;
      link.download = `marked_photo_${Date.now()}.avif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    return () => {
      if (originalImagePreview) {
        URL.revokeObjectURL(originalImagePreview);
      }
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [originalImagePreview, imagePreviewUrl]);

  return (
    <section className={styles.container}>
      <div className={styles.form_mark_photo}>
        <ComoboboxList
          author={author}
          setAuthor={setAuthor}
          city={city}
          setCity={setCity}
        />
        <InputFile
          author={author}
          setAuthor={setAuthor}
          city={city}
          setCity={setCity}
          originalImagePreview={originalImagePreview}
          setOriginalImagePreview={setOriginalImagePreview}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
          setSubmitMessage={setSubmitMessage}
          setShowComparison={setShowComparison}
        />
        {submitMessage && (
          <div
            className={`p-3 rounded-md text-sm ${
              submitMessage.includes("Error") ||
              submitMessage.includes("selecciona")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {submitMessage}
          </div>
        )}
      </div>
      <div className={styles.image_preview}>
        {originalImagePreview && !showComparison && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Vista previa:</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <img
                src={originalImagePreview}
                alt="Vista previa de la foto original"
                className="max-w-full h-auto max-h-96 mx-auto rounded-md shadow-sm"
              />
            </div>
          </div>
        )}

        {showComparison && originalImagePreview && imagePreviewUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Resultado:</h3>
              <Button
                type="button"
                onClick={downloadMarkedImage}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Descargar Imagen Marcada
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Original</h4>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <img
                    src={originalImagePreview}
                    alt="Imagen original"
                    className="w-full h-auto max-h-80 object-contain rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Con Marca de Agua</h4>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <img
                    src={imagePreviewUrl}
                    alt="Imagen con marca de agua"
                    className="w-full h-auto max-h-80 object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {imagePreviewUrl && !originalImagePreview && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Imagen Marcada:</h3>
              <Button
                type="button"
                onClick={downloadMarkedImage}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Descargar
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <img
                src={imagePreviewUrl}
                alt="Imagen con marca de agua"
                className="max-w-full h-auto max-h-96 mx-auto rounded-md shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
