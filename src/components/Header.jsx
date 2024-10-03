import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="bg-purple-900 p-4 mb-5 pb-14">
      <div className="flex items-center justify-center">
        <img src="/Task us.png" alt="Logo" className="w-10 h-10 mr-4" />

        <div className="text-white text-3xl font-sans">TASK US - CRUD APP</div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
