"use client";

import React from "react";

type TButtonProps = {
  children: React.ReactNode;
  onClick:
    | (() => void)
    | (() => Promise<void>)
    | ((prevState: any) => React.SetStateAction<any>);
  color: string;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  outline?: boolean;
  iconPosition?: "left" | "right";
  rounded?: "rounded-md" | "rounded-full";
  padding?: "px-4 py-2" | "px-4 py-0";
};

function Button({
  children,
  onClick,
  color,
  className,
  loading,
  loadingText,
  outline = false,
  iconPosition = "right",
  rounded = "rounded-md",
  padding = "px-4 py-2",
}: Readonly<TButtonProps>) {
  const colorResolveClass = `${
    outline
      ? `bg-white border border-solid ${color} ${color}`
      : `text-white ${color}`
  }  hover:bg-opacity-80 hover:shadow-md ${loading ? "bg-opacity-80" : ""}`;

  const iconResolveClass = `flex justify-center gap-2 ${
    iconPosition === "right" ? "flex-row" : "flex-row-reverse"
  } items-center`;

  return (
    <button
      disabled={loading}
      className={`${colorResolveClass} justify-center ${rounded} ${padding} align-middle font-bold ${className} text-base`}
      onClick={onClick}
    >{children}</button>
  );
}

export default Button;
