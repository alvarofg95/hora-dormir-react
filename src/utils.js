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

export const calculateSleep = (hour, minutes, type) => {
  const firstHour = {
    hour: formatHour(hour + 3),
    minutes: formatMinutes(minutes),
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
    minutes: formatMinutes(minutes),
    type
  };
  const fourthHour = {
    hour: formatHour(hour + 7, minutesHalf),
    minutes: formatMinutes(minutesHalf),
    type
  };

  return [firstHour, secondHour, thirdHour, fourthHour];
};

export const calculateWakeUp = (hour, minutes, type) => {
  const minutesHalf = minutes + 30;
  const firstHour = {
    hour: formatHour(hour + 1, minutesHalf),
    minutes: formatMinutes(minutesHalf),
    type
  };
  const secondHour = {
    hour: formatHour(hour + 3),
    minutes: formatMinutes(minutes),
    type
  };
  const thirdHour = {
    hour: formatHour(hour + 4),
    minutes: formatMinutes(minutesHalf),
    type
  };
  const fourthHour = {
    hour: formatHour(hour + 6),
    minutes: formatMinutes(minutes),
    type
  };
  const fifthHour = {
    hour: formatHour(hour + 7),
    minutes: formatMinutes(minutesHalf),
    type
  };
  const sixthHour = {
    hour: formatHour(hour + 9),
    minutes: formatMinutes(minutes),
    type
  };
  return [firstHour, secondHour, thirdHour, fourthHour, fifthHour, sixthHour];
};

export const setPolyfills = () => {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var dataURL = this.toDataURL(type, quality).split(',')[1];
        setTimeout(function() {
          var binStr = atob( dataURL ),
              len = binStr.length,
              arr = new Uint8Array(len);
          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback( new Blob( [arr], {type: type || 'image/png'} ) );
        });
      }
    });
  }
}