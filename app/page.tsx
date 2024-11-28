import Image from "next/image";

import {
  SignInButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo-full-1.png"
          alt="Mentoru logo"
          width={180}
          height={38}
          priority
        />
        <SignedOut>
          <Button className="w-full">
            <SignInButton>
              Iniciar sesión
            </SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col items-center gap-2">
            <p>Hola, {user?.firstName}</p>
            <Button asChild>
              <Link href="/dashboard">
                Ir a la app
              </Link>
            </Button>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
