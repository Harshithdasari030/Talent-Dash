// Remove or fix any malformed global.localStorage that may have been injected
// into the Node process (some tools or flags can create a non-standard object).
try {
  // Only run in Node
  if (typeof global !== 'undefined' && global.localStorage) {
    const ls = global.localStorage;
    const ok = ls && typeof ls.getItem === 'function' && typeof ls.setItem === 'function';
    if (!ok) {
      try {
        delete global.localStorage;
      } catch (e) {
        // fallback: set to undefined
        global.localStorage = undefined;
      }
    }
  }
} catch (err) {
  // swallow errors — this hook is best-effort
}
