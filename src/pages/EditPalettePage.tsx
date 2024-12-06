import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import { usePaletteStorage } from "../hooks/usePaletteStorage";
import chroma from "chroma-js";

const EditPalettePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedPalettes, updatePalette } = usePaletteStorage();
  const [colors, setColors] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const palette = savedPalettes.find((p) => p.id === id);
    if (!palette) {
      navigate("/palettes");
      return;
    }
    setColors(palette.colors);
    setPaletteName(palette.name);
  }, [id, savedPalettes, navigate]);

  const updateColor = (index: number, newColor: string) => {
    if (chroma.valid(newColor)) {
      const newColors = [...colors];
      newColors[index] = newColor;
      setColors(newColors);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newColors = [...colors];
      const [draggedColor] = newColors.splice(draggedIndex, 1);
      newColors.splice(index, 0, draggedColor);
      setColors(newColors);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    if (paletteName.trim() && colors.length > 0 && id) {
      updatePalette(id, paletteName.trim(), colors);
      navigate("/palettes");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          팔레트 수정
        </h1>

        {/* 팔레트 이름 입력 */}
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
            팔레트 이름
          </label>
          <input
            type="text"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500"
            placeholder="팔레트 이름을 입력하세요"
          />
        </div>

        {/* 색상 편집 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base sm:text-lg font-medium text-gray-700">
              색상 편집
            </h2>
            <span className="text-sm text-gray-500">{colors.length} 색상</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="bg-white rounded-lg shadow p-4 group cursor-move"
              >
                <div
                  className="w-full aspect-square rounded-lg mb-3 relative group/display"
                  style={{ backgroundColor: color }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 
                                group-hover/display:opacity-100 transition-opacity"
                  >
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {color}
                    </div>
                  </div>
                </div>

                <ColorPicker
                  color={color}
                  onChange={(newColor) => updateColor(index, newColor)}
                />
                <div className="mt-2 text-xs text-gray-500 text-center">
                  드래그하여 순서 변경
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/palettes")}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg 
                     hover:bg-gray-600 transition-colors text-sm sm:text-base"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!paletteName.trim() || colors.length === 0}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg 
                     hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed 
                     transition-colors text-sm sm:text-base"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPalettePage;
