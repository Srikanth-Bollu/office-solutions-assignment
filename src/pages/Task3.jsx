import React, { useEffect, useState, useRef } from "react";

export const Task3 = () => {
    const [data, setData] = useState([]);
    const [cachedData, setCachedData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef(null);
    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    const fetchData = async () => {
        setLoading(true);

        const cached = localStorage.getItem("postsCache");

        if (cached) {
            const parsed = JSON.parse(cached);
            setCachedData(parsed);
            setData(parsed);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(API_URL);
            const json = await res.json();
            setCachedData(json);
            setData(json);
            localStorage.setItem("postsCache", JSON.stringify(json));
        } catch (err) {
            console.log("Error:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (cachedData.length === 0) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            handleSearch(search);
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [search, cachedData]);

    const handleSearch = (value) => {
        if (!value.trim()) {
            setData(cachedData);
            return;
        }

        const filtered = cachedData.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        setData(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Task 3: Search & Filter (With Cache + Debounce)
                </h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                />

                {/* Loader */}
                {loading && (
                    <p className="text-center text-lg font-semibold text-gray-700">
                        Loading...
                    </p>
                )}

                {/* Results */}
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
