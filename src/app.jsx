import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./views";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const allowAllControls = async () => {
      const ok = await axios.get("/");
    };
    allowAllControls();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
