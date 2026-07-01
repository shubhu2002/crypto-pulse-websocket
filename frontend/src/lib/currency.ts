export interface Currency {
	code: string;
	symbol: string;
	name: string;
	rate: number;
}

export interface Currency {
	code: string;
	symbol: string;
	name: string;
	rate: number;
	flag: string;
}

export const CURRENCIES: Currency[] = [
	{
		code: 'USD',
		symbol: '$',
		name: 'US Dollar',
		rate: 1,
		flag: '🇺🇸',
	},

	{
		code: 'EUR',
		symbol: '€',
		name: 'Euro',
		rate: 0.92,
		flag: '🇪🇺',
	},

	{
		code: 'GBP',
		symbol: '£',
		name: 'British Pound',
		rate: 0.79,
		flag: '🇬🇧',
	},

	{
		code: 'INR',
		symbol: '₹',
		name: 'Indian Rupee',
		rate: 83.5,
		flag: '🇮🇳',
	},

	{
		code: 'JPY',
		symbol: '¥',
		name: 'Japanese Yen',
		rate: 157.8,
		flag: '🇯🇵',
	},

	{
		code: 'AUD',
		symbol: 'A$',
		name: 'Australian Dollar',
		rate: 1.53,
		flag: '🇦🇺',
	},
];

export function convertPrice(usdPrice: number, currency: Currency): number {
	return usdPrice * currency.rate;
}

export function formatPrice(usdPrice: number, currency: Currency): string {
	const converted = convertPrice(usdPrice, currency);
	const { symbol, code } = currency;

	if (converted >= 1000) {
		return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	}
	if (converted >= 1) {
		return `${symbol}${converted.toFixed(4)}`;
	}
	if (code === 'JPY' || code === 'INR') {
		return `${symbol}${converted.toFixed(2)}`;
	}
	return `${symbol}${converted.toFixed(6)}`;
}

export function formatVolume(n: number): string {
	if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
	if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
	if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
	return n.toFixed(0);
}
