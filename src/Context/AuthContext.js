import {createContext, useContext, useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../Services/firebase";

export const Authcontext = createContext();

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) throw new Error("El context esta Vacio");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>//refistrarse
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>//iniciar sesion
    signInWithEmailAndPassword(auth, email, password);
    

  const logout = () => signOut(auth);

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {//Comprueba si el usuario actual esta Activo
      setUser(currentUser);
      setLoading(false);//cambia el estado
    });

    return () => Unsubscribe();
  }, []);

  const loginWithGoogle = () => {//inicio con google
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithFacebook = () => {//inicio con facebook
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider);
  };

  const loginWithGithub = () => {//inicio con github
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };


  const resetPassword = (email) => sendPasswordResetEmail(auth, email);//cambiar contraseña
  
  return (
    <Authcontext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        loginWithFacebook,
        loginWithGithub,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
