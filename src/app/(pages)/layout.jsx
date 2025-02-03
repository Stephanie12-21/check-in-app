"use client";

import Navbar from "@/components/sections/Navbar";
import React from "react";

const Layout = ({ children }) => {
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }, []);

  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen bg-[#15213d]">
  //         <AnimatedSymbol />
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen px-10">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
