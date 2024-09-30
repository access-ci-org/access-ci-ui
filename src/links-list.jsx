export const LinksList = ({ className = null, items }) => (
  <ul class={className}>
    {items.map(({ className, name, href }) => (
      <li>
        <a className={className} href={href}>
          {name}
        </a>
      </li>
    ))}
  </ul>
);
