import Icon from "./icon";
import Tooltip from "./tooltip";

export default function InfoTip({
  color = "var(--contrast-6)",
  icon = "info-circle-fill",
  tooltip,
}) {
  return (
    <Tooltip tooltip={tooltip}>
      <button class="info-tip" style={{ color }} tabIndex="-1">
        <Icon name={icon} />
      </button>
    </Tooltip>
  );
}
