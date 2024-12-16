import Icon from "./icon";

export default function Alert({ children, icon = "megaphone-fill" }) {
  return (
    <div class="alert">
      {icon ? <Icon name={icon} /> : null}
      <div class="alert-body">{children}</div>
    </div>
  );
}
