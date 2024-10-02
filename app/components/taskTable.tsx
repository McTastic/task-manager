import { useState, useEffect } from "react";


interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETE';
}

export default function TaskTable(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const res = await fetch('/api/tasks');
          const data = await res.json();
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, []);
  
    const getNextStatus = (currentStatus: Task['status']): Task['status'] => {
      switch (currentStatus) {
        case 'NOT_STARTED':
          return 'IN_PROGRESS';
        case 'IN_PROGRESS':
          return 'IN_REVIEW';
        case 'IN_REVIEW':
          return 'COMPLETE';
        default:
          return 'COMPLETE';
      }
    };
    const getNextButtonLabel = (currentStatus: Task['status']): string => {
      switch (currentStatus) {
        case 'NOT_STARTED':
          return 'Mark as In Progress';
        case 'IN_PROGRESS':
          return 'Mark as In Review';
        case 'IN_REVIEW':
          return 'Mark as Complete';
        case 'COMPLETE':
          return 'Task Complete'; 
        default:
          return 'Update Status';
      }
    };
    const editTask = async (id: number) => {
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: 'Updated Task Title' }),
        });
  
        const updatedTask = await res.json();
  
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
  
    const updateTaskStatus = async (id: number, currentStatus: Task['status']) => {
      const nextStatus = getNextStatus(currentStatus);
      try {
        const res = await fetch('/api/tasks', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status: nextStatus }),
        });
  
        const updatedTask = await res.json();
  
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
  
    const createNewTask = async () => {
      if (!newTaskTitle || !newTaskDescription) {
        alert('Please enter a task title and description.');
        return;
      }
  
      try {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTaskTitle,
            description: newTaskDescription,
            userId: 1
          }),
        });
  
        const newTask = await res.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
  
        setNewTaskTitle('');
        setNewTaskDescription('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    return(
        <>
        <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={createNewTask}>Create Task</button>
      </div>
      {/* Actual List of Tasks*/}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status}
            <p>{task.description}</p>
            <button
              onClick={() => updateTaskStatus(task.id, task.status)}
              disabled={task.status === 'COMPLETE'}
            >
            {getNextButtonLabel(task.status)}
            </button>
          </li>
        ))}
      </ul>
        </>
    )
}