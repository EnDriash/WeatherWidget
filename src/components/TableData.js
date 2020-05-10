import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import { Aux } from '../auxilliary/auxilliary'

import ReactFC from "react-fusioncharts";
import { chartPressureConfigs, chartTemperatureConfigs, chartRainfallConfigs } from "../charts/temperature"

import { ReactComponent as CursorIcon } from '../assets/media/icons/cursor.svg'

class TableData extends React.Component {
    state = {
        days: ['Dziś', 'Jutro', 'Za 2 dni', 'Za 3 dni', 'Za 4 dni', 'Za 5 dni']
    }

    getDataTimeDiffer(a, b) {
        const x = new moment(a)
        const y = new moment(b)

        return moment.duration(y.diff(x))
    }

    getDataHourInterval(weatherData) {
        return this.getDataTimeDiffer(weatherData[0].dt_txt, weatherData[1].dt_txt).as('hour')
    }

    getDays(weatherData) {
        let days = ['Today', 'Tommorow']
        const differ = 24 / this.getDataHourInterval(weatherData)

        for (let i = 16; i < weatherData.length; i = i + differ) {
            days.push(weatherData[i]['dt_txt'].toString().slice(0, 10))
        }

        return days
    }

    newDayIndexes(weatherData) {
        const indexes = []
        for (let i = 0; weatherData.length - 1 > i; i++) {
            if (this.getDataTimeDiffer(weatherData[i].dt_txt.slice(0, 10), weatherData[i + 1].dt_txt.slice(0, 10)).as('days') === 1) {
                indexes.push(i + 1)
            }
        }

        return indexes
    }


    getWindStrength(value) {
        let result = '';
        switch (true) {
            case (value < 0.2):
                result = 'Cisza'
                break;
            case (value < 1.5):
                result = 'Powiew'
                break;
            case (value < 3.3):
                result = 'Słaby Wiatr'
                break;
            case (value < 5.4):
                result = 'Łagodny Wiatr'
                break;
            case (value < 7.9):
                result = 'Umiarokwany Wiatr'
                break;
            case (value < 10.7):
                result = 'Dość silny wiatr'
                break;
            case (value < 13.8):
                result = 'Silny wiatr'
                break;
            case (value < 17.1):
                result = 'Bardzo silny wiatr'
                break;
            case (value < 20.7):
                result = 'Sztorm'
                break;
            case (value < 24.4):
                result = 'Silny sztorm'
                break;
            case (value < 28.4):
                result = 'Bardzo silny sztorm'
                break;
            case (value < 32.6):
                result = 'Gwałtowny sztorm'
                break;
            case (value >= 32.6):
                result = 'Huragan'
                break;
        }
        return result
    }
    getWindDirection(angle) {
        const directions = ['Północny', 'Pn.-Wsch.', 'Wschód  ', 'Pd.-Zach.', 'Południowy', 'Pd.-Zach.', 'Zachodni', 'Pn.-Zach.'];
        return directions[Math.round(angle / 45) % 8];
    }
    speedConverter(value) {
        return Number(value * 3600 / 1000).toFixed(0)
    }

    dataKindSwitcher(kind, weatherData) {
        const spans = []

        switch (kind) {
            case 'day':
                const indexes = this.newDayIndexes(weatherData);
                const deltaIndex = [];
                [0, ...indexes, weatherData.length].reduce((a, b) => {
                    deltaIndex.push(b - a)
                    return b
                })
                console.log(deltaIndex)
                return (

                    this.state.days.map((day, idx) => {
                        return (
                            <td className={`table-data ${kind} ${kind}-width-${deltaIndex[idx]}`} key={idx}>{day}</td>
                        )
                    })
                )

            case 'hour':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.slice(11, 16)}</td>
                        )
                    })
                )

            case 'forecast':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>
                                <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`} />
                            </td>
                        )
                    })
                )

            case 'temperature':
                const tempData = []
                const configTemp = { ...chartTemperatureConfigs }

                weatherData.forEach((elem, idx) => {
                    spans.push(<span />)
                    const tempElement = { label: idx, value: `${Number(elem.main.temp - 272.15).toFixed(0)}`, displayValue: `${Number(elem.main.temp - 272.15).toFixed(0)}°C` }
                    tempData.push(tempElement)
                })

                configTemp.dataSource.data = tempData

                return (
                    <Aux>
                        <td className={`table-data ${kind}`}>
                            <ReactFC {...configTemp} />
                        </td>
                        <div className="divides">
                            {spans}
                        </div>
                    </Aux>

                )

            case 'rainfall':
                const rainfallData = []
                const configRainfall = { ...chartRainfallConfigs }

                weatherData.forEach((elem, idx) => {
                    spans.push(<span />)
                    const rainfallElement = {
                        label: idx,
                        value: elem.rain ? elem.rain["3h"] : 0,
                        displayValue: elem.rain ? `${Number(elem.rain["3h"])} mm` : '0 mm'
                    }

                    rainfallData.push(rainfallElement)
                })

                configRainfall.dataSource.data = rainfallData
                return (
                    <Aux>
                        <td className={`table-data ${kind}`}>
                            <ReactFC {...configRainfall} />

                        </td>
                        <div className="divides">
                            {spans}
                        </div>
                    </Aux>
                )

            case 'windDirection':
                return (
                    weatherData.map((elem, idx) => {



                        return (
                            <td className={`table-data ${kind}`} key={idx}>
                                <div className="icon" style={{ transform: `rotate(${elem.wind.deg + 45}deg)` }} >
                                    <CursorIcon />
                                </div>
                                <p>{this.getWindDirection(elem.wind.deg)}</p>

                            </td >
                        )
                    })
                )

            case 'windSpeed':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>
                                <p>{this.getWindStrength(elem.wind.speed)}</p>
                                <p>{`${this.speedConverter(elem.wind.speed)}km/h`}</p>
                            </td>
                        )
                    })
                )

            case 'pressure':
                const pressureData = []
                const configPressure = { ...chartPressureConfigs }

                weatherData.forEach((elem, idx) => {
                    spans.push(<span />)
                    const pressureElement = { label: idx, value: `${Number(elem.main.pressure - 1013)}`, displayValue: `${Number(elem.main.pressure)}hPa` }

                    pressureData.push(pressureElement)
                })

                configPressure.dataSource.data = pressureData
                return (
                    <Aux>
                        <td className={`table-data ${kind}`}>
                            <ReactFC
                                {...chartPressureConfigs}
                            />

                        </td>

                        <div className="divides">
                            {spans}
                        </div>
                    </Aux>

                )


        }

    }

    render() {
        const { kind, weatherData } = this.props
        const result = this.dataKindSwitcher(kind, weatherData)

        return (
            <Aux>
                {result}
            </Aux>

        );
    }
}

TableData.propTypes = {
    kind: PropTypes.string,
    weatherData: PropTypes.array
}

export default TableData;