
export const formatedDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(date)
}

interface IformatedCurrency {
    amount: number
    currency: "USD" | "INR"
}
export function formatedCurrency({ amount, currency }: IformatedCurrency) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
    }).format(amount)
}
