"use client";

import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  search: string;
  role: string;
  setSearch: (value: string) => void;
  setRole: (value: string) => void;
}

const UsersFilters = ({
  search,
  role,
  setSearch,
  setRole,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-borderlight p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-textmuted"
          />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 border border-borderlight rounded-xl"
          />
        </div>

        {/* Right */}
        {/* <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="px-4 py-3 border border-borderlight rounded-xl"
          >
            <option>All Roles</option>
            <option>Guest</option>
            <option>Staff</option>
            <option>Admin</option>
          </select>

          <button className="px-5 py-3 border border-borderlight rounded-xl flex items-center justify-center gap-2">
            <Filter size={18} />
            Filter
          </button>

          <Link
            href="/admin/users/add-user"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add New User
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default UsersFilters;