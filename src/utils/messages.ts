export function for_response_not_ok(
  path: string,
  status_code: number,
  body: string
): string {
  return `the request to the path ${path} returned the status code ${status_code} and body ${body}`;
}
