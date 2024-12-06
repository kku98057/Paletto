import { useColorContext } from "../contexts/ColorContext";
import { HarmonyType, generateHarmony } from "../utils/colorUtils";
import { useState, useRef, useEffect } from "react";
import { usePaletteStorage } from "../hooks/usePaletteStorage";
import SavePaletteModal from "../components/modal/SavePaletteModal";
import { Helmet } from "react-helmet-async";
import { domainName } from "../constants";

const HARMONY_TYPES: {
  type: HarmonyType;
  label: string;
  description: string;
}[] = [
  {
    type: "complementary",
    label: "보색",
    description: "색상환의 반대편에 위치한 색상을 조합합니다.",
  },
  {
    type: "analogous",
    label: "유사색",
    description: "색상환에서 서로 이웃한 색상들을 조합합니다.",
  },
  {
    type: "triadic",
    label: "삼각 보색",
    description: "색상환에서 정삼각형을 이루는 세 색상을 조합합니다.",
  },
  {
    type: "tetradic",
    label: "사각 보색",
    description: "색상환에서 정사각형을 이루는 네 색상을 조합합니다.",
  },
  {
    type: "split-complementary",
    label: "분할 보색",
    description: "보색의 양옆 색상을 조합합니다.",
  },
];

const HarmonyPage = () => {
  const { currentColor, setCurrentColor } = useColorContext();
  const { savePalette } = usePaletteStorage();
  const [selectedType, setSelectedType] =
    useState<HarmonyType>("complementary");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const colors = generateHarmony(currentColor, selectedType);
  const selectedHarmony = HARMONY_TYPES.find((h) => h.type === selectedType);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const handleSave = (name: string) => {
    savePalette(name, colors, "harmony");
    setShowSaveModal(false);

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setIsSaved(true);
    saveTimerRef.current = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>조화로운 컬러 | 팔레토</title>
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
            name: "색상 조화 | 팔레토",
            description: "색상 조화를 통해 어울리는 색상 조합을 찾아보세요.",
            url: `${domainName}/harmony`,
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "색상 조화 생성기",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
            },
          })}
        </script>
      </Helmet>
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            조화로운 컬러
          </h1>

          {/* 현재 선택된 조화 유형 설명 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm sm:text-base">
              {selectedHarmony?.description}
            </p>
          </div>

          {/* 조화 유형 선택 */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-3">
              조화 유형
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {HARMONY_TYPES.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors
                  ${
                    selectedType === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 컬러 팔레트 */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-3">
              생성된 팔레트
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-full aspect-square rounded-lg mb-3 cursor-pointer relative"
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm select-all">
                      {color}
                    </span>
                    <button
                      onClick={() => setCurrentColor(color)}
                      className="px-3 py-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
                    >
                      선택
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowSaveModal(true)}
              disabled={isSaved}
              className={`w-full sm:w-auto px-6 py-2 rounded-lg 
                     flex items-center justify-center gap-2 text-white
                     transition-colors ${
                       isSaved
                         ? "bg-green-500 cursor-not-allowed"
                         : "bg-green-500 hover:bg-green-600"
                     }`}
            >
              {isSaved ? (
                <>
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>저장됨!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  <span>팔레트 저장</span>
                </>
              )}
            </button>
          </div>
        </div>

        {showSaveModal && (
          <SavePaletteModal
            colors={colors}
            onSave={handleSave}
            onClose={() => setShowSaveModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default HarmonyPage;
