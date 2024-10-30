import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

export const getMode = (breakpoint = 900) =>
  document.body.clientWidth >= breakpoint ? "desktop" : "mobile";

export const useMode = (breakpoint = 900) => {
  const [mode, setMode] = useState(getMode(breakpoint));
  useEffect(() => {
    window.addEventListener("resize", () => setMode(getMode(breakpoint)));
  }, []);
  return mode;
};

export const renderShadow = (content, target) => {
  const shadow = target.attachShadow({ mode: "open" });
  render(content, shadow);
};

export const getScrollTop = () =>
  window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;

const jsonCache = {};
export const useJSON = (
  uris,
  { cache = true, corsProxy = false, defaultValue = null } = {
    cache: true,
    corsProxy: false,
    defaultValue: null,
  }
) => {
  const [value, setValue] = useState(defaultValue);
  let single = false;
  if (!Array.isArray(uris)) {
    uris = uris ? [uris] : [];
    single = true;
  }
  useEffect(() => {
    if (uris.length) {
      const cacheKey = uris.join(" ");
      if (cache && jsonCache[cacheKey]) {
        setValue(jsonCache[cacheKey]);
        return;
      }
      (async () => {
        const responses = await Promise.all(
          uris.map((uri) =>
            fetch(
              corsProxy
                ? `https://corsproxy.io/?${encodeURIComponent(uri)}`
                : uri
            )
          )
        );
        const json = await Promise.all(
          responses.map((response) => {
            if (response.status < 200 || response.status > 299) {
              return { error: { status: response.status } };
            } else {
              try {
                return response.json();
              } catch (error) {
                return { error: { message: error } };
              }
            }
          })
        );
        const result = single ? json[0] : json;
        setValue(result);
        if (cache) jsonCache[cacheKey] = result;
      })();
    }
  }, [...uris]);
  return value;
};

export const useResourceGroupJSON = (infoGroupId, defaultValue = null) => {
  // TODO: Replace this with the individual group endpoint once it is available.
  const groupsData = useJSON("/access-ci-ui/api/resource-groups.json", {
    defaultValue,
  });
  return groupsData
    ? groupsData.groups.find((group) => group.infoGroupid == infoGroupId) ||
        defaultValue
    : defaultValue;
};

export const useTransform = (
  responseArray,
  transformFunction,
  defaultValue = null
) => {
  return useMemo(() => {
    for (let response of responseArray)
      if (!response || response.error) return defaultValue;
    return transformFunction.apply(null, responseArray);
  }, responseArray);
};

export const sortOn = (prop) => (a, b) => a[prop] < b[prop] ? -1 : 1;

export const extractHref = (html) => {
  let href = html.match(/href="([^"]+)"/);
  if (href) return href[1];
  return null;
};

export const stripTags = (html) =>
  html.replace(/(<[^>]+>)/g, "").replace(/&nbsp;/g, " ");

export const htmlToJsx = (html) => {
  const links = Array.from(html.matchAll(/<a([^>]+)>([^<]+)<\/a>/g));
  const textNodes = html.split(/<a[^<]+<\/a>/g);
  const result = [];
  while (textNodes.length > 0) {
    result.push(stripTags(textNodes.shift()));
    let link = links.shift();
    if (link) {
      let href = extractHref(link[1]);
      if (href) result.push(<a href={href}>{link[2]}</a>);
    }
  }
  return result;
};
