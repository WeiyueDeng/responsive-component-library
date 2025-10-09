// src/utils/color.js
// Utilities to normalize any CSS color into HSL

// Public API
// - parseColorToHsl(color: string): { h: number, s: number, l: number, a: number }
//   Parses any CSS color string (hex, rgb/rgba, hsl/hsla, or named color) and returns a normalized HSL object.
//   - h: hue in degrees [0..360)
//   - s: saturation in percent [0..100]
//   - l: lightness in percent [0..100]
//   - a: alpha in [0..1]
//   Throws if the color cannot be parsed.

// - toHslString(hsl: { h:number, s:number, l:number, a?:number }, options?: { modern?: boolean }): string
//   Formats an HSL object as a CSS color string. Values are range-checked (h wrapped, s/l/a clamped).
//   If options.modern = true  -> "hsl(h s% l% / a)" (CSS Color 4)
//   If options.modern = false -> "hsla(h, s%, l%, a)" when alpha < 1, otherwise "hsl(h, s%, l%)"

// - toHsl(colorOrHsl: string | { h:number, s:number, l:number, a?:number }): { h:number, s:number, l:number, a:number }
//   Convenience normalizer to always get an HSL object:
//   - If input is a string, delegates to parseColorToHsl.
//   - If input is an object with h/s/l, returns it as-is. Downstream APIs (e.g., toHslString) treat missing alpha as 1.

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function round(v, p = 2) {
  const m = Math.pow(10, p);
  return Math.round(v * m) / m;
}

function parseHex(hex) {
  let s = hex.replace(/^#/, '').trim();
  if (![3, 4, 6, 8].includes(s.length)) return null;

  if (s.length === 3 || s.length === 4) {
    // Expand shorthand (#rgb[a]) => #rrggbb[aa]
    s = s.split('').map((ch) => ch + ch).join('');
  }

  const hasAlpha = s.length === 8;
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);
  const a = hasAlpha ? parseInt(s.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function parseRgb(rgbStr) {
  // Supports rgb(255,0,0), rgba(255, 0, 0, .5), and percentage forms like rgb(100%, 0%, 0%)
  const s = rgbStr.replace(/\s+/g, '');
  const m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',');
  if (parts.length < 3) return null;

  const parseChannel = (v) => {
    if (v.endsWith('%')) {
      return clamp((parseFloat(v) / 100) * 255, 0, 255);
    }
    return clamp(parseFloat(v), 0, 255);
  };

  const r = parseChannel(parts[0]);
  const g = parseChannel(parts[1]);
  const b = parseChannel(parts[2]);
  let a = 1;
  if (parts[3] != null) {
    const alpha = parts[3];
    a = alpha.endsWith('%') ? clamp(parseFloat(alpha) / 100, 0, 1) : clamp(parseFloat(alpha), 0, 1);
  }
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return { r, g, b, a };
}

function parseHsl(hslStr) {
  // Supports hsl(120, 50%, 50%) and hsla(120, 50%, 50%, .5)
  const s = hslStr.replace(/\s+/g, '');
  const m = s.match(/^hsla?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',');
  if (parts.length < 3) return null;

  const h = parseFloat(parts[0]);
  const sPerc = parseFloat(parts[1]);
  const lPerc = parseFloat(parts[2]);
  let a = 1;
  if (parts[3] != null) {
    const alpha = parts[3];
    a = alpha.endsWith('%') ? clamp(parseFloat(alpha) / 100, 0, 1) : clamp(parseFloat(alpha), 0, 1);
  }
  if ([h, sPerc, lPerc].some((v) => Number.isNaN(v))) return null;
  return hslToRgb({ h, s: sPerc, l: lPerc, a });
}

function rgbToHsl({ r, g, b, a = 1 }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: round(h * 360, 2), s: round(s * 100, 2), l: round(l * 100, 2), a: round(a, 3) };
}

function hslToRgb({ h, s, l, a = 1 }) {
  // Input: h in degrees, s/l in percent
  const H = ((h % 360) + 360) % 360 / 360; // 0..1
  const S = clamp(s / 100, 0, 1);
  const L = clamp(l / 100, 0, 1);

  if (S === 0) {
    const v = Math.round(L * 255);
    return { r: v, g: v, b: v, a };
  }

  const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
  const p = 2 * L - q;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const r = Math.round(hue2rgb(p, q, H + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, H) * 255);
  const b = Math.round(hue2rgb(p, q, H - 1 / 3) * 255);
  return { r, g, b, a };
}

function resolveColorViaDom(color) {
  if (typeof document === 'undefined') return null; // SSR guard
  const el = document.createElement('span');
  el.style.color = color;
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  el.style.top = '-9999px';
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color; // rgb(...) or rgba(...)
  document.body.removeChild(el);
  return computed;
}

export function parseColorToHsl(color) {
  if (!color || typeof color !== 'string') {
    throw new Error('parseColorToHsl(color): color must be a non-empty string');
  }
  const input = color.trim();

  // 1) Direct hex
  if (input.startsWith('#')) {
    const rgb = parseHex(input);
    if (rgb) return rgbToHsl(rgb);
  }

  // 2) Direct rgb/rgba
  if (/^rgba?\(/i.test(input)) {
    const rgb = parseRgb(input);
    if (rgb) return rgbToHsl(rgb);
  }

  // 3) Direct hsl/hsla
  if (/^hsla?\(/i.test(input)) {
    const rgb = parseHsl(input);
    if (rgb) return rgbToHsl(rgb);
  }

  // 4) Named colors or other CSS syntaxes -> resolve via DOM
  const resolved = resolveColorViaDom(input);
  if (resolved) {
    const rgb = parseRgb(resolved);
    if (rgb) return rgbToHsl(rgb);
  }

  throw new Error(`parseColorToHsl: Unable to parse color "${color}"`);
}

export function toHslString(hsl, options = {}) {
  const { h, s, l } = hsl;
  const a = hsl.a == null ? 1 : hsl.a;
  const modern = options.modern === true;

  const hVal = Math.round(((h % 360) + 360) % 360);
  const sVal = Math.round(clamp(s, 0, 100));
  const lVal = Math.round(clamp(l, 0, 100));
  const aVal = clamp(a, 0, 1);

  if (modern) {
    // CSS Color 4 format: hsl(210 20% 30% / 0.5)
    if (aVal < 1) {
      return `hsl(${hVal} ${sVal}% ${lVal}% / ${round(aVal, 3)})`;
    }
    return `hsl(${hVal} ${sVal}% ${lVal}%)`;
  }

  // Legacy format hsl()/hsla()
  if (aVal < 1) {
    return `hsla(${hVal}, ${sVal}%, ${lVal}%, ${round(aVal, 3)})`;
  }
  return `hsl(${hVal}, ${sVal}%, ${lVal}%)`;
}

export function toHsl(color, options) {
  // Convenience: accept either a color string or an HSL object
  if (typeof color === 'string') {
    return parseColorToHsl(color);
  }
  if (typeof color === 'object' && color && 'h' in color && 's' in color && 'l' in color) {
    return color;
  }
  throw new Error('toHsl: invalid input. Provide a CSS color string or an HSL object.');
}
