export const calculateDelayTime = (time: string): string => {
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

export const calculateAmPmTime = (time: string): string => {
  const date: Date = new Date(time);
  const currentHour: number = date.getHours();
  const currentMinute: number = date.getMinutes();

  if (currentHour >= 12) {
    return `오후 ${currentHour - 12}시 ${currentMinute}분`;
  } else {
    return `오전 ${currentHour}시 ${currentMinute}분`;
  }
};

export const checkChatTime = (
  prevTime: string,
  targetTime: string
): boolean => {
  const prevDate = new Date(prevTime);
  const targetDate = new Date(targetTime);

  const prevMinute = prevDate.getMinutes();
  const targetMinute = targetDate.getMinutes();

  const prevHour = prevDate.getHours();
  const targethour = targetDate.getHours();

  const minuteEqual = prevMinute === targetMinute;
  const hourEqual = prevHour === targethour;

  if (minuteEqual && hourEqual) {
    return false;
  } else {
    return true;
  }
};

export const checkChatDay = (prevTime: string, targetTime: string): boolean => {
  const prevDate = new Date(prevTime);
  const targetDate = new Date(targetTime);
  console.log("preData : ", prevDate);
  console.log("targetDate : ", targetDate);

  const prevMonth = prevDate.getMonth();
  const prevDay = prevDate.getDate();

  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  const monthEqual = prevMonth === targetMonth;
  const dayEqual = prevDay === targetDay;

  console.log("day : ", dayEqual);
  console.log("month : ", monthEqual);

  if (monthEqual && dayEqual) {
    return false;
  } else {
    return true;
  }
};

export const getCurrentDay = (curTime: string): string => {
  const currentDate = new Date(curTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = currentDate.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
