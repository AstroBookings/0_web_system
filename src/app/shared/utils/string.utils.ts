/**
 * Transforms from camelCase to Title Case
 * @param source the source string like confirmPassword
 * @returns Confirm Password
 */
export function titleCase(source: string) {
  // add a space before each uppercase letter
  const spaced = source.replace(/([A-Z])/g, ' $1');
  // capitalize the first letter
  return spaced.replace(/^./, (str) => str.toUpperCase());
}
