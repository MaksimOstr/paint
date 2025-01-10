import { LayoutComponent } from "@/components/layout/layoutComponents";
import React from "react";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <LayoutComponent />
      {children}
      {modal}
    </>
  );
}
