import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const Subscription = () => {
  const initialSubscriptions = [
    {
      id: "4",
      name: "Premium Plan",
      price: "20.99",
      details: `Limited profile views per day
Limited voice notes and message
Standard verification process`,
      duration: "3 Month",
      condition: "Premium",
      discount: "N/A",
    },
    {
      id: "1",
      name: "Basic Plan",
      price: "9.99",
      details: `Access to basic features
Limited support`,
      duration: "monthly",
      condition: "Standard",
      discount: "5%",
    },
    {
      id: "2",
      name: "Pro Plan",
      price: "29.99",
      details: `Full access to all features
Priority support`,
      duration: "monthly",
      condition: "Standard",
      discount: "10%",
    },
  ];

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("monthly");
  const [condition, setCondition] = useState("");
  const [discount, setDiscount] = useState("");
  const [editId, setEditId] = useState(null);

  const showModal = (edit = false, subscription = null) => {
    setIsEditing(edit);
    setIsModalVisible(true);
    if (edit && subscription) {
      setSubscriptionName(subscription.name);
      setPrice(subscription.price);
      setDescription(subscription.details);
      setDuration(subscription.duration || "monthly");
      setCondition(subscription.condition);
      setDiscount(subscription.discount);
      setEditId(subscription.id);
    } else {
      setSubscriptionName("");
      setPrice("");
      setDescription("");
      setDuration("monthly");
      setCondition("");
      setDiscount("");
      setEditId(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSubscriptionName("");
    setPrice("");
    setDescription("");
    setDuration("monthly");
    setCondition("");
    setDiscount("");
    setEditId(null);
  };

  const validateFields = () => {
    if (
      !subscriptionName.trim() ||
      !price.trim() ||
      !description.trim() ||
      !condition.trim() ||
      !discount.trim() ||
      !duration.trim()
    ) {
      message.error("Please fill all fields!");
      return false;
    }
    if (isNaN(Number(price))) {
      message.error("Price must be a valid number!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const newSubscription = {
      id: Date.now().toString(),
      name: subscriptionName,
      price,
      details: description,
      duration,
      condition,
      discount,
    };

    setSubscriptions((prev) => [...prev, newSubscription]);
    message.success("Subscription added successfully");
    handleCancel();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === editId
          ? {
              ...sub,
              name: subscriptionName,
              price,
              details: description,
              duration,
              condition,
              discount,
            }
          : sub
      )
    );
    message.success("Subscription updated successfully");
    handleCancel();
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this subscription?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
        message.success("Subscription deleted");
      },
    });
  };

  return (
    <section>
      <div className="w-full flex justify-end items-center py-6">
        <button
          type="button"
          className="text-xl px-4 py-3 bg-primary text-white flex items-center gap-2 rounded"
          onClick={() => showModal(false)}
        >
          <FaPlus className="text-xl" /> Add Subscription
        </button>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {subscriptions.length === 0 && <p>No subscriptions available.</p>}
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="border border-yellow-400 rounded-xl p-6 relative flex flex-col items-center max-w-xs mx-auto"
          >
            {/* Premium badge */}
            {subscription.condition === "Premium" && (
              <div className="absolute -top-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                Premium
              </div>
            )}

            {/* Duration */}
            <h2 className="mt-6 mb-4 text-2xl font-extrabold">{subscription.duration}</h2>

            {/* Divider line */}
            <hr className="border-yellow-400 w-full mb-4" />

            {/* Features list */}
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              {subscription.details.split("\n").map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="text-center text-xl font-bold text-gray-900">
              ${subscription.price} /{" "}
              <span className="font-normal">
                {subscription.duration === "yearly"
                  ? "Yearly"
                  : subscription.duration}
              </span>
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6 w-full">
              <button
                onClick={() => handleDelete(subscription.id)}
                className="py-2 px-4 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
              <button
                onClick={() => showModal(true, subscription)}
                className="py-2 px-4 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
              >
                Edit Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        title={isEditing ? "Edit Subscription" : "Add Subscription"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Subscription Name</label>
            <Input
              placeholder="Enter subscription name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Price</label>
            <Input
              placeholder="Enter price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Duration</label>
            <select
              className="w-full p-2 border rounded"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="3 Month">3 Month</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Condition</label>
            <Input
              placeholder="Enter condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount</label>
            <Input
              placeholder="Enter discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <Input.TextArea
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded font-semibold hover:opacity-90 transition"
          >
            {isEditing ? "Update Subscription" : "Add Subscription"}
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Subscription;
