import { LayoutComponent } from "@/components/layout/layoutComponents";
import React from "react";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <>
            <LayoutComponent/>
            {children}
        </>
    )
}