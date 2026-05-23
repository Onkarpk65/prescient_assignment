import { useState } from "react";
import axios from "axios";

import NavBar from "./components/NavBar";
import ItemCard from "./components/ItemCard";
import useGetAllItems from "./hooks/useGetAllItems";

console.log(import.meta.env.VITE_API_BASE_URL);

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const { items, loading, fetchItems } = useGetAllItems();
  const [editingItem, setEditingItem] = useState(null);
  const [errors, setErrors] = useState([]);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "price") {
      formattedValue = parseInt(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // OPEN ADD MODAL
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setErrors([]);
    setFormData({
      name: "",
      price: "",
    });

    document.getElementById("item_modal").showModal();
  };

  // HANDLE EDIT
  const handleEdit = (item) => {
    setEditingItem(item);
    setErrors([]);
    setFormData({
      name: item.name,
      price: item.price,
    });

    document.getElementById("item_modal").showModal();
  };

  // HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/shoppingcart/api/v1/items/${id}`,
      );

      await fetchItems();
    } catch (error) {
      console.log("Error deleting item:", error.message);
    }
  };

  // HANDLE SUBMIT (ADD + EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // EDIT MODE
      if (editingItem) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/shoppingcart/api/v1/items/${editingItem._id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
      }

      // ADD MODE
      else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shoppingcart/api/v1/items`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      // REFRESH ITEMS
      await fetchItems();

      // RESET FORM
      setFormData({
        name: "",
        price: "",
      });

      setEditingItem(null);

      // CLOSE MODAL
      document.getElementById("item_modal").close();
    } catch (error) {
      console.log(error);

      if (error.response?.data?.err) {
        setErrors(error.response.data.err);
      }
    }
  };

  const renderItemCardContainer = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="text-center py-10 text-gray-500">
          No items found in shopping cart
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            onDelete={handleDelete}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </div>
    );
  };

  const renderItemTotal = () => {
    const total = items.reduce((sum, item) => sum + Number(item.price), 0);

    return (
      <div className="text-right mt-6">
        <span className="text-lg font-semibold">
          Total: ₹{total.toFixed(2)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="px-5 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>

          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            + Add Item
          </button>
        </div>

        {/* Items */}
        {renderItemCardContainer()}
        {/* Total */}
        {items.length > 0 && renderItemTotal()}
      </div>

      {/* Modal */}
      <dialog id="item_modal" className="modal">
        <div className="modal-box relative">
          {/* Close Button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Heading */}
          <h3 className="font-bold text-xl mb-5">
            {editingItem ? "Edit Item" : "Add New Item"}
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-500 text-sm">
                    * {error.message}
                  </p>
                ))}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              {editingItem ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default App;
