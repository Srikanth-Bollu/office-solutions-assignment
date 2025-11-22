import React from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Choose a Task
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/task1")}
            className="py-4 bg-blue-600 text-white text-xl rounded-xl shadow hover:bg-blue-700 transition active:scale-95"
          >
            Task 1
          </button>

          <button
            onClick={() => navigate("/task2")}
            className="py-4 bg-green-600 text-white text-xl rounded-xl shadow hover:bg-green-700 transition active:scale-95"
          >
            Task 2
          </button>

          <button
            onClick={() => navigate("/task3")}
            className="py-4 bg-purple-600 text-white text-xl rounded-xl shadow hover:bg-purple-700 transition active:scale-95"
          >
            Task 3
          </button>

          <button
            onClick={() => navigate("/task4")}
            className="py-4 bg-orange-500 text-white text-xl rounded-xl shadow hover:bg-orange-600 transition active:scale-95"
          >
            Task 4
          </button>
        </div>
      </div>
    </div>
  );
};
