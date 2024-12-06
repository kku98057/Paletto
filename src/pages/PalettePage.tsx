import { useNavigate } from "react-router-dom";
import { usePaletteStorage } from "../hooks/usePaletteStorage";
import { useColorContext } from "../contexts/ColorContext";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { domainName } from "../constants";

const PalettesPage = () => {
  const { savedPalettes, removePalette } = usePaletteStorage();
  const { setCurrentColor } = useColorContext();
  const navigate = useNavigate();
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [copiedPaletteId, setCopiedPaletteId] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleColorClick = (color: string) => {
    setCurrentColor(color);
    setTimeout(() => setSelectedPalette(null), 500);
  };

  const handleCopyColors = (paletteId: string, colors: string[]) => {
    navigator.clipboard.writeText(colors.join(", "));

    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }

    setCopiedPaletteId(paletteId);
    copyTimerRef.current = setTimeout(() => {
      setCopiedPaletteId(null);
    }, 2000);
  };

  const handleRemovePalette = (id: string) => {
    if (window.confirm("정말 이 팔레트를 삭제하시겠습니까?")) {
      removePalette(id);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>저장된 팔레트 | 팔레토</title>
        <meta
          name="description"
          content="저장된 색상 팔레트를 관리하고 활용하세요. 팔레트를 만들고, 수정하고, 공유할 수 있습니다."
        />
        <meta
          name="keywords"
          content="색상 팔레트, 컬러 팔레트, 색상 조합, 팔레트 관리"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "저장된 팔레트 | 팔레토",
            description:
              "저장된 색상 팔레트를 관리하고 활용하세요. 팔레트를 만들고, 수정하고, 공유할 수 있습니다.",
            url: `${domainName}/palettes`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: savedPalettes.map((palette, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: palette.name,
                  identifier: palette.id,
                },
              })),
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              저장된 팔레트
            </h1>
            <button
              onClick={() => navigate("/palettes/new")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 
                     transition-colors flex items-center gap-2 text-sm sm:text-base"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              새 팔레트
            </button>
          </div>

          {savedPalettes.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">저장된 팔레트가 없습니다.</p>
              <button
                onClick={() => navigate("/palettes/new")}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                첫 팔레트를 만들어보세요!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedPalettes.map((palette) => (
                <div key={palette.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                          {palette.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(palette.createdAt).toLocaleDateString()}
                          {" · "}
                          {palette.type === "harmony"
                            ? "조화로운 컬러"
                            : "커스텀 팔레트"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {palette.type === "custom" && (
                          <button
                            onClick={() =>
                              navigate(`/palettes/${palette.id}/edit`)
                            }
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            aria-label="팔레트 수정"
                          >
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleRemovePalette(palette.id)}
                          className="p-2 rounded-lg hover:bg-red-100 transition-colors text-red-500"
                          aria-label="팔레트 삭제"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                        {palette.colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => handleColorClick(color)}
                            className={`relative aspect-square rounded-lg transition-all transform 
                                hover:scale-105 ${
                                  selectedPalette === `${palette.id}-${index}`
                                    ? "ring-2 ring-blue-500"
                                    : ""
                                }`}
                            style={{ backgroundColor: color }}
                          >
                            <div
                              className="absolute inset-0 flex items-center justify-center 
                                    opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                {color}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={() =>
                          handleCopyColors(palette.id, palette.colors)
                        }
                        className="w-full text-sm text-gray-600 hover:text-gray-800 px-3 py-1
                             rounded hover:bg-gray-100 transition-colors flex items-center gap-1 justify-center"
                      >
                        {copiedPaletteId === palette.id ? (
                          <>
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-green-600">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                              />
                            </svg>
                            <span>색상 코드 복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PalettesPage;
