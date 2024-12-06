import chroma from "chroma-js";

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

// RGB to CMYK 변환
export const rgbToCmyk = (r: number, g: number, b: number): CMYK => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const k = 1 - Math.max(red, green, blue);
  const c = k === 1 ? 0 : (1 - red - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - green - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - blue - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

// HEX to RGB 변환
export const hexToRgb = (hex: string) => {
  return chroma(hex).rgb();
};

export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "split-complementary";

export const generateHarmony = (
  baseColor: string,
  type: HarmonyType
): string[] => {
  const color = chroma(baseColor);
  const hue = chroma(baseColor).get("hsl.h");

  switch (type) {
    case "complementary":
      return [
        baseColor,
        chroma
          .hsl((hue + 180) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
      ];

    case "analogous":
      return [
        chroma
          .hsl((hue - 30 + 360) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
        baseColor,
        chroma
          .hsl((hue + 30) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
      ];

    case "triadic":
      return [
        baseColor,
        chroma
          .hsl((hue + 120) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
        chroma
          .hsl((hue + 240) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
      ];

    case "tetradic":
      return [
        baseColor,
        chroma
          .hsl((hue + 90) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
        chroma
          .hsl((hue + 180) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
        chroma
          .hsl((hue + 270) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
      ];

    case "split-complementary":
      return [
        baseColor,
        chroma
          .hsl((hue + 150) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
        chroma
          .hsl((hue + 210) % 360, color.get("hsl.s"), color.get("hsl.l"))
          .hex(),
      ];

    default:
      return [baseColor];
  }
};
