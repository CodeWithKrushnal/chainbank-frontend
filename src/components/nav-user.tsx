// src/components/nav-user.tsx
import React from 'react';
import {EllipsisVertical, LogOut} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar';
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from '@/components/ui/sidebar';
import {User} from "@/types/types.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"

interface NavUserProps {
    user: User | null;
}

// const dispatch = useDispatch();

const LogOutFunc = (navigate: NavigateFunction) => {
    localStorage.clear();
    navigate('/signin');
}


export const NavUser: React.FC<NavUserProps> = ({user}: NavUserProps) => {
    const navigate: NavigateFunction = useNavigate();
    if (!user) {
        return null;
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg"
                                           className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.username}/>
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.full_name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <EllipsisVertical size={16}/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl shadow-none"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.full_name}/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.full_name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => {
                            LogOutFunc(navigate)
                        }}>
                            <LogOut size={16}/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};