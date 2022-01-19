import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../types/general";

type GlobalDataContextProps = {
  isEditing: boolean;
  editingDataSetId: string;
  setEditingDataSetId: (id: string) => void;
};

const GlobalDataContext = createContext<GlobalDataContextProps | null>(null);
export const useGlobalData = () => useContext(GlobalDataContext)!;

const GlobalDataProvider = ({ children }: IProviderProps) => {
  const [editingDataSetId, _setEditingDataSetId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(!!editingDataSetId);
  }, [editingDataSetId]);

  const setEditingDataSetId = (id: string) => {
    _setEditingDataSetId(id);
  };

  return (
    <GlobalDataContext.Provider
      value={{ isEditing, editingDataSetId, setEditingDataSetId }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataProvider;
