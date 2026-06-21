import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileUpdateAPI, uploadPhotoAPI } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../redux/userSlice";
import InputField from "../components/InputField";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const initialData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    age: user?.age ?? "",
    gender: user?.gender ?? "",
    skills: user?.skills?.join(", ") ?? "",
    about: user?.about ?? "",
    location: user?.location ?? "",
  };

  const [formData, setFormData] = useState(initialData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // --- Handlers for Text Inputs ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: profileUpdateAPI,
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
      dispatch(addUser(data?.data?.user));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };
    mutation.mutate(payload);
  };

  // --- Handlers for Photo Upload ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const photoMutation = useMutation({
    mutationFn: uploadPhotoAPI,
    onSuccess: (data) => {
      dispatch(addUser(data.user)); // Update Redux with new photoUrl
      setSelectedFile(null); // Reset selection state
    },
  });

  const uploadPhoto = () => {
    if (!selectedFile) return;
    const data = new FormData();
    data.append("photo", selectedFile);
    photoMutation.mutate(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Account Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">Manage your profile information and picture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Profile Form */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 shadow-sm rounded-xl p-5 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 transition-colors">Personal Information</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              <InputField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>

            <InputField label="About / Bio" type="text" name="about" value={formData.about} onChange={handleChange} placeholder="Tell us about yourself..." />

            <InputField label="Skills (comma separated)" type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Nodejs, JavaScript, React" />

            <InputField label="Location" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, USA" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 transition-colors">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 !text-gray-900 dark:!text-slate-100 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="others">Other</option>
                </select>
              </div>
              <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
              <div>
                {mutation.isSuccess && <span className="text-sm text-green-600 dark:text-green-400 font-medium">Profile updated!</span>}
                {mutation.isError && <span className="text-sm text-red-500 dark:text-red-400 font-medium">Update failed.</span>}
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Profile Picture Card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-900 shadow-sm rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center sticky top-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 w-full text-left pb-2 border-b border-slate-100 dark:border-slate-800 transition-colors">Profile Picture</h3>

            <div className="relative group mb-5">
              {/* The Image */}
              <div className="w-32 h-32 rounded-full ring-4 ring-slate-50 dark:ring-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors">
                <img
                  src={previewUrl || user?.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay edit button that appears on hover */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/40 dark:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer backdrop-blur-[1px]"
              >
                <span className="text-white font-medium text-xs bg-black/70 px-2 py-1 rounded-md shadow-sm">
                  Change
                </span>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Action Buttons */}
            {!selectedFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full py-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Upload New Image
              </button>
            ) : (
              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={uploadPhoto}
                  disabled={photoMutation.isPending}
                  className="w-full py-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-900 dark:hover:bg-white transition-colors active:scale-95 shadow-sm"
                >
                  {photoMutation.isPending ? "Uploading..." : "Confirm Upload"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  disabled={photoMutation.isPending}
                  className="w-full py-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Upload Status Messages */}
            {photoMutation.isSuccess && (
              <p className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">
                Photo updated successfully!
              </p>
            )}
            {photoMutation.isError && (
              <p className="mt-3 text-xs text-red-500 dark:text-red-400 font-medium">
                Upload failed. Try again.
              </p>
            )}

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-5 transition-colors">
              JPG, PNG, WEBP. Max size: 5MB.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
