import { useState} from "react";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, signupAPI } from "../api/api.js";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Decide which API to call based on login/signup
  const mutation = useMutation({
    mutationFn: isLogin
      ? loginAPI
      : signupAPI,
    onSuccess: (data) => {
      console.log(isLogin ? "login res" : "signup res", data);
      dispatch(addUser(data));
      navigate("/");
    },
    onError: (error) => {
      console.error("Auth failed:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (emailId && password) {
        mutation.mutate({ emailId, password });
      }
    } else {
      if (firstName && lastName && emailId && password && age && gender) {
        mutation.mutate({ firstName, lastName, emailId, password, age, gender });
      }
    }
  };

  return (
    <div className="h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/059/568/823/non_2x/futuristic-ai-concept-with-glowing-brain-on-circuit-board-for-innovation-and-technology-design-photo.jpg')] bg-cover bg-center">
      
      {/* Typewriter Title */}
      <h1 className="text-2xl font-bold text-black absolute top-24 left-1/3 transform -translate-x-1/2 whitespace-pre-wrap text-center">
        <Typewriter
          words={isLogin ? ['Welcome to the Developers\nPoint'] : ['Create your\nDeveloper Account']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      <div className="pt-20 pb-10 flex items-center justify-center">
        <div className="h-[500px] max-w-3xl w-full bg-white rounded-lg shadow-lg flex overflow-hidden">
          {/* Left image */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)",
            }}
            aria-label="City view"
          ></div>

          {/* Right form */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="flex items-center justify-center mb-6 text-xl font-semibold text-gray-700">
              {isLogin ? "Login to your account" : "Sign up for a new account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <select
                      className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2 rounded-sm accent-indigo-600 focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full py-2 mb-4 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              >
                {mutation.isLoading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
              </button>

              {mutation.isError && (
                <div className="text-red-600">
                  Error: {mutation?.error?.response?.data?.message || "Something went wrong"}
                </div>
              )}

              {mutation.isSuccess && (
                <div className="text-green-600">
                  Success: {mutation?.data?.message}
                </div>
              )}
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-indigo-600 hover:underline font-medium cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create new account" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
