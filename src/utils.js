export const ARRAY_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const ARRAY_MINUTES = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60'
];

const formatMinutes = minutes => {
  const finalMinutes = minutes >= 60 ? minutes - 60 : minutes;
  return finalMinutes >= 10 ? `${finalMinutes}` : `0${finalMinutes}`;
};

const formatHour = (hour, minutes = 0) => {
  const finalHour = minutes >= 60 ? hour + 1 : hour;
  return finalHour > 12 ? finalHour - 12 : finalHour;
};

export const calculate = (hour, minutes, type) => {
  const firstHour = {
    hour: formatHour(hour + 3),
    minutes: minutes,
    type: type === 'am' ? 'pm' : 'am'
  };
  const minutesHalf = minutes + 30;
  const secondHour = {
    hour: formatHour(hour + 4, minutesHalf),
    minutes: formatMinutes(minutesHalf),
    type: type === 'am' ? 'pm' : 'am'
  };
  const thirdHour = {
    hour: formatHour(hour + 6),
    minutes: minutes,
    type
  };
  const fourthHour = {
    hour: formatHour(hour + 7, minutesHalf),
    minutes: formatMinutes(minutesHalf),
    type
  };

  return [firstHour, secondHour, thirdHour, fourthHour];
};
