"use client";
import Link from "next/link";
import styles from "../../public/css/dashboard.module.css";
import Projects from "../components/projects";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session>>>>", session);
    console.log("Status>>>>", status);
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      // If not logged in, redirect to login page
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    // Optionally render a loading state
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1>Task Dashboard</h1>
      <p> Welcome, {session?.user?.email}</p>
      <Projects />
      {/* Link to the homepage */}
      <button className={styles.link}
      ><Link href="/">Go back to Login
          </Link></button>
    </div>
  );
};

export default Dashboard