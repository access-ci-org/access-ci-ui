export default function Highlight({ highlight, text }) {
  if (!highlight || !highlight.length) return text;
  const re = new RegExp(
    highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    "gi"
  );
  const matches = [...text.matchAll(re)];
  if (!matches.length) return text;
  const result = [];
  let currentIdx = 0;
  for (let match of matches) {
    if (match.index > currentIdx)
      result.push(text.substr(currentIdx, match.index));
    result.push(<span class="highlight">{match[0]}</span>);
    currentIdx = match.index + match[0].length;
  }
  result.push(text.substr(currentIdx));
  return result;
}
