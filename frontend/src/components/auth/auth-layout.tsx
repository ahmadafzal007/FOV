import type { ReactNode } from "react";
import ellipse from "../../assets/bgellipse.png";
import Navbar from "./navbar";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen bg-black bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${ellipse})` }}
    >
      <Navbar />
      <div className="flex flex-col flex-grow items-center  px-4 text-center">
        {children}
      </div>
    </div>
  );
}
