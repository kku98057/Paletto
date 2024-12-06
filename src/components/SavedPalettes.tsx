import { ColorPalette } from "../types/color";

interface SavedPalettesProps {
  palettes: ColorPalette[];
  onSelectColor: (color: string) => void;
  onRemove: (id: string) => void;
}

const SavedPalettes = ({
  palettes,
  onSelectColor,
  onRemove,
}: SavedPalettesProps) => {
  return (
    <div className="space-y-6">
      {palettes.map((palette) => (
        <div
          key={palette.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">{palette.name}</h4>
            <button
              onClick={() => onRemove(palette.id)}
              className="text-red-500 hover:text-red-600"
            >
              삭제
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {palette.colors.map((color, index) => (
              <div key={index} className="relative group aspect-square">
                <div
                  className="w-full h-full rounded cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => onSelectColor(color)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center 
                              bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                              transition-opacity rounded"
                >
                  <span className="text-white text-xs">{color}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {new Date(palette.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPalettes;
