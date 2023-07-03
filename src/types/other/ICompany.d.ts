export interface ICompany {
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  department: string;
  name: string;
  title: string;
}
