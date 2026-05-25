"use client";

import { useState } from "react";
import AmenitiesSelector from "./AmenitiesSelector";
import RoomImageUploader from "./RoomImageUploader";
import RoomDescriptionEditor from "./RoomDescriptionEditor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ROOM_TYPES = ["STANDARD", "DELUXE", "SUITE", "EXECUTIVE", "PRESIDENTIAL"];

const ROOM_NAMES = [
  "Standard Single",
  "Deluxe Single",
  "Standard Twin",
  "Standard Double",
  "Deluxe Double A (Bottle)",
  "Deluxe Double B (Car)",
  "Deluxe Double C (Jackson Pollock)",
  "Deluxe Double D (Slum)",
  "Deluxe Double E (Circle)",
  "Deluxe Double F",
  "Bunks for 4",
  "Mix Dorm Room",
  "Bunks for 6",
  "Bed for 2",
  "Executive Suite",
];

const AddRoomForm = () => {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");

  const [discountPrice, setDiscountPrice] = useState("");

  const [maxAdults, setMaxAdults] = useState("");

  const [maxChildren, setMaxChildren] = useState("");

  const [bedType, setBedType] = useState("");

  const [roomSize, setRoomSize] = useState("");

  const [totalUnits, setTotalUnits] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [shortDescription, setShortDescription] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    router.push("/admin/rooms");
  };

  const handlePublish = async () => {
  try {
    if (
      !roomName ||
      !roomType ||
      !description.trim() ||
      !shortDescription.trim() ||
      !bedType.trim() ||
      !pricePerNight ||
      !maxAdults ||
      !roomSize ||
      !totalUnits ||
      images.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("roomName", roomName);
    formData.append("roomType", roomType);
    formData.append("description", description);
    formData.append("shortDescription", shortDescription);
    formData.append("pricePerNight", pricePerNight);
    formData.append("discountPrice", discountPrice || "0");
    formData.append("maxAdults", maxAdults);
    formData.append("maxChildren", maxChildren || "0");
    formData.append("bedType", bedType);
    formData.append("roomSize", roomSize);
    formData.append("totalUnits", totalUnits);
    formData.append(
      "amenities",
      JSON.stringify(selectedAmenities)
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    const res = await fetch("/api/rooms", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Room creation failed");
      return;
    }

    toast.success("Room added successfully");
  } catch (error) {
    console.error(error);
    toast.error("Room creation failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Room Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-2">Room Name *</label>

                <select
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select room name</option>

                  {ROOM_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Room Type *</label>

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select room type</option>

                  {ROOM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <input
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
                type="number"
                placeholder="Price Per Night"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                type="number"
                placeholder="Discount Price"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={maxAdults}
                onChange={(e) => setMaxAdults(e.target.value)}
                type="number"
                placeholder="Max Adults"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={maxChildren}
                onChange={(e) => setMaxChildren(e.target.value)}
                type="number"
                placeholder="Max Children"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
                placeholder="Bed Type"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                type="number"
                placeholder="Room Size"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={totalUnits}
                onChange={(e) => setTotalUnits(e.target.value)}
                type="number"
                placeholder="Total Units"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="mt-6">
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={4}
                placeholder="Short Description"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="mt-6">
              <RoomDescriptionEditor
                description={description}
                setDescription={setDescription}
              />
            </div>
          </div>

          <AmenitiesSelector
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </div>

        <RoomImageUploader images={images} setImages={setImages} />
      </div>

      <div className="flex justify-end gap-4">
        <button onClick={handleCancel} className="px-8 py-3 border rounded-xl">
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handlePublish}
          className="px-8 py-3 bg-primary text-white rounded-xl"
        >
          {loading ? "Uploading..." : "Save & Publish"}
        </button>
      </div>
    </div>
  );
};

export default AddRoomForm;
