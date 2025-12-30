// forms/registerControls.ts
import { type FormControl } from "../types/Forms";

export const registerFormControls: FormControl[] = [
  {
    componentType: "input",
    name: "name",
    type: "text",
    placeholder: "Full Name",
  },
  {
    componentType: "input",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    componentType: "input",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
