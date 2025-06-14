import React, { useState, useEffect } from "react";
import { Modal, Input, message, Button } from "antd";
import { FaPlus, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { useCreateSubScriptionMutation, useDeleteSubScriptionMutation, useGetSubScriptionQuery, useUpdateScriptionMutation } from "../../redux/features/subscription/subscription";

const Subscription = () => {
  const { data, isLoading, isError } = useGetSubScriptionQuery();
  const [addSubscription, { isLoading: isAdding }] = useCreateSubScriptionMutation();
  const [deleteSubscription, { isLoading: isDeleting }] = useDeleteSubScriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] = useUpdateScriptionMutation();


  const allSubscriptions = data?.data?.attributes || [];
  // console.log(allSubscriptions);

  // Local state to manage subscriptions
  const [subscriptions, setSubscriptions] = useState(allSubscriptions);

  // Modal and form state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscriptionTitle, setSubscriptionTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("monthly");
  const [features, setFeatures] = useState([]); // Features as an array
  const [isActive, setIsActive] = useState(true);
  const [editId, setEditId] = useState(null);

  // Update local subscriptions when API data changes
  useEffect(() => {
    if (data) {
      setSubscriptions(data?.data?.attributes);
    }
  }, [data]);

  const showModal = (edit = false, subscription = null) => {
    setIsEditing(edit);
    setIsModalVisible(true);

    if (edit && subscription) {
      setSubscriptionTitle(subscription.title);
      setPrice(subscription.price);
      setDuration(subscription.duration || "monthly");
      setFeatures(subscription.features || []);
      setIsActive(subscription.isActive);
      setEditId(subscription._id);
    } else {
      setSubscriptionTitle("");
      setPrice("");
      setDuration("monthly");
      setFeatures([]);
      setIsActive(true);
      setEditId(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSubscriptionTitle("");
    setPrice("");
    setDuration("monthly");
    setFeatures([]);
    setIsActive(true);
    setEditId(null);
  };

  const validateFields = () => {
    if (
      !subscriptionTitle.trim() ||
      !price ||
      !duration.trim() ||
      features.length === 0
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const newSubscription = {
      title: subscriptionTitle,
      price: parseFloat(price),
      duration: duration === "monthly" ? "month" : "year", // Corrected assignment
      features,
      isActive
    };


    try {

      const res = await addSubscription(newSubscription);

      if (res?.data?.code == 201) {
        message.success("Subscription added successfully");
        handleCancel();
      }


    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }


  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const updatedSubscription = {
      title: subscriptionTitle,
      price: parseFloat(price),
      duration,
      features,
      isActive,
    };


    try {

      const res = await updateSubscription({ id: editId, data: updatedSubscription });
      console.log(res);
      if (res?.data?.code == 200) {

        message.success("Subscription updated successfully");
        handleCancel();
      }


    } catch (error) {
      console.log(error);
    }


  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this subscription?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const res = deleteSubscription(id);
        if (res?.data?.code == 200) {
          message.success("Subscription deleted successfully");
          refetch();
        }
      },
    });


  };

  // Handle adding a new feature
  const handleAddFeature = () => {
    setFeatures((prevFeatures) => [...prevFeatures, ""]);
  };

  // Handle removing a feature
  const handleRemoveFeature = (index) => {
    setFeatures((prevFeatures) => prevFeatures.filter((_, i) => i !== index));
  };

  // Handle updating the value of a feature
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching subscriptions.</p>;

  // console.log(subscriptions);

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
        {subscriptions?.length === 0 && <p>No subscriptions available.</p>}
        {subscriptions?.map((subscription) => (
          <div
            key={subscription._id}
            className="border border-yellow-400 rounded-xl p-6 relative flex flex-col items-center max-w-xs mx-auto"
          >
            {/* Premium badge */}
            {subscription.isActive && (
              <div className="absolute -top-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                Active
              </div>
            )}

            {/* Title */}
            <h2 className="mt-6 mb-4 text-2xl font-extrabold">{subscription.title}</h2>

            {/* Divider line */}
            <hr className="border-yellow-400 w-full mb-4" />

            {/* Features list */}
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              {subscription.features?.map((feature, i) => (
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
                onClick={() => handleDelete(subscription._id)}
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
            <label className="block mb-1 font-semibold">Subscription Title</label>
            <Input
              placeholder="Enter subscription title"
              value={subscriptionTitle}
              onChange={(e) => setSubscriptionTitle(e.target.value)}
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
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Features</label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  placeholder="Enter feature"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                <Button
                  type="danger"
                  icon={<FaTrashAlt />}
                  onClick={() => handleRemoveFeature(index)}
                  size="small"
                />
              </div>
            ))}
            <Button
              type="dashed"
              icon={<FaPlus />}
              onClick={handleAddFeature}
              size="small"
            >
              Add Feature
            </Button>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Active</label>
            <Input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
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
