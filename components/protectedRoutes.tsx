import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useEffect, useState, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  if (user === null) return <p>Cargando...</p>;
  if (!user) return <p>No autorizado</p>;

  return children;
}
