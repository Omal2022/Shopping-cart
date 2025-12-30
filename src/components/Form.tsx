import React from "react";
import { Input } from "./Input";
import { type FormControl } from "../types/Forms";

interface FormProps {
  formsControl: FormControl[];
  buttonText?: string;
  formData: Record<string, string | number>;
  setFormData: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const Form: React.FC<FormProps> = ({
  formsControl = [],
  buttonText,
  formData,
  setFormData,
  onSubmit,
}) => {
  const renderFormElement = (control: FormControl) => {
    const commonClasses =
      "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            key={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={formData[control.name]}
            name={control.name}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [control.name]: event.target.value,
              }))
            }
            className={commonClasses}
          />
        );

      case "textarea":
        return (
          <textarea
            key={control.name}
            placeholder={control.placeholder}
            value={formData[control.name] as string}
            name={control.name}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [control.name]: event.target.value,
              }))
            }
            className={commonClasses + " h-24 resize-none"}
          />
        );

      case "select":
        return (
          <select
            key={control.name}
            value={formData[control.name] as string}
            name={control.name}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [control.name]: event.target.value,
              }))
            }
            className={commonClasses}
          >
            {control.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      {formsControl.map((control) => renderFormElement(control))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        {buttonText ?? "Submit"}
      </button>
    </form>
  );
};
