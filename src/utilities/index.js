/**
 * @function formatCurrency
 * Format number as Curreny (US Dollars)
 *
 * @param {number} currency
 * @return {string} number formatted as currency.
 *
 * @example
 * format Currency(0)
 *  => $0.00
 *
 * @example
 *  formatCurrency(1.5)
 * => $1.50
 *
 */

export function formatCurrency(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}
