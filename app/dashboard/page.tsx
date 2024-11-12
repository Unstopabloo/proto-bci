import { AppSidebar } from "@/components/app-sidebar"
import { UIChat } from "@/components/chat"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const cookieStore = await cookies()
  if (!cookieStore.has("bci-username")) {
    redirect("/")
  }

  const username = cookieStore.get("bci-username")!.value
  const email = cookieStore.get("bci-email")?.value

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" username={username} email={email} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
          <UIChat />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
