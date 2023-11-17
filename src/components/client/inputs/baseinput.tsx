import { forwardRef } from "react";
import React from "react";

interface BaseInputProps {
  type: string;
  placeholder?: string;
  name?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      onChange={handleChange}
      className="border-primary-black text-primary-black w-full border px-4 py-2"
      ref={ref}
    />
  );
});

BaseInput.displayName = "Button";

export default BaseInput;
