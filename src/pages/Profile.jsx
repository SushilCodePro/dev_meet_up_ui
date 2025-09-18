import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileUpdateAPI } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../redux/userSlice";
import InputField from "../components/InputField";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("user from redux", user);

  const initialData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    emailId: user?.emailId ?? "",
    age: user?.age ?? "",
    gender: user?.gender ?? "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  console.log("formdata11", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: profileUpdateAPI,
    onSuccess: (data) => {
      dispatch(addUser(data.user));

      console.log("profile update data", data);
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // const queryClient = useQueryClient();
    mutation.mutate(formData);
    console.log("formdata", formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-2 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-1">
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={true}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <InputField
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {mutation.isPending ? "Updating ..." : "Save Changes"}
        </button>
        {mutation.isSuccess && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
