import React from 'react';

interface ProfileInputProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  type,
  placeholder,
  className,
  value,
  id,
  onChange
}) => {
  return (
    <div className="relative">
      <input 
        id={id}
        value={value} 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        className={`w-full border-b p-2 text-grey border-grey focus:outline-none focus:border-green transition-colors ${className || ''}`} 
      />
    </div>
  );
};

export default ProfileInput;