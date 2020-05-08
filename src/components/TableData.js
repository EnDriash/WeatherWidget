import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import { Aux } from '../auxilliary/auxilliary'

class TableData extends React.Component {
    state = {
        days: ['Today', 'Tommorow']
    }

    getDateInterval() {
        const { weatherData } = this.props
        const x = new moment(weatherData[0].dt_txt)
        const y = new moment(weatherData[1].dt_txt)

        return moment.duration(y.diff(x)).as('hour')
    }

    getDays(weatherData) {
        let days = ['Today', 'Tommorow']
        const differ = 24 / this.getDateInterval()

        for (let i = 16; i < weatherData.length; i = i + differ) {
            days.push(weatherData[i]['dt_txt'].toString().slice(0, 10))
        }

        return days
    }


    rowKindSwitcher(kind, weatherData) {
        switch (kind) {
            case 'day':
                return (
                    this.getDays(weatherData).map((day, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{day}</td>
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
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.split(10)}</td>
                        )
                    })
                )
            case 'rainfall':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.split(10)}</td>
                        )
                    })
                )
            case 'windDirection':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.split(10)}</td>
                        )
                    })
                )
            case 'windSpeed':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.split(10)}</td>
                        )
                    })
                )
            case 'pressure':
                return (
                    weatherData.map((elem, idx) => {
                        return (
                            <td className={`table-data ${kind}`} key={idx}>{elem.dt_txt.split(10)}</td>
                        )
                    })
                )

        }

    }

    render() {
        const { kind, weatherData } = this.props
        const result = this.rowKindSwitcher(kind, weatherData)

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