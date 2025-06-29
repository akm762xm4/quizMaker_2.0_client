import { useEffect, useState } from "react";
import { UserItem } from "../../features/user/UserItem";
import { useGetAllUsersQuery, UserI } from "../../features/user/usersApi";
import { TbFilterSearch } from "react-icons/tb";
import { Modal } from "../Modal";
import { AddUserForm } from "../../features/user/AddUserForm";
import { NoResult } from "../NoResult";
import { IoIosAdd } from "react-icons/io";
import Loader from "../Loader";

export const Users = () => {
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState<UserI[] | undefined>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filters, setFilters] = useState({
    active: false,
    role: "",
    search: "",
  });

  useEffect(() => {
    let filtered = users;

    if (filters.active) {
      filtered = filtered?.filter((user) => user.isActive);
    }

    if (filters.role) {
      filtered = filtered?.filter((user) => user.role === filters.role);
    }

    if (filters.search) {
      filtered = filtered?.filter((user) =>
        user.username.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [filters, users]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!isLoading && !isFetching && !users?.length) {
    return <NoResult message="No users found." />;
  }

  return (
    <>
      {/* Filter + Header */}
      <div className="p-4 flex flex-col gap-4 md:flex-row md:items-center justify-between bg-primary/20 rounded mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <TbFilterSearch size={24} />
          <label className="flex items-center gap-2 text-sm md:text-base">
            <input
              type="checkbox"
              checked={filters.active}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, active: e.target.checked }))
              }
              className="w-4 h-4"
            />
            Active
          </label>

          <select
            title="filter"
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
            className="bg-primary rounded outline-none text-sm md:text-base"
          >
            <option value="">All Roles</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by username"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="bg-primary outline-none rounded p-2 placeholder:text-xs text-sm w-full sm:w-auto"
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn-primary self-end"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[10%]">
        {filteredUsers?.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}

        {/* Add User Card */}
        <div
          onClick={() => setIsAddOpen(true)}
          className="cursor-pointer border-2 border-dashed border-accent text-accent rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-muted transition"
        >
          <IoIosAdd size={36} />
          <span className="mt-1 font-medium text-sm">Add User</span>
        </div>
      </div>

      {/* Modal */}
      {isAddOpen && (
        <Modal
          title="Add User"
          child={<AddUserForm closeModal={() => setIsAddOpen(false)} />}
          setIsOpen={setIsAddOpen}
        />
      )}
    </>
  );
};
