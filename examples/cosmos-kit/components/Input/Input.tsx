import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full relative ">
        {label && (
          <label className={`font-semibold text-xs mb-1 text-slate-100`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-slate-700/50 hover:bg-slate-700/70 text-slate-100 rounded-md outline-none transition duration-150 ease-in-out py-1 px-2  ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
