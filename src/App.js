import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/home";
import { Registrar } from "./Components/Registrar";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Home"
            element={<ProtectedRoute><Home/></ProtectedRoute>}
          />
          <Route path="/Registrarse" element={<Registrar/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
