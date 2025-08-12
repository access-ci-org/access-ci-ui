import { personaItems, socialItems, utilityItems } from "./items";

import { AwardLink } from "./award-link";
import { LinksList } from "./links-list";
import { Logo } from "./logo";
import { ScrollToTop } from "./scroll-to-top";

export const Footer = (params = {}) => {
  return (
    <>
      <div className="container">
        <div className="upper">
          <div className="about">
            <p className="awards">
              ACCESS is an advanced computing and data resource program
              supported by the U.S. National Science Foundation (NSF) under the
              Office of Advanced Cyberinfrastructure awards{" "}
              <AwardLink number={2138259} />, <AwardLink number={2138286} />,{" "}
              <AwardLink number={2138307} />, <AwardLink number={2137603} /> and{" "}
              <AwardLink number={2138296} />.
            </p>
            <p className="disclaimer">
              Any opinions, findings, conclusions or recommendations expressed
              in this material are those of the authors and do not necessarily
              reflect the views of NSF.
            </p>
            <a className="contact" href="https://access-ci.org/contact/">
              Contact ACCESS
            </a>
            <LinksList className="social" items={socialItems} />
          </div>
          <div className="personas">
            <p>For:</p>
            <LinksList items={personaItems} />
          </div>
        </div>
        <div className="lower">
          <Logo
            siteName="ACCESS"
            siteUrl="https://access-ci.org"
            placement="footer"
          />
          <LinksList className="links" items={utilityItems} />
        </div>
      </div>
      <ScrollToTop {...params} />
    </>
  );
};
