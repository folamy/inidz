export interface Address {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  street: string;
  direction?: string;
  city: string;
  state: string;
  lga: string;
  uid?: string;
}

export const addressNew: Address = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  street: '',
  direction: '',
  city: '',
  state: '',
  lga: '',
  uid: '',
};
export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  direction?: string;
  city: string;
  state: string;
  lga: string;
  email: string;
  uid?: string;
  password: string;
}
