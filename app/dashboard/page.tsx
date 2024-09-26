"use client";
import Link from "next/link";
import styles from "../../public/css/dashboard.module.css";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETE';
}


const Dashboard = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

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

  const updateTask = async (id: number, updatedData: Partial<Task>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedData }),
      });

      const updatedTask = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status}
            {/* Update button to trigger the updateTask function */}
            <button
              onClick={() => updateTask(task.id, { title: 'Updated Title', status: 'IN_PROGRESS' })}
            >
              Mark as In Progress
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;