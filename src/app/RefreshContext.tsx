import { createContext, useContext, useState } from "react";

const RefreshContext = createContext<any>(null);

export const useRefresh = () => useContext(RefreshContext);
interface RefreshProviderProps {
  children: React.ReactNode;
}
export const RefreshProvider: React.FC<RefreshProviderProps> = ({
  children,
}) => {
  const [forceRender, setForceRender] = useState<boolean>(false);
  return (
    <RefreshContext.Provider value={{ forceRender, setForceRender }}>
      {children}
    </RefreshContext.Provider>
  );
};
