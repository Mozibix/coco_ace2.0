"use client";

import { useEffect, useState } from "react";
import Footer from "./includes/Footer";
import MainHeader from "./includes/MainHeader";
import Loading from "../(components)/Loading";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", function () {
      let res = localStorage.getItem("isLoading");
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    });
  });

  return (
    <>
      <div
        id="main_layout"
        className="min-w-[1050px] max-w-[1300px] mx-auto border"
      >
        <div>
          {/* LOADING */}
          {/* {isLoading ? <Loading /> : <></>} */}
          {/* MAINHEADER */}
          <MainHeader />

          {children}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
