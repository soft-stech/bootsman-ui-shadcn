import { type HSLObject } from 'colortranslator'

export const HEX_REGEXP = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i
export const HEX_REGEXP_NO_POUND = /^(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i

export type HSVColor = {
  h: number
  s: number
  v: number
}

export function HSLtoHSV(hsl: HSLObject): HSVColor {
  const x = hsl.S * (hsl.L < 50 ? hsl.L : 100 - hsl.L)
  const v = hsl.L + x / 100

  return {
    h: hsl.H,
    s: hsl.L === 0 ? hsl.S : (2 * x) / v,
    v
  }
}

export function HSVtoHSL(hsv: HSVColor): HSLObject {
  const x = ((200 - hsv.s) * hsv.v) / 100

  return {
    H: hsv.h,
    S: x === 0 || x === 200 ? 0 : Math.round((hsv.s * hsv.v) / (x <= 100 ? x : 200 - x)),
    L: x / 2
  }
}

export function normalizeHue(hue: number, dir: 'left' | 'right' = 'left'): number {
  if (dir === 'right') {
    return (hue * 100) / 360
  }

  return (hue / 100) * 360
}

export function normalizeBrightness(brightness: number): number {
  return 100 - brightness
}
