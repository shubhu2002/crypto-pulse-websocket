export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.5 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 157.8 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
];

export function convertPrice(usdPrice: number, currency: Currency): number {
  return usdPrice * currency.rate;
}

export function formatPrice(usdPrice: number, currency: Currency): string {
  const converted = convertPrice(usdPrice, currency);
  const { symbol, code } = currency;

  if (converted >= 1000) {
    return `${symbol}${converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (converted >= 1) {
    return `${symbol}${converted.toFixed(4)}`;
  }
  if (code === "JPY" || code === "INR") {
    return `${symbol}${converted.toFixed(2)}`;
  }
  return `${symbol}${converted.toFixed(6)}`;
}

export function formatVolume(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toFixed(0);
}
