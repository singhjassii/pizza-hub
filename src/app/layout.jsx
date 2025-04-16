import QueryProvider from "@/components/shared/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <QueryProvider>{children}</QueryProvider>
            </StoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
