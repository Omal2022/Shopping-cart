export interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  name:string
}

export interface FormControl {
  componentType: "input" | "select" | "textarea";
  type?: React.HTMLInputTypeAttribute; // for inputs
  placeholder?: string;
  value?: string | number;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  className?: string;
  options?: { label: string; value: string }[]; // for select
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string | number;
}
