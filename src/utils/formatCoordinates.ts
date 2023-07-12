export const formatCoordinates = (lat: number, lon: number) => {
  const latitude =
    lat >= 0 ? `${lat.toFixed(4)}° N` : `${(-lat).toFixed(4)}° S`;
  const longitude =
    lon >= 0 ? `${lon.toFixed(4)}° E` : `${(-lon).toFixed(4)}° W`;
  return `${latitude}, ${longitude}`;
};