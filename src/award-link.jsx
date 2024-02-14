const baseUrl = "https://www.nsf.gov/awardsearch/showAward";

export const AwardLink = ({ number }) => (
  <a href={`${baseUrl}?AWD_ID=${number}&HistoricalAwards=false`}>#{number}</a>
);
