import {
    chartPressureConfigs,
    chartTemperatureConfigs,
    chartRainfallConfigs
} from '../config/charts';

export const chartsInit = (weatherData) => {
    const configTemp = { ...chartTemperatureConfigs };
    const configRainfall = { ...chartRainfallConfigs };
    const configPressure = { ...chartPressureConfigs };

    const tempData = [];
    const rainfallData = [];
    const pressureData = [];

    weatherData.forEach((elem, idx) => {
        const tempElement = {
            label: idx,
            value: `${Number(elem.main.temp - 272.15).toFixed(0)}`,
            displayValue: `${Number(elem.main.temp - 272.15).toFixed(0)}°C`
        };
        const rainfallElement = {
            label: idx,
            value: elem.rain ? elem.rain['3h'] : 0,
            displayValue: elem.rain ? `${Number(elem.rain['3h'])} mm` : '0 mm'
        };
        const pressureElement = {
            label: idx,
            value: `${Number(elem.main.pressure - 1013)}`,
            displayValue: `${Number(elem.main.pressure)} hPa`
        };

        rainfallData.push(rainfallElement);
        tempData.push(tempElement);
        pressureData.push(pressureElement);
    });

    configTemp.dataSource.data = tempData;
    configRainfall.dataSource.data = rainfallData;
    configPressure.dataSource.data = pressureData;

    return { configTemp, configRainfall, configPressure };
};
