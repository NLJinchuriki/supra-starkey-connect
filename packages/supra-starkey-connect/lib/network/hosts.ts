/**
 * URL for the Supra Node Mainnet.
 *
 * @constant
 * @type {string}
 */
export const SUPRA_NODE_MAINNET_URL = 'https://rpc-wallet.supra.com'

/**
 * URL for the Supra Node Testnet.
 *
 * @constant
 * @type {string}
 */
export const SUPRA_NODE_TESTNET_URL = 'https://rpc-testnet.supra.com'

/**
 * Maximum number of retry attempts for transaction completion polling.
 *
 * @constant
 * @type {number}
 * @default
 */
export const MAX_RETRY_FOR_TRANSACTION_COMPLETION = 10

/**
 * Delay between each polling attempt in milliseconds.
 *
 * @constant
 * @type {number}
 * @default
 */
export const DELAY_BETWEEN_POOLING_REQUEST = 2000 // 2 seconds

/**
 * Determines the appropriate Supra Node URL based on the provided network name.
 *
 * @function
 * @param {string} network - The name of the network (e.g., 'mainnet', 'testnet').
 * @returns {string} - The corresponding Supra Node URL.
 *
 * @example
 * const url = getNetwork('testnet'); // Returns SUPRA_NODE_TESTNET_URL
 */
export const getNetwork = (network: string): string =>
  network.toLowerCase().includes('testnet')
    ? SUPRA_NODE_TESTNET_URL
    : SUPRA_NODE_MAINNET_URL
