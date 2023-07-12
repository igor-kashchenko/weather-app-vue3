export const formatTimezone = (offsetSeconds: number) => {
  const sign = offsetSeconds >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offsetSeconds) / 3600);
  return `GMT${sign}${hours}`;
};