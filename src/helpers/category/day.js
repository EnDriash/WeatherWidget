import { getDataTimeDiffer } from './data';

export const getDays = () => {
    return ['Dziś', 'Jutro', 'Za 2 dni', 'Za 3 dni', 'Za 4 dni', 'Za 5 dni'];
};

export const newDayIndexes = (weatherData) => {
    const indexes = [];

    for (let i = 0; weatherData.length - 1 > i; i++) {
        if (
            getDataTimeDiffer(
                weatherData[i].dt_txt.slice(0, 10),
                weatherData[i + 1].dt_txt.slice(0, 10)
            ).as('days') === 1
        ) {
            indexes.push(i + 1);
        }
    }

    return indexes;
};

export const getRangeOfDayElements = (weatherData) => {
    const deltaIndex = [];
    const arrayDayRangePoints = [
        0,
        ...newDayIndexes(weatherData),
        weatherData.length
    ];

    arrayDayRangePoints.reduce((a, b) => {
        deltaIndex.push(b - a);
        return b;
    });

    return deltaIndex;
};
