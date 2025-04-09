import { useEffect, useState } from "react";
import { UserItem } from "../../features/user/UserItem";
import { useGetAllUsersQuery, UserI } from "../../features/user/usersApi";
import { TbFilterSearch } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { Modal } from "../Modal";
import { AddUserForm } from "../../features/user/AddUserForm";
import { NoResult } from "../NoResult";

export const Users = () => {
  const { data: users } = useGetAllUsersQuery();
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

  if (!users?.length) {
    return <NoResult />;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="p-4 flex  items-center gap-3 bg-primary/20">
          <TbFilterSearch size={24} />
          <label>
            <input
              type="checkbox"
              checked={filters.active}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, active: e.target.checked }))
              }
            />
            Active
          </label>

          <select
            title="filter"
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
            className="bg-primary rounded outline-none"
          >
            <option value="">All Roles</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>

          <input
            type="text"
            placeholder="Search by username"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="bg-primary outline-none rounded px-1 placeholder:text-xs"
          />
        </div>
        <div className="flex flex-col px-[20%] gap-2 p-2">
          {filteredUsers?.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
          <div className="flex flex-row items-center justify-center bg-primary p-2 rounded">
            <button title="add" onClick={() => setIsAddOpen(true)}>
              <IoIosAdd size={24} />
            </button>
          </div>
        </div>
      </div>
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
