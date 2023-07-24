export const convertTo12Hour = (timeStr: string) => {
  const [hour, minute] = timeStr.split(':');
  let hourInt = parseInt(hour, 10);
  let period = 'am';

  switch (true) {
  case hourInt === 0:
    hourInt = 12;
    break;
  case hourInt === 12:
    period = 'pm';
    break;
  case hourInt > 12:
    hourInt -= 12;
    period = 'pm';
    break;
  default:
    break;
  }

  return `${hourInt}:${minute} ${period}`;
};