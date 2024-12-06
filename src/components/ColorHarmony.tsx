import { HarmonyType, generateHarmony, rgbToCmyk } from "../utils/colorUtils";
import chroma from "chroma-js";
import SavePaletteModal from "./modal/SavePaletteModal";
import { useState } from "react";

interface ColorHarmonyProps {
  baseColor: string;
  onSelectColor: (color: string) => void;
  onSavePalette: (name: string, colors: string[]) => void;
}

const HARMONY_TYPES: { type: HarmonyType; label: string }[] = [
  { type: "complementary", label: "보색" },
  { type: "analogous", label: "유사색" },
  { type: "triadic", label: "삼각 보색" },
  { type: "tetradic", label: "사각 보색" },
  { type: "split-complementary", label: "분할 보색" },
];

const ColorHarmony = ({
  baseColor,
  onSelectColor,
  onSavePalette,
}: ColorHarmonyProps) => {
  const [selectedHarmony, setSelectedHarmony] = useState<string[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <>
      <div className="space-y-8">
        {HARMONY_TYPES.map(({ type, label }) => {
          const colors = generateHarmony(baseColor, type);

          return (
            <div key={type} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">{label}</h3>
                <button
                  onClick={() => {
                    setSelectedHarmony(colors);
                    setShowSaveModal(true);
                  }}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  팔레트 저장
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {colors.map((color, index) => {
                  const rgb = chroma(color).rgb();
                  const cmyk = rgbToCmyk(...rgb);

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      {/* 색상 미리보기 */}
                      <div
                        className="w-full h-24 rounded-lg mb-3 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => onSelectColor(color)}
                      />

                      {/* 색상 정보 */}
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">HEX:</span>
                          <span className="font-mono">{color}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">RGB:</span>
                          <span className="font-mono">{rgb.join(", ")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">CMYK:</span>
                          <span className="font-mono">
                            {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%
                          </span>
                        </div>
                      </div>

                      {/* 선택 버튼 */}
                      <button
                        onClick={() => onSelectColor(color)}
                        className="mt-3 w-full bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        컬러변경
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {showSaveModal && (
        <SavePaletteModal
          colors={selectedHarmony}
          onSave={(name) => onSavePalette(name, selectedHarmony)}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </>
  );
};

export default ColorHarmony;
