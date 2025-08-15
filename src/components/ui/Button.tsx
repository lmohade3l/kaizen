import { ReactNode } from "react";

export default function Button({
  title = "",
  variant = "submit",
  disabled,
  children,
  onClick,
}: {
  title?: string;
  variant?: "submit" | "outlined";
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={variant === "submit" ? "submit" : "button"}
      className={`text-[14px] w-full rounded-lg p-2 cursor-pointer flex justify-center ${
        variant === "submit"
          ? "bg-lime-600 text-white hover:bg-lime-500 disabled:opacity-50 disabled:cursor-default"
          : "hover:bg-gray-100 border border-gray-300 transition"
      } ${children ? "gap-2" : ""} `}
    >
      {title ? title : children}
    </button>
  );
}
