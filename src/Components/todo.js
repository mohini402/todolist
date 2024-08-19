import "./todo.css";
import { useState } from "react";

function TodoItem({ task, onAddSubtask, onDeleteTask }) {
  const [subTaskInput, setSubTaskInput] = useState("");
  const [showInput, setShowInput] = useState(false); 

  function handleAddSubtask() {
    if (subTaskInput.trim()) {
      onAddSubtask(task.id, subTaskInput);
      setSubTaskInput("");
      setShowInput(false);
    }
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <div id="listContainer">
        <input type="checkbox" />
        <div id="content">{task.title}</div>
        <div id="icons">
          <img
            src="../assets/plus-JQJKCZXT.png"
            alt="add"
            onClick={() => setShowInput(!showInput)}
          />
          <img
            src="../assets/cross-BAbwxkMl.png"
            alt="delete"
            onClick={() => onDeleteTask(task.id)}
          />
        </div>
      </div>

      {showInput && (
        <div id="todoContainer" style={{ marginLeft: "20px" }}>
          <input
            type="text"
            placeholder="Enter your subtask"
            value={subTaskInput}
            onChange={(e) => setSubTaskInput(e.target.value)}
          />
          <button onClick={handleAddSubtask}>Add Subtask</button>
        </div>
      )}

      {task.subtasks.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {task.subtasks.map((subTask) => (
            <TodoItem
              key={subTask.id}
              task={subTask}
              onAddSubtask={onAddSubtask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function TODO() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleInputChange(e) {
    setTask(e.target.value);
  }

  function handleAddTask() {
    const title = task.trim() || "New Task";
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        subtasks: [],
        showSubTaskInput: false,
      },
    ]);
    setTask("");
  }

  function handleDeleteTask(taskId) {
    function deleteTaskRecursively(tasksList) {
      return tasksList.filter((task) => {
        if (task.id === taskId) return false;
        task.subtasks = deleteTaskRecursively(task.subtasks);
        return true;
      });
    }
    setTasks(deleteTaskRecursively(tasks));
  }

  function handleAddSubtask(parentTaskId, subTaskTitle) {
    function addSubtaskRecursively(tasksList) {
      return tasksList.map((task) => {
        if (task.id === parentTaskId) {
          return {
            ...task,
            subtasks: [
              ...task.subtasks,
              {
                id: Date.now(),
                title: subTaskTitle || "New Subtask",
                subtasks: [],
              },
            ],
          };
        }
        return {
          ...task,
          subtasks: addSubtaskRecursively(task.subtasks),
        };
      });
    }
    setTasks(addSubtaskRecursively(tasks));
  }

  return (
    <div>
      <nav>
        <img src="../assets/todo-BhgJ7-Li.png" alt="todo" />
        <h1>Todos List</h1>
      </nav>
      <div id="todoContainer">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {tasks.length > 0 && (
        <div id="todoInput">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onAddSubtask={handleAddSubtask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TODO;