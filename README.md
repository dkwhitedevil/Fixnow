# 🛠️ Fixnow

**Fixnow** is an anonymous, community-powered platform that allows citizens to quickly report city-level issues such as:
- 🐕 Stray animals  
- 💡 Broken street lights  
- 🚧 Open drains  
- 🗑️ Garbage overflow

Built for the **IndeHub Hackathon 2025**, Fixnow empowers residents to keep their neighborhoods clean, safe, and accountable — without needing to reveal their identity.

---

## 🌍 Problem It Solves

Urban problems are often left unreported due to:
- Lack of awareness on how to report  
- No time to visit municipal offices  
- Fear of identification or retaliation  

**Fixnow** solves this by offering a **one-tap, anonymous reporting experience**, and shows the issues on a **public map with upvote-based priority sorting**.

---

## 🚀 Tech Stack

- ⚛️ React Native (with Expo)  
- 🗺️ `react-native-maps` for issue locations  
- 📍 `expo-location` for GPS tagging  
- 🔥 Firebase (for storage and anonymous logging)  
- 📦 EAS Build (to deploy for iOS without a Mac)

---

## ✨ Key Features

- 📸 Submit civic issues with location, image, and description  
- 🧭 Anonymous — no login or account needed  
- 🗺️ View all reports on an interactive map  
- 🔼 Upvote issues that matter to you  
- 🧠 Smart AI labels *(coming soon)* — like "Urgent", "Low Priority"  

---

## 📱 How to Run the App Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Fixnow.git
   cd Fixnow

2. Install dependencies:

   ```bash
   npm install

3. Start development server:

   ```bash
   npx expo start
   ```

4. Open the app:

   * On **iphone**: Scan QR using **Expo Go**

---

## 📦 Build for iOS (No Mac Needed)

If you're using Windows:

1. Log in to Expo:

   ```bash
   eas login

2. Configure the build system:

   ```bash
   eas build:configure

3. Start iOS build:

   ```bash
   eas build --platform ios
   ```

✅ You’ll receive a `.ipa` file or **TestFlight link** to submit or share.

---

## 📄 License

MIT License

---

## 🏆 Built For

🎯 **IndeHub Hackathon 2025**
Powered by Swift Communities Across India

---

