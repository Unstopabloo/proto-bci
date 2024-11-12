"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createUser(username: string) {
  if (username.length < 3 || username.length > 20 || !username) {
    throw new Error("El nombre de usuario debe tener entre 3 y 20 caracteres")
  }

  const cookieStore = await cookies()

  cookieStore.set("bci-username", username.toLowerCase())

  return { username }
}

export async function signOut() {
  const cookiesStore = await cookies()
  const username = cookiesStore.get("bci-username")

  if (!username) {
    throw new Error("No estas autenticado")
  }

  cookiesStore.delete("bci-username")
  redirect("/")
}
