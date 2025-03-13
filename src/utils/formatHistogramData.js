const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const formatedData = (data) => {
    const combinedData = data?.data?.[0]?.data.map((item, index) => ({
        date: item.date,
        totalDocs: item.value,
        risks: data.data[1].data[index].value
    }))
    const sortedData = combinedData?.sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(item => ({
            date: formatDate(item.date),
            totalDocs: item.totalDocs,
            risks: item.risks
        }))
    return sortedData || [];
}

export const plural = (number) => {
    if (number % 100 <= 14 && number >= 11) {
        return 'ов';
    } else if (number % 10 <= 4 && number % 10 >= 2) {
        return 'а';
    } else if (number % 10 === 1) {
        return '';
    } else {
        return 'ов';
    }
}