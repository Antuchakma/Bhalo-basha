import { useState } from "react";
import api from "../../lib/axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, ImageIcon } from "lucide-react";

function AddListing() {
  const [formData, setFormData] = useState({
    title: "", description: "", rent: "", contractDuration: "", location: "",
    specificAddress: "", propertyType: "", listingType: "", listingTypeDetails: "",
    genderPreference: "", bedrooms: "", bathrooms: "", furnished: false,
    amenities: [], contactPhone: "", advancePayment: "", images: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const locationOptions = ['KUET Campus', 'Fulbarigate', 'Boyra', 'Khulna City', 'Daulatpur', 'Sonadanga', 'Khalishpur', 'New Market', 'Gollamari', 'Other'];
  const propertyTypes = ['Apartment', 'House', 'Room', 'Hostel'];
  const amenityOptions = ['WiFi', 'Air Conditioning', 'Generator', 'Water Supply', 'Security Guard', 'CCTV', 'Parking', 'Gas Connection', 'Elevator'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.listingType) { toast.error("Please select listing type"); return; }
    if (!formData.genderPreference) { toast.error("Please select gender preference"); return; }

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === 'images') {
        for (const file of val) data.append("images", file);
      } else if (key === 'amenities') {
        data.append(key, JSON.stringify(val));
      } else {
        data.append(key, val);
      }
    });

    try {
      await api.post("/api/product", data, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Listing created!");
      navigate("/listings");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white focus:outline-none transition";
  const selectClass = inputClass + " appearance-none cursor-pointer";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create a Listing</h1>
          <p className="text-sm text-slate-500 mt-1">Fill in the details below to post your property</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">

          {/* Section: Listing Type */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Listing Type</h3>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, listingType: 'owner' }))}
                className={`p-4 rounded-xl border-2 text-left transition-all ${formData.listingType === 'owner' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <span className="block text-sm font-semibold text-slate-800">Property Owner</span>
                <span className="block text-xs text-slate-500 mt-1">Rent out my property</span>
              </button>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, listingType: 'tenant-roommate' }))}
                className={`p-4 rounded-xl border-2 text-left transition-all ${formData.listingType === 'tenant-roommate' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <span className="block text-sm font-semibold text-slate-800">Seeking Roommate</span>
                <span className="block text-xs text-slate-500 mt-1">Share my rented space</span>
              </button>
            </div>
            {formData.listingType === 'tenant-roommate' && (
              <textarea name="listingTypeDetails" placeholder="Tell potential roommates about yourself..." value={formData.listingTypeDetails}
                onChange={handleChange} className={`${inputClass} mt-4`} rows={3} required />
            )}
          </div>

          {/* Section: Basic Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Basic Information</h3>
            <div>
              <label className={labelClass}>Title</label>
              <input type="text" name="title" placeholder="e.g., Spacious 2BR near KUET gate" value={formData.title} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" placeholder="Describe the property, surroundings, and any rules..." value={formData.description} onChange={handleChange} className={inputClass} rows={4} required />
            </div>
          </div>

          {/* Section: Pricing */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Pricing & Contract</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Rent (৳/mo)</label>
                <input type="number" name="rent" placeholder="5000" value={formData.rent} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Advance (months)</label>
                <input type="number" name="advancePayment" placeholder="2" value={formData.advancePayment} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Contract (months)</label>
                <input type="number" name="contractDuration" placeholder="12" value={formData.contractDuration} onChange={handleChange} className={inputClass} required />
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Location</h3>
            <div>
              <label className={labelClass}>Area</label>
              <select name="location" value={formData.location} onChange={handleChange} className={selectClass} required>
                <option value="">Select location</option>
                {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Specific Address</label>
              <textarea name="specificAddress" placeholder="House no., Road no., Landmark..." value={formData.specificAddress} onChange={handleChange} className={inputClass} rows={2} required />
            </div>
          </div>

          {/* Section: Property Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Property Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={selectClass} required>
                  <option value="">Select</option>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input type="number" name="bedrooms" placeholder="2" value={formData.bedrooms} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input type="number" name="bathrooms" placeholder="1" value={formData.bathrooms} onChange={handleChange} className={inputClass} required />
              </div>
            </div>

            {/* Gender Preference */}
            <div>
              <label className={labelClass}>Gender Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'male', label: 'Males Only', active: 'border-blue-500 bg-blue-50 text-blue-700' },
                  { value: 'female', label: 'Females Only', active: 'border-pink-500 bg-pink-50 text-pink-700' },
                  { value: 'any', label: 'Any Gender', active: 'border-slate-500 bg-slate-100 text-slate-700' },
                ].map(opt => (
                  <button key={opt.value} type="button"
                    onClick={() => setFormData(prev => ({ ...prev, genderPreference: opt.value }))}
                    className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.genderPreference === opt.value ? opt.active : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnished */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.furnished}
                onChange={(e) => setFormData(prev => ({ ...prev, furnished: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span className="text-sm text-slate-700 font-medium">Furnished</span>
            </label>

            {/* Amenities */}
            <div>
              <label className={labelClass}>Amenities</label>
              <div className="grid grid-cols-3 gap-2">
                {amenityOptions.map(amenity => {
                  const checked = formData.amenities.includes(amenity);
                  return (
                    <button key={amenity} type="button" onClick={() => handleAmenityToggle(amenity)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        checked ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}>
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Contact & Images */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Contact & Images</h3>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="tel" name="contactPhone" placeholder="+880 1XXXXXXXXX" value={formData.contactPhone} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Property Images</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition">
                <div className="flex flex-col items-center">
                  {formData.images.length > 0 ? (
                    <>
                      <ImageIcon className="w-8 h-8 text-teal-500 mb-1" />
                      <p className="text-sm text-teal-600 font-medium">{formData.images.length} file{formData.images.length > 1 ? 's' : ''} selected</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-400 mb-1" />
                      <p className="text-sm text-slate-500">Click to upload images</p>
                      <p className="text-xs text-slate-400">JPG, PNG, WebP</p>
                    </>
                  )}
                </div>
                <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} className="hidden" required />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {submitting ? 'Creating...' : 'Publish Listing'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddListing;
