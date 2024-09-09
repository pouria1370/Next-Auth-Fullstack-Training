import Navbar from "@/app/(protected)/setting/_Components/Navbar";
import React, { Suspense } from "react";
interface IProps {
  children: React.ReactNode;
}
const SettingLayout = ({ children }: IProps) => {
  return (
    <div className="bg-sky-400 h-full flex flex-col justify-center items-center">
      <Navbar />
      <Suspense fallback={<div>loading ...</div>}>{children}</Suspense>
    </div>
  );
};

export default SettingLayout;
