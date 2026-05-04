# 🚀 FinTrack

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI_v3-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A3342?style=for-the-badge&logo=react&logoColor=white)

🟢 **[Live Demo](https://fintrack-rust-two.vercel.app)** — Deployed on Vercel


FinTrack is a full-stack grade financial dashboard built entirely on the frontend with modern principles focusing on data density, enterprise-level component design, accessibility, and internationalization. 

Conceived as a demonstration of high-level proficiency in React 19, state management, and semantic UI frameworks, FinTrack tracks real-time data visualization of expenses, incomes, and historical trade events.

## 🌟 Key Features

* **Advanced Data Visualization:** Deep integration with `Recharts` for interactive donut and area charts.
* **Global i18n Translation System:** Seamless multi-language support localized dynamically via `react-i18next`.
* **State Management:** Blazing fast global atomic state controlled securely via `Zustand`.
* **Robust UI & UX Design:** Hand-crafted, responsive layout avoiding messy CSS with `Chakra UI v3` strict component-driven design (Light/Dark themes). 
* **Type Safety First:** Extremely strict TypeScript architecture protecting components from faulty data.
* **Testing Implementation:** Contains configured and mapped tests utilizing Vitest.

## 🛠️ Tech Stack & Architecture

- **Core & Runtime**: React 19.2 + Vite 8.0
- **Language**: TypeScript 6.0
- **Routing**: React Router DOM 7
- **UI & Accessibility**: Chakra UI v3 (`@chakra-ui/react`), Emotion, Next Themes
- **State Management**: Zustand 5
- **Data Visualization**: Recharts 3
- **Internacionalization**: i18next / React-i18next
- **Tooling & Lints**: Vitest, ESLint (v9 flat config), testing-library 

## 📦 Running the System Locally

To spin up the FinTrack development server immediately via Vite on your local environment:

```shell
# 1. Install all required dependencies
npm install

# 2. Spin up the application
npm run dev
```

Your server will be running normally on `http://localhost:5173`. 

## 🧪 Testing

A suite of unit tests validates the integrity of the store states. To run testing cases:

```shell
npm run vitest
```

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
