import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Palette {
  id: string;
  name: string;
  colors: string[];
  createdAt: number;
  type: "harmony" | "custom";
}

export const usePaletteStorage = () => {
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>(() => {
    const saved = localStorage.getItem("palettes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const savePalette = (
    name: string,
    colors: string[],
    type: "harmony" | "custom" = "custom"
  ) => {
    setSavedPalettes((prev) => [
      {
        id: uuidv4(),
        name,
        colors,
        createdAt: Date.now(),
        type,
      },
      ...prev,
    ]);
  };

  const updatePalette = (id: string, name: string, colors: string[]) => {
    setSavedPalettes((prev) =>
      prev.map((palette) =>
        palette.id === id
          ? {
              ...palette,
              name,
              colors,
            }
          : palette
      )
    );
  };

  const removePalette = (id: string) => {
    setSavedPalettes((prev) => prev.filter((palette) => palette.id !== id));
  };

  return {
    savedPalettes,
    savePalette,
    updatePalette,
    removePalette,
  };
};
