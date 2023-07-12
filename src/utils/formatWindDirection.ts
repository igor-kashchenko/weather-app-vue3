export const formatWindDirection = (deg: number) => {
  let direction;
  let src;

  switch (true) {
  case deg >= 337.5 || deg < 22.5:
    direction = 'North';
    src = 'mdi-arrow-up';
    break;

  case deg >= 22.5 && deg < 67.5:
    direction = 'Northeast';
    src = 'mdi-arrow-top-right';
    break;

  case deg >= 67.5 && deg < 112.5:
    direction = 'East';
    src='mdi-arrow-right';
    break;

  case deg >= 112.5 && deg < 157.5:
    direction = 'Southeast';
    src='mdi-arrow-bottom-right';
    break;

  case deg >= 157.5 && deg < 202.5:
    direction = 'South';
    src='mdi-arrow-down';
    break;

  case deg >= 202.5 && deg < 247.5:
    direction = 'Southwest';
    src='mdi-arrow-bottom-left';
    break;

  case deg >= 247.5 && deg < 292.5:
    direction = 'West';
    src='mdi-arrow-left';
    break;

  case deg >= 292.5 && deg < 337.5:
    direction = 'Northwest';
    src = 'mdi-arrow-top-left';
    break;

  default:
    direction = 'Unknown';
    break;
  }

  return { direction, src };
};