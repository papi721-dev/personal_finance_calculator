# Personal Finance Calculator

## 📌 Project Description

The **Personal Finance Calculator App** is a lightweight, customizable tool that helps individuals manage their income by applying personalized allocation rules. The app enables users to split their income into categories such as **Asrat (ዐሥራት, 10%)**, **donations**, **savings**, and **pocket money**. Unlike generic budgeting apps, this calculator is designed to be **rule-driven and flexible**, letting each user define their own percentage- or fixed-based allocations.

The app is **local-first** (data stays on the device), simple to use, and built to support multiple user profiles and allocation presets.

## 🎯 Goals

* Provide a **clear breakdown** of income allocations based on user-defined rules.
* Support **faith-based, cultural, or personal priorities** (e.g., Asrat/tithe, charity, savings).
* Keep it **lightweight, private, and offline-first** while allowing future extensions.
* Make it easy for users to **reuse and adjust** their allocation presets for different income sources.

## 🚀 Features (MVP)

### 1. Income Input

* Enter total income (amount + optional note).
* Choose allocation set (e.g., “Monthly Salary,” “Freelance”).

### 2. Allocation Rules

* Support **percentage allocations** (e.g., 10%, 5%, 50%).
* Support **fixed allocations** (e.g., 2,000 ETB).
* Support **remainder allocations** (leftover income).
* Rules evaluated in order, with option to **cap amounts**.

### 3. Calculation & Results

* Instant breakdown showing: category, amount, and % of income.
* Handle edge cases (percent > 100%, too many fixed amounts).
* Display remaining balance (if any unallocated).

### 4. Profiles & Presets

* Save **multiple allocation sets** (per user, or per income source).
* Allow quick switching between sets.
* Editable category labels (default includes “Asrat”).

### 5. History & Export

* Save past calculations (timestamp, income, allocations).
* Export history as CSV or PDF for record keeping.

### 6. Localization

* Default **Amharic labels** (Asrat) + English fallback.
* Support custom language labels for categories.

## 🌱 Future Enhancements (Beyond MVP)

* Graphs (monthly trends, category distribution).
* Goal tracking (e.g., save up to 50,000 ETB).
* Multi-currency support.
* Priority-based rules (e.g., always allocate Asrat first).
* Authentication or passcode for sensitive use.
* Cloud sync / multi-device access.
* Mobile app (Flutter) or offline-first PWA.

## 🛠️ Tech Stack

* **Frontend**: HTML + CSS+ JavaScript (for PWA) OR Flutter (for mobile).
* **Database**: SQLite (local storage) → can scale later.
* **Storage**: Offline-first (IndexedDB / on-device DB)
