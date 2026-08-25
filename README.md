# CropSense — SIH 2026 MVP (PS131: Crop Disease & Pest Detection)

Farmer ek crop/leaf photo upload karta hai → app disease/pest detect karta hai →
severity + treatment recommendation dikhata hai → nearby agri store dikhata hai.

## ⚠️ Important — pehle ye padho

Ye **full-stack web app** hai (React + Node/Express + MongoDB), React Native nahi.
Kyun: is environment mein mobile simulator/live-testing possible nahi thi, isliye
backend + functional web frontend banaya gaya — jisse tum **abhi demo kar sakte ho**.

Backend 100% reusable hai chahe frontend web ho ya React Native — dono sirf
same REST API (`/api/...`) call karte hain. Jab RN pe switch karoge, sirf
`frontend/src/screens/*` ko React Native components (View, Text, Image, etc.)
mein rewrite karna hoga — API layer (`api/client.js`) aur poora backend
bilkul waisa hi reuse hoga.

---

## Folder Structure

```
cropsense-mvp/
├── backend/                    # Node + Express + MongoDB API
│   ├── server.js               # entry point
│   ├── .env.example            # copy to .env, fill values
│   └── src/
│       ├── config/db.js        # MongoDB connection
│       ├── models/             # User.js, Scan.js (mongoose schemas)
│       ├── controllers/        # actual business logic
│       ├── routes/             # URL → controller mapping
│       ├── middleware/         # authMiddleware (JWT), uploadMiddleware (multer)
│       ├── services/aiService.js   # ⭐ mock AI — swap this later with real model
│       └── data/stores.js      # dummy nearby-store dataset
│
└── frontend/                   # React (Vite) — functional web app
    ├── src/
    │   ├── api/client.js       # ⭐ ALL backend calls go through here
    │   ├── context/AuthContext.jsx  # login state, token storage
    │   ├── screens/            # Login, Home, Scan, Result, Store
    │   ├── components/         # PhoneFrame, TopBar, PrimaryButton, LeafGauge
    │   ├── styles/theme.js     # colors — change here to reskin whole app
    │   └── App.jsx             # routing + protected routes
    └── index.html
```

**Design principle used:** screens never call `fetch()` directly — they only call
functions from `api/client.js`. Kal agar backend URL, auth logic ya error handling
badalni ho, sirf ek file touch karni padegi.

---

## How to run (local development)

### 1. Backend

```bash
cd backend
cp .env.example .env
# .env kholke MONGO_URI aur JWT_SECRET set karo
npm install
npm run dev        # nodemon se auto-restart, ya npm start
```

MongoDB nahi installed hai to sabse easy option: **MongoDB Atlas** (free tier) —
sign up karke connection string `.env` mein `MONGO_URI` mein daal do.

Server chalega: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_URL already localhost:5000/api pe set hai
npm install
npm run dev
```

Browser mein khulega: `http://localhost:5173`

---

## What's actually working (not just UI)

- ✅ Register/Login — real bcrypt password hashing + JWT tokens
- ✅ Protected routes — bina login home/scan/result/store access nahi
- ✅ Real image upload — camera/gallery se photo leke server pe save hoti hai
- ✅ Mock AI detection — image ke basis pe consistent result deta hai
  (`backend/src/services/aiService.js` — yahi file baad mein Python model se replace hogi)
- ✅ Scan history — MongoDB mein save hoti hai, Home screen pe "Recent Scans" real data hai
- ✅ Nearby stores — Haversine formula se real distance calculate karta hai (dummy store list se)
- ✅ Location detection — browser geolocation API use karta hai

## What's still mock/simplified (by design, MVP scope)

- AI detection asli ML model nahi hai — chhoti hardcoded dataset se pick karta hai.
  Jab Python (FastAPI/Flask) model ready ho, `aiService.js` mein ek function replace
  karna hoga, comment mein example diya hua hai.
- Store list hardcoded hai (4 stores) — Google Places API future enhancement hai.
- Images local disk pe store hoti hain — Cloudinary/Firebase future upgrade hai.

## Next steps (as time permits)

1. Backend ko deploy karo (Render/Railway free tier) taaki demo ke time laptop pe
   localhost pe depend na karna pade
2. Real AI model integrate karo (PlantVillage dataset se transfer learning)
3. React Native mein screens port karo — backend already ready hai
4. Weather-based risk, history — future scope hai, MVP mein nahi
