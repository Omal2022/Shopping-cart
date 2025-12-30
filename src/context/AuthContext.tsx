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


import { createContext, useState } from "react";
import { type RegisterFormData } from "../types/Forms";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../FireBaseConfig";

interface AuthStateType {
  registerFormData: RegisterFormData;
  setRegisterFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  registerOnSubmit: (data: RegisterFormData) => void;
}

export const AuthContext = createContext<AuthStateType | null>(null);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const registerOnSubmit = async (data: RegisterFormData) => {
    try {
      const { email, password } = data;

      // 1️⃣ Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);

      // 2️⃣ Send verification email
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        alert(`Verification email sent to ${email}. Please check your spam or inbox!`);
      }

      // 3️⃣ Reset form
      setRegisterFormData({ name: "", email: "", password: "" });

    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ registerFormData, setRegisterFormData, registerOnSubmit }}>
      {children}
    </AuthContext.Provider>
  );
};
