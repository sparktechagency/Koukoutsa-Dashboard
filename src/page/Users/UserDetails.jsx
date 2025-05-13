import { ConfigProvider, message, Table } from "antd";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useBlockUserMutation, useGetSingleUserQuery, useUnBlockUserMutation } from "../../redux/features/user/userApi";
import { GoInfo } from "react-icons/go";
import moment from "moment";

const UserDetails = () => {


  const { id } = useParams();

  const { data: userData } = useGetSingleUserQuery({ id })

  // console.log(userData?.data);
  const userDataFull = userData?.data;
  console.log(userDataFull);


  const [userBlock] = useBlockUserMutation();
  const [userUnBlock] = useUnBlockUserMutation();

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



  const handleUserRemove = async () => {

    try {

      const res = await userBlock(id);

      console.log(res);
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

  const handleUserUnBlock = async () => {
    try {

      const res = await userUnBlock(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Link to={"/users"} className="text-2xl flex items-center mt-5">
        <FaAngleLeft /> User Details
      </Link>


      <div className="grid grid-cols-2 gap-5 my-5">
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

        <div className=" w-full md:w-3/4 mx-auto bg-[#fff3b8] p-5 rounded-lg border-2 border-primary ">
          <div className="flex items-center justify-between gap-5 mb-5">
            <div className="flex items-center gap-5">
              <img
                className="w-24 h-24 rounded-full"
                src="../../../public/logo/userimage.png"
                alt="User"
              />
              <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
            </div>
            {/* <div className="flex items-center gap-5">
              <Link to={"/users"} className="border border-[#91838342] px-5 py-2 rounded-lg">Cancel</Link>
              <div>
                {
                  userDataFull?.isBanned ?
                    <button onClick={handleUserUnBlock} className="bg-[#3c80e7] text-white px-5 py-2 rounded-lg">UnBlock</button>
                    :
                    <button onClick={handleUserRemove} className="bg-[#e74c3c] text-white px-5 py-2 rounded-lg">Block</button>
                }
              </div>
            </div> */}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">Name</span>
              <span>{userDataFull?.fullName || "Nerob"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">Email</span>
              <span>{userDataFull?.email || "demo@gmail"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">Status</span>
              <span>{!userDataFull?.isBanned ? "Active" : "Blocked"}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">Phone Number</span>
              <span>{userDataFull?.phoneNumber || "0123456789"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">User Type</span>
              <span>{userDataFull?.role || "Admin"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
              <span className="font-semibold">Joining Date</span>
              <span>
                {new Date(userDataFull?.createdAt || new Date()).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>


        </div>
      </div>

    </div>
  );
};

export default UserDetails;



