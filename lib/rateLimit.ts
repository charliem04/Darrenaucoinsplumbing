/**
 * Submit limits for the request form, per browser.
 *
 *   · one send every SPACING_MS — a double-click or an impatient retry
 *     doesn't send the same lead twice;
 *   · at most MAX_IN_WINDOW sends per WINDOW_MS — a script driving this
 *     page can't flood the inbox.
 *
 * Kept in localStorage so a reload doesn't reset it, with an in-memory
 * copy for browsers where storage throws (private modes, blocked site
 * data). It is a browser-side limit: it stops this page from being
 * used to flood the inbox, not a bot that posts to Web3Forms directly.
 */
const KEY = "da-form-sends";
const SPACING_MS = 10_000;
const WINDOW_MS = 15 * 60_000;
const MAX_IN_WINDOW = 3;

let memory: number[] = [];

function read(now: number): number[] {
  let list = memory;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) list = parsed.filter((t): t is number => typeof t === "number");
  } catch {
    /* storage unavailable: the in-memory list stands in */
  }
  // Only sends inside the window count; anything in the future is a
  // tampered or clock-skewed entry and is dropped.
  return list.filter((t) => t <= now && now - t < WINDOW_MS);
}

function write(list: number[]) {
  memory = list;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* in-memory only */
  }
}

/** Whether a send is allowed right now. Does not record anything. */
export function canSend(now = Date.now()): boolean {
  const recent = read(now);
  if (recent.length >= MAX_IN_WINDOW) return false;
  const last = recent[recent.length - 1];
  return last === undefined || now - last >= SPACING_MS;
}

/** Record an attempt that reached the network. */
export function recordSend(now = Date.now()) {
  write([...read(now), now]);
}
