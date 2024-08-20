import TopNavbar from "@/components/partials/topNavbar/TopNavbar";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <TopNavbar />
            {children}
        </>
    );
}
