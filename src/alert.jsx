import Icon from "./icon";

export default function Alert({ children, icon = "megaphone-fill" }) {
  return (
    <div className="alert">
      {icon ? <Icon name={icon} /> : null}
      <div className="alert-body">{children}</div>
    </div>
  );
}
