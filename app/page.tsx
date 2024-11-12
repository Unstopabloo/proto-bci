import FormUser from "@/components/form-user";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo-full-1.png"
          alt="Mentoru logo"
          width={180}
          height={38}
          priority
        />
        <FormUser />
      </main>
    </div>
  );
}
