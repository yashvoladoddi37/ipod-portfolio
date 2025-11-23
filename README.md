<div align="center">

![ipod_og](https://user-images.githubusercontent.com/21055469/71636084-6081a800-2be0-11ea-98ee-9599a3396c84.png)

# 🎵 iPod.js

**A nostalgic music player that bridges the gap between classic iPod design and modern streaming**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)

</div>

---

## 🌟 About

Before the days of streaming services, we relied on physical devices to store our limited libraries of 
music. Now with the streaming age, we no longer rely on physical storage and have endless hours of songs 
at our disposal. This project is an homage to the good 'ol days. A mix of the old and new. Experience the 
iPod Classic you used to own that now connects to Spotify and Apple Music — the two most popular music 
streaming platforms in the world.

**iPod.js** recreates the iconic iPod Classic experience in your browser, complete with the signature click wheel navigation and that satisfying tactile feel (Android only) — but now powered by **Spotify** and **Apple Music**, giving you access to millions of songs.

Built with extensibility in mind, this isn't just a music player. It can run games (like the classic Brick game!), and there's room for many more apps and easter eggs in the future.

<div align="center">

![ipod](https://user-images.githubusercontent.com/21055469/71572818-c877a780-2a95-11ea-9e4e-6b0476ff172b.gif)

*Experience the nostalgia with modern streaming power*

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎵 **Music Streaming**
- **Spotify Web Playback SDK** integration
- **Apple Music** via MusicKit JS
- Full playback controls (play, pause, skip, seek)
- Browse artists, albums, playlists
- Search functionality

</td>
<td width="50%">

### 🎮 **Interactive Experience**
- Authentic iPod click wheel navigation
- Multiple device themes (Silver, Black, U2 Edition)
- Built-in games (Brick)
- Smooth animations with Framer Motion
- Responsive design

</td>
</tr>
<tr>
<td width="50%">

### 🛠 **Modern Tech Stack**
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Styled Components 6** for styling
- **Framer Motion 10** for animations
- Deployed on **Vercel**

</td>
<td width="50%">

### 🎨 **Design**
- Pixel-perfect iPod Classic recreation
- All SVGs hand-crafted in Figma
- Authentic UI/UX down to the smallest details
- Dark/Light mode support
- Customizable themes

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version specified in `.nvmrc`)
- **Yarn** package manager
- **Vercel CLI** (optional, for deployment)

### Installation

```bash
# Use the recommended Node version
nvm use

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit **[http://localhost:3000/ipod](http://localhost:3000/ipod)** to experience the magic! ✨

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in your project root:

```bash
# Spotify Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Apple Music Configuration  
APPLE_DEVELOPER_TOKEN=your_apple_developer_token
```

### 🎵 Spotify Setup

1. Create a Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add `http://localhost:3000` to your app's redirect URIs
3. Copy your **Client ID** and **Client Secret**

📚 [Spotify Web Playback SDK Documentation](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)

### 🍎 Apple Music Setup

1. Join the [Apple Developer Program](https://developer.apple.com/programs/)
2. Create a **MusicKit** identifier in the Apple Developer Portal
3. Generate a **private key** for MusicKit
4. Create a **developer token** (JWT)

📚 [Apple MusicKit JS Documentation](https://developer.apple.com/documentation/musickitjs)  
📚 [Getting Keys and Creating Tokens Guide](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens)

---

## 🎯 Usage

### Navigation
- **Click Wheel**: Scroll through menus
- **Center Button**: Select items
- **Menu Button**: Go back
- **Play/Pause**: Control playback
- **Forward/Back**: Skip tracks

### Music Services
1. Go to **Settings** → **Choose Service**
2. Select **Spotify** or **Apple Music**
3. Sign in with your account
4. Start exploring your music!

### Themes
- **Silver**: Classic iPod look
- **Black**: Sleek modern variant  
- **U2 Edition**: Special red and black design

---

## 🤝 Contributing

Contributions are welcome! This project is built to be highly extensible.

### Ideas for Contributions
- 🎮 New games and apps
- 🎨 Additional themes
- 🔧 Performance improvements
- 🐛 Bug fixes
- 📱 Mobile optimizations

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
