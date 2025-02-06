import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Hero() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-slate-100 text-gray-900 p-20 pt-30 md:p-55">
      <div
        data-aos="fade-up" data-aos-delay="200"
        className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
      >
        <div className="w-50 md:w-110 rounded-full overflow-hidden mt-2 md:-mt-3 md:ml-30">
          <img src="/Me.JPG" alt="img-main" />
        </div>
      </div>

      <div
        data-aos="fade-up"
        className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
      >
        <h2 className="text-2xl md:text-[2.1rem] font-medium mt-10 leading-normal">
          Every <span className="font-bold">Success</span>
          <br />
          Starting with the{" "}
          <span className="font-bold typing">Right Person</span>
        </h2>
        <p className="text-base md:text-lg mt-7">
          This is my Responsive Website by React and Tailwind CSS
        </p>
        <Link
          to="/login"
          className="bg-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full mt-8 inline-block hover:bg-gray-800 transition-all duration-300 cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Hero;
