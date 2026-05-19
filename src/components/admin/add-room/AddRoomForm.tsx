"use client";

import { useState } from "react";
import { roomTypes } from "./addRoomData";
import AmenitiesSelector from "./AmenitiesSelector";
import RoomStatusSelector from "./RoomStatusSelector";
import RoomImageUploader from "./RoomImageUploader";
import RoomDescriptionEditor from "./RoomDescriptionEditor";
import { useRouter } from "next/navigation";

const AddRoomForm = () => {
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] =
    useState<string[]>([]);
  const [status, setStatus] = useState<
    "active" | "inactive"
  >("active");

  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [additionalInfo, setAdditionalInfo] =
    useState("");

  const handleCancel = () => {
    router.push("/admin/rooms");
  };

  const handleDraft = () => {
    alert("Room saved as draft");
  };

  const handlePublish = () => {
    alert("Room published successfully");
  };

  return (
    <div className="space-y-6">
      <div className="grid xl:grid-cols-3 gap-6">
        
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">
              Room Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-2">
                  Room Name *
                </label>

                <input
                  type="text"
                  placeholder="e.g. Deluxe Room"
                  className="w-full border border-borderlight rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Room Type *
                </label>

                <select className="w-full border border-borderlight rounded-xl px-4 py-3">
                  <option>Select room type</option>

                  {roomTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Price (₹) *
                </label>

                <input
                  type="number"
                  placeholder="e.g. 4500"
                  className="w-full border border-borderlight rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Maximum Guests *
                </label>

                <input
                  type="number"
                  placeholder="e.g. 2"
                  className="w-full border border-borderlight rounded-xl px-4 py-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium mb-2">
                  Room Size (sq ft)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 350"
                  className="w-full border border-borderlight rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-medium mb-2">
                Short Description *
              </label>

              <textarea
                rows={4}
                maxLength={150}
                value={shortDescription}
                onChange={(e) =>
                  setShortDescription(e.target.value)
                }
                className="w-full border border-borderlight rounded-xl px-4 py-3 resize-none"
              />

              <div className="text-right text-sm text-textmuted mt-2">
                {shortDescription.length}/150
              </div>
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
            setSelectedAmenities={
              setSelectedAmenities
            }
          />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <RoomImageUploader
            images={images}
            setImages={setImages}
          />

          <RoomStatusSelector
            status={status}
            setStatus={setStatus}
          />

          <div className="bg-white rounded-2xl border border-borderlight p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">
              Additional Information
            </h2>

            <textarea
              rows={5}
              maxLength={300}
              value={additionalInfo}
              onChange={(e) =>
                setAdditionalInfo(e.target.value)
              }
              placeholder="Special features, policies, extra bed charges..."
              className="w-full border border-borderlight rounded-xl px-4 py-3 resize-none"
            />

            <div className="text-right text-sm text-textmuted mt-2">
              {additionalInfo.length}/300
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={handleCancel}
          className="px-8 py-3 border border-borderlight rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={handleDraft}
          className="px-8 py-3 bg-pink-100 text-primary rounded-xl"
        >
          Save as Draft
        </button>

        <button
          onClick={handlePublish}
          className="px-8 py-3 bg-primary text-white rounded-xl"
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
};

export default AddRoomForm;