import React, { useState, useEffect, useRef } from 'react'

import { ssc } from 'supra-starkey-connect'
import type { Balance } from 'supra-starkey-connect'

import './App.css'

/**
 * React Example for interacting with the StarKey Supra wallet.
 */
function App() {
  const [status, setStatus] = useState('Not Connected')
  const [account, setAccount] = useState<string | null>(null)
  const [allAccounts, setAllAccounts] = useState<string[] | null>(null)
  const [network, setNetwork] = useState<string | null>(null)
  const [balance, setBalance] = useState<Balance | null>(null)
  const [version, setVersion] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const [logs, setLogs] = useState<string[]>([])

  const [selectedChain, setSelectedChain] = useState<string>('1')

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  /**
   * Adds a new log entry to the logs state.
   * @param {string} message - The log message to add.
   */
  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message])
  }

  /**
   * Connects to the Supra wallet.
   */
  const connectWallet = async () => {
    if (!ssc.isStarKeyAvailable()) {
      setStatus('StarKey wallet seems to be not available/installed.')
      addLog(
        'Connection Attempt: StarKey wallet seems to be not available/installed'
      )
      return
    }
    try {
      addLog('Attempting to connect to Supra wallet...')
      const acc = await ssc.connect()
      setAccount(acc)
      setStatus(`Connected: ${acc}`)
      addLog(`Connected to account: ${acc}`)
      fetchAllAccounts()
      fetchBalance()
      fetchVersion()
      fetchChainId()
    } catch (err: any) {
      setStatus(`Connection failed: ${err.message}`)
      addLog(`Connection Failed: ${err.message}`)
    }
  }

  /**
   * Disconnects from the Supra wallet.
   */
  const disconnectWallet = async () => {
    try {
      addLog('Attempting to disconnect from Supra wallet...')
      await ssc.disconnect()
      setAccount(null)
      setAllAccounts(null)
      setBalance(null)
      setStatus('Disconnected')
      addLog('Disconnected from Supra wallet.')
    } catch (err: any) {
      setStatus(`Disconnection failed: ${err.message}`)
      addLog(`Disconnection Failed: ${err.message}`)
    }
  }

  /**
   * Sends a test transaction.
   */
  const sendTransaction = async () => {
    try {
      addLog('Initiating sendTransaction...')
      const isConnected = await ssc.isConnected()
      if (!isConnected) {
        setStatus('Please connect first')
        addLog('sendTransaction: User not connected.')
        return
      }
      const from = await ssc.getCurrentAccount()
      if (!from) {
        setStatus('No account')
        addLog('sendTransaction: No account found.')
        return
      }
      const toAddress = '0x534583cd8cE0ac1af4Ce01Ae4f294d52b4Cd305F'
      addLog(
        `Sending transaction: from ${from} to ${toAddress} with value 100000000.`
      )
      const txHash = await ssc.sendTransaction({
        from,
        to: toAddress,
        value: '100000000'
      })
      setStatus(`Transaction sent! Hash: ${txHash}`)
      addLog(`Transaction sent successfully. Hash: ${txHash}`)
    } catch (err: any) {
      setStatus(`Transaction failed: ${err.message}`)
      addLog(`sendTransaction Failed: ${err.message}`)
    }
  }

  /**
   * Signs a message.
   */
  const signMsg = async () => {
    try {
      addLog('Signing message... (will fail since we do not know what to pass)')
      const signature = await ssc.signMessage_undocumented('some message')
      setStatus(`Message not signed: ${signature}`)
      addLog(
        `Message not signed successfully. Signature: ${signature} function is undocumented, we don't know what to pass`
      )
    } catch (err: any) {
      setStatus(`Sign message failed: ${err.message}`)
      addLog(`signMsg Failed: ${err.message}`)
    }
  }

  /**
   * Changes the network chain based on the selected chain ID.
   */
  const changeNet = async (chain: string) => {
    try {
      addLog(`Attempting to change network to Chain ${chain}...`)
      const res = await ssc.changeNetwork(chain)
      setStatus(`Network changed: ${JSON.stringify(res)}`)
      setChainId(res.chainId)
      addLog(`Network changed successfully. New Chain ID: ${res.chainId}`)
    } catch (err: any) {
      setStatus(`Change network failed: ${err.message}`)
      addLog(
        `Change Network (ChainId) Failed: ${err.message} only chain 6 seems to work`
      )
    }
  }

  /**
   * Prompts the user to install the StarKey Supra wallet.
   */
  const promptInstall = () => {
    addLog('Prompting user to install StarKey Supra wallet...')
    ssc.promptInstall()
  }

  /**
   * Visits Supra-starkey-connect github
   */
  const promptCreator = () => {
    addLog('Visiting supra-starkey-connect github...')
    window.open(
      'https://github.com/NLJinchuriki/supra-starkey-connect',
      '_blank'
    )
  }

  /**
   * Fetches all connected accounts.
   */
  const fetchAllAccounts = async () => {
    try {
      addLog('Fetching all connected accounts...')
      const accounts = await ssc.getAllAccounts()
      setAllAccounts(accounts)
      addLog(`Fetched accounts: ${accounts ? accounts.join(', ') : 'None'}`)
    } catch (err: any) {
      setStatus(`Fetching accounts failed: ${err.message}`)
      addLog(`fetchAllAccounts Failed: ${err.message}`)
    }
  }

  /**
   * Fetches the balance of the connected account.
   */
  const fetchBalance = async () => {
    try {
      addLog('Fetching balance...')
      const bal = await ssc.getBalance()
      setBalance(bal)
      addLog(`Fetched balance: ${bal.formattedBalance} ${bal.displayUnit}`)
    } catch (err: any) {
      setStatus(`Fetching balance failed: ${err.message}`)
      addLog(`fetchBalance Failed: ${err.message}`)
    }
  }

  /**
   * Fetches the current network.
   */
  const fetchCurrentNetwork = async () => {
    try {
      addLog('Fetching current network...')
      const net = await ssc.getCurrentNetwork()
      setNetwork(net)
      addLog(`Fetched network: ${net}`)
    } catch (err: any) {
      setStatus(`Fetching network failed: ${err.message}`)
      addLog(`fetchCurrentNetwork Failed: ${err.message}`)
    }
  }

  /**
   * Fetches the version of the Starkey Provider.
   */
  const fetchVersion = async () => {
    try {
      addLog('Fetching Starkey Provider version...')
      const ver = await ssc.getVersion()
      setVersion(ver)
      addLog(`Fetched version: ${ver}`)
    } catch (err: any) {
      setStatus(`Fetching version failed: ${err.message}`)
      addLog(`fetchVersion Failed: ${err.message}`)
    }
  }

  /**
   * Fetches the chain ID of the current network.
   */
  const fetchChainId = async () => {
    try {
      addLog('Fetching chain ID...')
      const cid = await ssc.getChainId()
      setChainId(cid?.chainId ?? null)
      addLog(`Fetched chain ID: ${cid?.chainId ?? 'N/A'}`)
    } catch (err: any) {
      setStatus(`Fetching chain ID failed: ${err.message}`)
      addLog(`fetchChainId Failed: ${err.message}`)
    }
  }

  /**
   * Registers event listeners for account changes, disconnects, and network changes.
   */
  useEffect(() => {
    // Account Changed Listener
    const handleAccountChanged = (accounts: string[]) => {
      setAccount(accounts[0] || null)
      setStatus(`Account changed: ${accounts[0] || 'No account'}`)
      addLog(`Event: Account changed to ${accounts[0] || 'No account'}`)
      if (accounts[0]) {
        fetchAllAccounts()
        fetchBalance()
      }
    }

    // Disconnect Listener
    const handleDisconnect = () => {
      setAccount(null)
      setAllAccounts(null)
      setBalance(null)
      setStatus('Wallet disconnected')
      addLog('Event: Wallet disconnected.')
    }

    // Network Changed Listener
    const handleNetworkChanged = (networkInfo: { chainId: string }) => {
      setStatus(`Network changed: ${JSON.stringify(networkInfo)}`)
      setChainId(networkInfo.chainId)
      addLog(`Event: Network changed to Chain ${networkInfo.chainId}`)
    }

    // Register Event Listeners
    ssc.onAccountChanged(handleAccountChanged)
    ssc.onDisconnect(handleDisconnect)
    ssc.onNetworkChanged(handleNetworkChanged)

    // Cleanup Function to Remove Event Listeners
    return () => {
      // there are no provider.off message for the registered listeners sow we cannot remove them
      // If not implemented, consider adding them to prevent memory leaks,
      // we should ask starkey wallet for this.
    }
  }, [])

  useEffect(() => {
    const fetchInitialState = async () => {
      if (ssc.isStarKeyAvailable()) {
        const isConnected = await ssc.isConnected()
        if (isConnected) {
          const acc = await ssc.getCurrentAccount()
          setAccount(acc)
          setStatus(`Connected: ${acc}`)
          addLog(`Initial State: Connected to account ${acc}`)
          fetchAllAccounts()
          fetchBalance()
          fetchCurrentNetwork()
          fetchVersion()
          fetchChainId()
          if (acc && chainId) {
            setSelectedChain(chainId)
          }
        }
      }
    }

    fetchInitialState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChain = e.target.value
    setSelectedChain(newChain)
    changeNet(newChain)
  }

  return (
    <div className="app-container">
      <h1 className="app-header">Supra-starkey-connect - React Example</h1>
      <div className="wallet-info">
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Account:</strong> {account ?? 'None'}
        </p>
        <p>
          <strong>All Accounts:</strong>{' '}
          {allAccounts ? allAccounts.join(', ') : 'N/A'}
        </p>
        <p>
          <strong>Network:</strong> {network ?? 'None'}
        </p>
        <p>
          <strong>Balance:</strong>{' '}
          {balance
            ? `${balance.formattedBalance} ${balance.displayUnit}`
            : 'N/A'}
        </p>
        <p>
          <strong>Version:</strong> {version ?? 'N/A'}
        </p>
        <p>
          <strong>Chain ID:</strong> {chainId ?? 'N/A'}
        </p>
      </div>

      <div className="button-group">
        {!account ? (
          <button onClick={connectWallet} className="btn">
            Connect Wallet
          </button>
        ) : (
          <button onClick={disconnectWallet} className="btn">
            Disconnect Wallet
          </button>
        )}
        <button onClick={sendTransaction} disabled={!account} className="btn">
          Send Test Transaction
        </button>
        <button onClick={signMsg} disabled={!account} className="btn">
          Sign Message
        </button>

        <label htmlFor="chainSelect" className="chain-label">
          Change Network:
        </label>
        <select
          id="chainSelect"
          value={selectedChain}
          onChange={handleChainChange}
          disabled={!account}
          className="chain-select"
        >
          <option value="1">Chain 1</option>
          <option value="2">Chain 2</option>
          <option value="3">Chain 3</option>
          <option value="4">Chain 4</option>
          <option value="5">Chain 5</option>
          <option value="6">Chain 6</option>
        </select>
        <button onClick={promptInstall} className="btn">
          Prompt Install
        </button>
        <button onClick={promptCreator} className="btn">
          Supra-starkey-connect
        </button>
      </div>

      <h2 className="logs-header">Backend Interaction Logs</h2>
      <div className="log-container" ref={logContainerRef}>
        {logs.map((log, index) => (
          <p key={index} className="log-entry">
            {log}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
