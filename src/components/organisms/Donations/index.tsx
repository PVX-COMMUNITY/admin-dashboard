import { TableCustom } from "@/components/molecules/TableCustom";

export default function Donations() {
  const columnsName = [
    {
      name: "ID",
      mapper: "id",
    },
    { name: "Username", mapper: "username" },
    { name: "Number", mapper: "number" },
    { name: "Donation", mapper: "donation" },
  ];

  const columnsData = [
    {
      id: "1",
      username: "abcc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "2",
      username: "abcdef",
      number: "1234567890",
      donation: 50,
    },
    {
      id: "3",
      username: "abcd",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "4",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "5",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "6",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "7",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "8",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "9",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
    {
      id: "10",
      username: "abc",
      number: "1234567890",
      donation: 40,
    },
  ];

  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
  };

  return (
    <div>
      <TableCustom
        columnsName={columnsName}
        columnsData={columnsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showEdit={true}
        showDelete={true}
      />
    </div>
  );
}
