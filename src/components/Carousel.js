import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from '../assets/media/icons/arrow.svg';

class Carousel extends React.Component {
    render() {
        return (
            <div className="carousel col-11">
                <div className="left-coursor"><Arrow /></div>

                <div className="carousel-content">{this.props.children}</div>

                <div className="right-coursor"><Arrow /></div>
                <div className="scrollbar"><div className="bar"></div></div>
            </div>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.element
};

export default Carousel;
