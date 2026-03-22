import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import { HomePage } from "./pages/HomePage";

function App() {

  return (
    <>
    <BrowserRouter> 
      <NavBar />
      <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
