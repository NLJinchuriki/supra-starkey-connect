# Supra Starkey Connect (Unofficial)

Welcome to the **Supra Starkey Connect**! This monorepo is designed to provide a comprehensive solution for integrating the Supra Starkey wallet provider into your web applications. It includes the core `supra-starkey-connect` library, along with example applications demonstrating its usage in both React and Vanilla JavaScript environments.

## Table of Contents

- [Project Overview](#project-overview)
- [Packages](#packages)
  - [supra-starkey-connect](#supra-starkey-connect)
  - [react-example-app](#react-example-app)
  - [react-nextjs-example-app](#react-nextjs-example-app)
  - [vanilla-example-app](#vanilla-example-app)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Examples](#running-the-examples)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **supra-starkey-connect** package serves as a robust and type-safe wrapper around the StarKey Supra wallet provider, facilitating seamless interactions between your dApps and the Supra Blockchain. By abstracting the complexities of direct provider interactions, it simplifies tasks such as connecting wallets, sending transactions, signing messages, and managing network changes.

This monorepo not only houses the core library but also provides practical examples to help developers quickly integrate and utilize the `supra-starkey-connect` in different frontend environments.

## Packages

### supra-starkey-connect

The core library providing a type-safe and feature-rich interface to interact with the StarKey Supra wallet provider.

### react-example-app

A React-based application demonstrating how to integrate and use the `supra-starkey-connect` library within a React environment.

### react-nextjs-example-app

A React-based NextJS application demonstrating how to integrate and use the `supra-starkey-connect` library within a React environment.

### vanilla-example-app

A Vanilla JavaScript application showcasing the usage of the `supra-starkey-connect` library without any frontend frameworks.

## Getting Started

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/supra-starkey-connect.git
   cd supra-starkey-connect
   ```

2. **Install Dependencies**

   Ensure you have [pnpm](https://pnpm.io/) installed. If not, install it globally:

   ```bash
   npm install -g pnpm
   ```

   Then, install all dependencies:

   ```bash
   pnpm install
   ```

### Running the Examples

The monorepo includes scripts to run both example applications from the root directory.

1. **Start All Services**

   ```bash
   pnpm dev
   ```

   This command will build all packages and concurrently run the `supra-starkey-connect` build watcher, the React example app in development mode, and the Vanilla JS example app.

2. **Access the Applications**

   - **React Example App**: Open [http://localhost:5173](http://localhost:5173) in your browser.
   - **React NextJS Example App**: Open [http://localhost:3000](http://localhost:3000) in your browser.
   - **Vanilla Example App**: Open [http://localhost:3000](http://localhost:3000) in your browser.

   - **React Example App Live Demo**: [Live Demo on vercel](https://supra-starkey-connect-vanilla.react.app)
   - **React Next JS Example App Live Demo**: [Live Demo on vercel](https://supra-starkey-connect-react-nextjs.vercel.app)
   - **Vanilla Example App Live Demo**: [Live Demo on vercel](https://supra-starkey-connect-vanilla.vercel.app)

## Scripts

All scripts can be run from the root directory using `pnpm`.

- **Build All Packages**

  ```bash
  pnpm build:all
  ```

- **Start Development**

  ```bash
  pnpm dev
  ```

- **Serve Production Websites**

  ```bash
  pnpm serve:all:prod
  ```

- **Run Tests**

  ```bash
  pnpm test
  ```

For more specific scripts related to individual packages, refer to their respective README files.

## Contributing

Contributions are welcome! Please open issues and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/LICENSE).

## Made with :heart: Team NLJinchūriki

![image](https://github.com/user-attachments/assets/c8494a01-529b-44fe-9421-b2c9e5805d8a)
