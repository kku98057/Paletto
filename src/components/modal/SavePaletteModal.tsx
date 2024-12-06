import { useState } from "react";

interface SavePaletteModalProps {
  colors: string[];
  onSave: (name: string) => void;
  onClose: () => void;
}

const SavePaletteModal = ({
  colors,
  onSave,
  onClose,
}: SavePaletteModalProps) => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setShowError(true);
      return;
    }

    onSave(name.trim());
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (showError) {
      setShowError(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">팔레트 저장</h3>

        {/* 미리보기 */}
        <div className="flex gap-2 mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="팔레트 이름"
              className={`w-full px-3 py-2 border rounded ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
              autoFocus
            />
            {showError && (
              <p className="text-red-500 text-sm mt-1">
                팔레트 이름을 입력해주세요.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavePaletteModal;
