import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Services/firebase";
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Cargando...</h1>;

  if (!user) {
    return <Navigate to="/" />;
  } else {
    const Nombre = user.email;
    const uid = user.uid;
    setDoc(doc(db, "Usuario", uid), {
      Nombre: Nombre,
      Estado: true,
      UID: uid,
    });
  }

  return <>{children}</>;
}
