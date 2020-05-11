import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ category }) {
    return (
        <div className="sidebar col-1">
            {Object.keys(category).map((elem, indx) => {
                return (
                    <div
                        className={`sidebar-row ${elem} ${category[elem].height}`}
                        key={indx}>
                        {category[elem].value}
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
