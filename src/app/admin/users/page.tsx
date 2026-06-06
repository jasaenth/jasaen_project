"use client";

import { useState } from "react";
import UsersFilters from "@/components/admin/users/UsersFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import UserViewModal from "@/components/admin/users/UserViewModal";
import UserEditModal from "@/components/admin/users/UserEditModal";
import UsersPagination from "@/components/admin/users/UsersPagination";
import { IUser } from "@/types/User";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [editUser, setEditUser] = useState<IUser | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.mobile.includes(search);

    const matchesRole =
      role === "All Roles" || role === "All Roles"
        ? true
        : user.role === role.toUpperCase();

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("User deleted");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSave = async (updatedUser: IUser) => {
    try {
      const res = await fetch(`/api/users/${updatedUser._id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          role: updatedUser.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("User updated");

      setUsers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? data.data : user)),
      );

      setEditUser(null);
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/users");

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setUsers(data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <UsersFilters
        search={search}
        role={role}
        setSearch={setSearch}
        setRole={setRole}
      />

      <UsersTable
        users={paginatedUsers}
        onView={setSelectedUser}
        onEdit={setEditUser}
        onDelete={handleDelete}
      />

      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <UserViewModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      <UserEditModal
        user={editUser}
        onClose={() => setEditUser(null)}
        onSave={handleSave}
      />
    </div>
  );
}
