import nsfLogoUrl from "./images/nsf-logo.png";
import accessLogoUrl from "./images/access-logo.svg";

export const Logo = ({
  nsfUrl = "https://www.nsf.gov",
  placement = "header",
  siteName = "",
  siteUrl = "/",
}) => {
  return (
    <div className={`logo logo-${placement}`}>
      <a className="nsf" href={nsfUrl}>
        <img
          className="nsf-logo"
          src={nsfLogoUrl}
          alt="National Science Foundation"
        />
      </a>
      <div className="divider" />
      <a className="access" href={siteUrl}>
        <img className="access-logo" src={accessLogoUrl} alt="ACCESS" />
        {siteName && placement == "header" ? (
          <span
            className={`name name-${siteName
              .toLocaleLowerCase()
              .replace(" ", "-")}`}
          >
            {siteName}
          </span>
        ) : null}
      </a>
    </div>
  );
};
