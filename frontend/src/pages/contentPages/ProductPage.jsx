import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "../../lib/axios";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Bed, Bath, Check, HomeIcon, Phone, MessageSquare, ChevronLeft, ChevronRight, Users, Home, CreditCard } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import Chat from "../../components/Chat";

const DetailSkeleton = () => (
  <div className="min-h-screen bg-slate-50 py-8 px-4 animate-pulse">
    <div className="max-w-6xl mx-auto">
      <div className="h-6 w-20 bg-slate-200 rounded mb-6" />
      <div className="h-[400px] bg-slate-200 rounded-2xl mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-32 bg-slate-200 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error) return (
    <div className="flex flex-col justify-center items-center h-[60vh] text-center">
      <p className="text-red-500 font-medium mb-3">{error}</p>
      <button onClick={() => navigate(-1)} className="text-teal-600 text-sm hover:underline">Go back</button>
    </div>
  );

  if (!product) return (
    <div className="flex justify-center items-center h-[60vh] text-slate-500">Property not found</div>
  );

  const images = product.images?.length > 0 ? product.images : ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=70"];
  const prevImage = () => setSelectedImage(i => i === 0 ? images.length - 1 : i - 1);
  const nextImage = () => setSelectedImage(i => i === images.length - 1 ? 0 : i + 1);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden mb-8 bg-slate-900">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-[350px] sm:h-[450px] object-cover"
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/60 transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/60 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-2 h-2 rounded-full transition ${i === selectedImage ? 'bg-white scale-125' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {images.slice(0, 4).map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${i === selectedImage ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {images.length > 4 && (
                  <div className="w-14 h-14 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium">
                    +{images.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    product.listingType === 'owner' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {product.listingType === 'owner' ? <><Home className="w-3 h-3" /> Property Owner</> : <><Users className="w-3 h-3" /> Seeking Roommate</>}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    !product.genderPreference || product.genderPreference === 'any' ? 'bg-slate-100 text-slate-600' : product.genderPreference === 'male' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-pink-50 text-pink-700 border border-pink-200'
                  }`}>
                    {!product.genderPreference || product.genderPreference === 'any' ? 'Any Gender' : `${product.genderPreference === 'male' ? 'Males' : 'Females'} Only`}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{product.title}</h1>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location} &middot; {product.specificAddress}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: "Bedrooms", value: product.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: product.bathrooms },
                  { icon: HomeIcon, label: "Type", value: product.propertyType },
                  { icon: Clock, label: "Contract", value: `${product.contractDuration} mo` },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 text-center">
                    <stat.icon className="w-5 h-5 text-teal-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Roommate Details */}
              {product.listingType === 'tenant-roommate' && (
                <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" /> About the Current Tenant
                  </h3>
                  <p className="text-purple-800 text-sm leading-relaxed">
                    {product.listingTypeDetails || <span className="italic text-purple-500">No additional details provided</span>}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.furnished && (
                    <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">
                      <Check className="w-4 h-4 text-teal-600" /> Furnished
                    </div>
                  )}
                  {product.amenities?.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">
                      <Check className="w-4 h-4 text-teal-600" /> {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-slate-900">{product.rent}</span>
                    <span className="text-slate-500">৳/month</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-5 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> {product.advancePayment} months advance
                  </p>

                  {/* Contact */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Posted by</span>
                      <span className="font-medium text-slate-800">{product.user?.username}</span>
                    </div>
                    <a href={`tel:${product.contactPhone}`} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-800 font-medium rounded-xl hover:bg-slate-200 transition">
                      <Phone className="w-4 h-4" /> {product.contactPhone}
                    </a>
                    {user && user._id !== product.user._id && (
                      <button
                        onClick={() => setShowChat(true)}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition"
                      >
                        <MessageSquare className="w-4 h-4" /> Send Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          {showChat && (
            <Chat
              listingId={product._id}
              receiverId={product.user._id}
              receiverName={product.user.username}
              onClose={() => setShowChat(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ProductPage;
