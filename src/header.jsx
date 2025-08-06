import { Logo } from "./logo";

export const Header = (params = {}) => {
  return (
    <div className="container">
      <Logo {...params} />
    </div>
  );
};
