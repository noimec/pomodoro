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