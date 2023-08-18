// Import React and other libraries
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Define the initial data for the tasks and columns
const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Update User Profile Page UI",
      tag: [
        "Feature request"
      ],
      userId: "usr-1",
      status: "Todo",
      priority: 4
    },
    "task-2": {
      id: "task-2",
      title: "Add Multi-Language Support - Enable multi-language support within the application.",
      tag: [
        "Feature Request"
      ],
      userId: "usr-2",
      status: "In progress",
      priority: 3
    },
    "task-3": {
      id: "task-3",
      title: "Optimize Database Queries for Performance",
      tag: [
        "Feature Request"
      ],
      userId: "usr-2",
      status: "In progress",
      priority: 1
    },
    "task-4": {
      id: "task-4",
      title: "Implement Email Notification System",
      tag: [
        "Feature Request"
      ],
      userId: "usr-1",
      status: "In progress",
      priority: 3
    },
    "task-5": {
      id: "task-5",
      title: "Enhance Search Functionality",
      tag: [
        "Feature Request"
      ],
      userId: "usr-5",
      status: "In progress",
      priority: 0
    },
    "task-6": {
      id: "task-6",
      title: "Third-Party Payment Gateway",
      tag: [
        "Feature Request"
      ],
      userId: "usr-2",
      status: "Todo",
      priority: 1
    },
    "task-7": {
      id: "task-7",
      title: "Create Onboarding Tutorial for New Users",
      tag: [
        "Feature Request"
      ],
      userId: "usr-1",
      status: "Backlog",
      priority: 2
    },
    "task-8": {
      id: "task-8",
      title: "Implement Role-Based Access Control (RBAC)",
      tag: [
        "Feature Request"
      ],
      userId: "usr-3",
      status: "In progress",
      priority: 3
    },
    "task-9": {
      id: "task-9",
      title: "Upgrade Server Infrastructure",
      tag: [
        "Feature Request"
      ],
      userId: "usr-5",
      status: "Todo",
      priority: 2
    },

    "task-10" : {
      id: "task-10",
      title: "Conduct Security Vulnerability Assessment",
      tag: [
        "Feature Request"
      ],
      userId: "usr-4",
      status: "Backlog",
      priority: 1
      
    },
  },

  
  columns: {
    "column-1": {
      id: "column-1",
      name: "Anoop sharma",
      available: false
    },
    "column-2": {
      id: "column-2",
      name: "Yogesh",
      available: true
    },
    "column-3": {
      id: "column-3",
      name: "Shankar Kumar",
      available: true
    },
    "column-4": {
      id: "column-4",
      name: "Ramesh",
      available: true
    },
    "column-5": {
      id: "column-5",
      name: "Suresh",
      available: true
    }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

// Define a custom component for each task
const Task = ({ task }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

// Define a custom component for each column
const Column = ({ column, tasks }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="draggable-task"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Define the main component for the app
const App = () => {
  // Use state hook to store the data
  const [data, setData] = useState(initialData);

  // Define a function to handle drag and drop events
  const onDragEnd = (result) => {
    // Get the source and destination of the drag event
    const { source, destination } = result;

    // If there is no destination, do nothing
    if (!destination) {
      return;
    }

    // If the source and destination are the same, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the source column and task
    const sourceColumn = data.columns[source.droppableId];
    const sourceTask = data.tasks[sourceColumn.taskIds[source.index]];

    // Create a new data object
    const newData = { ...data };

    // Remove the task from the source column
    newData.columns[source.droppableId].taskIds.splice(source.index, 1);

    // Add the task to the destination column
    newData.columns[destination.droppableId].taskIds.splice(
      destination.index,
      0,
      sourceTask.id
    );

    // Update the task status
    newData.tasks[sourceTask.id].status =
      newData.columns[destination.droppableId].title;

    // Set the new data to the state
    setData(newData);
  };

  return (
    <div className="app">
      <h1>Project Management Tool</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-container">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

// Export the app component
export default App;
