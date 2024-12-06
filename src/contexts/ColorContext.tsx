import { createContext, useContext, useState } from "react";

interface ColorContextType {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentColor, setCurrentColor] = useState("#000000");

  return (
    <ColorContext.Provider value={{ currentColor, setCurrentColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
