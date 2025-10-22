import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AddListing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    contractDuration: "",
    location: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5002/api/product",
        formData,
        {
          withCredentials: true, // ✅ allows cookies to be sent
        }
      );

      alert("Listing added successfully!");
      navigate("/listings");
    } catch (error) {
      console.error("Error creating listing:", error.response?.data || error);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-900 mb-6">
          Add New Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full textarea textarea-bordered"
            required
          />
          <input
            type="number"
            name="rent"
            placeholder="Rent (৳)"
            value={formData.rent}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
          <input
            type="number"
            name="contractDuration"
            placeholder="Contract Duration (months)"
            value={formData.contractDuration}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-teal-900 text-white rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
