"use client";

interface Props {
  description: string;
  setDescription: (value: string) => void;
}

const RoomDescriptionEditor = ({
  description,
  setDescription,
}: Props) => {
  return (
    <div>
      <label className="block font-semibold mb-3">
        Room Description *
      </label>

      <div className="border border-borderlight rounded-xl overflow-hidden bg-white">
        <textarea
          rows={10}
          value={description}
          maxLength={2000}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter room description..."
          className="w-full p-4 resize-none outline-none"
        />

        <div className="text-right text-sm text-textmuted p-3 border-t border-borderlight">
          {description.length}/2000
        </div>
      </div>
    </div>
  );
};

export default RoomDescriptionEditor;