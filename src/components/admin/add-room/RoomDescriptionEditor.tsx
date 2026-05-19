"use client";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Quote,
  RotateCcw,
  RotateCw,
  Image as ImageIcon,
} from "lucide-react";

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

      <div className="border border-borderlight rounded-xl overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-borderlight p-3 bg-bgmain">
          <button type="button">
            <Bold size={18} />
          </button>

          <button type="button">
            <Italic size={18} />
          </button>

          <button type="button">
            <Underline size={18} />
          </button>

          <button type="button">
            <List size={18} />
          </button>

          <button type="button">
            <ListOrdered size={18} />
          </button>

          <button type="button">
            <Quote size={18} />
          </button>

          <button type="button">
            <Link2 size={18} />
          </button>

          <button type="button">
            <ImageIcon size={18} />
          </button>

          <button type="button">
            <RotateCcw size={18} />
          </button>

          <button type="button">
            <RotateCw size={18} />
          </button>
        </div>

        <textarea
          rows={8}
          value={description}
          maxLength={2000}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter detailed description about the room and amenities..."
          className="w-full p-4 resize-none outline-none"
        />

        <div className="text-right text-sm text-textmuted p-3">
          {description.length}/2000
        </div>
      </div>
    </div>
  );
};

export default RoomDescriptionEditor;