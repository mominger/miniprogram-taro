export interface Address {
  id: string
  city: string
  address: string
  latitude: string
  longitude: string
}

export interface Reducers {
  currentAddress: Address
  token: string
}
