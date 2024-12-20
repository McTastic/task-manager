// import TaskTable from "./taskTable";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
    id: number;
    name: string;
}

export default function Project(){
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch("/api/projects");
          if (!res.ok) {
            throw new Error("Failed to fetch projects");
          }
          const data = await res.json();
          setProjects(data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
  
      fetchProjects();
    }, []);
  
    return (
      <div>
        <h2>Your Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={`/project/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}