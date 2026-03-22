import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import RegisterPage  from "./pages/Registerpage";

function App() {

  return (
    <>
    <BrowserRouter> 
      <NavBar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="//Register" element={<RegisterPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
