export function hasTouch() {
  if (process.server) {
    return false;
  }
  // console.log(window.matchMedia("(pointer: coarse)").matches)
  return window.matchMedia('(pointer: coarse)').matches;
}
