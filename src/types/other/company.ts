import type { PhysicalAddress } from './physical-address';

export interface Company {
  address: PhysicalAddress;
  department: string;
  name: string;
  title: string;
}
