// // // export default Layout;
// // import React, { useState, useEffect } from "react";
// // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// // function Layout() {
// //   // Load from localStorage or default data
// //   const [columns, setColumns] = useState(() => {
// //     const saved = localStorage.getItem("kanbanColumns");
// //     useEffect(() => {
// //       localStorage.removeItem("kanbanColumns");
// //     }, []);

// //     return saved
// //       ? JSON.parse(saved)
// //       : {
// //           todo: {
// //             name: "To Do",
// //             items: [
// //               { id: "1", content: "Set" },
// //               { id: "2", content: "Write Project" },
// //             ],
// //           },
// //           inProgress: {
// //             name: "In Progress",
// //             items: [{ id: "3", content: "Design UI mockups" }],
// //           },
// //           done: {
// //             name: "Done",
// //             items: [{ id: "4", content: "Setup Repository" }],
// //           },
// //         };
// //   });

// //   const [newTask, setNewTask] = useState("");
// //   const [activeColumn, setActiveColumn] = useState("todo");
// //   const [editingTask, setEditingTask] = useState(null);
// //   const [editedContent, setEditedContent] = useState("null");

// //   useEffect(() => {
// //     localStorage.setItem("kanbanColumns", JSON.stringify(columns));
// //   }, [columns]);

// //   const addNewTask = () => {
// //     if (newTask.trim() === "") return;
// //     const updatedColumns = { ...columns };
// //     updatedColumns[activeColumn].items.push({
// //       id: Date.now().toString(),
// //       content: newTask,
// //     });
// //     setColumns(updatedColumns);
// //     setNewTask("");
// //   };

// //   const removeTask = (columnId, itemId) => {
// //     const updatedColumns = { ...columns };
// //     updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
// //       (item) => item.id !== itemId
// //     );
// //     setColumns(updatedColumns);
// //   };

// //   const startEditing = (columnId, item) => {
// //     setEditingTask({ columnId, id: item.id });
// //     setEditedContent(item.content);
// //   };

// //   const saveEditedTask = () => {
// //     if (!editedContent.trim()) return;
// //     const updatedColumns = { ...columns };
// //     updatedColumns[editingTask.columnId].items = updatedColumns[
// //       editingTask.columnId
// //     ].items.map((task) =>
// //       task.id === editingTask.id ? { ...task, content: editedContent } : task
// //     );
// //     setColumns(updatedColumns);
// //     setEditingTask(null);
// //     setEditedContent("");
// //   };

// //   const columnStyle = {
// //     todo: { header: "bg-gradient-to-r from-[#C341F6] to-[#8E37EB]" },
// //     inProgress: { header: "bg-gradient-to-b from-yellow-400 to-yellow-600" },
// //     done: { header: "bg-gradient-to-b from-[#00AD25] to-[#04FF50]" },
// //   };

// //   // Handle drag end
// //   const onDragEnd = (result) => {
// //     if (!result.destination) return;

// //     const { source, destination } = result;

// //     // Same column
// //     if (source.droppableId === destination.droppableId) {
// //       const columnItems = Array.from(columns[source.droppableId].items);
// //       const [moved] = columnItems.splice(source.index, 1);
// //       columnItems.splice(destination.index, 0, moved);

// //       setColumns({
// //         ...columns,
// //         [source.droppableId]: {
// //           ...columns[source.droppableId],
// //           items: columnItems,
// //         },
// //       });
// //     } else {
// //       // Move between columns
// //       const sourceItems = Array.from(columns[source.droppableId].items);
// //       const [moved] = sourceItems.splice(source.index, 1);
// //       const destItems = Array.from(columns[destination.droppableId].items);
// //       destItems.splice(destination.index, 0, moved);

// //       setColumns({
// //         ...columns,
// //         [source.droppableId]: {
// //           ...columns[source.droppableId],
// //           items: sourceItems,
// //         },
// //         [destination.droppableId]: {
// //           ...columns[destination.droppableId],
// //           items: destItems,
// //         },
// //       });
// //     }
// //   };

// //   return (
// //     <div className="relative w-full min-h-screen overflow-hidden">
// //       {/* Background Video */}
// //       <video
// //         autoPlay
// //         loop
// //         muted
// //         playsInline
// //         className="absolute top-0 left-0 w-full h-full object-cover -z-10"
// //       >
// //         <source src="/p3.mp4" type="video/mp4" />
// //         Your browser does not support the video tag.
// //       </video>

// //       {/* Overlay Kanban */}
// //       <div className="p-4 sm:p-6 w-full min-h-screen bg-black/60 flex flex-col items-center justify-start">
// //         <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer hover:scale-105">
// //           Kanban Board
// //         </h1>

