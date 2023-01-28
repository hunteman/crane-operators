import { Cran } from './cran';

export interface Shift {
  name?: string,
  dateFrom?: string,
  dateTo?: string,
  cranType?: string,
  id?: any,
  firstCran?: Cran,
  secondCran?: Cran,
  totalLoad?: number,
  totalShip?: number
}






