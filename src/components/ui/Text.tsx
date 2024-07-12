import React from "react";

type TTextProps = {
  size?: "text-lg" | "text-base" | "text-xs" | "text-sm";
  color?: string;
  children?: React.ReactNode;
  weigth?: "font-normal" | "font-bold";
  className?: string;
};

const Text = ({
  size = "text-lg",
  color = "text-black",
  children,
  weigth = "font-normal",
  className,
}: TTextProps) => {
  return (
    <div
      className={`${size} ${weigth} ${className ?? ""} ${color}`}
    >
      {children}
    </div>
  );
};

export default Text;
