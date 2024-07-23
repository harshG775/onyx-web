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
export function createArrayFromDigit(digit: number) {
    // Ensure digit is a positive integer
    if (typeof digit !== "number" || digit <= 0 || !Number.isInteger(digit)) {
        throw new Error("Input must be a positive integer");
    }

    return Array.from({ length: digit }, (_, index) => index + 1);
}
export function toUrlString(input: string) {
    // Replace spaces with hyphens, convert to lowercase, and remove unsafe characters
    let formatted = input.replace(/\s/g, "-").toLowerCase();
    // Remove unsafe characters (keep alphanumeric, hyphen, underscore)
    formatted = formatted.replace(/[^\w-]+/g, "");
    // Trim leading/trailing hyphens and replace consecutive hyphens with a single hyphen
    formatted = formatted.replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");

    return formatted;
}

export const getCurrentSeasonAndYear = () => {
    const date = new Date();
    const month = date.getMonth(); // 0-11 (January is 0, December is 11)
    const year = date.getFullYear();

    let season;

    if (month === 11 || month <= 1) {
        // December to February
        season = "WINTER";
    } else if (month >= 2 && month <= 4) {
        // March to May
        season = "SPRING";
    } else if (month >= 5 && month <= 7) {
        // June to August
        season = "SUMMER";
    } else {
        // September to November
        season = "FALL";
    }

    return { season, year };
};
