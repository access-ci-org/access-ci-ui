export const LinksList = ({ className = null, items }) => (
  <ul className={className}>
    {items.map(({ className, name, href }) => (
      <li key={href}>
        <a className={className} href={href}>
          {name}
        </a>
      </li>
    ))}
  </ul>
);
