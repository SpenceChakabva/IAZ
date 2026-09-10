type Fn = () => Promise<void> | void;

let coverFn: Fn | null = null;
let pending = false;

export function registerCover(cover: Fn) {
  coverFn = cover;
}
export function curtainReady() {
  return !!coverFn;
}
export async function runCover() {
  pending = true;
  if (coverFn) await coverFn();
}
/** Read-and-clear: did we arrive here through a curtain cover? */
export function consumePending() {
  const was = pending;
  pending = false;
  return was;
}
