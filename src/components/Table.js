import React from 'react';
import PropTypes from 'prop-types'

import TableData from './TableData'

class Table extends React.Component {

    render() {
        const { category, weatherData } = this.props

        return (
            <table>
                <tbody>
                    {Object.keys(category).map((elem, idx) => {
                        return (
                            <tr key={idx} className={`content-row ${elem} ${category[elem].height}`} >
                                <TableData kind={elem} weatherData={weatherData.list} />
                            </tr>)
                    })}
                </tbody>
            </table>

        );
    }
}

Table.propTypes = {
    category: PropTypes.object,
    weatherData: PropTypes.object
}

export default Table;