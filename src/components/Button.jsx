import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary:
      "bg-accent text-white px-6 py-3 rounded-full shadow-sm hover:brightness-95",
    ghost:
      "bg-transparent border border-gray-200 text-primary px-4 py-2 rounded-full",
    link: "bg-transparent text-primary px-2 py-1",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
