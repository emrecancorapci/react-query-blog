import type { PhysicalAddress } from './PhysicalAddress';

export interface Company {
  address: PhysicalAddress;
  department: string;
  name: string;
  title: string;
}
