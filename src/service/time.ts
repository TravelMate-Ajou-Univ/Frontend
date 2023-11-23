export const CalculateDelayTime = (time: string): string => {
  const currentDate = new Date();
  const prevDate = new Date(time);
  const timeDifference = currentDate.getTime() - prevDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(weeksDifference / 4);
  const yearsDifference = Math.floor(monthsDifference / 4);

  if (minutesDifference < 60) {
    return `${minutesDifference} 분 전`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} 시간 전`;
  } else if (daysDifference < 7) {
    return `${daysDifference} 일 전`;
  } else if (weeksDifference < 4) {
    return `${weeksDifference} 주 전`;
  } else if (monthsDifference < 12) {
    return `${monthsDifference} 달 전`;
  } else {
    return `${yearsDifference} 년 전`;
  }
};

// export CalculateTime = (time: string): string => {

// }
