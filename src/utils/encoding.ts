export function to_base_64(text: string): string {
  return Buffer.from(text).toString('base64');
}
