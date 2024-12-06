import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ColorProvider } from "../contexts/ColorContext";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ColorProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* 모바일 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 사이드바 */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-4 lg:p-8">
          {/* 모바일 헤더 */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl shadow-lg shadow-gray-200/70 p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 
                           transition-colors duration-200"
                  aria-label="메뉴 열기"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-7 h-7 text-blue-500"
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
                    <h1 className="text-lg font-bold text-gray-800">팔레토</h1>
                    <p className="text-xs font-medium text-gray-500">
                      색상 관리 도구
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[2000px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </ColorProvider>
  );
};

export default Layout;
