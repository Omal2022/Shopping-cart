// src/types/Forms.ts
export interface RegisterFormData {
  name: string;
  email: string;
  password: string | number;
}

export interface FormControl {
  componentType: "input" | "select" | "textarea";
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  name: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  className?: string;
  options?: { label: string; value: string }[];
}

export interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  name: string;
}
