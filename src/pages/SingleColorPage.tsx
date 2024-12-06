import { useRef, useState, useEffect } from "react";
import { useColorContext } from "../contexts/ColorContext";
import ColorPicker from "../components/ColorPicker";
import ColorInfo from "../components/ColorInfo";
import { rgbToCmyk } from "../utils/colorUtils";
import chroma from "chroma-js";
import { useColorStorage } from "../hooks/useColorStorage";
import { Helmet } from "react-helmet-async";
import { domainName } from "../constants";

const SingleColorPage = () => {
  const { currentColor, setCurrentColor } = useColorContext();
  const { saveColor } = useColorStorage();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [isSaved, setIsSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleColorChange = (color: string) => {
    if (chroma.valid(color)) {
      setCurrentColor(color);
    }
  };

  const handleDisplayClick = () => {
    colorInputRef.current?.click();
  };

  const generateRandomColor = () => {
    const newColor = chroma.random().hex();
    setCurrentColor(newColor);
  };

  const handleSaveColor = () => {
    if (isSaved) return;

    saveColor(currentColor);

    // 이전 타이머가 있다면 제거
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setIsSaved(true);
    saveTimerRef.current = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const rgb = chroma(currentColor).rgb();
  const cmyk = rgbToCmyk(...rgb);

  return (
    <>
      <Helmet>
        <title>단일 색상 | 팔레토</title>
        <meta
          name="description"
          content="색상을 선택하고 저장하세요. RGB, CMYK, HEX 등 다양한 색상 정보를 확인할 수 있습니다."
        />
        <meta
          name="keywords"
          content="색상 선택, 색상 저장, RGB, CMYK, HEX, 색상 도구"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "단일 색상 | 팔레토",
            description:
              "색상을 선택하고 저장하세요. RGB, CMYK, HEX 등 다양한 색상 정보를 확인할 수 있습니다.",
            url: `${domainName}/color`,
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "색상 선택기",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
            },
          })}
        </script>
      </Helmet>
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            단일 색상
          </h1>

          {/* 컬러 디스플레이 */}
          <div
            className="relative w-full h-48 sm:h-64 rounded-lg mb-4 sm:mb-6 shadow-sm transition-colors cursor-pointer group"
            style={{ backgroundColor: currentColor }}
            onClick={handleDisplayClick}
          >
            {/* 호버 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                클릭하여 색상 선택
              </span>
            </div>

            {/* 숨겨진 컬러 인풋 */}
            <input
              ref={colorInputRef}
              type="color"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="sr-only"
            />
          </div>

          {/* 컬러 피커 섹션 */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                색상 선택
              </h2>
              <ColorPicker color={currentColor} onChange={handleColorChange} />
            </div>

            {/* 컬러 정보 */}
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                색상 정보
              </h2>
              <ColorInfo hex={currentColor} rgb={rgb} cmyk={cmyk} />
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={generateRandomColor}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                랜덤 색상
              </button>
              <button
                onClick={handleSaveColor}
                disabled={isSaved}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors 
                       flex items-center justify-center gap-2 text-white
                       ${
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
                  "색상 저장"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleColorPage;
