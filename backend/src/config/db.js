const mongoose = require("mongoose");

// IMPORTANT: agar DB disconnected ho, to bina is line ke Mongoose queries
// (User.findOne, Scan.create, etc.) hamesha ke liye "hang" ho jaati hain -
// crash nahi hoti, bas silently wait karti reh jaati hain, jo demo ke time
// bahut risky hai. Isse queries turant fail ho jaati hain aur controller ka
// try/catch unhe normally handle kar leta hai.
mongoose.set("bufferCommands", false);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 sec mein fail ho jaye, hang na ho
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // MVP ke liye: DB fail ho to bhi server band mat karo, taaki demo continue ho sake
    // Production mein yahan process.exit(1) karna sahi hoga.
  }
}

module.exports = connectDB;
