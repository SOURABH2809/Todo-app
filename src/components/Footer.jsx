import React from "react";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-purple-900 text-white py-4 flex flex-col items-center ">
      <a
        href="https://github.com/SOURABH2809/CRUD-Web-App"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-white text-3xl hover:text-gray-400 transition-colors duration-200 mb-2 mr-4"
      >
        <GithubOutlined />

        <p className="text-sm text-gray-200 mt-2 mr-8">
          © 2024 TaskUs. Developed by Sourabh Gautam.
        </p>
      </a>
    </Footer>
  );
};

export default FooterComponent;
