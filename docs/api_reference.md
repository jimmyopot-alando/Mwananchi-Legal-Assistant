# 📚 API Reference - Mwananchi Legal Assistant

## 1. Authentication
### POST /api/auth/register
- Registers a new user.
- **Body:** `{ name, email, password }`
- **Response:** `{ token, user }`

### POST /api/auth/login
- Logs in an existing user.
- **Body:** `{ email, password }`
- **Response:** `{ token, user }`

---

## 2. User Profile
### GET /api/users/me
- Retrieves current user profile.
- **Auth:** JWT required.
- **Response:** `{ id, name, email, savedDocs, payments }`

### PUT /api/users/me
- Updates user profile.
- **Body:** `{ name?, email?, password? }`

---

## 3. Legal Questions
### POST /api/questions/ask
- Submits a legal question.
- **Body:** `{ question }`
- **Response:** `{ answer, references }`
- **Notes:** Routed to Python NLP microservice.

---

## 4. Document Generator
### POST /api/documents/generate
- Generates a legal document.
- **Body:** `{ type, fields }`
- **Response:** `{ documentId, previewUrl }`

### GET /api/documents/:id
- Retrieves a generated document.
- **Response:** `{ documentId, content }`

---

## 5. Court Finder
### GET /api/courts/find
- Finds nearby courts.
- **Query:** `lat, lng` OR `address`
- **Response:** `[ { courtId, name, address, distance } ]`
- **Notes:** Uses GPS microservice.

---

## 6. Fee Calculator
### POST /api/fees/calculate
- Calculates legal fees.
- **Body:** `{ caseType, parameters }`
- **Response:** `{ breakdown, total }`

---

## 7. Payments
### POST /api/payments/initiate
- Initiates payment via M-Pesa.
- **Body:** `{ amount, serviceId }`
- **Response:** `{ transactionId, status }`

### POST /api/payments/callback
- Handles M-Pesa callback.
- **Body:** `{ transactionId, resultCode, resultDesc }`

---

## 8. Metrics
### GET /api/metrics/usage
- Retrieves usage statistics.
- **Response:** `{ requests, errors, featureUsage }`

### GET /api/metrics/errors
- Retrieves error logs.
- **Response:** `[ { date, type, count } ]`

---

## 9. Microservices (Python FastAPI)
### POST /microservices/nlp/analyze
- Analyzes legal text/question.
- **Body:** `{ text }`
- **Response:** `{ analysis, confidence }`

### POST /microservices/gps/lookup
- Finds courts by coordinates.
- **Body:** `{ lat, lng }`
- **Response:** `{ courts }`

### POST /microservices/fees/compute
- Computes fees for case type.
- **Body:** `{ caseType }`
- **Response:** `{ breakdown, total }`

### POST /microservices/translate
- Translates text into local languages.
- **Body:** `{ text, targetLang }`
- **Response:** `{ translatedText }`

---

**End of Document**
