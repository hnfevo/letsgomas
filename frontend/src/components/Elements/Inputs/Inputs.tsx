import "./Inputs.scss";
import React, { FC } from 'react';

interface InputsProps {
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSubmit?: () => void;
  type?: string;  
}

const Inputs: FC<InputsProps> = ({ className = "", value, onChange, placeholder, onSubmit, type = "text" }) => {  
  return (
    <div>
      <input
        className={`input ${className}`}
        type={type}  
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {onSubmit && <button onClick={onSubmit}></button>}
    </div>
  );
};

export default Inputs;