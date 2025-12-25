export function formatUzbekPhoneNumber(input: string): string {
  // strip non-digits except +
  let digits = input.replace(/\D/g, "");

  // always force +998 prefix
  if (!digits.startsWith("998")) {
    digits = "998" + digits.replace(/^998/, "");
  }

  // build formatted string
  let result = "+998";
  if (digits.length > 3) result += " " + digits.slice(3, 5);
  if (digits.length > 5) result += " " + digits.slice(5, 8);
  if (digits.length > 8) result += " " + digits.slice(8, 10);
  if (digits.length > 10) result += " " + digits.slice(10, 12);

  return result;
}
