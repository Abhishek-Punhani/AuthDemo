export default function AuthInput({
  name,
  label,
  type,
  placeholder,
  register,
  error,
}) {
  return (
    <>
      <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label htmlFor={name} className="text-sm font-bold tracking-wide">
          {label}
        </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
        />
        {error && <p className="text-sm text-red-400">{error} </p>}
      </div>
    </>
  );
}
