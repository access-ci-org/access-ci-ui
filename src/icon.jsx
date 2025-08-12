export default function Icon({ alt = null, name = null, src = null }) {
  return name ? (
    <i className={`icon bi bi-${name}`}></i>
  ) : (
    <img className="icon" alt={alt} src={src} />
  );
}
