"use client";

import { useState } from "react";
import UsersFilters from "@/components/admin/users/UsersFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import UserViewModal from "@/components/admin/users/UserViewModal";
import UserEditModal from "@/components/admin/users/UserEditModal";
import UsersPagination from "@/components/admin/users/UsersPagination";
import {
  User,
  usersData,
} from "@/components/admin/users/usersData";

const ITEMS_PER_PAGE = 8;

export default function UsersPage() {
  const [users, setUsers] =
    useState<User[]>(usersData);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [editUser, setEditUser] =
    useState<User | null>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesRole =
      role === "All Roles" ||
      user.role === role;

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(
    filteredUsers.length / ITEMS_PER_PAGE
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  const handleSave = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    setEditUser(null);
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