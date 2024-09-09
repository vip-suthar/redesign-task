import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import PageHaeader from "./components/PageHeader";
import PageContent from "./components/PageContent";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="root-container"
              style={{
                height: "100%",
                background: "#eaeff3",
              }}
            >
              {/* Navbar */}
              <Navbar />
              {/* Page Header */}
              <PageHaeader />
              {/* Search */}
              <Search />
              {/* Page Content */}
              <PageContent />
            </div>
          }
        />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
