// import { createContext, useState } from "react";
// import { type RegisterFormData } from "../types/Forms";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../FireBaseConfig";

// interface AuthStateType {
//   registerFormData: RegisterFormData;
//   setRegisterFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
//   registerOnSubmit: (data: RegisterFormData) => void;
// }

// export const AuthContext = createContext<AuthStateType | null>(null);

// export const AuthState = ({ children }: { children: React.ReactNode }) => {
//   const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const registerOnSubmit = (data: RegisterFormData) => {
//     console.log("Form submitted:", data);

//     setRegisterFormData({
//       name: "",
//       email: "",
//       password: "",
//     });

//     const { email, password } = data;

//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         registerFormData,
//         setRegisterFormData,
//         registerOnSubmit,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import {type RegisterFormData } from "../types/Forms";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  type User as FirebaseUser, // ✅ Type only
} from "firebase/auth";
import { auth } from "../FireBaseConfig";

interface AuthStateType {
  registerFormData: RegisterFormData;
  setRegisterFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  registerWithFirebase: (data: RegisterFormData) => Promise<void>;
  user: FirebaseUser | null; // ✅ Use type only
}

export const AuthContext = createContext<AuthStateType | null>(null);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState<FirebaseUser | null>(null);

  const registerWithFirebase = async (data: RegisterFormData) => {
    try {
      const { name, email, password } = data;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.toString()
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);

        alert(
          `Verification email sent to ${email}. Please check your inbox or spam folder.`
        );
      }

      setRegisterFormData({ name: "", email: "", password: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(`Registration error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ registerFormData, setRegisterFormData, registerWithFirebase, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
