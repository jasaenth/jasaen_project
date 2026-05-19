"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Room } from "./roomsData";

interface Props {
  onClose: () => void;
  onAdd: (room: Room) => void;
}

const AddRoomModal = ({ onClose, onAdd }: Props) => {
  const [formData, setFormData] = useState<Room>({
    id: `RM${Date.now()}`,
    image: "/images/hero/hero-1.JPG",
    name: "",
    type: "",
    price: 0,
    status: "Active",
    description: "",
    capacity: 2,
    amenities: [],
  });

  const handleChange = (
    key: keyof Room,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Add New Room
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <Input
            label="Room Name"
            value={formData.name}
            onChange={(v) => handleChange("name", v)}
          />

          <Input
            label="Room Type"
            value={formData.type}
            onChange={(v) => handleChange("type", v)}
          />

          <Input
            label="Price"
            value={formData.price}
            onChange={(v) => handleChange("price", Number(v))}
          />

          <Input
            label="Capacity"
            value={formData.capacity}
            onChange={(v) => handleChange("capacity", Number(v))}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm text-textmuted mb-2">
            Description
          </p>

          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            className="w-full border border-borderlight rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onAdd(formData);
              onClose();
            }}
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}) => (
  <div>
    <p className="text-sm text-textmuted mb-2">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-borderlight rounded-xl px-4 py-3"
    />
  </div>
);

export default AddRoomModal;