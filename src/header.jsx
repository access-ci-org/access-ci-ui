import baseStyle from "./base.css?inline";
import headerStyle from "./header.css?inline";

import { Logo } from "./logo";

export const Header = (params = {}) => {
  return (
    <>
      <div class="container">
        <Logo {...params} />
      </div>
      <style>{baseStyle}</style>
      <style>{headerStyle}</style>
    </>
  );
};
