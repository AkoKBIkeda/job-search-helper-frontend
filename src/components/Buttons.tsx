// Reference: Button with Typescript https://www.codeconcisely.com/posts/react-button-component/
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...attributes }: Props) {
  return (
    <button
    type="button"
      className="w-40 mt-5 bg-[#E5DC9F] border-2 border-primary text-primary font-semibold py-2 px-4 rounded uppercase cursor-pointer hover:bg-[#EAE7D3]"
      {...attributes}
    >
      {children}
    </button>
  );
}
