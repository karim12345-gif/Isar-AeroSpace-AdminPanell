import AeroSpaceApi from './AeroSpaceApi'

//* axios configuration
export const headersWithoutAccessToken = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

export { AeroSpaceApi }
