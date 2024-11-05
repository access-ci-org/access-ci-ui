export default function Icon({ alt = null, name = null, src = null }) {
  return name ? (
    <i class={`icon bi bi-${name}`}></i>
  ) : (
    <img class="icon" alt={alt} src={src} />
  );
}