// //         {/* Add Task */}
// //         <div className="mb-6 flex flex-col sm:flex-row w-full max-w-lg shadow-lg rounded-lg overflow-hidden gap-2">
// //           <input
// //             type="text"
// //             value={newTask}
// //             onChange={(e) => setNewTask(e.target.value)}
// //             placeholder="Add a new Task..."
// //             className="flex-grow p-3 bg-zinc-700 text-white rounded"
// //             onKeyDown={(e) => e.key === "Enter" && addNewTask()}
// //           />
// //           <select
// //             value={activeColumn}
// //             onChange={(e) => setActiveColumn(e.target.value)}
// //             className="bg-zinc-700 text-white border-0 border-1 border-zinc-600 rounded"
// //           >
// //             {Object.keys(columns).map((columnId) => (
// //               <option value={columnId} key={columnId}>
// //                 {columns[columnId].name}
// //               </option>
// //             ))}
// //           </select>
// //           <button
// //             onClick={addNewTask}
// //             className="px-6 py-2  bg-gradient-to-r from-[#417DF6] to-[#8E37EB]  text-white font-medium hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 rounded"
// //           >
// //             Add
// //           </button>
// //         </div>

// //         {/* Drag & Drop Context */}
// //         <DragDropContext onDragEnd={onDragEnd}>
// //           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto w-full pb-6">
// //             {Object.keys(columns).map((columnId) => (
// //               <Droppable droppableId={columnId} key={columnId}>
// //                 {(provided) => (
// //                   <div
// //                     {...provided.droppableProps}
// //                     ref={provided.innerRef}
// //                     className="flex-shrink-0 w-full sm:w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 border-zinc-700"
// //                   >
// //                     <div
// //                       className={`p-4 text-white font-bold text-lg sm:text-xl rounded-t-md ${columnStyle[columnId].header}`}
// //                     >
// //                       {columns[columnId].name}
// //                       <span className="ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm">
// //                         {columns[columnId].items.length}
// //                       </span>
// //                     </div>

// //                     <div className="p-4 min-h-40">
// //                       {columns[columnId].items.length === 0 ? (
// //                         <div className="text-center py-6 text-zinc-500 italic text-sm">
// //                           Drop Tasks Here
// //                         </div>
// //                       ) : (
// //                         columns[columnId].items.map((item, index) => (
// //                           <Draggable
// //                             key={item.id}
// //                             draggableId={item.id}
// //                             index={index}
// //                           >
// //                             {(provided) => (
// //                               <div
// //                                 ref={provided.innerRef}
// //                                 {...provided.draggableProps}
// //                                 {...provided.dragHandleProps}
// //                                 className="p-3 sm:p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md flex items-center justify-between transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
// //                               >
// //                                 <span className="text-sm sm:text-base">
// //                                   {item.content}
// //                                 </span>
// //                                 <div className="flex gap-2">
// //                                   <button
// //                                     onClick={() => startEditing(columnId, item)}
// //                                     className="text-zinc-400 cursor-pointer hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base"
// //                                   >
// //                                     ✏️
// //                                   </button>
// //                                   <button
// //                                     onClick={() =>
// //                                       removeTask(columnId, item.id)
// //                                     }
// //                                     className="text-zinc-400 cursor-pointer hover:text-red-400 transition-colors duration-200 text-sm sm:text-base"
// //                                   >
// //                                     ❌
// //                                   </button>
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </Draggable>
// //                         ))
// //                       )}
// //                       {provided.placeholder}
// //                     </div>
// //                   </div>
// //                 )}
// //               </Droppable>
// //             ))}
// //           </div>
// //         </DragDropContext>
// //       </div>

// //       {/* Edit Task Modal */}
// //       {editingTask && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
// //             <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>
// //             <input
// //               type="text"
// //               value={editedContent}
// //               onChange={(e) => setEditedContent(e.target.value)}
// //               className="w-full p-2 rounded bg-zinc-700 text-white mb-4"
// //             />
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 onClick={() => setEditingTask(null)}
// //                 className="px-4 py-2 bg-zinc-600 rounded hover:bg-zinc-700"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={saveEditedTask}
// //                 className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
// //               >
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Layout;
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// function Layout() {
//   // Load from localStorage OR start empty
//   const [columns, setColumns] = useState(() => {
//     const saved = localStorage.getItem("kanbanColumns");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           todo: { name: "To Do", items: [] },
//           inProgress: { name: "In Progress", items: [] },
//           done: { name: "Done", items: [] },
//         };
//   });

//   const [newTask, setNewTask] = useState("");
//   const [activeColumn, setActiveColumn] = useState("todo");
//   const [editingTask, setEditingTask] = useState(null);
//   const [editedContent, setEditedContent] = useState("");

