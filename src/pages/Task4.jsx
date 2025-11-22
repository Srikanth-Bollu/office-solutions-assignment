import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export const Task4 = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [counter, setCounter] = useState(1);

  // Add node dynamically
  const handleAddNode = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + counter
    );
    const data = await res.json();

    const newNode = {
      id: String(counter),
      type: "default",
      position: {
        x: 200 + Math.random() * 200,
        y: 150 + Math.random() * 200,
      },
      data: { label: data.title || `Node ${counter}` },
    };

    setNodes((prev) => [...prev, newNode]);
    setCounter(counter + 1);
  };

  // On connecting nodes
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">

      {/* ------------------ TOP NAVBAR ------------------ */}
      <div className="p-4 bg-white shadow-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Task 4: Dynamic React Flow</h1>

        <button
          onClick={handleAddNode}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add Node
        </button>
      </div>

      {/* ------------------ FLOW CANVAS ------------------ */}
      <div className="flex-grow border-t border-gray-300">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView
          className="bg-gray-200"
        >
          <Background color="#aaa" gap={20} />
          <Controls />
        </ReactFlow>
      </div>

    </div>
  );
};
