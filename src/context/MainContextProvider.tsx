import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { FullscreenProvider } from "@/context/FullscreenContext";

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FullscreenProvider>{children}</FullscreenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
