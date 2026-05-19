import AddRoomForm from "@/components/admin/add-room/AddRoomForm";

export default function AddRoomPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-bgmain min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textmain">
          Add New Room
        </h1>

        <p className="text-textmuted mt-2">
          Create a new room listing with details, images,
          amenities, and booking availability.
        </p>
      </div>

      {/* Form */}
      <AddRoomForm />
    </div>
  );
}