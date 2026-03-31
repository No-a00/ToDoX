import React from "react";
import NotFoundImg from "../assets/404_NotFound.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src={NotFoundImg}
        alt="Not Found"
        className="max-w-full mb-6 w-96" 
      />

      <p className="text-xl font-semibold">
        Bạn đang đi vào vùng cấm địa 🚫
      </p>

      <a
        href="/"
        className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-blue-600 rounded-2xl hover:bg-blue-700"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;
