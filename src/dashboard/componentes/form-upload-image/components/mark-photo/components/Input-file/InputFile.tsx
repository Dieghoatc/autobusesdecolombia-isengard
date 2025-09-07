import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { markImageMutation } from "@/services/mark-image.mutation";

const formSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Selecciona una foto")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/avif"].includes(
          file.type
        ),
      "Solo se permiten archivos JPG, PNG, avif o WebP"
    )
    .refine((file) => file.size <= 5000000, "El archivo debe ser menor a 5MB"),
});

interface InputFileProps {
  author: string;
  setAuthor: (author: string) => void;
  city: string;
  setCity: (city: string) => void;
  originalImagePreview: string;
  setOriginalImagePreview: (previewUrl: string) => void;
  imagePreviewUrl: string;
  setImagePreviewUrl: (previewUrl: string) => void;
  setSubmitMessage: (message: string) => void;
  setShowComparison: (show: boolean) => void;
}

export function InputFile({
  originalImagePreview,
  setOriginalImagePreview,
  imagePreviewUrl,
  setImagePreviewUrl,
  setSubmitMessage,
  setShowComparison,
  author,
  setAuthor,
  city,
  setCity,
}: InputFileProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
    },
  });

  const handleFileChange = (file: File) => {
    if (originalImagePreview) {
      URL.revokeObjectURL(originalImagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setOriginalImagePreview(previewUrl);
    setShowComparison(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!author) {
      setSubmitMessage("Por favor selecciona un fotógrafo");
      return;
    }

    if (!city) {
      setSubmitMessage("Por favor selecciona una ciudad");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    // Limpiar imagen previa si existe
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl("");
    }

    try {
      const formData = new FormData();
      formData.append("image", values.photo);
      formData.append("author", author);
      formData.append("location", city);

      // Llamar a la mutación que debe devolver un Blob o ArrayBuffer
      const response = await markImageMutation(formData);

      // Crear URL desde el blob/buffer recibido
      let imageUrl = "";

      if (response instanceof Blob) {
        imageUrl = URL.createObjectURL(response);
      } else if (response instanceof ArrayBuffer) {
        const blob = new Blob([response], { type: "image/avif" });
        imageUrl = URL.createObjectURL(blob);
      } else if (typeof response === "string") {
        // Si es una URL directa desde el servidor
        imageUrl = response;
      } else {
        // Intentar convertir la respuesta a blob
        const blob = new Blob([response], { type: "image/avif" });
        imageUrl = URL.createObjectURL(blob);
      }

      setImagePreviewUrl(imageUrl);
      setShowComparison(true);
      setSubmitMessage("Foto marcada exitosamente");

      form.reset();
    } catch (error) {
      console.error("Error al marcar la foto:", error);
      setSubmitMessage("Error al marcar la foto. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetAll = () => {
    form.reset();
    setAuthor("");
    setCity("");
    setSubmitMessage("");
    setShowComparison(false);

    if (originalImagePreview) {
      URL.revokeObjectURL(originalImagePreview);
      setOriginalImagePreview("");
    }
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl("");
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Seleccionar Fotografía</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/avif,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        handleFileChange(file);
                      }
                    }}
                    onBlur={rest.onBlur}
                    name={rest.name}
                    ref={rest.ref}
                    disabled={rest.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !author || !city}
              className="flex-1"
            >
              {isSubmitting ? "Marcando..." : "Marcar Fotografía"}
            </Button>

            {(originalImagePreview || imagePreviewUrl) && (
              <Button
                type="button"
                variant="outline"
                onClick={resetAll}
                disabled={isSubmitting}
              >
                Nueva Foto
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
