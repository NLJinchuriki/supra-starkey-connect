# React Example App

The **React Example App** demonstrates how to integrate and utilize the `supra-starkey-connect` library within a React environment. It provides a user-friendly interface to interact with the StarKey Supra wallet, showcasing functionalities such as connecting wallets, sending transactions, signing messages, and managing network changes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [License](#license)

## Features

- **Connect/Disconnect Wallet**: Easily connect to and disconnect from the StarKey Supra wallet.
- **Send Transactions**: Initiate test transactions directly from the interface.
- **Sign Messages**: Demonstrates message signing capabilities. (undocumented)
- **Network Management**: Switch between different blockchain networks chains.
- **Real-time Logs**: View interactions and events in real-time (demo purposes)

## Installation

1. **Navigate to the React Example App Directory**

   ```bash
   cd packages/react-example-app
   ```

2. **Install Dependencies** (Preference is to install from root folder)

   ```bash
   pnpm install
   ```

   This will install all necessary dependencies, including React, Vite, and the `supra-starkey-connect` library.

## Running the Application

### Development Mode

To start the React application in development mode with hot-reloading:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build

To build the application for production:

```bash
pnpm build
```

The optimized build will be available in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm preview
```

This will serve the built application, allowing you to test it as it would appear in a live environment.

## Project Structure

```
react-example-app/
├── index.html
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── vite.config.js
├── tsconfig.json
└── package.json
```

- **index.html**: The main HTML file.
- **src/**: Contains the React components and styling.
- **vite.config.js**: Configuration for Vite bundler.
- **tsconfig.json**: TypeScript configuration.
- **package.json**: Project metadata and scripts.

## Customization

Feel free to modify the React components and styles to fit your project's requirements. The `supra-starkey-connect` library can be further extended or customized as needed.

## Troubleshooting

- **Wallet Not Detected**: Ensure that the StarKey Supra wallet extension is installed and active in your browser. The app checks for the presence of `window.starkey`.
- **Connection Issues**: If you encounter issues connecting to the wallet, try refreshing the page or reinstalling the StarKey Supra wallet extension.

## License

This project is licensed under the [MIT License](../../LICENSE).
