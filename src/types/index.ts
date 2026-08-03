export interface inputtedHistory {
  name: string;
  volume: string;
  abv: string;
  price: string;
  currency: string;
  alcoholVolume: number;
  alcoholPricePerMilliliter: number;
  alcoholPricePerPercent: number;
}

export interface comparisonFlag {
  isMoreAlcoholVolume: boolean;
  isAlcoholPricePerMlCheaper: boolean;
  isAlcoholPricePerPercentCheaper: boolean;
}
