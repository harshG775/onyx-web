import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/*formatters*/
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    maximumFractionDigits: 0,
});
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
}
export function formatDate(dateString: string, type?: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(type, options);
}
export function createArrayFromDigit(digit:number) {
    // Ensure digit is a positive integer
    if (typeof digit !== 'number' || digit <= 0 || !Number.isInteger(digit)) {
      throw new Error('Input must be a positive integer');
    }
  
    return Array.from({ length: digit }, (_, index) => index + 1);
  }
  