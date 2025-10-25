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
    specificAddress: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnished: false,
    amenities: [],
    contactPhone: "",
    advancePayment: "",
    images: [],
  });

  const locationOptions = [
    'KUET Campus',
    'Fulbarigate',
    'Boyra',
    'Khulna City',
    'Daulatpur',
    'Sonadanga',
    'Khalishpur',
    'New Market',
    'Gollamari',
    'Other'
  ];

  const propertyTypes = ['Apartment', 'House', 'Room', 'Hostel'];

  const amenityOptions = [
    'WiFi',
    'Air Conditioning',
    'Generator',
    'Water Supply',
    'Security Guard',
    'CCTV',
    'Parking',
    'Gas Connection',
    'Elevator'
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: isSelected
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("rent", formData.rent);
    data.append("contractDuration", formData.contractDuration);
    data.append("location", formData.location);
    data.append("specificAddress", formData.specificAddress);
    data.append("propertyType", formData.propertyType);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("furnished", formData.furnished);
    data.append("amenities", JSON.stringify(formData.amenities));
    data.append("contactPhone", formData.contactPhone);
    data.append("advancePayment", formData.advancePayment);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    try {
      const res = await axios.post("http://localhost:5002/api/product", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Listing added successfully!");
      navigate("/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-900 mb-6">
          Add New Listing
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="rent"
              placeholder="Rent (৳)"
              value={formData.rent}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
            <input
              type="number"
              name="advancePayment"
              placeholder="Advance Payment (months)"
              value={formData.advancePayment}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <input
            type="number"
            name="contractDuration"
            placeholder="Contract Duration (months)"
            value={formData.contractDuration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          >
            <option value="">Select Location</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <textarea
            name="specificAddress"
            placeholder="Specific Address (House no., Road no., etc.)"
            value={formData.specificAddress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  furnished: e.target.checked,
                }))
              }
              className="w-4 h-4 accent-teal-700"
            />
            <label>Furnished</label>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map((amenity) => {
                const isChecked = formData.amenities.includes(amenity);
                return (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={isChecked}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 accent-teal-700"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <input
            type="tel"
            name="contactPhone"
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
