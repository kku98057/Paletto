// 기존 타입
export interface SavedColor {
  id: string;
  hex: string;
  name?: string;
  createdAt: number;
}

// 새로운 팔레트 타입
export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: "harmony" | "custom";
  createdAt: number;
}
