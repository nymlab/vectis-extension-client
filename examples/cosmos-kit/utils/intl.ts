export function IntlAddress(address: string): string {
  return (
    address.slice(0, 8).concat("...") + address.substring(address.length - 8)
  );
}
