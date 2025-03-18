const ProfileInput = ({
  type: type,
  placeholder: placeholder,
  className: className,
}: {
  type: string;
  placeholder: string;
  className?: string;
}) => {
  return (
    <div className="relative">
      <input type={type} placeholder={placeholder} className={`w-full border-b p-2 text-grey border-grey focus:outline-none focus:border-green transition-colors ${className}`} />
    </div>
  );
};

export default ProfileInput;
