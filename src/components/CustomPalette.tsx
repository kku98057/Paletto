import { useState } from "react";

import chroma from "chroma-js";
import ColorPicker from "./ColorPicker";
import SavePaletteModal from "./modal/SavePaletteModal";

interface CustomPaletteProps {
  onSavePalette: (name: string, colors: string[]) => void;
}

const CustomPalette = ({ onSavePalette }: CustomPaletteProps) => {
  const [colors, setColors] = useState<string[]>(["#000000"]);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const addColor = () => {
    setColors([...colors, "#000000"]);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, newColor: string) => {
    if (chroma.valid(newColor)) {
      const newColors = [...colors];
      newColors[index] = newColor;
      setColors(newColors);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-4">
            <ColorPicker
              color={color}
              onChange={(newColor) => updateColor(index, newColor)}
            />
            {colors.length > 1 && (
              <button
                onClick={() => removeColor(index)}
                className="text-red-500 hover:text-red-600"
              >
                삭제
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addColor}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          색상 추가
        </button>
        {colors.length > 0 && (
          <button
            onClick={() => setShowSaveModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            팔레트 저장
          </button>
        )}
      </div>

      {/* 미리보기 */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">미리보기</h3>
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {showSaveModal && (
        <SavePaletteModal
          colors={colors}
          onSave={(name) => {
            onSavePalette(name, colors);
            setShowSaveModal(false);
          }}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
};

export default CustomPalette;
