export default function Button({
  children,
  className = "",
  type = "button",
  onClick,
}) {
  return (
    <>
      <button
        className={`rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-white-300 disabled:bg-gray-400 disabled:cursor-not-allowed my-2 ${className}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
