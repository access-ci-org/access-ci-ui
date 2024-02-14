import baseStyle from "./base.css?inline";
import footerStyle from "./footer.css?inline";

import { AwardLink } from "./award-link";
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
              reflect the views of the National Science Foundation.
            </p>
            <a class="contact" href="https://access-ci.org/contact/">
              Contact ACCESS
            </a>
          </div>
          <ul class="social">
            <li>
              <a class="x" href="https://twitter.com/ACCESSforCI">
                X
              </a>
            </li>
            <li>
              <a class="youtube" href="https://www.youtube.com/c/ACCESSforCI">
                YouTube
              </a>
            </li>
            <li>
              <a class="facebook" href="https://www.facebook.com/ACCESSforCI">
                Facebook
              </a>
            </li>
            <li>
              <a
                class="linkedin"
                href="https://www.linkedin.com/company/accessforci/"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div class="lower">
          <Logo {...params} placement="footer" />
          <ul class="links">
            <li>
              <a href="https://access-ci.org/acceptable-use/">Acceptable Use</a>
            </li>
            <li>
              <a href="https://access-ci.org/code-of-conduct/">
                Code of Conduct
              </a>
            </li>
            <li>
              <a href="https://access-ci.org/privacy-policy/">Privacy Policy</a>
            </li>
            <li>
              <a href="https://access-ci.org/glossary/">Glossary</a>
            </li>
            <li>
              <a href="https://access-ci.org/site-map/">Site Map</a>
            </li>
          </ul>
        </div>
      </div>
      <ScrollToTop {...params} />
      <style>{baseStyle}</style>
      <style>{footerStyle}</style>
    </>
  );
};
