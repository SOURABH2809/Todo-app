import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from 'antd';
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="flex flex-col min-h-screen">
        <HeaderComponent />
        <Layout>
          <Content className="flex-grow container mx-auto mt-4">
            <Routes>
              <Route exact path="/" element={<Read />} />
              <Route path="/create" element={<Create />} /> 
              <Route path="/read" element={<Read />} />
              <Route path="/update" element={<Update />} />
            </Routes>
          </Content>
        </Layout>
        <FooterComponent />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
