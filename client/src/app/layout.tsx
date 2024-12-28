import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProviderClient } from "@/providers/ThemeProvider";
import { cookies } from "next/headers";
import StoreProvider from "@/providers/StoreProvider";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider
          options={{ enableCssLayer: true, key: "css", prepend: true }}
        >
          <StoreProvider>
            <ThemeProviderClient initialMode={theme}>
              {children}
              <ToastContainer
                hideProgressBar
                position='top-center'
              />
            </ThemeProviderClient>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
