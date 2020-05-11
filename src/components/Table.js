import React from 'react';
import PropTypes from 'prop-types';

import TableData from './TableData';

function Table({ category, weatherData }) {
    return (
        <table>
            <tbody>
                {Object.keys(category).map((elem, idx) => {
                    return (
                        <tr
                            key={idx}
                            className={`content-row ${elem} ${category[elem].height}`}>
                            <TableData
                                category={elem}
                                weatherData={weatherData.list}
                            />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    category: PropTypes.object,
    weatherData: PropTypes.object
};

export default Table;
