import { Logo } from "./logo";

export const Header = (params = {}) => {
  return (
    <div class="container">
      <Logo {...params} />
    </div>
  );
};
