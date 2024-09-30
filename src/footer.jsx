import { personaItems, socialItems, utilityItems } from "./items";
import baseStyle from "./base.css?inline";
import footerStyle from "./footer.css?inline";

import { AwardLink } from "./award-link";
import { LinksList } from "./links-list";
import { Logo } from "./logo";
import { ScrollToTop } from "./scroll-to-top";

export const Footer = (params = {}) => {
  return (
    <>
      <div class="container">
        <div class="upper">
          <div class="about">
            <p class="awards">
              ACCESS is an advanced computing and data resource program
              supported by the U.S. National Science Foundation (NSF) under the
              Office of Advanced Cyberinfrastructure awards{" "}
              <AwardLink number={2138259} />, <AwardLink number={2138286} />,{" "}
              <AwardLink number={2138307} />, <AwardLink number={2137603} /> and{" "}
              <AwardLink number={2138296} />.
            </p>
            <p class="disclaimer">
              Any opinions, findings, conclusions or recommendations expressed
              in this material are those of the authors and do not necessarily
              reflect the views of NSF.
            </p>
            <a class="contact" href="https://access-ci.org/contact/">
              Contact ACCESS
            </a>
            <LinksList className="social" items={socialItems} />
          </div>
          <div class="personas">
            <p>For:</p>
            <LinksList items={personaItems} />
          </div>
        </div>
        <div class="lower">
          <Logo {...params} placement="footer" />
          <LinksList className="links" items={utilityItems} />
        </div>
      </div>
      <ScrollToTop {...params} />
      <style>{baseStyle}</style>
      <style>{footerStyle}</style>
    </>
  );
};
