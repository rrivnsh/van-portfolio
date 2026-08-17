import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
