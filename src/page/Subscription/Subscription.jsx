import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useCreateSubScriptionMutation, useDeleteSubScriptionMutation, useGetSubScriptionQuery, useUpdateScriptionMutation } from '../../redux/features/subscription/subscription';

const Subscription = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('weekly');
  const [condition, setCondition] = useState(''); // New state for condition
  const [discount, setDiscount] = useState(''); // New state for discount
  const [id, setId] = useState('');

  const { data: getAllSubScription, isLoading } = useGetSubScriptionQuery();
  const [createSubScription] = useCreateSubScriptionMutation();
  const [updateSubScription] = useUpdateScriptionMutation();
  const [deleteSubScription] = useDeleteSubScriptionMutation();

  // Handle open modal for adding or editing
  const showModal = (edit = false, subscription = {}) => {
    setIsEditing(edit);
    setIsModalVisible(true);
    if (edit) {
      setSubscriptionName(subscription.name);
      setPrice(subscription.price);
      setDescription(subscription.details);
      setCondition(subscription.condition || ''); // pre-fill condition
      setDiscount(subscription.discount || ''); // pre-fill discount
      setId(subscription.id); // Pre-fill for editing
    } else {
      setSubscriptionName('');
      setPrice('');
      setDescription('');
      setCondition('');
      setDiscount('');
      setId(null);
    }
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setSubscriptionName('');
    setPrice('');
    setDescription('');
    setCondition('');
    setDiscount('');
  };

  // Handle form submit for adding subscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subscriptionName || !price || !description || !condition || !discount) {
      message.error('Please fill all fields!');
      return;
    }

    const formData = {
      name: subscriptionName,
      price,
      details: description,
      condition,
      discount,
      duration
    };

    try {
      const res = await createSubScription(formData).unwrap();
      if (res?.message) {
        message.success(res?.message);
        handleCancel();
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  // Handle form submit for updating subscription
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      name: subscriptionName,
      price,
      details: description,
      condition,
      discount,
      duration,
      id
    };

    try {
      const res = await updateSubScription(formData).unwrap();
      if (res?.message) {
        message.success(res?.message);
        handleCancel();
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  // Handle delete subscription
  const handleDelete = async (subscription) => {
    try {
      const res = await deleteSubScription(subscription.id).unwrap();
      if (res?.message) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  return (
    <section>
      <div className="w-full md:flex justify-end items-center py-6">
        <button
          type="primary"
          className="text-xl px-2 md:px-5 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded md:mb-0"
          onClick={() => showModal(false)}
        >
          <FaPlus className="text-xl font-semibold text-white" /> Add Subscription
        </button>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {getAllSubScription?.data?.map((subscription) => (
          <div key={subscription.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
            <div>
              <h2 className="my-5 text-3xl font-semibold text-center">{subscription.name}</h2>
              <p className="text-center text-xl">${subscription.price} / {subscription.duration}</p>
              <p className="my-5 px-5 text-base text-center">{subscription.details}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5">
              <button
                onClick={() => handleDelete(subscription)}
                className="w-full py-3 px-6 border border-primary rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => showModal(true, subscription)}
                className="w-full py-3 px-6 border bg-primary text-white rounded-lg"
              >
                Edit Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing subscription */}
      <Modal
        title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <span className="block mb-2 font-semibold">Subscription name</span>
            <Input
              placeholder="Enter subscription name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <span className="block mb-2 font-semibold">Subscription Price</span>
            <Input
              placeholder="Enter price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <span className="block mb-2 font-semibold">Condition</span>
            <Input
              placeholder="Enter condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <span className="block mb-2 font-semibold">Discount</span>
            <Input
              placeholder="Enter discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white"
          >
            {isEditing ? 'Update Subscription' : 'Add Subscription'}
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Subscription;
