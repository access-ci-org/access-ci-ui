const baseUrl = "https://www.nsf.gov/awardsearch/show-award/";

export const AwardLink = ({ number }) => (
  <a href={`${baseUrl}?AWD_ID=${number}`}>#{number}</a>
);
