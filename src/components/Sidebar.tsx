import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";

import chroma from "chroma-js";
import { rgbToCmyk } from "../utils/colorUtils";
import { useColorContext } from "../contexts/ColorContext";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { currentColor, setCurrentColor } = useColorContext();
  const location = useLocation();
  const rgb = chroma(currentColor).rgb();
  const cmyk = rgbToCmyk(...rgb);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (color: string) => {
    if (chroma.valid(color)) {
      setCurrentColor(color);
    }
  };

  const handleDisplayClick = () => {
    colorInputRef.current?.click();
  };

  const navigation = [
    {
      name: "단일 색상",
      path: "/",
      icon: (
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      name: "조화로운 컬러",
      path: "/harmony",
      icon: (
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "새 팔레트",
      path: "/palettes/new",
      icon: (
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      name: "저장된 팔레트",
      path: "/palettes",
      icon: (
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      name: "저장된 색상",
      path: "/saved",
      icon: (
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-72 h-full bg-white shadow-lg flex flex-col">
      {/* 모바일 헤더 */}
      <div className="lg:hidden p-5 flex justify-between items-start border-b border-gray-200 bg-white">
        <div className="flex items-start gap-3">
          <svg
            className="w-7 h-7 text-blue-500 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Color Tool</h1>
            <p className="text-xs text-gray-500">색상 관리 도구</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 
                   hover:text-gray-700 transition-all"
          aria-label="사이드바 닫기"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* PC 헤더 */}
      <div className="hidden lg:block p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Color Tool</h1>
            <p className="text-sm text-gray-500">색상 관리 도구</p>
          </div>
        </div>
      </div>

      {/* 현재 색상 정보 */}
      <div className="p-4 border-b border-gray-200">
        <div
          className="w-full h-32 rounded-lg shadow-sm mb-3 cursor-pointer group relative"
          style={{ backgroundColor: currentColor }}
          onClick={handleDisplayClick}
        >
          {/* 호버 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg">
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">HEX:</span>
            <span className="font-mono select-all">{currentColor}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">RGB:</span>
            <span className="font-mono select-all">{rgb.join(", ")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">CMYK:</span>
            <span className="font-mono select-all">
              {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%
            </span>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span
                  className={`${isActive ? "text-blue-600" : "text-gray-400"}`}
                >
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* 푸터 */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-center text-gray-500">Color Tool v1.0</div>
      </div>
    </div>
  );
};

export default Sidebar;
