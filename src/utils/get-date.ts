export const getDayOfWeek = () => {
  const daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const today = new Date().getDay();

  return daysOfWeek[today];
};

const getWeekBoundaries = (date: Date) => {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  startOfWeek.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Понедельник
  startOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setDate(currentDate.getDate() + (7 - dayOfWeek)); // Воскресенье
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};

const filterDataByWeek = (data: any, startDate: any, endDate: any) => {
  return data.filter((item:any) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

export const getWeeksData = (data:any, weekLabel:string) => {
  const currentDate = new Date();
  const { startOfWeek: startOfThisWeek, endOfWeek: endOfThisWeek } = getWeekBoundaries(currentDate);

  let startOfWeek, endOfWeek;

  if (weekLabel === 'Эта неделя') {
    startOfWeek = startOfThisWeek;
    endOfWeek = endOfThisWeek;
  } else if (weekLabel === 'Прошлая неделя') {
    startOfWeek = new Date(startOfThisWeek);
    startOfWeek.setDate(startOfThisWeek.getDate() - 7);
    endOfWeek = new Date(endOfThisWeek);
    endOfWeek.setDate(endOfThisWeek.getDate() - 7);
  } else if (weekLabel === '2 недели назад') {
    startOfWeek = new Date(startOfThisWeek);
    startOfWeek.setDate(startOfThisWeek.getDate() - 14);
    endOfWeek = new Date(endOfThisWeek);
    endOfWeek.setDate(endOfThisWeek.getDate() - 14);
  }

  return filterDataByWeek(data, startOfWeek, endOfWeek);
};
