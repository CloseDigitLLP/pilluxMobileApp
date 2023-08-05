export const baseUrl = process.env.NODE_ENV === 'development' ? "http://192.168.1.9:5001" : "https://phpstack-1019741-3603266.cloudwaysapps.com/api/";

export const dashboard=()=>`/dashboard/`
export const student = (id='') => `/students/${id}`;
export const vehicle = (id='') => `/vehicles/${id}`;
export const login = () => `/auth/monitorLogin`;
export const verify = (id) => `/auth/verify/${id}`;
export const auth = (id) => `/auth/${id}`;
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
export const planning = (id='')=> `/planning/${id}`
export const repairs = (id='')=> `/repairs/${id}`
export const reports = (id='')=> `/reports/${id}`
export const penalties = (id='')=> `/penalties/${id}`
export const examWishlists = (id='')=> `/examWishlists/${id}`