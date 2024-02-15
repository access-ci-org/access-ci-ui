import style from "./logo.css?inline";
import nsfLogoUrl from "./images/nsf-logo.png";
import accessLogoUrl from "./images/access-logo.svg";

export const Logo = ({
  nsfUrl = "https://www.nsf.gov",
  placement = "header",
  siteName = "",
  siteUrl = "/",
}) => {
  return (
    <>
      <div class={`logo logo-${placement}`}>
        <a class="nsf" href={nsfUrl}>
          <img
            class="nsf-logo"
            src={nsfLogoUrl}
            alt="National Science Foundation"
          />
        </a>
        <div class="divider" />
        <a class="access" href={siteUrl}>
          <img class="access-logo" src={accessLogoUrl} alt="ACCESS" />
          {siteName && placement == "header" ? (
            <span
              class={`name name-${siteName
                .toLocaleLowerCase()
                .replace(" ", "-")}`}
            >
              {siteName}
            </span>
          ) : null}
        </a>
      </div>
      <style>{style}</style>
    </>
  );
};
