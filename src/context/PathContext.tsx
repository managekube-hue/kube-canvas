import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserPath = "fully-managed" | "co-managed" | "self-managed" | null;

interface PathContextValue {
  path: UserPath;
  setPath: (p: UserPath) => void;
}

const PathContext = createContext<PathContextValue>({ path: null, setPath: () => {} });

const STORAGE_KEY = "mk_user_path";

export const PathProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPathState] = useState<UserPath>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fully-managed" || stored === "co-managed" || stored === "self-managed") return stored;
    return null;
  });

  const setPath = (p: UserPath) => {
    setPathState(p);
    if (p) localStorage.setItem(STORAGE_KEY, p);
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);
