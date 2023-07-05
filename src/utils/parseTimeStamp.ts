export const parseTimeStamp = (dt: number, sunrise?: string) => {
  const date = new Date(dt * 1000);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12 || 12;

  if (sunrise) {
    return `${hours12}:${minutes}${ampm}`;
  }

  return `${month} ${day}, ${hours12}:${minutes}${ampm}`;
};