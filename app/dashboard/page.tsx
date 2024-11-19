import { AppSidebar } from "@/components/app-sidebar"
import { UIChat } from "@/components/chat"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    redirect("/")
  }

  const username = user?.username
  const email = user?.emailAddresses[0].emailAddress

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" username={username ?? ''} email={email ?? ''} avatar={user?.imageUrl} />
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
