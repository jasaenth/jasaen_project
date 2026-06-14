"use client";

import { useState, useEffect } from "react";
import AmenitiesSelector from "./AmenitiesSelector";
import RoomImageUploader from "./RoomImageUploader";
import RoomDescriptionEditor from "./RoomDescriptionEditor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  Sparkles, 
  ArrowLeft,
  Send,
  DollarSign,
  Ruler,
  Users,
  Bed,
  Building2,
  Tag,
  HelpCircle,
  Hash,
  DoorOpen,
  AlertCircle
} from "lucide-react";

const ROOM_CATEGORIES = ["Standard", "Deluxe", "Dormitory", "Suite"];
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

const ROOM_CATEGORY_MAP: Record<string, string> = {
  "Standard Single": "Standard",
  "Standard Twin": "Standard",
  "Standard Double": "Standard",
  "Deluxe Single": "Deluxe",
  "Deluxe Double A (Bottle)": "Deluxe",
  "Deluxe Double B (Car)": "Deluxe",
  "Deluxe Double C (Jackson Pollock)": "Deluxe",
  "Deluxe Double D (Slum)": "Deluxe",
  "Deluxe Double E (Circle)": "Deluxe",
  "Deluxe Double F": "Deluxe",
  "Bunks for 4": "Dormitory",
  "Mix Dorm Room": "Dormitory",
  "Bunks for 6": "Dormitory",
  "Bed for 2": "Dormitory",
  "Executive Suite": "Suite",
};

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
  const [roomSizeUnit, setRoomSizeUnit] = useState("sqm");
  const [totalUnits, setTotalUnits] = useState("");
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Generate room number inputs when totalUnits changes
  useEffect(() => {
    const units = parseInt(totalUnits);
    if (units > 0 && units <= 50) {
      // Preserve existing room numbers if they match the count
      if (roomNumbers.length !== units) {
        const newRoomNumbers = Array(units).fill("");
        // Copy existing values if any
        for (let i = 0; i < Math.min(roomNumbers.length, units); i++) {
          newRoomNumbers[i] = roomNumbers[i];
        }
        setRoomNumbers(newRoomNumbers);
      }
    } else if (units === 0) {
      setRoomNumbers([]);
    }
  }, [totalUnits]);

  const handleRoomNumberChange = (index: number, value: string) => {
    const updated = [...roomNumbers];
    updated[index] = value;
    setRoomNumbers(updated);
  };

  const handleCancel = () => {
    router.push("/admin/rooms");
  };

  const validateForm = () => {
    const errors = [];
    
    if (!roomName) errors.push("Room name");
    if (!roomType) errors.push("Room category");
    if (!description.trim()) errors.push("Description");
    if (!shortDescription.trim()) errors.push("Short description");
    if (!bedType.trim()) errors.push("Bed type");
    if (!pricePerNight) errors.push("Price");
    if (!maxAdults) errors.push("Max adults");
    if (!roomSize) errors.push("Room size");
    if (!totalUnits) errors.push("Total units");
    if (images.length === 0) errors.push("At least one image");
    
    // Validate room numbers
    const emptyRoomNumbers = roomNumbers.some(num => !num.trim());
    if (totalUnits && parseInt(totalUnits) > 0 && emptyRoomNumbers) {
      errors.push("All room numbers must be filled");
    }
    
    // Check for duplicate room numbers
    const uniqueNumbers = new Set(roomNumbers.filter(num => num.trim()));
    if (uniqueNumbers.size !== roomNumbers.filter(num => num.trim()).length) {
      errors.push("Duplicate room numbers found");
    }
    
    if (errors.length > 0) {
      toast.error(`Please fix: ${errors.join(", ")}`);
      return false;
    }
    
    return true;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    try {
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
      formData.append("roomSize", `${roomSize} ${roomSizeUnit}`);
      formData.append("totalUnits", totalUnits);
      formData.append("roomNumbers", JSON.stringify(roomNumbers.filter(num => num.trim())));
      formData.append("amenities", JSON.stringify(selectedAmenities));
      
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
      
      toast.success("Room created successfully! 🎉");
      router.push("/admin/rooms");
    } catch (error) {
      console.error(error);
      toast.error("Room creation failed");
    } finally {
      setLoading(false);
    }
  };

  const NumericInputField = ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    required = true,
    icon: Icon,
    hint,
    unit,
    unitOptions,
    onUnitChange,
    min = 0,
    step = 1
  }: any) => (
    <div className="group">
      <label className="block text-sm font-medium text-charcoal/80 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <div className={`relative transition-all duration-200 ${focusedField === label ? 'transform scale-[1.02]' : ''}`}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        )}
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocusedField(label)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            min={min}
            step={step}
            className={`
              flex-1 border rounded-xl px-4 py-3 transition-all duration-200
              ${Icon ? 'pl-10' : 'pl-4'}
              focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold
              hover:border-gold/50
              bg-white
            `}
          />
          {unitOptions && onUnitChange && (
            <select
              value={unit}
              onChange={(e) => onUnitChange(e.target.value)}
              className="border rounded-xl px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              {unitOptions.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          {unit && !unitOptions && (
            <span className="inline-flex items-center px-4 border rounded-xl bg-gray-50 text-charcoal/70">
              {unit}
            </span>
          )}
        </div>
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
        <HelpCircle size={12} />
        {hint}
      </p>}
    </div>
  );

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    type = "text", 
    placeholder, 
    required = true,
    icon: Icon,
    hint
  }: any) => (
    <div className="group">
      <label className="block text-sm font-medium text-charcoal/80 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <div className={`relative transition-all duration-200 ${focusedField === label ? 'transform scale-[1.02]' : ''}`}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocusedField(label)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          className={`
            w-full border rounded-xl px-4 py-3 transition-all duration-200
            ${Icon ? 'pl-10' : 'pl-4'}
            focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold
            hover:border-gold/50
            bg-white
          `}
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
        <HelpCircle size={12} />
        {hint}
      </p>}
    </div>
  );

  // Auto-calculate discount percentage
  const discountPercentage = pricePerNight && discountPrice 
    ? Math.round(((parseFloat(pricePerNight) - parseFloat(discountPrice)) / parseFloat(pricePerNight)) * 100)
    : 0;

  // Check for duplicate room numbers
  const hasDuplicates = roomNumbers.length > 0 && new Set(roomNumbers).size !== roomNumbers.filter(n => n).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid xl:grid-cols-3 gap-8">
        {/* Main Form - Left & Center */}
        <div className="xl:col-span-2 space-y-8">
          {/* Room Details Card */}
          <div className="bg-white rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-maroon to-maroon/90 px-6 py-4">
              <h2 className="text-xl font-display text-ivory flex items-center gap-2">
                <Sparkles size={20} className="text-gold" />
                Room Details
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-2">
                    Room Name <span className="text-gold">*</span>
                  </label>
                  <select
                    value={roomName}
                    onChange={(e) => {
                      const selectedRoom = e.target.value;
                      setRoomName(selectedRoom);
                      setRoomType(ROOM_CATEGORY_MAP[selectedRoom] || "");
                    }}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold hover:border-gold/50 transition-all bg-white"
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
                  <label className="block text-sm font-medium text-charcoal/80 mb-2">
                    Room Category <span className="text-gold">*</span>
                  </label>
                  <input
                    value={roomType}
                    readOnly
                    placeholder="Auto-selected based on room name"
                    className="w-full border rounded-xl px-4 py-3 bg-gray-50/50 text-charcoal/70 cursor-not-allowed"
                  />
                </div>

                <NumericInputField
                  label="Price Per Night"
                  value={pricePerNight}
                  onChange={setPricePerNight}
                  placeholder="e.g., 2999"
                  icon={DollarSign}
                  unit="THB"
                  min={0}
                  step={100}
                  hint="Base price in Thai Baht (THB)"
                />

                <div className="relative">
                  <NumericInputField
                    label="Discount Price"
                    value={discountPrice}
                    onChange={setDiscountPrice}
                    placeholder="e.g., 2499"
                    required={false}
                    icon={Tag}
                    unit="THB"
                    min={0}
                    step={100}
                    hint="Optional promotional price"
                  />
                  {discountPercentage > 0 && (
                    <div className="absolute -right-2 -top-2 bg-gold text-charcoal text-xs font-bold px-2 py-1 rounded-full">
                      Save {discountPercentage}%
                    </div>
                  )}
                </div>

                <NumericInputField
                  label="Max Adults"
                  value={maxAdults}
                  onChange={setMaxAdults}
                  placeholder="e.g., 2"
                  icon={Users}
                  min={1}
                  step={1}
                  hint="Maximum number of adults"
                />

                <NumericInputField
                  label="Max Children"
                  value={maxChildren}
                  onChange={setMaxChildren}
                  placeholder="e.g., 1"
                  required={false}
                  icon={Users}
                  min={0}
                  step={1}
                  hint="Maximum number of children"
                />

                <InputField
                  label="Bed Type"
                  value={bedType}
                  onChange={setBedType}
                  placeholder="e.g., King Size"
                  icon={Bed}
                  hint="e.g., King, Queen, Twin, Single"
                />

                <NumericInputField
                  label="Room Size"
                  value={roomSize}
                  onChange={setRoomSize}
                  placeholder="e.g., 45"
                  icon={Ruler}
                  unit={roomSizeUnit}
                  unitOptions={["sqm", "sqft"]}
                  onUnitChange={setRoomSizeUnit}
                  min={0}
                  step={1}
                  hint={`Square ${roomSizeUnit === 'sqm' ? 'meters' : 'feet'} (m²/ft²)`}
                />

                <NumericInputField
                  label="Total Units"
                  value={totalUnits}
                  onChange={setTotalUnits}
                  placeholder="e.g., 5"
                  icon={Building2}
                  min={1}
                  max={50}
                  step={1}
                  hint="Number of rooms available (max 50)"
                />
              </div>

              {/* Dynamic Room Numbers Input */}
              {roomNumbers.length > 0 && (
                <div className="mt-8 border-t border-border/50 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-charcoal/80">
                      Room Numbers <span className="text-gold">*</span>
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DoorOpen size={14} />
                      <span>{roomNumbers.length} rooms to configure</span>
                    </div>
                  </div>
                  
                  {hasDuplicates && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      Duplicate room numbers detected. Please use unique numbers.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {roomNumbers.map((roomNumber, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={roomNumber}
                          onChange={(e) => handleRoomNumberChange(index, e.target.value)}
                          placeholder={`Room ${index + 1} number`}
                          className={`
                            w-full border rounded-xl px-4 py-3 pl-8 transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold
                            hover:border-gold/50 bg-white
                            ${roomNumber && roomNumbers.filter(n => n === roomNumber).length > 1 
                              ? 'border-red-400 bg-red-50/30' 
                              : 'border-border/50'
                            }
                          `}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <Hash size={12} />
                    Enter unique room numbers (e.g., 101, 102, 201, 202)
                  </p>
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium text-charcoal/80 mb-2">
                  Short Description <span className="text-gold">*</span>
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={3}
                  placeholder="A brief, enticing description of the room (max 160 characters)"
                  maxLength={160}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold hover:border-gold/50 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {shortDescription.length}/160 characters
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-charcoal/80 mb-2">
                  Full Description <span className="text-gold">*</span>
                </label>
                <RoomDescriptionEditor
                  description={description}
                  setDescription={setDescription}
                />
              </div>
            </div>
          </div>

          {/* Amenities Card */}
          <AmenitiesSelector
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </div>

        {/* Image Upload - Right Sidebar */}
        <div>
          <RoomImageUploader images={images} setImages={setImages} />
        </div>
      </div>

      {/* Price Summary Card */}
      {(pricePerNight || discountPrice) && (
        <div className="mt-6 bg-gradient-to-r from-gold/5 to-maroon/5 rounded-xl p-4 border border-gold/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-gold" />
              <span className="text-sm font-medium text-charcoal">Price Summary:</span>
            </div>
            <div className="flex items-center gap-6">
              {pricePerNight && (
                <div>
                  <span className="text-xs text-muted-foreground">Original</span>
                  <p className="text-lg font-bold text-charcoal">฿{parseInt(pricePerNight).toLocaleString()}</p>
                </div>
              )}
              {discountPrice && (
                <div>
                  <span className="text-xs text-muted-foreground">Discounted</span>
                  <p className="text-lg font-bold text-maroon">฿{parseInt(discountPrice).toLocaleString()}</p>
                </div>
              )}
              {discountPercentage > 0 && (
                <div className="bg-gold/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-gold">Save {discountPercentage}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Room Numbers Summary */}
      {roomNumbers.length > 0 && roomNumbers.every(num => num.trim()) && !hasDuplicates && (
        <div className="mt-4 bg-green-50 rounded-xl p-3 border border-green-200">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <DoorOpen size={16} />
            <span>Ready to create {roomNumbers.length} room(s):</span>
            <span className="font-medium">{roomNumbers.filter(n => n).join(", ")}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={handleCancel}
          className="group px-8 py-3 border-2 border-gray-200 rounded-xl hover:border-maroon/30 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handlePublish}
          className="group px-8 py-3 bg-gradient-to-r from-maroon to-maroon/90 text-ivory rounded-xl hover:shadow-lg hover:shadow-maroon/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Room...
            </>
          ) : (
            <>
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              Save & Publish
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddRoomForm;