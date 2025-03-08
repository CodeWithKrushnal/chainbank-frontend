import React from 'react';
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";

interface MainLayoutProps {
    children: React.ReactNode; // Typing the children prop
}

// Menu items.

const MainLayout: React.FC<MainLayoutProps> = ({children}: MainLayoutProps) => {

    return (
        <div className="flex">
            <SidebarProvider className="bg-transparent">
                <AppSidebar />
                <SidebarInset className="bg-transparent">
                    <div className="flex flex-1 flex-col gap-4 pt-0">
                        <div>
                            <main className="flex-1">{children}</main>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default MainLayout;
