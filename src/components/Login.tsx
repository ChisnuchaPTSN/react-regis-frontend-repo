import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Validation from "./LoginValidation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const validationErrors = Validation(formData);

    console.log("Form Data:", formData);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Logging in with:", formData);
      setError({});

      axios
      .post("http://localhost:8081/login", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {  // เช็ค success ที่ backend ส่งมา
          console.log("Login successful");
          navigate("/home");
        } else {
          alert(response.data.message); // แสดงข้อความจาก backend
        }
      })
      .catch((error) => {
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
        alert("Login failed : " + (error.response?.data?.message || "Unknown error"));
      });
    
    } else {
      console.log("Validation errors found");
      setError(validationErrors); // แสดงข้อผิดพลาด
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Sign in</h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Use your Account
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="peer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
                <label
                  className={`absolute left-3 transition-all duration-200 pointer-events-none
                                            ${
                                              isEmailFocused || formData.email
                                                ? "-top-2 text-xs bg-white px-1 text-gray-700"
                                                : "top-2 text-gray-500"
                                            }`}
                >
                  Email
                </label>
                {error.email && (
                    <p className="text-red-500 px-3 text-xs mt-1">
                      {error.email}
                    </p>
                  )}
              </div>
            </div>

            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {error.password && (
                    <p className="text-red-500 px-3 text-xs mt-1">
                      {error.password}
                    </p>
                  )}
            </div>

            <div className="mb-10 flex justify-end">
              <button
                type="button"
                className="text-gray-700 font-medium hover:bg-gray-50 px-4 py-1 rounded-md transition-colors duration-200 cursor-pointer"
              >
                Forgot email?
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                to="/register"
                className="text-gray-700 font-medium hover:bg-gray-50 px-4 py-2 rounded-md transition-colors duration-200 text-center cursor-pointer"
              >
                Create Account
              </Link>
              <button
                type="submit"
                className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transform transition-all duration-200 cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
