import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen font-opensans">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppLayout;