//   // Save to localStorage whenever columns change
//   useEffect(() => {
//     localStorage.setItem("kanbanColumns", JSON.stringify(columns));
//   }, [columns]);

//   const addNewTask = () => {
//     if (newTask.trim() === "") return;

//     const updatedColumns = { ...columns };
//     updatedColumns[activeColumn].items.push({
//       id: Date.now().toString(),
//       content: newTask,
//     });

//     setColumns(updatedColumns);
//     setNewTask("");
//   };

//   const removeTask = (columnId, itemId) => {
//     const updatedColumns = { ...columns };
//     updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
//       (item) => item.id !== itemId
//     );

//     setColumns(updatedColumns);
//   };

//   const startEditing = (columnId, item) => {
//     setEditingTask({ columnId, id: item.id });
//     setEditedContent(item.content);
//   };

//   const saveEditedTask = () => {
//     if (!editedContent.trim()) return;

//     const updatedColumns = { ...columns };
//     updatedColumns[editingTask.columnId].items = updatedColumns[
//       editingTask.columnId
//     ].items.map((task) =>
//       task.id === editingTask.id ? { ...task, content: editedContent } : task
//     );

//     setColumns(updatedColumns);
//     setEditingTask(null);
//     setEditedContent("");
//   };

//   const columnStyle = {
//     todo: { header: "bg-gradient-to-r from-[#C341F6] to-[#8E37EB]" },
//     inProgress: { header: "bg-gradient-to-b from-yellow-400 to-yellow-600" },
//     done: { header: "bg-gradient-to-b from-[#00AD25] to-[#04FF50]" },
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     // Same column drag
//     if (source.droppableId === destination.droppableId) {
//       const columnItems = Array.from(columns[source.droppableId].items);
//       const [moved] = columnItems.splice(source.index, 1);
//       columnItems.splice(destination.index, 0, moved);

//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...columns[source.droppableId],
//           items: columnItems,
//         },
//       });
//     } else {
//       // Move between columns
//       const sourceItems = Array.from(columns[source.droppableId].items);
//       const [moved] = sourceItems.splice(source.index, 1);
//       const destItems = Array.from(columns[destination.droppableId].items);
//       destItems.splice(destination.index, 0, moved);

//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...columns[source.droppableId],
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...columns[destination.droppableId],
//           items: destItems,
//         },
//       });
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover -z-10"
//       >
//         <source src="/p3.mp4" type="video/mp4" />
//       </video>

//       <div className="p-4 sm:p-6 w-full min-h-screen bg-black/60 flex flex-col items-center justify-start">
//         <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//           Kanban Board
//         </h1>

//         {/* Add Task */}
//         <div className="mb-6 flex flex-col sm:flex-row w-full max-w-lg shadow-lg rounded-lg overflow-hidden gap-2">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add a new Task..."
//             className="flex-grow p-3 bg-zinc-700 text-white rounded"
//             onKeyDown={(e) => e.key === "Enter" && addNewTask()}
//           />

//           <select
//             value={activeColumn}
//             onChange={(e) => setActiveColumn(e.target.value)}
//             className="bg-zinc-700 text-white rounded"
//           >
//             {Object.keys(columns).map((columnId) => (
//               <option value={columnId} key={columnId}>
//                 {columns[columnId].name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={addNewTask}
//             className="px-6 py-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white font-medium rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* Kanban Columns */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto w-full pb-6">
//             {Object.keys(columns).map((columnId) => (
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="flex-shrink-0 w-full sm:w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 border-zinc-700"
//                   >
//                     <div
//                       className={`p-4 text-white font-bold text-lg sm:text-xl rounded-t-md ${columnStyle[columnId].header}`}
//                     >
//                       {columns[columnId].name}
//                       <span className="ml-2 px-2 py-1 bg-zinc-900 bg-opacity-30 rounded-full text-sm">
//                         {columns[columnId].items.length}
//                       </span>
//                     </div>

//                     <div className="p-4 min-h-40">
//                       {columns[columnId].items.length === 0 ? (
//                         <div className="text-center py-6 text-zinc-500 italic text-sm">
//                           Drop Tasks Here
//                         </div>
//                       ) : (
//                         columns[columnId].items.map((item, index) => (
//                           <Draggable
//                             key={item.id}
//                             draggableId={item.id}
//                             index={index}
//                           >
//                             {(provided) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="p-3 sm:p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md flex items-center justify-between hover:scale-105 transition"
//                               >
//                                 <span>{item.content}</span>
//                                 <div className="flex gap-2">
//                                   <button
//                                     onClick={() =>
//                                       startEditing(columnId, item)
//                                     }
//                                     className="text-zinc-400 hover:text-blue-400"
//                                   >
//                                     ✏️
//                                   </button>
//                                   <button
//                                     onClick={() =>
//                                       removeTask(columnId, item.id)
//                                     }
//                                     className="text-zinc-400 hover:text-red-400"
//                                   >
//                                     ❌
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))
//                       )}

