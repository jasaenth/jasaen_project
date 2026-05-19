"use client";

import { amenitiesList } from "./addRoomData";

interface Props {
  selectedAmenities: string[];
  setSelectedAmenities: (value: string[]) => void;
}

const AmenitiesSelector = ({
  selectedAmenities,
  setSelectedAmenities,
}: Props) => {
  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== id)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">Amenities</h2>

      <p className="text-textmuted mb-6">
        Select amenities for this room
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {amenitiesList.map((amenity) => {
          const Icon = amenity.icon;
          const selected = selectedAmenities.includes(
            amenity.id
          );

          return (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition ${
                selected
                  ? "bg-primary text-white border-primary"
                  : "border-borderlight hover:bg-bgmain"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">
                {amenity.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesSelector;