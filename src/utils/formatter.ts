export function currencyFormatter(value: number, currency: string) {
  return new Intl.NumberFormat(currency.toLowerCase() === 'idr' ? 'id' : 'en', {
    maximumFractionDigits: 2,
  }).format(value);
}
