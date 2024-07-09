import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import BottomMenu from "components/BottomMenu";

const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <BottomMenu />
      <Footer />
    </>
  );
};

export default Layout;
