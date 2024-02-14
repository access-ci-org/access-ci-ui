import style from "./logo.css?inline";

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
            src="/images/nsf-logo.png"
            alt="National Science Foundation"
          />
        </a>
        <div class="divider" />
        <a class="access" href={siteUrl}>
          <img class="access-logo" src="/images/access-logo.svg" alt="ACCESS" />
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
