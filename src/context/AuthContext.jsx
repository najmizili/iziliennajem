import React, { useState, useEffect } from "react";
import { auth } from "../main.jsx";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const registro = async (nombre, email, password) => {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const nuevoUsuario = infoUsuario.user;

      const docRef = doc(db, `users/${nuevoUsuario.uid}`);
      await setDoc(docRef, { correo: email, admin: false });

      // Establecer el displayName directamente al crear el usuario
      await updateProfile(nuevoUsuario, { displayName: nombre });

      // Finalmente, actualizar el estado del usuario
      setUser(nuevoUsuario);

      return nuevoUsuario;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const infoUsuario = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = infoUsuario.user;
      // Verificar el rol del usuario antes de actualizar el estado 'user'
      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().admin) {
        // Si el usuario es administrador, redirige a la ruta de administrador
        setUser(currentUser);
        navigate("/admin");
      } else {
        // Si no es administrador, redirige a otra ruta (puedes ajustar esto según tus necesidades)
        setUser(currentUser);
        navigate("/");
      }

      return currentUser;
    } catch (error) {
      console.error("failed to login:", error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const respuestaGoogle = new GoogleAuthProvider();
      const infoUsuario = await signInWithPopup(auth, respuestaGoogle);

      // Crear un documento en la colección 'users' si no existe
      const userDocRef = doc(db, `users/${infoUsuario.user.uid}`);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // El usuario no existe, crear un nuevo documento con la información del usuario
        await setDoc(userDocRef, {
          uid: infoUsuario.user.uid,
          email: infoUsuario.user.email,
          name: infoUsuario.user.displayName,
          admin: false,
        });
      }

      // Redirigir según el rol del usuario
      const adminCheckRef = doc(db, `admin/${infoUsuario.user.uid}`);
      const adminCheckSnap = await getDoc(adminCheckRef);

      if (adminCheckSnap.exists() && adminCheckSnap.data().admin) {
        // Si el usuario es administrador, redirige a la ruta de administrador
        navigate("/admin");
      } else {
        navigate("/");
      }

      // Establecer el usuario en el contexto
      setUser(infoUsuario.user);

      return infoUsuario.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  };

  return (
    <authContext.Provider
      value={{
        registro,
        login,
        loginWithGoogle,
        logOut,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
