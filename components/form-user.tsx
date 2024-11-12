"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

import { createUser } from "@/lib/actions"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
    invalid_type_error: "El nombre de usuario debe ser una cadena de texto",
  }).min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres",
  }).max(20, {
    message: "El nombre de usuario debe tener máximo 20 caracteres",
  })
})

export default function FormUser() {
  const [name, setName] = useState<string>("Paulina")
  const router = useRouter()

  useEffect(() => {
    const names = ["Paulina", "Roberto", "Francisca", "Pablo", "Nicolas"]
    setName(names[Math.floor(Math.random() * names.length)])
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      createUser(values.username),
      {
        success: () => {
          router.push("/dashboard")
          return `Bienvenido a Mentoru ${values.username}`
        },
        error: (error) => {
          return error.message
        },
        loading: "Creando usuario...",
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder={name} {...field} />
              </FormControl>
              <FormDescription>
                Ingresa un nombre de usuario para comenzar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full ${form.formState.isSubmitting && "opacity/95"}`}
          disabled={form.formState.isSubmitting}
          data-loading={form.formState.isSubmitting}
        >
          {
            form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
                Cargando...
              </>
            ) : "Comenzar"
          }
        </Button>
      </form>
    </Form>
  );
}
