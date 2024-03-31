const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const munites = currentDate.getMinutes();

    const monthCheck = (month: number) => {
        if (month < 10) {
            return `0${month}`;
        } else {
            return month;
        }
    };

    return `${day}.${monthCheck(month)}.${year} ${hours}:${munites}`;
};

export default getCurrentDate;
