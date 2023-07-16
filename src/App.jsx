import AuthProvider from "./context/AuthContext";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
