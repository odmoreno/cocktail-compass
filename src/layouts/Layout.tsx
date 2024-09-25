import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notifaction";

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);
  return (
    <>
      <Header />
      <main className="mx-auto container py-16">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
}
