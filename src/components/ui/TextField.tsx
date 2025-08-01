export default function TextField({placeholder} : {placeholder?: string}) {
  return (
    <input
      id="email"
      type="email"
      placeholder={placeholder || ""}
      className="
          w-full
          px-3
          py-1
          border
          border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-3
          focus:ring-[#CFCFCF]
          focus:border-gray-400
          text-gray-700
          placeholder-gray-500
          shadow-xs
          transition-all
          duration-300
          placeholder:text-sm
        "
    />
  );
}
