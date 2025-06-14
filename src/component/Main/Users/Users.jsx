import { useState, useEffect } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker, Modal } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const { Item } = Form;

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]); // Store filtered data
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user

  const { data } = useGetAllUsersQuery();
  const allUsers = data?.data?.attributes?.users; 

  // Effect to filter data based on searchText and selectedDate
  useEffect(() => {
    if (allUsers) {
      const filteredUsers = allUsers.filter((user) => {
        const matchesSearchText =
          user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase());

        const matchesDate =
          !selectedDate ||
          moment(user.createdAt).isSame(selectedDate, "day");

        return matchesSearchText && matchesDate;
      });

      setDataSource(filteredUsers);
    }
  }, [searchText, selectedDate, allUsers]);

  // Handle opening modal with user details
  const handleOpenModal = (user) => {
    setSelectedUser(user); // Set selected user
    setIsModalVisible(true); // Show the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null); // Clear selected user
  };

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
    {
      title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber",
      render: (text) => <span>{text || "N/A"}</span>
    },
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
        <button onClick={() => handleOpenModal(record)} className="text-2xl">
          <GoInfo />
        </button>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/"} className="text-2xl flex items-center">
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

      {/* Modal for User Details */}
      <Modal
        // title="User Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null} // You can add buttons here if needed
      >
        {selectedUser ? (
          <div className="space-y-5">
            <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone Number:</strong> {selectedUser.phoneNumber || "N/A"}</p>
            <p><strong>Joined Date:</strong> {moment(selectedUser.createdAt).format("DD MMM YYYY")}</p>
            {/* Add any other user details here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </section>
  );
};

export default Users;
