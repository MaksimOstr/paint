import { LayoutComponent } from "@/components/layout/layoutComponents";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <Box>
            <LayoutComponent/>
            {children}
        </Box>
    )
}