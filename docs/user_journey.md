# 👣 User Journey - Mwananchi Legal Assistant

## 1. Entry Point
- User visits the **web app (React)** or opens the **mobile app (React Native)**.
- They are greeted with a simple onboarding screen explaining available features:
  - Ask a legal question
  - Generate a document
  - Find a court
  - Calculate fees
  - Make a payment

---

## 2. Authentication
- User signs up with **email/phone number** and sets a password.
- JWT-based authentication secures their session.
- Returning users log in directly.

---

## 3. Asking a Question
- User types a legal query (e.g., “What are my rights in a land dispute?”).
- Backend routes request to **Python NLP microservice**.
- AI analyzes query and returns a structured response.
- User sees a clear, plain-language answer with references.

---

## 4. Document Generation
- User selects “Generate Document” (e.g., affidavit, contract).
- Backend provides a form with required fields.
- User fills in details → AI microservice drafts the document.
- Document preview shown → user can download or save.

---

## 5. Court Finder (GPS Integration)
- User enters location or allows GPS access.
- GPS microservice queries geospatial database.
- Nearby courts displayed with names, addresses, and maps.
- User can tap to view directions.

---

## 6. Fee Calculator
- User selects case type (e.g., civil, criminal).
- Fee microservice computes filing, service, and hearing fees.
- User sees breakdown and total cost.

---

## 7. Payment Flow
- User chooses to pay via **M-Pesa integration**.
- Backend initiates payment request.
- User confirms on phone → transaction logged in database.
- Receipt generated and stored in user profile.

---

## 8. Metrics Logging
- Each interaction (question, document, payment) is logged in `analytics.json`.
- Dashboard visualizes usage trends for admins.

---

## 9. Exit & Retention
- User logs out or closes app.
- Returning users receive reminders about saved drafts, pending payments, or upcoming court dates.
- Engagement tracked via metrics dashboard.

---

**End of Document**