//                       {provided.placeholder}
//                     </div>
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//       </div>

//       {/* Edit Task Modal */}
//       {editingTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
//             <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>

//             <input
//               type="text"
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//               className="w-full p-2 rounded bg-zinc-700 text-white mb-4"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setEditingTask(null)}
//                 className="px-4 py-2 bg-zinc-600 rounded hover:bg-zinc-700"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveEditedTask}
//                 className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Layout;
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Layout() {
  // Initialize columns empty, then load from localStorage on mount
  const [columns, setColumns] = useState({
    todo: { name: "To Do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    done: { name: "Done", items: [] },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("kanbanColumns");
    if (saved) setColumns(JSON.parse(saved));
  }, []);

  // Save columns to localStorage on change
  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const addNewTask = () => {
    if (!newTask.trim()) return;
    const updatedColumns = { ...columns };
    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId, itemId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== itemId
    );
    setColumns(updatedColumns);
  };

  const startEditing = (columnId, item) => {
    setEditingTask({ columnId, id: item.id });
    setEditedContent(item.content);
  };

  const saveEditedTask = () => {
    if (!editedContent.trim()) return;
    const updatedColumns = { ...columns };
    updatedColumns[editingTask.columnId].items = updatedColumns[
      editingTask.columnId
    ].items.map((task) =>
      task.id === editingTask.id ? { ...task, content: editedContent } : task
    );
    setColumns(updatedColumns);
    setEditingTask(null);
    setEditedContent("");
  };

  const columnStyle = {
    todo: { header: "bg-gradient-to-r from-[#C341F6] to-[#8E37EB]" },
    inProgress: { header: "bg-gradient-to-b from-yellow-400 to-yellow-600" },
    done: { header: "bg-gradient-to-b from-[#00AD25] to-[#04FF50]" },
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Drag in same column
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(columns[source.droppableId].items);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...columns[source.droppableId], items },
      });
    } else {
      // Drag between columns
      const sourceItems = Array.from(columns[source.droppableId].items);
      const [moved] = sourceItems.splice(source.index, 1);
      const destItems = Array.from(columns[destination.droppableId].items);
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...columns[source.droppableId], items: sourceItems },
        [destination.droppableId]: { ...columns[destination.droppableId], items: destItems },
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/p3.mp4" type="video/mp4" />
      </video>

      <div className="p-4 sm:p-6 w-full min-h-screen bg-black/60 flex flex-col items-center justify-start">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Kanban Board
        </h1>

        {/* Add task input */}
        <div className="mb-6 flex flex-col sm:flex-row w-full max-w-lg shadow-lg rounded-lg overflow-hidden gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new Task..."
            className="flex-grow p-3 bg-zinc-700 text-white rounded"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            className="bg-zinc-700 text-white rounded"
          >
            {Object.keys(columns).map((columnId) => (
              <option key={columnId} value={columnId}>
                {columns[columnId].name}
              </option>
            ))}
          </select>
          <button
            onClick={addNewTask}
            className="px-6 py-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white font-medium rounded"
          >
            Add
          </button>
        </div>

        {/* Kanban Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto w-full pb-6">
            {Object.keys(columns).map((columnId) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 w-full sm:w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 border-zinc-700"
                  >
                    <div
                      className={`p-4 text-white font-bold text-lg sm:text-xl rounded-t-md ${columnStyle[columnId].header}`}
                    >
                      {columns[columnId].name}
                      <span className="ml-2 px-2 py-1 bg-zinc-900 bg-opacity-30 rounded-full text-sm">
                        {columns[columnId].items.length}
                      </span>
                    </div>

                    <div className="p-4 min-h-40">
                      {columns[columnId].items.length === 0 ? (
                        <div className="text-center py-6 text-zinc-500 italic text-sm">
                          Drop Tasks Here
                        </div>
                      ) : (
                        columns[columnId].items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-3 sm:p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md flex items-center justify-between hover:scale-105 transition"
                              >
                                <span>{item.content}</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => startEditing(columnId, item)}
                                    className="text-zinc-400 hover:text-blue-400"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => removeTask(columnId, item.id)}
                                    className="text-zinc-400 hover:text-red-400"
                                  >
                                    ❌
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 text-white mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-zinc-600 rounded hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedTask}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
