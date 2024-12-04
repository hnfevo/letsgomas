import "./Buttons.scss";
import React, { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  disabled = false,
  icon,
  iconPosition = "left",
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <span className="btn-icon btn-icon-left">{icon}</span>
      )}
      {label}
      {icon && iconPosition === "right" && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
    </button>
  );
};

export default Button;