import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Message from "./models/message.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// ─── Users ──────────────────────────────────────────────────────────────────

const users = [
  {
    fullname: "Rahim Uddin",
    username: "rahim_owner",
    password: "password123",
    role: "owner",
    profilepic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    fullname: "Fatema Akter",
    username: "fatema_owner",
    password: "password123",
    role: "owner",
    profilepic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    fullname: "Kamal Hossain",
    username: "kamal_owner",
    password: "password123",
    role: "owner",
    profilepic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  },
  {
    fullname: "Nusrat Jahan",
    username: "nusrat_renter",
    password: "password123",
    role: "renter",
    profilepic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  },
  {
    fullname: "Arif Rahman",
    username: "arif_renter",
    password: "password123",
    role: "renter",
    profilepic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
  },
  {
    fullname: "Sumaiya Khatun",
    username: "sumaiya_renter",
    password: "password123",
    role: "renter",
    profilepic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
  },
];

// ─── Listings ───────────────────────────────────────────────────────────────

// Each listing uses `ownerIndex` to reference which user (by array index) owns it.
const listings = [
  {
    ownerIndex: 0, // Rahim
    title: "Spacious 2BR Flat Near KUET Main Gate",
    description:
      "Well-maintained 2-bedroom apartment just 5 minutes walk from KUET main gate. The flat gets excellent natural light and cross ventilation. Both bedrooms are spacious with built-in wardrobes. Kitchen has modern tiles and gas connection. Rooftop access available for drying clothes. Very quiet neighborhood, ideal for students who need a peaceful study environment. Grocery shops and restaurants within walking distance.",
    rent: 8000,
    contractDuration: 12,
    location: "KUET Campus",
    specificAddress: "House 14, Road 3, KUET Residential Area",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    furnished: false,
    amenities: ["Water Supply", "Gas Connection", "WiFi"],
    listingType: "owner",
    genderPreference: "male",
    contactPhone: "+880 1712345678",
    advancePayment: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
  },
  {
    ownerIndex: 0, // Rahim
    title: "Single Room with Attached Bath - Fulbarigate",
    description:
      "Cozy single room perfect for one student or young professional. Attached bathroom with running water 24/7. The room is on the 3rd floor with a nice balcony overlooking the street. Landlord lives downstairs so security is never an issue. Common kitchen available. Electricity bill split among tenants. Located in the heart of Fulbarigate with easy access to local transport, banks, and medical shops.",
    rent: 4500,
    contractDuration: 6,
    location: "Fulbarigate",
    specificAddress: "45/A Fulbarigate Main Road, 2nd Floor",
    propertyType: "Room",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    amenities: ["Water Supply", "WiFi", "Security Guard"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1712345678",
    advancePayment: 1,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    ],
  },
  {
    ownerIndex: 1, // Fatema
    title: "Beautiful 3BR Family Apartment - Sonadanga",
    description:
      "Gorgeous 3-bedroom family apartment in one of the most sought-after residential areas of Sonadanga. Marble flooring throughout, spacious living and dining area. The master bedroom has an en-suite bathroom. Building has 24/7 security guard and CCTV coverage. Reserved car parking on the ground floor. 10 minutes from Khulna Medical College. Perfect for small families or a group of 3-4 students looking for premium living.",
    rent: 15000,
    contractDuration: 12,
    location: "Sonadanga",
    specificAddress: "Flat 4B, Green Valley Apartments, Sonadanga Main Road",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    furnished: true,
    amenities: ["WiFi", "Air Conditioning", "Generator", "Water Supply", "Security Guard", "CCTV", "Parking", "Gas Connection", "Elevator"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1898765432",
    advancePayment: 3,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    ],
  },
  {
    ownerIndex: 1, // Fatema
    title: "Girls Hostel - Safe & Clean Near Daulatpur",
    description:
      "Dedicated girls hostel with 4 rooms, each accommodating 2 students. Common study room, kitchen, and a nice rooftop sitting area. The hostel is managed by a resident warden (female). Strict entry rules after 9 PM for safety. Meals can be arranged at an additional cost. Walking distance to Daulatpur bus stand. Many KUET and Khulna University students stay here. Warm, homely environment.",
    rent: 3500,
    contractDuration: 6,
    location: "Daulatpur",
    specificAddress: "House 22, Lane 4, Daulatpur Residential",
    propertyType: "Hostel",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    amenities: ["Water Supply", "WiFi", "Security Guard", "Gas Connection"],
    listingType: "owner",
    genderPreference: "female",
    contactPhone: "+880 1898765432",
    advancePayment: 1,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    ],
  },
  {
    ownerIndex: 2, // Kamal
    title: "Modern Studio Apartment - Boyra",
    description:
      "Brand new studio apartment in a recently constructed building in Boyra. Open-plan layout with a separate kitchen counter and a modern bathroom. Tiled flooring, painted walls, and large windows. The building has a backup generator for power cuts. Very close to Boyra Bazar for daily shopping. Auto-rickshaws and buses to KUET available right outside. Suitable for single occupants or couples.",
    rent: 6500,
    contractDuration: 12,
    location: "Boyra",
    specificAddress: "Flat 2A, Noor Residency, Boyra Main Road",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    amenities: ["Generator", "Water Supply", "Gas Connection"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1756789012",
    advancePayment: 2,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    ],
  },
  {
    ownerIndex: 2, // Kamal
    title: "Large 4BR House with Garden - Khalishpur",
    description:
      "Entire independent house available for rent in quiet Khalishpur neighborhood. 4 bedrooms, 3 bathrooms, a large kitchen, and a beautiful front garden. Ground floor has the living room, kitchen, and 1 bedroom. Upper floor has 3 bedrooms with a shared balcony. Ideal for a family or a group of 4-5 students who want their own space. Garage available. The house is repainted and renovated recently.",
    rent: 22000,
    contractDuration: 12,
    location: "Khalishpur",
    specificAddress: "House 8, Block C, Khalishpur Housing Estate",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    furnished: false,
    amenities: ["Water Supply", "Parking", "Gas Connection", "CCTV"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1756789012",
    advancePayment: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  {
    ownerIndex: 3, // Nusrat (tenant-roommate)
    title: "Looking for Female Roommate - Near KUET",
    description:
      "Hi! I'm Nusrat, a 3rd year CSE student at KUET. I have a nice 2BR flat near campus and I'm looking for a female roommate to share with. You'll get your own bedroom and we share the kitchen, bathroom, and living space. I'm a quiet, non-smoking person who keeps things tidy. Rent is split equally. The flat already has WiFi, a fridge, and basic furniture. Let me know if you're interested!",
    rent: 4000,
    contractDuration: 6,
    location: "KUET Campus",
    specificAddress: "House 9, Road 2, Staff Quarter Area",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    amenities: ["WiFi", "Water Supply"],
    listingType: "tenant-roommate",
    listingTypeDetails: "I'm a 3rd year CSE student at KUET, non-smoker, quiet and organized. I prefer a roommate who is also a student and respects shared spaces. I usually study late at night so I keep the common areas quiet after 10 PM.",
    genderPreference: "female",
    contactPhone: "+880 1623456789",
    advancePayment: 1,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ez49a2e2e?w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    ],
  },
  {
    ownerIndex: 4, // Arif (tenant-roommate)
    title: "Roommate Wanted - Gollamari 2BR Flat",
    description:
      "Hey, I'm Arif, working at a private company in Khulna. I have a 2-bedroom flat in Gollamari and the other room is vacant. The flat is fully furnished with a TV, washing machine, and kitchen appliances. Rent includes water bill. Electricity split 50-50. Building has a generator. 5 minutes from New Market by rickshaw. Looking for a clean, responsible male roommate. Preferably someone who works or studies nearby.",
    rent: 5000,
    contractDuration: 6,
    location: "Gollamari",
    specificAddress: "Flat 3C, Rahman Tower, Gollamari Main Road",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    amenities: ["WiFi", "Air Conditioning", "Generator", "Water Supply", "Parking"],
    listingType: "tenant-roommate",
    listingTypeDetails: "I'm a 26-year-old software developer, non-smoker. I work from home 3 days a week. I enjoy cooking and keeping the place clean. Looking for someone chill and responsible, ideally 22-30 years old.",
    genderPreference: "male",
    contactPhone: "+880 1534567890",
    advancePayment: 2,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    ],
  },
  {
    ownerIndex: 0, // Rahim
    title: "Budget-Friendly Room - New Market Area",
    description:
      "Affordable single room for students on a tight budget. The room is modest but clean and well-ventilated. Shared bathroom with one other tenant. Common kitchen with gas stove. The location is unbeatable — right next to New Market, so everything you need is walking distance. Many KUET students have stayed here over the years. Electricity and water bills included in the rent.",
    rent: 3000,
    contractDuration: 3,
    location: "New Market",
    specificAddress: "71 New Market Road, 1st Floor",
    propertyType: "Room",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    amenities: ["Water Supply", "Gas Connection"],
    listingType: "owner",
    genderPreference: "male",
    contactPhone: "+880 1712345678",
    advancePayment: 1,
    images: [
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    ],
  },
  {
    ownerIndex: 2, // Kamal
    title: "Premium Furnished Flat - Khulna City Center",
    description:
      "Luxury fully-furnished 2BHK in the heart of Khulna city. Centrally air-conditioned, modern kitchen with chimney, and premium bathroom fittings. The flat comes with a queen bed, wardrobe, dining table, sofa set, and a smart TV. Building amenities include a rooftop terrace and 24/7 power backup. Walking distance to Khulna Railway Station and SS Road. Ideal for professionals or expatriates.",
    rent: 18000,
    contractDuration: 12,
    location: "Khulna City",
    specificAddress: "Flat 6A, Platinum Heights, KDA Avenue",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    amenities: ["WiFi", "Air Conditioning", "Generator", "Water Supply", "Security Guard", "CCTV", "Parking", "Gas Connection", "Elevator"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1756789012",
    advancePayment: 3,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
  },
  {
    ownerIndex: 5, // Sumaiya (tenant-roommate)
    title: "Female Roommate Needed - Sonadanga Flat",
    description:
      "Assalamu Alaikum! I'm Sumaiya, a final year EEE student. I rent a 2BR flat in Sonadanga and my previous roommate graduated. Looking for a new female roommate. The flat is really nice — tile floor, good sunlight, and the neighborhood is very safe. We have a small balcony where we can dry clothes or just relax. The kitchen has everything you need. I cook most days and happy to share meals!",
    rent: 4500,
    contractDuration: 6,
    location: "Sonadanga",
    specificAddress: "Flat 2B, Tara Bhaban, Sonadanga 2nd Phase",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    amenities: ["WiFi", "Water Supply", "Gas Connection"],
    listingType: "tenant-roommate",
    listingTypeDetails: "Final year EEE student at KUET, practicing Muslim, non-smoker. I keep the flat clean and cook regularly — happy to share meals. I'd love a roommate who is also a student, preferably someone friendly and respectful of study hours.",
    genderPreference: "female",
    contactPhone: "+880 1945678901",
    advancePayment: 1,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    ],
  },
  {
    ownerIndex: 1, // Fatema
    title: "Cozy 2BR Near Boyra Bazar",
    description:
      "Well-maintained 2-bedroom flat in a quiet lane off Boyra main road. The flat is ideal for small families or 2-3 students. Both rooms are decent-sized with ceiling fans and tube lights. The kitchen is separate with proper ventilation. Bathroom has been recently tiled. Rooftop access for hanging laundry. The landlord is friendly and responsive. Boyra Bazar is a 2-minute walk — very convenient for daily groceries.",
    rent: 7000,
    contractDuration: 12,
    location: "Boyra",
    specificAddress: "House 33/B, Boyra Lane 6, Near Bazar Mosque",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    furnished: false,
    amenities: ["Water Supply", "Gas Connection"],
    listingType: "owner",
    genderPreference: "any",
    contactPhone: "+880 1898765432",
    advancePayment: 2,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
  },
];

