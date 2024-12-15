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
  const signAndSendTransactionButton = document.getElementById('signAndSendTransactionButton');
  const rawTxHashEl = document.getElementById('rawTxHash');
  const rawTxErrorEl = document.getElementById('rawTxError');

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
      signAndSendTransactionButton.disabled = false;
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
      signAndSendTransactionButton.disabled = true;
      chainSelect.disabled = true;
      // Clear additional UI elements
      signatureResponseEl.innerHTML = '';
      rawTxHashEl.innerHTML = '';
      rawTxErrorEl.innerHTML = '';
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
  const handleSignMessage = async () => {
    const message = signMessageInput.value.trim();
    if (!message) {
      addLog('No sign message set, please set a message to sign first.');
      return;
    }
    if (!window.ssc) {
      addLog('Supra Starkey Connect is not available.');
      return;
    }
    try {
      signMessageButton.disabled = true;
      signMessageButton.textContent = 'Signing...';
      addLog('Attempting to sign message...');
      const result = await window.ssc.signMessage({ message });
      if (result) {
        const { response, verified } = result;
        signatureResponseEl.innerHTML = `
          <p>Signature Response:</p>
          <pre>${JSON.stringify({ ...response, verified }, null, 2)}</pre>
        `;
        updateWalletInfo({ status: 'Message signed and verified.' });
        addLog(`Message signed - Signature: ${response.signature}, Verified: ${verified}`);
      }
    } catch (err) {
      updateWalletInfo({ status: `Sign message failed: ${err.message}` });
      addLog(`Sign message failed: ${err.message}`);
    } finally {
      signMessageButton.disabled = false;
      signMessageButton.textContent = 'Sign Message';
    }
  };

  /**
   * Sends and signs a raw transaction.
   */
  const handleSignAndSendTransaction = async () => {
    const account = accountEl.textContent !== 'None' ? accountEl.textContent : null;
    if (!account) {
      updateWalletInfo({ status: 'No connected account. Connect wallet first.' });
      addLog('Sign and Send Transaction failed. No connected account.');
      return;
    }

    try {
      signAndSendTransactionButton.disabled = true;
      signAndSendTransactionButton.textContent = 'Sending...';
      rawTxHashEl.innerHTML = '';
      rawTxErrorEl.innerHTML = '';
      addLog('~~ sendRawTransaction ~~~');

      // Example Data:
      // Adjust the rawTxPayload as per your specific requirements
      const rawTxPayload = [
        account,
        0,
        '0000000000000000000000000000000000000000000000000000000000000001',
        'supra_account',
        'transfer',
        [],
        [
          new window.HexString('0x782608dff0ebf604f708cb4ce8b4ae43c03af7587093579267da4b20df146b40').toUint8Array(),
          window.BCS.bcsSerializeUint64(100000000)
        ]
      ];

      addLog(`Transaction being sent: ${JSON.stringify(rawTxPayload, null, 2)}`);
      addLog('Transaction created');

      // Sign and Send
      const txHash = await window.ssc.signAndSendTransaction(rawTxPayload);

      if (txHash) {
        rawTxHashEl.innerHTML = `<p>Transaction Hash:</p><pre>${txHash}</pre>`;
        updateWalletInfo({ status: `Transaction sent! Hash: ${txHash}` });
        addLog(`Transaction sent successfully. Hash: ${txHash}`);
      } else {
        addLog('Failed to send transaction.');
      }
    } catch (err) {
      rawTxErrorEl.innerHTML = `<p>Error:</p><pre>${err.message}</pre>`;
      updateWalletInfo({ status: `Transaction failed: ${err.message}` });
      addLog(`signAndSendTransaction Failed: ${err.message}`);
    } finally {
      signAndSendTransactionButton.disabled = false;
      signAndSendTransactionButton.textContent = 'Sign and Send Transaction';
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
      fetchCurrentNetwork();
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
        signAndSendTransactionButton.disabled = true;
        chainSelect.disabled = true;
        // Clear additional UI elements
        signatureResponseEl.innerHTML = '';
        rawTxHashEl.innerHTML = '';
        rawTxErrorEl.innerHTML = '';
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
      signAndSendTransactionButton.disabled = true;
      chainSelect.disabled = true;
      // Clear additional UI elements
      signatureResponseEl.innerHTML = '';
      rawTxHashEl.innerHTML = '';
      rawTxErrorEl.innerHTML = '';
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
        signAndSendTransactionButton.disabled = false;
        chainSelect.disabled = false;
        fetchAllAccounts();
        fetchBalance();
        fetchVersion();
        fetchChainId();
        fetchCurrentNetwork();
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

  // Event Listeners for Buttons and Select
  connectButton.addEventListener('click', connectWallet);
  disconnectButton.addEventListener('click', disconnectWallet);
  sendTransactionButton.addEventListener('click', sendTransaction);
  signMessageButton.addEventListener('click', handleSignMessage);
  signAndSendTransactionButton.addEventListener('click', handleSignAndSendTransaction);
  chainSelect.addEventListener('change', (e) => {
    const selectedChain = e.target.value;
    changeNet(selectedChain);
  });
  promptInstallButton.addEventListener('click', promptInstall);
  promptCreatorButton.addEventListener('click', promptCreator);
});