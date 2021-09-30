export interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  address: Address;
  state: EmployeeState;
}

export interface Address {
  street: string;
  number: string;
  postalCode: number;
}

export enum EmployeeState {
  Active = 0,
  NonActive = 1,
}