// ─── Sample Messages ────────────────────────────────────────────────────────

// Messages between users about specific listings (referenced by listing index)
const messageThreads = [
  {
    listingIndex: 0, // "Spacious 2BR Flat Near KUET Main Gate"
    senderIndex: 4, // Arif (renter)
    receiverIndex: 0, // Rahim (owner)
    messages: [
      { from: "sender", content: "Assalamu Alaikum bhai, is this flat still available?" },
      { from: "receiver", content: "Walaikum Assalam! Yes it's available. When would you like to visit?" },
      { from: "sender", content: "Can I come this Saturday around 3 PM?" },
      { from: "receiver", content: "Sure, that works. I'll be there. Call me 10 minutes before you arrive." },
      { from: "sender", content: "Great, thank you! One question — is the WiFi included in rent or separate?" },
      { from: "receiver", content: "WiFi is separate, around 500 taka per month split between tenants." },
    ],
  },
  {
    listingIndex: 2, // "Beautiful 3BR Family Apartment - Sonadanga"
    senderIndex: 3, // Nusrat (renter)
    receiverIndex: 1, // Fatema (owner)
    messages: [
      { from: "sender", content: "Hi Fatema apa, I saw your Sonadanga apartment listing. It looks beautiful!" },
      { from: "receiver", content: "Thank you! It's a really nice flat. Are you looking for yourself?" },
      { from: "sender", content: "Actually for 3 of us students from KUET. Would that be okay?" },
      { from: "receiver", content: "3 students should be fine. Do you have a guarantor? That's our only requirement." },
      { from: "sender", content: "Yes, my father can be the guarantor. Can we visit tomorrow?" },
    ],
  },
  {
    listingIndex: 6, // Nusrat looking for female roommate
    senderIndex: 5, // Sumaiya
    receiverIndex: 3, // Nusrat
    messages: [
      { from: "sender", content: "Hi Nusrat! I saw your roommate post. I'm also a KUET student (EEE dept)." },
      { from: "receiver", content: "Hey Sumaiya! That's great, what year are you in?" },
      { from: "sender", content: "I'm in 4th year. I'm very tidy and I usually study at night too, so we'd get along!" },
      { from: "receiver", content: "Sounds perfect! Would you like to come see the flat this weekend?" },
    ],
  },
];

