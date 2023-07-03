import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Protector } from "./helpers";



function App () {
  return (
  <Container>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protector Component={Home} />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </Container>
  );
}

export default App;