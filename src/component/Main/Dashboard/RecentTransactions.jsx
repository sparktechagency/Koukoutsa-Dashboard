import { ConfigProvider, Table, Pagination, Space, message, Modal, Button } from "antd";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import { useBlockUserMutation, useUnBlockUserMutation } from "../../../redux/features/user/userApi";

const RecentTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(6); // Items per page
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user details

  const [userBlock] = useBlockUserMutation();
  const [userUnBlock] = useUnBlockUserMutation();

  // Handle User Blocking
  const handleUserRemove = async (id) => {
    try {
      const res = await userBlock(id);
      if (res.error) {
        message.error(res.error.data.message);
      }
      if (res.data) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // Handle User Unblocking
  const handleUserUnBlock = async (id) => {
    try {
      const res = await userUnBlock(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Open Modal with User Details
  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex flex-row justify-center">
          <button onClick={() => viewDetails(record)}>
            <HiOutlineDotsHorizontal className="text-2xl" />
          </button>
        </Space>
      ),
    },
  ];

  // Assuming 'recentUsers' is available in your component context (e.g., from API data or state)
  const recentUsers = [
    // Add your raw data here
    // Example:
    { id: 1, fullName: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2025-05-12" },
    { id: 2, fullName: "Jane Smith", email: "jane@example.com", role: "User", createdAt: "2025-05-11" },
    // More users...
  ];

  // Paginate the raw data
  const paginatedData = recentUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dataSource = paginatedData.map((user, index) => ({
    key: user.id,
    si: (currentPage - 1) * pageSize + index + 1, // Correct the serial number based on page
    userName: user.fullName,
    email: user.email,
    role: user.role,
    joinDate: user.createdAt.split(",")[0], // Adjust based on your date format
  }));

  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg">
      <div className="flex items-center justify-between flex-wrap my-10">
        <h1 className="text-2xl flex items-center">Recent User</h1>
      </div>

      {/* Table */}
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
          columns={columns}
          dataSource={dataSource}
          pagination={false} // Disable pagination in the table to handle it manually
          scroll={{ x: 500 }}
          className="text-center"
        />
      </ConfigProvider>

      {/* Custom Pagination Component */}
      <div className="flex justify-center my-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={recentUsers?.length} // Total is based on the raw data
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          style={{ display: "flex", justifyContent: "center", width: "100%" }} // Custom style for centering
        />
      </div>

      {/* User Details Modal */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={[]}>
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-10">User Details</h2>
            <p className="flex items-center justify-between my-5"><strong>Name:</strong> {selectedUser.userName}</p>
            <p className="flex items-center justify-between my-5"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="flex items-center justify-between my-5"><strong>Role:</strong> {selectedUser.role}</p>
            <p className="flex items-center justify-between my-5"><strong>Join Date:</strong> {selectedUser.joinDate}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentTransactions;
