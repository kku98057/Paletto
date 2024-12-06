import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useRef, useEffect } from "react";
import chroma from "chroma-js";

interface ColorInfoProps {
  hex: string;
  rgb: number[];
  cmyk: {
    c: number;
    m: number;
    y: number;
    k: number;
  };
}

const ColorInfo = ({ hex, rgb, cmyk }: ColorInfoProps) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = (label: string) => {
    // 이전 타이머가 있다면 제거
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCopiedText(label);
    timerRef.current = setTimeout(() => {
      setCopiedText(null);
      timerRef.current = undefined;
    }, 1000);
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 텍스트 색상을 배경색에 따라 자동으로 조정
  const textColor = chroma.contrast(hex, "white") > 2 ? "white" : "black";

  // HSL 값 계산 및 예외 처리
  const hsl = chroma(hex).hsl();
  const hue = Number.isNaN(hsl[0]) ? 0 : Math.round(hsl[0]);
  const saturation = Math.round(hsl[1] * 100);
  const lightness = Math.round(hsl[2] * 100);

  const colorFormats = [
    { label: "HEX", value: hex },
    { label: "RGB", value: `rgb(${rgb.join(", ")})` },
    {
      label: "CMYK",
      value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    },
    { label: "HSL", value: `hsl(${hue}, ${saturation}%, ${lightness}%)` },
  ];

  return (
    <div className="space-y-3">
      {/* 컬러 스와치 그리드 */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[0.2, 0.4, 0.6, 0.8, 1].map((alpha) => (
          <div
            key={alpha}
            className="aspect-square rounded-lg shadow-sm relative group"
            style={{ backgroundColor: chroma(hex).alpha(alpha).css() }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-mono" style={{ color: textColor }}>
                {Math.round(alpha * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 컬러 정보 카드 */}
      <div className="grid gap-2">
        {colorFormats.map(({ label, value }) => (
          <CopyToClipboard
            key={label}
            text={value}
            onCopy={() => handleCopy(label)}
          >
            <div className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">
                    {label}
                  </span>
                  <span className="font-mono text-sm">{value}</span>
                </div>
                <div className="flex items-center">
                  {copiedText === label ? (
                    <span className="text-green-500 text-sm">복사됨!</span>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </CopyToClipboard>
        ))}
      </div>

      {/* 색상 속성 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[
          {
            label: "색조",
            value: `${hue}°`,
            tooltip: "무채색의 경우 색조는 0°로 표시됩니다",
          },
          { label: "채도", value: `${saturation}%` },
          { label: "명도", value: `${lightness}%` },
          {
            label: "대비",
            value: `${chroma.contrast(hex, "white").toFixed(1)}`,
          },
        ].map(({ label, value, tooltip }) => (
          <div
            key={label}
            className="bg-gray-50 rounded-lg p-3 text-center relative group"
            title={tooltip}
          >
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="text-lg font-semibold text-gray-800">{value}</div>
            {tooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorInfo;
