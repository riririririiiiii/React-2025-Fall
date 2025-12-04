import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import NetworkStatus from "./NetworkStatus";
import InstallPWA from "./InstallPWA";
import "../styles/RootLayout.css";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <NetworkStatus />
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <InstallPWA />
    </div>
  );
}