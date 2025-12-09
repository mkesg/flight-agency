# ✈️ Flight Search for Travel Agencies

A modern, fast, and user-friendly flight search application built with **Next.js 14** for travel agencies to quickly find and compare flights for their clients.

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

### 🌐 Live Demo

**👉 [https://flight-search.vercel.app/](https://flight-search.vercel.app/)**

---

## 📸 Screenshot
<img width="527" height="638" alt="Screenshot_1" src="https://github.com/user-attachments/assets/1adad340-8e99-4b3d-bab2-575e357efa09" />


---

## 🚀 Features

- **Real-time Flight Search** — Search flights by departure/arrival airports and travel dates
- **Round-trip Support** — Search for outbound and return flights simultaneously
- **Flight Comparison** — View multiple flight options with pricing and duration details
- **Airline Information** — Display airline logos and names for easy identification
- **URL-based Search** — Share search results via URL parameters
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** — Clean, dark-themed interface optimized for professional use

---

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

---

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flight-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
flight-search/
├── app/
│   ├── api/
│   │   └── save/
│   │       └── route.ts      # API route for download data
│   ├── search/
│   │   └── page.tsx          # Flight search page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── lib/                      # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

---

## 🔧 Available Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start development server on port 3000    |
| `npm run build` | Build the application for production     |
| `npm run start` | Start the production server              |
| `npm run lint`  | Run ESLint for code quality checks       |

---

## 🔍 How to Use

### Basic Flight Search

1. Navigate to the **Search** page
2. Enter the **Departure Airport Code** (e.g., `BCN` for Barcelona)
3. Enter the **Arrival Airport Code** (e.g., `VVI` for Viru Viru)
4. Select your **Departure Date**
5. Select your **Return Date**
6. Click **Search** to find available flights

### URL Parameters

You can also search directly via URL:

```
/search?DepartureAirportCode=BCN&ArrivalAirportCode=VVI&DepartureDate=2024-12-15T00:00:00.000Z&ReturnDate=2024-12-25T00:00:00.000Z
```

| Parameter              | Description                    | Example    |
|------------------------|--------------------------------|------------|
| `DepartureAirportCode` | 3-letter IATA airport code     | `BCN`      |
| `ArrivalAirportCode`   | 3-letter IATA airport code     | `VVI`      |
| `DepartureDate`        | ISO 8601 date string           | `2024-12-15T00:00:00.000Z` |
| `ReturnDate`           | ISO 8601 date string           | `2024-12-25T00:00:00.000Z` |

---

## 📊 Flight Data Response

Each flight result includes:

| Field                    | Description                          |
|--------------------------|--------------------------------------|
| `AirlineName`            | Name of the operating airline        |
| `AirlineLogoAddress`     | URL to airline's logo image          |
| `TotalAmount`            | Total price in USD                   |
| `OutboundFlightsDuration`| Duration of outbound flight          |
| `InboundFlightsDuration` | Duration of return flight            |
| `Stops`                  | Number of stops/layovers             |
| `ItineraryId`            | Unique identifier for the itinerary  |

---

## 🎨 Customization

### Theme Colors

Modify the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: '#your-color',
  'card-bg': '#your-card-color',
}
```

### API Endpoint

The flight search API is configured in `app/search/page.tsx`. Update the `apiUrl` to connect to your preferred flight data provider.

---

## 🌐 API Integration

This application uses the NM Flight API for demonstration purposes:

```
https://nmflightapi.azurewebsites.net/api/flight/
```

For production use, integrate with your preferred GDS (Global Distribution System) or flight aggregator API such as:
- Amadeus
- Sabre
- Travelport
- Skyscanner

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting

```bash
npm run build
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

<p align="center">
  Made with ❤️ for Travel Agencies
</p>

