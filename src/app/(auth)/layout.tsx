import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../css/Auth.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendizer | Online Planner & Organizer",
  description:
    "Calendizer is an online planner and organizer to help you manage your schedule and tasks efficiently. Stay organized and productive with Calendizer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="user-signs">
      <h1>
        Calend<span className="logo-colored-part">izer</span>
      </h1>
      {children}
    </div>
  );
}
