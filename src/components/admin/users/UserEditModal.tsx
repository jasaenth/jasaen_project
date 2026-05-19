"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { User } from "./usersData";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserEditModal = ({
  user,
  onClose,
  onSave,
}: Props) => {
  const [formData, setFormData] = useState<User | null>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  if (!formData) return null;

  const handleChange = (
    key: keyof User,
    value: string
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-6">
          Edit User
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Phone
            </label>

            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value)
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            >
              <option>Guest</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
              className="w-full border border-borderlight rounded-xl px-4 py-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-borderlight rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-primary text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;