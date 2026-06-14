"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import UserMobileCard from "./UserMobileCard";
import { IUser } from "@/types/User";

interface Props {
  users: IUser[];
  onView: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
}

const UsersTable = ({ users, onView, onEdit, onDelete }: Props) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-borderlight shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead className="bg-bgmain border-b border-borderlight">
              <tr className="text-left">
                <th className="px-6 py-4 font-semibold">User ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Registered On</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-borderlight hover:bg-bgmain/40"
                >
                  <td className="px-6 py-5 font-semibold text-primary">
                    {user._id.slice(-6)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="
    h-10
    w-10
    rounded-full
    bg-[#7A1C1C]
    text-white
    flex
    items-center
    justify-center
    font-semibold
  "
                        >
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium">{user.name}</p>

                          <p className="text-xs text-slate-500">
                            #{user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">{user.email}</td>

                  <td className="px-6 py-5">{user.mobile}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "USER"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onView(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit(user)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(user._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {users.map((user) => (
          <UserMobileCard
            key={user._id}
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default UsersTable;
