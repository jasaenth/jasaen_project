"use client";

import {
  Mail,
  Shield,
  User,
} from "lucide-react";

interface Props {
  user: any;
}

export default function UserCard({
  user,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-6
        hover:shadow-lg
        transition
      "
    >
      <div className="flex items-center justify-between">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-blue-100
            text-blue-600
            flex
            items-center
            justify-center
          "
        >
          <User size={24} />
        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            ${
              user.active === "yes"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {user.active}
        </span>

      </div>

      <h3 className="text-xl font-bold mt-5">
        {user.firstName}{" "}
        {user.lastName}
      </h3>

      <div className="mt-4 space-y-3">

        <div className="flex gap-2 items-center text-gray-600">
          <Mail size={15} />
          <span className="text-sm">
            {user.email}
          </span>
        </div>

        <div className="flex gap-2 items-center text-gray-600">
          <Shield size={15} />
          <span className="text-sm">
            {user.userRole?.name}
          </span>
        </div>

      </div>

      <div className="mt-5 pt-4 border-t">

        <p className="text-xs text-gray-400">
          User ID
        </p>

        <p className="font-medium">
          {user.userID}
        </p>

      </div>
    </div>
  );
}