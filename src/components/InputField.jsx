const InputField = ({ label, type, name, value, onChange, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
export default InputField;
