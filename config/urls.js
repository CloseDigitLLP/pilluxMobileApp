export const baseUrl = process.env.NODE_ENV === 'development' ? "http://192.168.1.42:5001" : "/api";

export const dashboard=()=>`/dashboard/`
export const student = (id='') => `/students/${id}`;
export const vehicle = (id='') => `/vehicles/${id}`;
export const login = () => `/auth/login`;
export const drivingSchool = (id='') => `/drivingSchools/${id}`;
export const users = (id='') => `/users/${id}`; 
export const alerts=()=> `/alerts/`
export const debits=()=> `/debits/`
export const monitors=()=> `/monitors/`
export const offers=(id='')=> `/offers/${id}`
export const receipts=()=> `/receipts/`
export const permissions=()=> `/permissions/`
export const roles=()=> `/roles/`
export const typesVehicle=()=>`/vehicles/types`;