interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 rounded cursor-pointer"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="#000000"
      />
    </div>
  );
};

export default ColorPicker;
