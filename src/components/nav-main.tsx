"use client"

import {type LucideIcon} from "lucide-react"
import {SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/components/ui/sidebar"
import {useLocation, useNavigate} from "react-router-dom";

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
    }[]
}) {

    const navigate = useNavigate()
    const location = useLocation();

    const changePage = (url: string) => {
        navigate(url)
    }

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip={item.title} variant={item.url==location.pathname ? "outline" : "default"}
                                           onClick={() => {changePage(item.url)}}>
                            {item.icon && <item.icon size="15px"/>}
                            <h2 className="text-l">{item.title}</h2>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
