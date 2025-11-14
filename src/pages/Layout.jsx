// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// function Layout() {
//   const [columns, setColumns] = useState({
//     todo: { name: "To Do", items: [] },
//     inProgress: { name: "In Progress", items: [] },
//     done: { name: "Done", items: [] },
//   });

//   const [newTask, setNewTask] = useState("");
//   const [activeColumn, setActiveColumn] = useState("todo");
//   const [editingTask, setEditingTask] = useState(null);
//   const [editedContent, setEditedContent] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const saved = localStorage.getItem("kanbanColumns");
//     if (saved) setColumns(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("kanbanColumns", JSON.stringify(columns));
//   }, [columns]);

//   const addNewTask = () => {
//     if (!newTask.trim()) return;
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

//     if (source.droppableId === destination.droppableId) {
//       const items = Array.from(columns[source.droppableId].items);
//       const [moved] = items.splice(source.index, 1);
//       items.splice(destination.index, 0, moved);
//       setColumns({
//         ...columns,
//         [source.droppableId]: { ...columns[source.droppableId], items },
//       });
//     } else {
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

//   // Filter tasks based on search query
//   const filteredColumns = Object.keys(columns).reduce((acc, colId) => {
//     const filteredItems = columns[colId].items.filter((item) =>
//       item.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     acc[colId] = { ...columns[colId], items: filteredItems };
//     return acc;
//   }, {});

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
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

//         {/* Add Task + Search section */}
//         <div className="mb-6 flex flex-col sm:flex-row w-full max-w-lg gap-2">
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
//               <option key={columnId} value={columnId}>
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
//           {/* Search input beside Add */}
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="p-3 rounded bg-zinc-700 text-white w-48"
//           />
//         </div>

//         {/* Kanban Columns */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto w-full pb-6">
//             {Object.keys(filteredColumns).map((columnId) => (
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
//                         {filteredColumns[columnId].items.length}
//                       </span>
//                     </div>

//                     <div className="p-4 min-h-40">
//                       {filteredColumns[columnId].items.length === 0 ? (
//                         <div className="text-center py-6 text-zinc-500 italic text-sm">
//                           {searchQuery ? "No tasks found" : "Drop Tasks Here"}
//                         </div>
//                       ) : (
//                         filteredColumns[columnId].items.map((item, index) => (
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
//                                 className="p-3 sm:p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md flex items-center justify-between hover:scale-105 transition-transform transition-colors duration-300 ease-in-out"
//                               >
//                                 <span>{item.content}</span>
//                                 <div className="flex gap-2">
//                                   <button
//                                     onClick={() => startEditing(columnId, item)}
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

//       {/* Edit Modal */}
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
  const [columns, setColumns] = useState({
    todo: { name: "To Do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    done: { name: "Done", items: [] },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kanbanColumns");
    if (saved) setColumns(JSON.parse(saved));
  }, []);

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

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(columns[source.droppableId].items);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...columns[source.droppableId], items },
      });
    } else {
      const sourceItems = Array.from(columns[source.droppableId].items);
      const [moved] = sourceItems.splice(source.index, 1);
      const destItems = Array.from(columns[destination.droppableId].items);
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: destItems,
        },
      });
    }
  };

  // Filter tasks based on search query
  const filteredColumns = Object.keys(columns).reduce((acc, colId) => {
    const filteredItems = columns[colId].items.filter((item) =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    acc[colId] = { ...columns[colId], items: filteredItems };
    return acc;
  }, {});

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
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

        {/* Add Task + Search section */}
        <div className="mb-6 flex flex-col sm:flex-row w-full max-w-lg gap-2">
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
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 rounded bg-zinc-700 text-white w-48 ml-0 lg:ml-[60px]"
          />
        </div>

        {/* Kanban Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center overflow-x-auto w-full pb-6">
            {Object.keys(filteredColumns).map((columnId) => (
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
                        {filteredColumns[columnId].items.length}
                      </span>
                    </div>

                    <div className="p-4 min-h-40">
                      {filteredColumns[columnId].items.length === 0 ? (
                        <div className="text-center py-6 text-zinc-500 italic text-sm">
                          {searchQuery ? "No tasks found" : "Drop Tasks Here"}
                        </div>
                      ) : (
                        filteredColumns[columnId].items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 sm:p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md flex items-center justify-between transition-transform transition-colors duration-300 ease-in-out
                                  ${
                                    snapshot.isDragging
                                      ? "bg-zinc-600 shadow-xl scale-105"
                                      : ""
                                  }`}
                              >
                                <span>{item.content}</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => startEditing(columnId, item)}
                                    className="text-zinc-400 cursor-pointer hover:text-blue-400"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() =>
                                      removeTask(columnId, item.id)
                                    }
                                    className="text-zinc-400 cursor-pointer hover:text-red-400"
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

      {/* Edit Modal */}
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
