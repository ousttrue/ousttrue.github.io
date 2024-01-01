/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /\.jpg$/.test(param);
}
