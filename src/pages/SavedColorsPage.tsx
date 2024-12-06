import { useColorStorage } from "../hooks/useColorStorage";
import { useColorContext } from "../contexts/ColorContext";
import { rgbToCmyk } from "../utils/colorUtils";
import chroma from "chroma-js";
import { Helmet } from "react-helmet-async";
import { domainName } from "../constants";

const SavedColorsPage = () => {
  const { savedColors, removeColor } = useColorStorage();
  const { setCurrentColor } = useColorContext();

  const handleRemoveColor = (id: string) => {
    if (window.confirm("정말 이 색상을 삭제하시겠습니까?")) {
      removeColor(id);
    }
  };

  return (
    <>
      <Helmet>
        <title>저장된 색상 | 팔레토</title>
        <meta
          name="description"
          content="저장한 색상들을 관리하고 활용하세요. 각 색상의 상세 정보를 확인할 수 있습니다."
        />
        <meta
          name="keywords"
          content="저장된 색상, 색상 관리, 색상 라이브러리"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "저장된 색상 | 팔레토",
            description: "저장된 색상들을 관리하고 활용하세요.",
            url: `${domainName}/colors`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: savedColors.map((color, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: color,
                  identifier: color,
                },
              })),
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              저장된 색상
            </h1>

            {savedColors.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">저장된 색상이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedColors.map((color) => {
                  const rgb = chroma(color.hex).rgb();
                  const cmyk = rgbToCmyk(...rgb);

                  return (
                    <div
                      key={color.id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div
                        className="h-32 rounded-t-lg cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setCurrentColor(color.hex)}
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            {color.name && (
                              <h3 className="font-medium text-gray-800 mb-1">
                                {color.name}
                              </h3>
                            )}
                            <p className="text-sm text-gray-500">
                              {new Date(color.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveColor(color.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            삭제
                          </button>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">HEX:</span>
                            <span className="font-mono">{color.hex}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">RGB:</span>
                            <span className="font-mono">{rgb.join(", ")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CMYK:</span>
                            <span className="font-mono">
                              {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedColorsPage;
