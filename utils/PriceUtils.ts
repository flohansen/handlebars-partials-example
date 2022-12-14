export function convertPrice(priceCents: number): string {
  const centsString = priceCents.toString();
  const euros = centsString.substring(0, centsString.length - 2);
  const cents = centsString.substring(centsString.length - 2);
  return `${euros},${cents}`;
}
