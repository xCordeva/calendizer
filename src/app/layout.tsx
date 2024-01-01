import type { Metadata } from "next";
import "../css/global.css";
import { ReduxProvider } from "@/features/provider";

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
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
