import { match as isAsset } from './isAsset';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return !isAsset(param);
}
