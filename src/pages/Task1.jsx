import React, { useEffect, useState } from "react";

export const Task1 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      );
      const res = await response.json();
      setUsers(res);
    } catch (error) {
      console.log("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Task 1: API Data Fetching & Pagination
      </h1>

      {/* User Data Container */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        {loading && <h2 className="text-center text-lg font-semibold">Loading...</h2>}

        {!loading &&
          users.map((u) => (
            <div key={u.id} className="border-b py-4">
              <p className="font-semibold text-lg text-gray-900">
                Title: <span className="font-normal">{u.title}</span>
              </p>

              <p className="text-gray-700 mt-1">
                <strong>Body:</strong> {u.body}
              </p>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 transition"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="text-xl font-semibold">{page}</span>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
