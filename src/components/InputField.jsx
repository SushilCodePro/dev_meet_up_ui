const InputField = ({ label, type, name, value, onChange, ...props }) => (
  <div className="w-full">
    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 transition-colors">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 !text-gray-900 dark:!text-slate-100 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
    />
  </div>
);
export default InputField;
