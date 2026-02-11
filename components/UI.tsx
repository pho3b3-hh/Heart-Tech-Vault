
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "relative font-lol tracking-widest uppercase py-2 px-6 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed transform active:scale-95 border-2 overflow-hidden group";
  
  const variants = {
    primary: "border-gold-600 bg-black text-gold-500 hover:bg-gold-600 hover:text-white glow-gold",
    secondary: "border-blue-500 bg-black text-blue-400 hover:bg-blue-500 hover:text-white glow-blue"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
    </button>
  );
};
