import { useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const { Item } = Form;

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]); // ✅ Store filtered data

  // Static demo data for the table
  const demoData = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      createdAt: "2025-05-01",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "987-654-3210",
      createdAt: "2025-05-02",
    },
    {
      id: 3,
      fullName: "Alice Johnson",
      email: "alice@example.com",
      phoneNumber: "111-222-3333",
      createdAt: "2025-05-03",
    },
    {
      id: 4,
      fullName: "Bob Brown",
      email: "bob@example.com",
      phoneNumber: "444-555-6666",
      createdAt: "2025-05-04",
    },
    // More users can be added here
  ];

  // Set the static demo data into state
  useState(() => {
    setDataSource(demoData);
  }, []);

  // Columns configuration for the table
  const columns = [
    {
      title: "#SI", dataIndex: "si", key: "si",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      }
    },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/users/${record.id}`}>
          <GoInfo className="text-2xl" />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> User list
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#ffd500a8]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#ffd500a8]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#ffd500a8] text-black">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#ffd400",
              headerColor: "#fff",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />
      </ConfigProvider>
    </section>
  );
};

export default Users;
