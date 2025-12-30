import { useContext } from "react";
import { Form } from "../../../components/Form";
import { AuthContext } from "../../../context/AuthContext";
import { registerFormControls } from "../../../config/Config";

export const Register = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Register must be used within AuthState");
  }

  const { registerFormData, setRegisterFormData, registerOnSubmit } = context;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerOnSubmit(registerFormData);
  };

  return (
    <section className="register-page min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="register-container max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Please register your account</p>
        </header>

        <Form
          formsControl={registerFormControls}
          formData={registerFormData}
          setFormData={setRegisterFormData}
          onSubmit={handleSubmit}
          buttonText="Register"
        />
      </div>
    </section>
  );
};
