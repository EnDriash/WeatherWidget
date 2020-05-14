import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ category }) {
    return (
        <div className="sidebar col-1 col-md-2 col-sm-3">
            {Object.keys(category).map((elem, indx) => {
                return (
                    <div
                        className={`sidebar-row ${elem} ${category[elem].height}`}
                        key={indx}>
                        <p>{category[elem].value}</p>
                    </div>
                );
            })}
        </div>
    );
}

Sidebar.propTypes = {
    category: PropTypes.object
};

export default Sidebar;
