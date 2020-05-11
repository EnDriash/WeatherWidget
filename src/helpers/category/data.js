import moment from 'moment';

export const getDataTimeDiffer = (a, b) => {
    const x = new moment(a);
    const y = new moment(b);

    return moment.duration(y.diff(x));
};

export const getDataHourInterval = (weatherData) => {
    return getDataTimeDiffer(weatherData[0].dt_txt, weatherData[1].dt_txt).as(
        'hour'
    );
};
