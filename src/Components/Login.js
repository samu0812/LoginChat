import "../Style/Login-Style.css";
import "../Fonts/font-awesome-4.7.0/css/font-awesome.css";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import google from '../Assets/img/google.png'
import facebook from '../Assets/img/facebook.png'
import github from '../Assets/img/github.png'
export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login,loginWithGoogle, resetPassword,loginWithFacebook,loginWithGithub} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {//obtiene el valor de email y contraseña
    setUser({ ...user, [name]: value });

  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await login(user.email, user.password);

      navigate("/Home");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("Correo Invaildo");
      } else {
        if (error.code === "auth/weak-password") {
          setError("La contraseña debe tener al menos 6 caracteres ");
        } else {
          if (error.code === "auth/email-already-in-use") {
            setError("El Correo ya esta en uso");
          } else{
            if (error.code === "auth/user-not-found"){
              setError("El Nombre de usuario no Existe");
            } else{
              if (error.code === "auth/wrong-password"){
                setError("La contraseña es Incorrecta");
              } else{
                if(error.code === "auth/too-many-request"){
                  setError("El acceso a esta cuenta a sido inahabilitado, Tienes que cambiar inmediatamente tu contraseña o intentar mas tarde.")
                }
              }
            }
          }
        }
      }
    }
  };


  const handleGoogleSignin= async () =>{ // iniciar sesión con google
    try {
      await loginWithGoogle()
      navigate("/Home") 

    } catch (error) {
      setError(error)
    }
    
  }

  const handleFacebookSignin = async () =>{ //iniciar sesion con facebook
    try {
      await loginWithFacebook()
      navigate("/Home")
    } catch (error) {

      setError(error)
      
    }
  }

  const handleGithubSigin = async () =>{// iniciar sesion con github 
    try {
      await loginWithGithub()
      navigate("/Home")
    } catch (error) {
      console.log(error);
    }
  }


  const handleResetPassword = async () =>{ //resetear la contraseña 
    if(!user.email) return setError("Porfavor ingresa tu Email");
    try {
      await resetPassword(user.email)
      setError("Hemos enviado un mensaje a tu Correo")
    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <div id="Login-Box">
      <form onSubmit={handleSumbit}>
        <h1>Iniciar Sesión</h1>
        <div className="Form">
          <div className="Item">
            
            <input
              type="email"
              name="email"
              placeholder="Correo"
              id="Usuario"
              required
              onChange={handleChange}
            />
          </div>
          <div className="Item">
            
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              id="Contraseña"
              required
              onChange={handleChange}//cambia el valor del usuario
            />
          </div>
        </div>
        <button onClick={handleSumbit} >Iniciar Sesión</button>
      </form>
      <div className="P-Error">{error && <p>{error}</p>}</div>

      <div className="Redireccionar">
        <p>¿No tienes una cuenta? Registrate <Link to="/Registrarse" className="Link">Aqui.</Link></p>
      </div>

      <br></br>
      <div className="Recuperar-Item">

        <p>¿Haz olvidado tu contraseña? <a href="#!" className="Href-Item" onClick={handleResetPassword}>Click aqui</a> para restablecerla</p>

      </div>

      <br></br>

      <div className="Cuentas">
        <p>Ingresar con</p>
      </div>
      <div className="Botones-Cuentas">
        <button className='btn btn-primary btn-sm' type='button' onClick={handleGoogleSignin}> <img className='imgGoogle' src={google} alt=''/> </button>
        <button className='btn btn-primary btn-sm' type='button' onClick={handleFacebookSignin}><img className='imgGoogle' src={facebook} alt=''/></button>
        <button className='btn btn-primary btn-sm' type='button' onClick={handleGithubSigin}><img className='imgGoogle' src={github} alt=''/></button>
      </div>
    </div>
  );
}