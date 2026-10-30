# CampusEats

Vendor data is stored in `public/api/vendors.json`. Start the development server
with `npm run dev`, then open `/api/vendors.json` at the local URL Vite prints
(normally `http://localhost:5173/api/vendors.json`). This checks that the mock API
file is accessible in the browser.

Kenny Hills Bakers is the first vendor, with eight items across Dessert, Drinks,
and Meals. The five added items and their prices are sample assignment data,
not a verified restaurant menu. `available: false` marks an item as sold out.

The restaurant ID and every menu item ID start with the owner's matric number,
`2415077`, to keep identifiers distinct from other students' data.

Faiz's Noodle House is a fictional sample shop with eight menu items in three categories, using the
owner's matric prefix in its IDs.

Vendors 3–4 are from classmates: Yiss Cafe from 2415719 and Faizul Cafe from
2418793. Their data is used as shared, with their own matric numbers in the IDs.

## React + Vite template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
