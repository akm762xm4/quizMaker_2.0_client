import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // The showcase landing page is intentionally full-bleed. Dashboard pages
  // keep the constrained reading width below.
  if (location.pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:ml-64 lg:px-10 lg:py-10 xl:px-12">
        {children}
      </main>
    </div>
  );
};
