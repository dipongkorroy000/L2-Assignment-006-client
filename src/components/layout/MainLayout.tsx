import type {ReactNode} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
