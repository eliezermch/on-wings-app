export function getRandomHexColor() {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  // Ensure higher brightness by making the sum of color components higher
  const minBrightness = 500; // Tweak this value as needed
  let r, g, b;

  do {
    r = getRandomInt(200, 255);
    g = getRandomInt(200, 255);
    b = getRandomInt(200, 255);
  } while (r + g + b < minBrightness);

  return '%23' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}