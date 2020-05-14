import React from 'react';
import PropTypes from 'prop-types';
import { Aux } from '../hoc/auxilliary';

import ReactFC from 'react-fusioncharts';

import { ReactComponent as CursorIcon } from '../assets/media/icons/cursor.svg';

import { chartsInit } from '../plugins/chartsInit';
import { getDays, getRangeOfDayElements } from '../helpers/category/day';
import { getWindStrength, getWindDirection } from '../helpers/category/wind';
import { speedUnitConverter } from '../helpers/converters';

function TableData({ category, weatherData }) {
    const result = dataCategorySwitcher(category, weatherData);

    function dataCategorySwitcher(category, weatherData) {
        const { configTemp, configRainfall, configPressure } = chartsInit(
            weatherData
        );
        const days = getDays();
        const deltaIndex = getRangeOfDayElements(weatherData);
        const spans = new Array(weatherData.length).fill(
            <span />,
            0,
            weatherData.length
        );

        switch (category) {
            case 'day':
                return days.map((day, idx) => {
                    return (
                        <td
                            className={`table-data ${category} ${category}-width-${deltaIndex[idx]}`}
                            key={idx}>
                            <p>{day}</p>
                        </td>
                    );
                });

            case 'hour':
                return weatherData.map((elem, idx) => {
                    return (
                        <td className={`table-data ${category}`} key={idx}>
                            <p>{elem.dt_txt.slice(11, 16)}</p>
                        </td>
                    );
                });

            case 'forecast':
                return weatherData.map((elem, idx) => {
                    return (
                        <td className={`table-data ${category}`} key={idx}>
                            <img
                                src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`}
                            />
                        </td>
                    );
                });

            case 'temperature':
                return (
                    <Aux>
                        <td className={`table-data ${category}`}>
                            <ReactFC {...configTemp} />
                        </td>
                        <div className="divides">{spans}</div>
                    </Aux>
                );

            case 'rainfall':
                return (
                    <Aux>
                        <td className={`table-data ${category}`}>
                            <ReactFC {...configRainfall} />
                        </td>
                        <div className="divides">{spans}</div>
                    </Aux>
                );

            case 'windDirection':
                return weatherData.map((elem, idx) => {
                    return (
                        <td className={`table-data ${category}`} key={idx}>
                            <div
                                className="icon"
                                style={{
                                    transform: `rotate(${
                                        elem.wind.deg + 45
                                    }deg)`
                                }}>
                                <CursorIcon />
                            </div>
                            <p>{getWindDirection(elem.wind.deg)}</p>
                        </td>
                    );
                });

            case 'windSpeed':
                return weatherData.map((elem, idx) => {
                    return (
                        <td className={`table-data ${category}`} key={idx}>
                            <p>{getWindStrength(elem.wind.speed)}</p>
                            <p>{`${speedUnitConverter(
                                elem.wind.speed
                            )}km/h`}</p>
                        </td>
                    );
                });

            case 'pressure':
                return (
                    <Aux>
                        <td className={`table-data ${category}`}>
                            <ReactFC {...configPressure} />
                        </td>

                        <div className="divides">{spans}</div>
                    </Aux>
                );
        }
    }

    return <Aux>{result}</Aux>;
}

TableData.propTypes = {
    category: PropTypes.string,
    weatherData: PropTypes.array
};

export default TableData;
