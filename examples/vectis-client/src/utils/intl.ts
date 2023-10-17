export function IntlAddress(address: string): string {
  return (
    address.slice(0, 6).concat("...") + address.substring(address.length - 8)
  );
}
