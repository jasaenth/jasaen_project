"use client";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { IUser } from "@/types/User";


interface Props {
  user: IUser;
  onView: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
}

const UserMobileCard = ({
  user,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          
        </div>

        <div>
          <h3 className="font-semibold">
            {user.name}
          </h3>

          <p className="text-sm text-textmuted">
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-textmuted">Phone</p>
          <p className="font-medium">{user.mobile}</p>
        </div>

        <div>
          <p className="text-textmuted">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>


        <div>
          <p className="text-textmuted">
            Registered
          </p>

          <p className="font-medium">
            {user.createdAt}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onView(user)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <Eye size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onEdit(user)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(user._id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default UserMobileCard;