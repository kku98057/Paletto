import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import { usePaletteStorage } from "../hooks/usePaletteStorage";
import chroma from "chroma-js";
import { Helmet } from "react-helmet-async";
import { domainName } from "../constants";

const MAX_COLORS = 12;

const NewPalettePage = () => {
  const [colors, setColors] = useState<string[]>(["#000000"]);
  const [paletteName, setPaletteName] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<"preview" | "edit">("preview");
  const { savePalette } = usePaletteStorage();
  const navigate = useNavigate();

  const addColor = () => {
    if (colors.length < MAX_COLORS) {
      const newColor = chroma.random().hex();
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

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
    if (paletteName.trim() && colors.length > 0) {
      savePalette(paletteName.trim(), colors, "custom");
      navigate("/palettes");
    }
  };

  const generateRandomPalette = () => {
    const randomLength = Math.floor(Math.random() * (MAX_COLORS - 2)) + 3;
    const newColors = Array.from({ length: randomLength }, () =>
      chroma.random().hex()
    );
    setColors(newColors);
  };

  const resetPalette = () => {
    setColors(["#000000"]);
    setPaletteName("");
  };

  return (
    <>
      <Helmet>
        <title>새 팔레트 만들기 | 팔레토</title>
        <meta
          name="description"
          content="새로운 색상 팔레트를 만들어보세요. 다양한 색상을 조합하여 나만의 팔레트를 만들 수 있습니다."
        />
        <meta
          name="keywords"
          content="새 팔레트, 팔레트 만들기, 색상 조합 만들기"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "새 팔레트 만들기 | 팔레토",
            description:
              "새로운 색상 팔레트를 만들어보세요. 다양한 색상을 조합하여 나만의 팔레트를 만들 수 있습니다.",
            url: `${domainName}/palettes/new`,
            mainEntity: {
              "@type": "CreativeWork",
              name: "색상 팔레트 생성기",
              creator: {
                "@type": "Organization",
                name: "팔레토",
              },
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            새 팔레트 만들기
          </h1>

          {/* 팔레트 이름 입력 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                팔레트 이름
              </label>
              <button
                onClick={resetPalette}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                         rounded-lg transition-colors"
                aria-label="초기화"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="팔레트 이름을 입력하세요"
            />
          </div>

          {/* 뷰 전환  */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveView("preview")}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors
              ${
                activeView === "preview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              미리보기
            </button>
            <button
              onClick={() => setActiveView("edit")}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors
              ${
                activeView === "edit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              색상 편집
            </button>
          </div>

          {/* 미리보기 뷰 */}
          {activeView === "preview" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base sm:text-lg font-medium text-gray-700">
                  팔레트 미리보기
                </h2>
                <span className="text-sm text-gray-500">
                  {colors.length}/{MAX_COLORS} 색상
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square relative group/display"
                  >
                    <div
                      className="w-full h-full rounded-lg"
                      style={{ backgroundColor: color }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 
                                group-hover/display:opacity-100 transition-opacity"
                    >
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {color}
                      </div>
                    </div>
                  </div>
                ))}
                {colors.length < MAX_COLORS && (
                  <button
                    onClick={addColor}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300
                           hover:border-gray-400 transition-colors flex items-center justify-center"
                  >
                    <span className="text-2xl text-gray-400">+</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 편집 뷰 */}
          {activeView === "edit" && (
            <div className="mb-6">
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
                    {colors.length > 1 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="w-full mt-2 text-xs sm:text-sm text-red-500 hover:text-red-600 
                               py-1.5 px-2 rounded hover:bg-red-50 transition-colors
                               flex items-center justify-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        삭제
                      </button>
                    )}
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      드래그하여 순서 변경
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={generateRandomPalette}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              랜덤 팔레트
            </button>
            <button
              onClick={handleSave}
              disabled={!paletteName.trim() || colors.length === 0}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors 
                       flex items-center justify-center gap-2 text-white
                       ${
                         !paletteName.trim() || colors.length === 0
                           ? "bg-gray-300 cursor-not-allowed"
                           : "bg-green-500 hover:bg-green-600"
                       }`}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPalettePage;
