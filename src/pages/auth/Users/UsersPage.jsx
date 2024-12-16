import { TreeView } from "../../../../views/TreeView";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UsersPage() {
  const [pageTitle, setPageTitle] = useState("Users"); // Add a state for the title

  const usersData = [
    {
      id: "1",
      name: "Budiman Zahri",
      email: "amba@example.com",
      role: "Admin",
      point: "5000",
    },
    {
      id: "2",
      name: "Ambatukam",
      email: "Ambatukam@example.com",
      role: "User",
      point: "15000",
    },
  ];

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "point",
      header: "Point",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button size="sm">View</Button>
      ),
    },
  ];

  const handleDeleteRow = (rowId) => {
    console.log(`Deleted row with id: ${rowId}`);
  };

  return (
    <div className="w-full p-4 pt-12 lg:w-[calc(100%-250px)] lg:ml-[250px]">
      <TreeView data={usersData} columns={columns} title={pageTitle} onDeleteRow={handleDeleteRow} />
    </div>
  );
}
