# React Next.js Example App

The **React Next.js Example App** demonstrates how to integrate and utilize the `supra-starkey-connect` library within a Next.js environment. It provides a user-friendly interface to interact with the StarKey Supra wallet, showcasing functionalities such as connecting wallets, sending transactions, signing messages, and managing network changes with Server-Side Rendering (SSR) support.

- **React Next.js Example App Live Demo**: [Live Demo on Vercel](https://supra-starkey-connect-nextjs.vercel.app/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Build](#production-build)
  - [Preview Production Build](#preview-production-build)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Connect/Disconnect Wallet**: Easily connect to and disconnect from the StarKey Supra wallet.
- **Send Transactions**: Initiate test transactions directly from the interface.
- **Sign Messages**: Demonstrates message signing capabilities.
- **Network Management**: Switch between different blockchain networks.
- **Real-time Logs**: View interactions and events in real-time.
- **Server-Side Rendering (SSR)**: Enhanced performance and SEO through SSR.

## Installation

1. **Navigate to the React Next.js Example App Directory**

   ```bash
   cd packages/react-nextjs-example
   ```

2. **Install Dependencies** (Preferably from the root folder)

   ```bash
   pnpm install
   ```

This will install all necessary dependencies, including Next.js, React, and the `supra-starkey-connect` library.

## Running the Application

### Development Mode

To start the Next.js application in development mode with hot-reloading and SSR:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build

To build the application for production:

```bash
pnpm  build
```

The optimized build will be available in the `.next` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm  start
```

This will serve the built application, allowing you to test it as it would appear in a live environment.

Alternatively, you can use the root script to serve all production applications concurrently:

```bash
pnpm run serve:nextjs:prod
```

## Project Structure

```
react-nextjs-example/
├── components/
│   └── App.tsx
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── public/
│   └── favicon.ico
├── styles/
│   ├── globals.css
│   └── App.css
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

- **components/**: Contains React components used throughout the application.
  - **App.tsx**: The main component handling wallet interactions and UI rendering.
- **pages/**: Next.js pages directory.
  - **\_app.tsx**: Custom App component to initialize pages. Ideal for importing global styles.
  - **index.tsx**: The main landing page of the application.
- **public/**: Holds static assets like `favicon.ico` and images.
- **styles/**: Contains global and component-specific CSS styles.
  - **globals.css**: Global CSS styles applied across the entire application.
  - **App.css**: Styles specific to the `App` component.
- **next.config.js**: Next.js configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **package.json**: Project metadata and scripts.
- **README.md**: Documentation for the React Next.js Example App.

## Customization

Feel free to modify the React components and styles to fit your project's requirements. The `supra-starkey-connect` library can be further extended or customized as needed to support additional functionalities or integrate with other services.

### Styling Enhancements

- **CSS Modules**: Adopt CSS Modules for scoped and maintainable styling.
- **Styled Components**: Integrate styled-components or other CSS-in-JS libraries for enhanced styling capabilities.
- **Tailwind CSS**: Incorporate utility-first CSS frameworks like Tailwind CSS for rapid UI development.

## Troubleshooting

- **Wallet Not Detected**: Ensure that the StarKey Supra wallet extension is installed and active in your browser. The app checks for the presence of `window.starkey`.
- **Connection Issues**: If you encounter issues connecting to the wallet, try refreshing the page or reinstalling the StarKey Supra wallet extension.

## License

This project is licensed under the [MIT License](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/LICENSE).

```

```