// ─── Seed Function ──────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Message.deleteMany({});
    console.log("Cleared existing data");

    // Create users with hashed passwords
    const salt = await bcrypt.genSalt(10);
    const createdUsers = [];
    for (const u of users) {
      const hashed = await bcrypt.hash(u.password, salt);
      const user = await User.create({ ...u, password: hashed });
      createdUsers.push(user);
      console.log(`  Created user: ${u.username} (${u.role})`);
    }

    // Create listings
    const createdListings = [];
    for (const listing of listings) {
      const owner = createdUsers[listing.ownerIndex];
      const { ownerIndex, ...data } = listing;
      const product = await Product.create({ ...data, user: owner._id });
      createdListings.push(product);
      console.log(`  Created listing: "${product.title}" by ${owner.username}`);
    }

    // Create messages
    for (const thread of messageThreads) {
      const listing = createdListings[thread.listingIndex];
      const sender = createdUsers[thread.senderIndex];
      const receiver = createdUsers[thread.receiverIndex];

      for (let i = 0; i < thread.messages.length; i++) {
        const msg = thread.messages[i];
        const actualSender = msg.from === "sender" ? sender : receiver;
        const actualReceiver = msg.from === "sender" ? receiver : sender;

        await Message.create({
          sender: actualSender._id,
          receiver: actualReceiver._id,
          listing: listing._id,
          content: msg.content,
          read: i < thread.messages.length - 1, // last message unread
          createdAt: new Date(Date.now() - (thread.messages.length - i) * 3600000), // stagger by 1 hour
        });
      }
      console.log(`  Created ${thread.messages.length} messages for "${listing.title}"`);
    }

    console.log("\n--- Seed complete! ---");
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Listings: ${createdListings.length}`);
    console.log(`Message threads: ${messageThreads.length}`);
    console.log("\nLogin credentials (all same password: password123):");
    for (const u of users) {
      console.log(`  ${u.role.padEnd(8)} | ${u.username}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
