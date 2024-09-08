import Navbar from "@/app/(protected)/setting/_Components/Navbar";
import React from "react";
interface IProps {
  children: React.ReactNode;
}
const SettingLayout = ({ children }: IProps) => {
  return (
    <div className="bg-sky-400 h-full flex flex-col justify-center items-center">
      <Navbar />
      {children}
    </div>
  );
};

export default SettingLayout;
