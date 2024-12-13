document.addEventListener('DOMContentLoaded', () => {
  // Grab all necessary DOM elements
  const statusEl = document.getElementById('status');
  const accountEl = document.getElementById('account');
  const allAccountsEl = document.getElementById('allAccounts');
  const networkEl = document.getElementById('network');
  const balanceEl = document.getElementById('balance');
  const versionEl = document.getElementById('version');
  const chainIdEl = document.getElementById('chainId');
  const signMessageInput = document.getElementById('signMessageInput');
  const signMessageButton = document.getElementById('signMessageButton');
  const signatureResponseEl = document.getElementById('signatureResponse');

  const connectButton = document.getElementById('connectButton');
  const disconnectButton = document.getElementById('disconnectButton');
  const sendTransactionButton = document.getElementById('sendTransactionButton');
  const chainSelect = document.getElementById('chainSelect');
  const promptInstallButton = document.getElementById('promptInstallButton');
  const promptCreatorButton = document.getElementById('promptCreatorButton');

  const logContainer = document.getElementById('logContainer');

  let logs = [];

  /**
   * Adds a new log entry to the logs state.
   * @param {string} message - The log message to add.
   */
  const addLog = (message) => {
    logs.push(message);
    const logEntry = document.createElement('p');
    logEntry.className = 'log-entry';
    logEntry.textContent = message;
    logContainer.appendChild(logEntry);
    // Automatically scroll to the bottom
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  /**
   * Updates the wallet information UI.
   * @param {Object} info - The wallet information.
   */
  const updateWalletInfo = (info) => {
    if (info.status !== undefined) statusEl.textContent = info.status;
    if (info.account !== undefined) accountEl.textContent = info.account || 'None';
    if (info.allAccounts !== undefined) allAccountsEl.textContent = info.allAccounts ? info.allAccounts.join(', ') : 'N/A';
    if (info.network !== undefined) networkEl.textContent = info.network || 'None';
    if (info.balance !== undefined) balanceEl.textContent = info.balance ? `${info.balance.formattedBalance} ${info.balance.displayUnit}` : 'N/A';
    if (info.version !== undefined) versionEl.textContent = info.version || 'N/A';
    if (info.chainId !== undefined) chainIdEl.textContent = info.chainId || 'N/A';
  };

  /**
   * Fetches all connected accounts and updates the UI.
   */
  const fetchAllAccounts = async () => {
    try {
      addLog('Fetching all connected accounts...');
      const accounts = await window.ssc.getAllAccounts();
      addLog(`Fetched accounts: ${accounts.length > 0 ? accounts.join(', ') : 'None'}`);
      updateWalletInfo({
        allAccounts: accounts,
      });
    } catch (err) {
      updateWalletInfo({
        status: `Fetching accounts failed: ${err.message}`,
      });
      addLog(`fetchAllAccounts Failed: ${err.message}`);
    }
  };

  /**
   * Fetches the balance of the connected account and updates the UI.
   */
  const fetchBalance = async () => {
    try {
      addLog('Fetching balance...');
      const bal = await window.ssc.getBalance();
      addLog(`Fetched balance: ${bal.formattedBalance} ${bal.displayUnit}`);
      updateWalletInfo({
        balance: bal,
      });
    } catch (err) {
      updateWalletInfo({
        status: `Fetching balance failed: ${err.message}`,
      });
      addLog(`fetchBalance Failed: ${err.message}`);
    }
  };

  /**
   * Fetches the current network and updates the UI.
   */
  const fetchCurrentNetwork = async () => {
    try {
      addLog('Fetching current network...');
      const net = await window.ssc.getCurrentNetwork();
      addLog(`Fetched network: ${net}`);
      updateWalletInfo({
        network: net,
      });
    } catch (err) {
      updateWalletInfo({
        status: `Fetching network failed: ${err.message}`,
      });
      addLog(`fetchCurrentNetwork Failed: ${err.message}`);
    }
  };

  /**
   * Fetches the version of the Starkey Provider and updates the UI.
   */
  const fetchVersion = async () => {
    try {
      addLog('Fetching Starkey Provider version...');
      const ver = await window.ssc.getVersion();
      addLog(`Fetched version: ${ver}`);
      updateWalletInfo({
        version: ver,
      });
    } catch (err) {
      updateWalletInfo({
        status: `Fetching version failed: ${err.message}`,
      });
      addLog(`fetchVersion Failed: ${err.message}`);
    }
  };

  /**
   * Fetches the chain ID of the current network and updates the UI.
   */
  const fetchChainId = async () => {
    try {
      addLog('Fetching chain ID...');
      const cid = await window.ssc.getChainId();
      addLog(`Fetched chain ID: ${cid?.chainId || 'N/A'}`);
      updateWalletInfo({
        chainId: cid?.chainId || null,
      });
    } catch (err) {
      updateWalletInfo({
        status: `Fetching chain ID failed: ${err.message}`,
      });
      addLog(`fetchChainId Failed: ${err.message}`);
    }
  };

  /**
   * Connects to the Supra wallet.
   */
  const connectWallet = async () => {
    if (!window.ssc.isStarKeyAvailable()) {
      updateWalletInfo({ status: 'StarKey Supra not available.' });
      addLog('Connection Attempt: StarKey Supra not available.');
      return;
    }
    try {
      addLog('Attempting to connect to Supra wallet...');
      const acc = await window.ssc.connect();
      addLog(`Connected to account: ${acc}`);
      updateWalletInfo({
        status: `Connected: ${acc}`,
        account: acc,
      });
      // Enable buttons after connection
      disconnectButton.disabled = false;
      sendTransactionButton.disabled = false;
      signMessageButton.disabled = false;
      chainSelect.disabled = false;
      fetchAllAccounts();
      fetchBalance();
      fetchVersion();
      fetchChainId();
      fetchCurrentNetwork(); // Ensures network info is fetched
    } catch (err) {
      updateWalletInfo({ status: `Connection failed: ${err.message}` });
      addLog(`Connection Failed: ${err.message}`);
    }
  };

  /**
   * Disconnects from the Supra wallet.
   */
  const disconnectWallet = async () => {
    try {
      addLog('Attempting to disconnect from Supra wallet...');
      await window.ssc.disconnect();
      addLog('Disconnected from Supra wallet.');
      updateWalletInfo({
        status: 'Disconnected',
        account: null,
        allAccounts: null,
        balance: null,
        network: null,
        version: null,
        chainId: null,
      });
      // Disable buttons after disconnection
      disconnectButton.disabled = true;
      sendTransactionButton.disabled = true;
      signMessageButton.disabled = true;
      chainSelect.disabled = true;
    } catch (err) {
      updateWalletInfo({ status: `Disconnection failed: ${err.message}` });
      addLog(`Disconnection Failed: ${err.message}`);
    }
  };

  /**
   * Sends a test transaction.
   */
  const sendTransaction = async () => {
    try {
      addLog('Initiating sendTransaction...');
      const isConnected = await window.ssc.isConnected();
      if (!isConnected) {
        updateWalletInfo({ status: 'Please connect first' });
        addLog('sendTransaction: User not connected.');
        return;
      }
      const from = await window.ssc.getCurrentAccount();
      if (!from) {
        updateWalletInfo({ status: 'No account' });
        addLog('sendTransaction: No account found.');
        return;
      }
      const toAddress = '0x534583cd8cE0ac1af4Ce01Ae4f294d52b4Cd305F';
      addLog(`Sending transaction: from ${from} to ${toAddress} with value 100000000.`);
      const txHash = await window.ssc.sendTransaction({
        from,
        to: toAddress,
        value: '100000000'
      });
      updateWalletInfo({ status: `Transaction sent! Hash: ${txHash}` });
      addLog(`Transaction sent successfully. Hash: ${txHash}`);
    } catch (err) {
      updateWalletInfo({ status: `Transaction failed: ${err.message}` });
      addLog(`sendTransaction Failed: ${err.message}`);
    }
  };

  /**
   * Signs a message.
   */
  const signMessage = async () => {
    const message = signMessageInput.value.trim();
    if (!message) {
      addLog('Message cannot be empty.');
      return;
    }
    try {
      addLog('Attempting to sign message...');
      const result = await window.ssc.signMessage({ message });
      signatureResponseEl.innerHTML = `
        <p>Signature Response:</p>
        <pre>${JSON.stringify(result, null, 2)}</pre>
      `;
      updateWalletInfo({ status: 'Message signed successfully.' });
      addLog('Message signed successfully.');
    } catch (err) {
      updateWalletInfo({ status: `Sign message failed: ${err.message}` });
      addLog(`Error signing message: ${err.message}`);
    }
  };

  /**
   * Changes the network chain based on the selected chain ID.
   * @param {string} chain - The chain ID to switch to.
   */
  const changeNet = async (chain) => {
    try {
      addLog(`Attempting to change network to Chain ${chain}...`);
      const res = await window.ssc.changeNetwork(chain);
      updateWalletInfo({ chainId: res.chainId });
      addLog(`Network changed successfully. New Chain ID: ${res.chainId}`);
      fetchCurrentNetwork(); // Fetch updated network info
    } catch (err) {
      updateWalletInfo({ status: `Change network failed: ${err.message}` });
      addLog(`Change Network (ChainId) Failed: ${err.message} only chain 6 seems to work`);
    }
  };

  /**
   * Prompts the user to install the StarKey Supra wallet.
   */
  const promptInstall = () => {
    addLog('Prompting user to install StarKey Supra wallet...');
    window.ssc.promptInstall();
  };

  /**
   * Visits supra-starkey-connect GitHub repository.
   */
  const promptCreator = () => {
    addLog('Visiting supra-starkey-connect GitHub repository...');
    window.open(
      'https://github.com/NLJinchuriki/supra-starkey-connect',
      '_blank'
    );
  };

  /**
   * Registers event listeners for account changes, disconnects, and network changes.
   * Cleans up the listeners on page unload.
   */
  const registerEventListeners = () => {
    // Account Changed Listener
    const handleAccountChanged = (accounts) => {
      const newAccount = accounts[0] || null;
      updateWalletInfo({
        account: newAccount,
        status: newAccount ? `Connected: ${newAccount}` : 'Disconnected'
      });
      addLog(`Event: Account changed to ${newAccount || 'No account'}`);
      if (newAccount) {
        fetchAllAccounts();
        fetchBalance();
      } else {
        // Disable buttons if no account
        disconnectButton.disabled = true;
        sendTransactionButton.disabled = true;
        signMessageButton.disabled = true;
        chainSelect.disabled = true;
      }
    };

    // Disconnect Listener
    const handleDisconnectEvent = () => {
      updateWalletInfo({
        status: 'Wallet disconnected',
        account: null,
        allAccounts: null,
        balance: null,
        network: null,
        version: null,
        chainId: null,
      });
      addLog('Event: Wallet disconnected.');
      // Disable buttons after disconnection
      disconnectButton.disabled = true;
      sendTransactionButton.disabled = true;
      signMessageButton.disabled = true;
      chainSelect.disabled = true;
    };

    // Network Changed Listener
    const handleNetworkChanged = (networkInfo) => {
      updateWalletInfo({ chainId: networkInfo.chainId });
      addLog(`Event: Network changed to Chain ${networkInfo.chainId}`);
      fetchCurrentNetwork();
    };

    // Register Event Listeners
    window.ssc.onAccountChanged(handleAccountChanged);
    window.ssc.onDisconnect(handleDisconnectEvent);
    window.ssc.onNetworkChanged(handleNetworkChanged);

    // Cleanup Function to Remove Event Listeners
    const cleanupEventListeners = () => {
      window.ssc.offAccountChanged(handleAccountChanged);
      window.ssc.offDisconnect(handleDisconnectEvent);
      window.ssc.offNetworkChanged(handleNetworkChanged);
      addLog('Cleaned up event listeners.');
    };

    // Register cleanup on page unload
    window.addEventListener('beforeunload', cleanupEventListeners);
  };

  /**
   * Fetches the initial state if already connected.
   */
  const fetchInitialState = async () => {
    if (window.ssc.isStarKeyAvailable()) {
      const isConnected = await window.ssc.isConnected();
      if (isConnected) {
        const acc = await window.ssc.getCurrentAccount();
        updateWalletInfo({
          status: `Connected: ${acc}`,
          account: acc
        });
        addLog(`Initial State: Connected to account ${acc}`);
        // Enable buttons after connection
        disconnectButton.disabled = false;
        sendTransactionButton.disabled = false;
        signMessageButton.disabled = false;
        chainSelect.disabled = false;
        fetchAllAccounts();
        fetchBalance();
        fetchVersion();
        fetchChainId();
        fetchCurrentNetwork();
        // Set selected chain if available
        try {
          const cid = await window.ssc.getChainId();
          if (cid?.chainId) {
            chainSelect.value = cid.chainId;
            setSelectedChain(chainId);
          }
        } catch (err) {
          addLog(`Error fetching initial chain ID: ${err.message}`);
        }
      }
    }
  };

  /**
   * Initializes the application by registering event listeners and fetching initial state.
   */
  const init = async () => {
    registerEventListeners();
    await fetchInitialState();
  };

  init();


  signMessageButton.addEventListener('click', signMessage);
  connectButton.addEventListener('click', connectWallet);
  disconnectButton.addEventListener('click', disconnectWallet);
  sendTransactionButton.addEventListener('click', sendTransaction);
  chainSelect.addEventListener('change', (e) => {
    const selectedChain = e.target.value;
    changeNet(selectedChain);
  });
  promptInstallButton.addEventListener('click', promptInstall);
  promptCreatorButton.addEventListener('click', promptCreator);
});