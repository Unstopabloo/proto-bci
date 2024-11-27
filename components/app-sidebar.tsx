"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Bci",
      logo: GalleryVerticalEnd,
      plan: "Banco",
    }
  ],
  navMain: [
    {
      title: "Simulaciones",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Asistente de banca",
          url: "/dashboard",
        }
      ],
    },
    {
      title: "Feedback",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Feedback",
          url: "#",
        },
        {
          title: "Calificaciones",
          url: "#",
        },
      ],
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  username,
  email,
  avatar,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  username: string
  email: string | undefined
  avatar: string | undefined
}) {
  const user = {
    name: username,
    email: email || "Sin correo",
    avatar: avatar || "/favicon.ico",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
