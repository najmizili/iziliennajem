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

      await updateProfile(nuevoUsuario, { displayName: nombre });

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
      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().admin) {
        setUser(currentUser);
        navigate("/admin");
      } else {
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

      const userDocRef = doc(db, `users/${infoUsuario.user.uid}`);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: infoUsuario.user.uid,
          email: infoUsuario.user.email,
          name: infoUsuario.user.displayName,
          admin: false,
        });
      }

      const adminCheckRef = doc(db, `admin/${infoUsuario.user.uid}`);
      const adminCheckSnap = await getDoc(adminCheckRef);

      if (adminCheckSnap.exists() && adminCheckSnap.data().admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

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
