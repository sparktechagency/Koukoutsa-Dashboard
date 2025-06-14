import { message, Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetNotificationQuery, useReadNotificationMutation } from "../../../redux/features/notificaiton/notification";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetNotificationQuery();
  const [readNotification] = useReadNotificationMutation(); 
  const allNotifications = data?.data?.attributes?.notifications || [];

  console.log(allNotifications);

  // Static notifications data
  const allNotification = {
    notifications: [
      {
        id: 1,
        message: "Your profile has been updated successfully.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        message: "New comment on your post.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        message: "You have a new follower.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        message: "Password changed successfully.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        message: "You received a new message.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        message: "Account settings updated.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 7,
        message: "New blog post published.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 8,
        message: "You have new notifications.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 9,
        message: "Updated privacy policy.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 10,
        message: "New update available for your app.",
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const pageSize = 25;

  // Pagination Logic
  const paginatedNotifications = allNotifications?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  const handleShowToast = async (id) => {
    console.log(id);

    try {

      const res = await readNotification(id);
      console.log(res);
      if (res?.data?.code == 200) {
        message.success("Notification marked as read!");
      }

    } catch (error) {

    }

  };


  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4">
        <FaAngleLeft /> Notification
      </Link>

      <div className="space-y-4">
        {paginatedNotifications?.map((item) => (
          <div
            onClick={() => handleShowToast(item?._id)}
            key={item._id}
            className={`border border-primary  cursor-pointer rounded-md p-4 flex items-center space-x-4 ${item?.status === "unread" ? "bg-[#ffd50028]" : ""}`}
          >
            <div className="text-primary border border-primary rounded-full p-2">
              <span className=" bg-primary p-1.5 rounded-full absolute ml-4 z-20"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item?.content}</p>
              <p className="text-gray-500">{moment(item?.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={allNotification?.notifications.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
