"use client";

import React from "react";

type TButtonProps = {
  children: React.ReactNode;
  onClick:
    | (() => void)
    | (() => Promise<void>)
    | ((prevState: any) => React.SetStateAction<any>);
  color?: "bg-greenSmooth" | "bg-primary" | "bg-purplePrimary";
  className?: string;
  loading?: boolean;
  loadingText?: string;
  outline?: boolean;
  iconPosition?: "left" | "right";
  rounded?: "rounded-md" | "rounded-full";
  padding?: "px-4 py-2" | "px-4 py-0";
  bold?: boolean;
};

function Button({
  children,
  onClick,
  color = "bg-primary",
  className,
  loading,
  loadingText,
  outline = false,
  iconPosition = "right",
  rounded = "rounded-md",
  padding = "px-4 py-2",
  bold = false,
}: Readonly<TButtonProps>) {
  const colorResolveClass = `${
    outline
      ? `bg-white border border-solid border-${color}`
      : `text-white ${color}`
  }  hover:bg-opacity-80 hover:shadow-md ${loading ? "bg-opacity-80" : ""}`;

  const iconResolveClass = `flex justify-center gap-2 ${
    iconPosition === "right" ? "flex-row" : "flex-row-reverse"
  } items-center`;

  return (
    <button
      disabled={loading}
      className={`justify-center ${rounded} ${padding} ${
        bold ? "font-bold" : ""
      } align-middle ${className} text-base`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
