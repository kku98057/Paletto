import { useState, useEffect } from "react";
import { SavedColor } from "../types/color";

const STORAGE_KEY = "savedColors";

export const useColorStorage = () => {
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);

  // 초기 로드
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedColors(JSON.parse(stored));
    }
  }, []);

  // 색상 저장
  const saveColor = (hex: string, name?: string) => {
    const newColor: SavedColor = {
      id: crypto.randomUUID(),
      hex,
      name,
      createdAt: Date.now(),
    };

    const updated = [...savedColors, newColor];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedColors(updated);
  };

  // 색상 삭제
  const removeColor = (id: string) => {
    const updated = savedColors.filter((color) => color.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedColors(updated);
  };

  return {
    savedColors,
    saveColor,
    removeColor,
  };
};
