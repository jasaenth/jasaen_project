"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { IUser } from "@/types/User";

interface Props {
  user: IUser | null;
  onClose: () => void;
}

const UserViewModal = ({
  user,
  onClose,
}: Props) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-8 relative shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          

          <h2 className="text-2xl font-bold mt-5">
            {user.name}
          </h2>

          <p className="text-textmuted mt-1">
            {user.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-8">
          <div>
            <p className="text-textmuted text-sm">
              User ID
            </p>
            <p className="font-medium">{user._id}</p>
          </div>

          <div>
            <p className="text-textmuted text-sm">
              Phone
            </p>
            <p className="font-medium">{user.mobile}</p>
          </div>

          <div>
            <p className="text-textmuted text-sm">
              Role
            </p>
            <p className="font-medium">{user.role}</p>
          </div>

          

          <div className="col-span-2">
            <p className="text-textmuted text-sm">
              Registered On
            </p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;