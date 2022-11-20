// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "@firebase/firestore";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // setIsLoading(true);
      console.log(currentUser);
      if (currentUser) {
        setIsLoading(true);
        const getUserData = async () => {
          const userCollectionRef = doc(db, "users", auth.currentUser.uid);
          const userData = await getDoc(userCollectionRef);

          setUser({
            ...userData.data(),
          });
        };
        getUserData();
        setIsLoading(false);
      }
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const router = useRouter();

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        signIn,
        passwordReset,
        isLoading,
      }}
    >
      {router.pathname === "/admin" ? <></> : <Navbar />}
      {children}
      {router.pathname === "/admin" ? <></> : <Footer />}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
