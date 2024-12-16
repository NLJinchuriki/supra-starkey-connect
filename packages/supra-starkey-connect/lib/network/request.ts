import { getNetwork } from './hosts'

/**
 * Performs an HTTP GET or POST request using fetch.
 *
 * @param isGetMethod - Determines if the request is GET (true) or POST (false).
 * @param subURL - The endpoint path to append to the base URL.
 * @param data - The payload for POST requests.
 * @returns A promise that resolves to an object containing the response data and status.
 * @throws Will throw an error for network issues, invalid URLs, or non-OK HTTP status codes.
 */
export const sendRequest = async (
  isGetMethod: boolean,
  subURL: string,
  network: string,
  data?: any
): Promise<{ data: any; status: number }> => {
  const url = `${getNetwork(network)}${subURL}`

  const options: RequestInit = {
    method: isGetMethod ? 'GET' : 'POST',
    headers: {}
  }

  if (!isGetMethod) {
    if (data === undefined) {
      throw new Error("For POST requests, 'data' should not be 'undefined'.")
    }
    options.headers = {
      'Content-Type': 'application/json'
    }
    options.body = JSON.stringify(data)
  }

  try {
    const response: Response = await fetch(url, options)

    if (response.status === 404) {
      throw new Error('Invalid URL, Path Not Found')
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`
      )
    }

    // Attempt to parse the response as JSON
    let responseData: any = null
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }

    return {
      data: responseData,
      status: response.status
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('An unknown error occurred during the fetch request.')
  }
}
