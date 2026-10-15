# 🗺️ GPS Court Finder - Mwananchi Legal Assistant

## 1. Overview
The GPS Court Finder microservice helps users locate nearby courts based on their current location or a specified address. It leverages **geospatial indexing** and external mapping APIs to provide accurate results.

---

## 2. Core Functionality
- Accepts user input:
  - Current GPS coordinates (via mobile/web).
  - Manual address entry.
- Queries geospatial database of courts.
- Returns:
  - Court name
  - Address
  - Distance from user
  - Map directions (via external API)

---

## 3. Data Flow
1. **Frontend/Mobile** → User enters location or enables GPS.  
2. **Backend (Express)** → Sends request to GPS microservice.  
3. **GPS Microservice (FastAPI + Geopy)** →  
   - Converts coordinates/address into geospatial query.  
   - Searches MongoDB court dataset with geospatial indexing.  
4. **External API (Google Maps / OpenStreetMap)** → Provides directions and map visualization.  
5. **Response** → Court list returned to frontend/mobile.  

---

## 4. Database Schema
```json
{
  "court_id": "C123",
  "name": "Mombasa Law Courts",
  "address": "Nkrumah Road, Mombasa",
  "coordinates": { "lat": -4.0435, "lng": 39.6682 },
  "jurisdiction": "Civil, Criminal",
  "contact": "+254-700-123456"
}
