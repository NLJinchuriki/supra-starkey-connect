# Vanilla JavaScript Example App

The **Vanilla JavaScript Example App** provides a straightforward demonstration of how to integrate the `supra-starkey-connect` library into a web application without the use of frontend frameworks. It showcases essential functionalities such as connecting to the StarKey Supra wallet, sending transactions, signing messages, and handling network changes.

- **Vanilla Example App Live Demo**: [Live Demo on vercel](https://supra-starkey-connect-htfd.vercel.app)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [License](#license)

## Features

- **Connect/Disconnect Wallet**: Simple buttons to connect and disconnect from the StarKey Supra wallet.
- **Send Transactions**: Initiate test transactions directly from the interface.
- **Sign Messages**: Demonstrates message signing capabilities. (undocumented)
- **Network Management**: Switch between different blockchain network chains.
- **Real-time Logs**: View backend interactions and events in real-time. (demo)

## Installation

1. **Navigate to the Vanilla Example App Directory**

   ```bash
   cd packages/vanilla-example-app
   ```

2. **Install Dependencies** (Preference is to install from root folder)

   ```bash
   pnpm install
   ```

   This will install the necessary dependencies, including the `serve` package for serving the application.

3. **Build the Library**

   Ensure that the `supra-starkey-connect` library is built and up-to-date:

   ```bash
   pnpm build
   ```

## Running the Application

### Development Mode

To start the Vanilla JS application in development mode:

```bash
pnpm dev
```

This command performs the following actions:

1. **Copy Scripts**: Copies the `browser.iife.js` and its source map from the `supra-starkey-connect` dist folder to the current directory.
2. **Serve the Application**: Uses the `serve` package to serve the application locally.

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build

Since this is a Vanilla JS application, there is no build step required. However, you can manually serve the application using the `serve` package:

```bash
pnpm start
```

## Project Structure

```
vanilla-example-app/
├── index.html
├── main.js
├── styles.css
├── package.json
└── README.md
```

- **index.html**: The main HTML file.
- **main.js**: Handles the application logic and interactions with the `supra-starkey-connect` library.
- **browser.iife.js**: The IIFE build of the `supra-starkey-connect` library.
- **styles.css**: Styling for the application.
- **package.json**: Project metadata and scripts.

## Customization

Feel free to modify the HTML, CSS, and JavaScript files to suit your project's needs. The `supra-starkey-connect` library can be further extended or customized as required.

## Troubleshooting

- **Wallet Not Detected**: Ensure that the StarKey Supra wallet extension is installed and active in your browser. The app checks for the presence of `window.starkey`.
- **Connection Issues**: If you encounter issues connecting to the wallet, try refreshing the page or reinstalling the StarKey Supra wallet extension.
- **Script Loading Errors**: Verify that the `browser.iife.js` script is correctly copied and referenced in the `index.html` file. (for local testing, currently it links to the package on unpkg)

## License

This project is licensed under the [MIT License](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/LICENSE).
