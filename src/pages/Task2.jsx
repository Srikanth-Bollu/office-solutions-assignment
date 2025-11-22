import React, { useEffect, useState } from "react";

export const Task2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch API function
  const fetchData = async (forceRefresh = false) => {
    setLoading(true);

    if (forceRefresh === false) {
      const cachedData = localStorage.getItem("postsCache");
      if (cachedData) {
        console.log("Loaded from cache");
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    try {
      console.log("Fetching fresh data");
      const response = await fetch(API_URL);
      const res = await response.json();

      setData(res);
      localStorage.setItem("postsCache", JSON.stringify(res));
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    localStorage.removeItem("postsCache");
    fetchData(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Task 2: Caching API Requests
          </h1>

          <button
            onClick={refreshData}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <p className="text-center text-lg text-gray-700 font-semibold">
            Loading...
          </p>
        )}

        {/* Cached or Fetched Data */}
        {!loading &&
          data.map((item) => (
            <div key={item.id} className="border-b pb-4 mb-4">
              <p className="text-xl font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-gray-700 mt-1">{item.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
