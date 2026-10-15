# 💳 Payment Flow - Mwananchi Legal Assistant

## 1. Overview
The payment system enables users to securely pay for legal services (document generation, filing fees, consultations) using **M-Pesa integration**. It ensures transparency, reliability, and proper logging of transactions.

---

## 2. Steps in the Payment Flow

### Step 1: Initiation
- User selects a service requiring payment (e.g., filing fee calculator).
- Backend generates a **payment request** with amount, service ID, and user ID.

### Step 2: API Call
- Backend calls the **M-Pesa API** using credentials stored in `.env`:
  - Consumer Key
  - Consumer Secret
  - Passkey
  - Shortcode

### Step 3: User Confirmation
- M-Pesa sends a **STK Push** to the user’s phone.
- User enters PIN to confirm transaction.

### Step 4: Callback Handling
- M-Pesa sends a **callback response** to backend.
- Backend verifies transaction status:
  - Success → logs payment in MongoDB.
  - Failure → notifies user and retries if necessary.

### Step 5: Receipt Generation
- Successful payments generate a **digital receipt**.
- Receipt stored in user profile and emailed/SMS to user.

---

## 3. Data Flow
1. **Frontend/Mobile** → Initiates payment request.  
2. **Backend (Express)** → Calls M-Pesa API.  
3. **M-Pesa Gateway** → Sends STK Push to user.  
4. **User Phone** → Confirms payment.  
5. **Backend** → Receives callback, logs transaction.  
6. **Database (MongoDB)** → Stores payment record.  
7. **Frontend/Mobile** → Displays receipt to user.  

---

## 4. Security
- All credentials stored securely in `.env`.  
- Transactions verified via M-Pesa callback.  
- Sensitive data encrypted before storage.  
- JWT authentication ensures only authorized users initiate payments.  

---

## 5. Error Handling
- **Timeouts** → Retry request up to 3 times.  
- **Invalid PIN/Cancelled** → Notify user, allow retry.  
- **Server Unavailable** → Queue transaction until service resumes.  

---

## 6. Metrics Logging
- Each payment attempt logged in `analytics.json`.  
- Dashboard tracks:
  - Total payments
  - Success vs failure rates
  - Average transaction time  

---

**End of Document**
