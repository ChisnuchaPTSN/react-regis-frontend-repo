import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Validation from "./RegisterValidation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNameEmailSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // ตรวจสอบแค่ name และ email
    const validationErrors = Validation(formData, "nameEmail");

    console.log("Form Data:", formData);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("No validation errors for name and email, moving to step 2");
      setStep(2); // ไปยังขั้นตอนที่ 2
      setError({}); // รีเซ็ตข้อผิดพลาด
    } else {
      console.log("Validation errors found for name and email");
      setError(validationErrors); // แสดงข้อผิดพลาด
    }
  };

  const handlePasswordSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // ตรวจสอบข้อมูลเฉพาะในขั้นตอนที่เกี่ยวข้อง
    const validationErrors = Validation(formData, "password"); // Validate only password

    console.log("Form Data:", formData);
    console.log("Validation Errors:", validationErrors);

    if (formData.password && Object.keys(validationErrors).length === 0) {
      console.log("Registering with:", formData);
      setError({}); // รีเซ็ตข้อผิดพลาด

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      axios
      .post("http://localhost:8081/register", formData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          alert("Registration successful! Redirecting to login...");
          navigate("/login"); // ไปที่หน้า Login
        }
      })
      .catch((error) => {
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
        alert("Registration failed! Please try again.");
      });
    } else {
      console.log("Validation errors found for password");
      setError(validationErrors); // แสดงข้อผิดพลาด
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            {step === 1 ? "Sign up" : "Welcome"}
          </h1>

          <p className="text-lg text-center text-gray-600 mb-8">
            {step === 1
              ? "Create your account"
              : formData.name + " is about to be created..."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleNameEmailSubmit} noValidate>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="peer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none
                                            ${
                                              isNameFocused || formData.name
                                                ? "-top-2 text-xs bg-white px-1 text-gray-700"
                                                : "top-2 text-gray-500"
                                            }`}
                  >
                    Name
                  </label>
                  {error.name && (
                    <p className="text-red-500 px-3 text-xs mt-1">
                      {error.name}
                    </p>
                  )}
                </div>
              </div>

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

              <div className="mb-10 flex justify-end">
                <Link
                  to={"/login"}
                  type="button"
                  className="text-gray-700 font-medium hover:bg-gray-50 px-4 py-1 rounded-md transition-colors duration-200 cursor-pointer"
                  onClick={() => (window.location.href = "/login")}
                >
                  Have an account?
                </Link>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transform transition-all duration-200 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} noValidate>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    placeholder="Create a password"
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
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-700 font-medium hover:bg-gray-50 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transform transition-all duration-200 text-center cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
