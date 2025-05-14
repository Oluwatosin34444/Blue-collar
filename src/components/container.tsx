import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export default function Container({
  children,
  className = "",
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}
