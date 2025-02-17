import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="bg-secondary">
      {location.pathname !== "/" && <Navbar />}
      <main>{children}</main>
    </div>
  );
};
