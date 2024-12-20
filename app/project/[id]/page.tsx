"use client";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const projectId = params.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/tasks`);
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div>
      <h1>Tasks for Project {projectId}</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}<br />
            Status - {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
