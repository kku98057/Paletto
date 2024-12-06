import { SavedColor } from "../types/color";

interface SavedColorsProps {
  colors: SavedColor[];
  onSelect: (hex: string) => void;
  onRemove: (id: string) => void;
}

const SavedColors = ({ colors, onSelect, onRemove }: SavedColorsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {colors.map((color) => (
        <div key={color.id} className="relative group">
          <div
            className="w-full aspect-square rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color.hex)}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(color.id);
            }}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {color.name && (
            <div className="mt-1 text-sm text-gray-600 truncate">
              {color.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedColors;
