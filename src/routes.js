import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReadNotes from "./components/but/read-note";
import App from "./app";
import Header from "./components/header/header";

function RoutesMenu() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/read-note' element={<ReadNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesMenu;
