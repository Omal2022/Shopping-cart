import React from "react";

export interface BtnStyle {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  clsName?: string;
  bgColor?: string;
  txtColor?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export const Button = ({
  bgColor,
  txtColor = "white",
  width = "full",
  height = "40px",
  children,
  onClick,
  clsName,
  disabled,
}: BtnStyle) => {
  const styles: React.CSSProperties = {
    backgroundColor: bgColor || "black",
    color: txtColor,
    width,
    height,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={styles}
      onClick={onClick}
      className={clsName}
    >
      {children}
    </button>
  );
};
