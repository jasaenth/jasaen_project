"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  ShieldCheck,
  Search,
} from "lucide-react";

import SectionHead from "../SectionHead";
import UserCard from "./UserCard";
import { getUsers } from "@/lib/api/cloudbeds";

export default function UsersPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await getUsers();

      const propertyId = Object.keys(
        response.data || {}
      )[0];

      setUsers(
        response.data?.[propertyId] || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      [
        user.firstName,
        user.lastName,
        user.email,
        user.userRole?.name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const activeUsers = users.filter(
    (user) => user.active === "yes"
  ).length;

  const admins = users.filter(
    (user) =>
      user.userRole?.name ===
      "Administrator"
  ).length;

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHead
        title="Users Management"
        subtitle="Cloudbeds property staff & access management"
      />

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Users
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {users.length}
              </h3>
            </div>

            <Users
              className="text-blue-500"
              size={36}
            />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Active Users
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {activeUsers}
              </h3>
            </div>

            <UserCheck
              className="text-green-500"
              size={36}
            />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Administrators
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {admins}
              </h3>
            </div>

            <ShieldCheck
              className="text-purple-500"
              size={36}
            />
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white border rounded-3xl p-5">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              py-3
              pl-11
              pr-4
            "
          />
        </div>
      </div>

      {/* Users */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.userID}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}