import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkPhoto } from "./components/mark-photo";

import styles from "./FormUploadImage.module.css";

const formSchema = z.object({
  plate: z.string().min(2, {
    message: "Ingresa placa correcta",
  }),
  serial: z.string().min(2, {
    message: "Ingresa serial correcto",
  }),
  author: z.string().min(2, {
    message: "Ingresa un author",
  }),
  location: z.string().min(2, {
    message: "Ingresa locación de la foto",
  }),
});

export function FormUploadImage() {
  const [details, setDetails] = useState({
    plate: "",
    // plate: "",
    // serial: "",
    // author: "",
    // location: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: "",
      //   plate: "",
      //   serial: "",
      //   author: "",
      //   location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setDetails({
      plate: values.plate,
      //   plate: values.plate,
      //   serial: values.serial,
      //   author: values.author,
      //   location: values.location,
    });
    form.reset();
  }

  console.log(details);

  return (
    <section className={styles.container}>
      <MarkPhoto />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa del vehículo</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
