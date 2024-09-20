const hexToRgb = (hex) =>
  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .slice(1)
    .map((band) => parseInt(band, 16));

const rgbToHex = ([r, g, b]) =>
  `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

const interpolateColor = (pct, hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return rgbToHex(rgb1.map((band, i) => band + (rgb2[i] - band) * pct));
};

export function MiniBar({
  value,
  maxValue,
  maxColor = "#ffc42d",
  minColor = "#1a5b6e",
}) {
  return (
    <div class="mini-bar">
      <div
        class="bar"
        style={{
          backgroundColor: interpolateColor(
            value / maxValue,
            minColor,
            maxColor
          ),
          width: `${(100 * value) / maxValue}%`,
        }}
      ></div>
    </div>
  );
}
