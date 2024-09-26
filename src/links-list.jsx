export const LinksList = ({ className = "", items }) => (
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
