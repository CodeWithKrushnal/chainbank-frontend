import React from 'react';
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";
import {AnimatePresence, motion} from "framer-motion";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}: MainLayoutProps) => {

    return (
        <div className="flex">
            <SidebarProvider className="bg-transparent">
                <AppSidebar/>
                <SidebarInset className="bg-transparent">
                    <div className="flex flex-1 flex-col gap-4 pt-0">
                        <AnimatePresence>
                            <div>
                                <motion.main
                                    key="main-content"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="flex-1">
                                    <main className="flex-1">{children}</main>
                                </motion.main>
                            </div>
                        </AnimatePresence>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default MainLayout;
