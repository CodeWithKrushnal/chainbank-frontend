// src/components/app-sidebar.tsx
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store'; // Adjust the import according to your file structure
import {
    ArrowLeftRight,
    BadgeCheck,
    Banknote,
    Coins, Gauge,
    HandCoins,
    Home,
    IndianRupee,
    Logs, Repeat,
    UserRound,
    Zap
} from 'lucide-react';
import {NavMain} from '@/components/nav-main';
import {NavUser} from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import {User} from "@/types/types.ts";

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => {
    const user: User | null = useSelector((state: RootState): User | null => state.auth.user);
    const navMain = [
        {title: 'Home', url: import.meta.env.VITE_HOME, icon: Home},
        {title: 'Passbook', url: import.meta.env.VITE_PASSBOOK, icon: ArrowLeftRight},
        {title: 'Profile', url: import.meta.env.VITE_PROFILE, icon: UserRound},
        {title: 'Empower', url: import.meta.env.VITE_LOAN_APPLICATIONS, icon: IndianRupee},
        {title: 'Borrow', url: import.meta.env.VITE_BORROW, icon: HandCoins},
        {title: 'My Offers', url: import.meta.env.VITE_MY_OFFERS, icon: Coins},
        {title: 'My Loans', url: import.meta.env.VITE_MY_LOANS, icon: Banknote}
    ];

    if (user?.role == 3) {
        navMain.push(
            {title: 'KYC Actions', url: import.meta.env.VITE_ADMIN_KYC, icon: BadgeCheck},
            {title: 'API Logs', url: import.meta.env.VITE_ADMIN_LOGS, icon: Logs},
            {title: 'Admin Dash', url: import.meta.env.VITE_ADMIN_DASH, icon: Gauge},
            {title: 'Transaction Logs', url: import.meta.env.VITE_ADMIN_TLOG, icon: Repeat}
        )
    }

    const {toggleSidebar} = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="flex">
                <SidebarMenuButton className="items-center" onClick={toggleSidebar}>
                    <Zap size="15px"/> <h1 className="truncate font-serif text-2xl">ChainBank</h1>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
};

export default AppSidebar;
