import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from '../assets/media/icons/arrow.svg';

class Carousel extends React.Component {

    state = {
        xpoint: 0,
        xstart: 0,
        xend: 0,
        contentOffsetLeft: 0,
        barOffsetLeft: 0,
    }

    startDrag = (event) => {
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const dragRegister = document.querySelector('.carousel .dragRegister')
        const carousel = document.querySelector('.carousel')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')

        this.setState({ xstart: event.clientX - carousel.offsetLeft, contentOffsetLeft: carouselContentChild.offsetLeft, barOffsetLeft: bar.offsetLeft })

        if (event.target.className === 'dragRegister') {
            console.log(this.state.xstart, event.clientX)
            dragRegister.addEventListener('mousemove', this.contentManager, false)
        } else {
            scrollbar.addEventListener('mousemove', this.scrollBarManager, false)
        }
    }

    endDrag = (event) => {
        const carousel = document.querySelector('.carousel')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const dragRegister = document.querySelector('.carousel .dragRegister')

        const scrollBarEndpoint = scrollbar.offsetWidth - bar.offsetWidth
        const carouselContentEndpoint = -carouselContentChild.offsetWidth + carousel.offsetWidth

        dragRegister.removeEventListener('mousemove', this.contentManager, false)
        scrollbar.removeEventListener('mousemove', this.scrollBarManager, false)

        if (bar.offsetLeft < 0 || carouselContentChild.offsetLeft > 0) {
            bar.style.left = `1px`
            carouselContentChild.style.left = `-1px`
        }


        if (bar.offsetLeft > scrollBarEndpoint || carouselContentChild.offsetLeft < carouselContentEndpoint) {
            bar.style.left = `${carousel.offsetWidth - bar.offsetWidth}px`
            carouselContentChild.style.left = `${-carouselContentChild.offsetWidth + carousel.offsetWidth}px`
        }


        bar.style.left = `${this.widthInterpolation(bar.offsetLeft, scrollbar.offsetWidth)}px`
        carouselContentChild.style.left = `${this.widthInterpolation(carouselContentChild.offsetLeft, carouselContentChild.offsetWidth)}px`
    }

    widthInterpolation(value, containerWidth) {
        const elementDeltaWidth = containerWidth / this.props.elements

        return (Math.round(value / elementDeltaWidth) * elementDeltaWidth).toFixed(2)

    }

    scrollBarManager = (event) => {

        const carousel = document.querySelector('.carousel')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')

        const moveX = event.clientX - carousel.offsetLeft;

        const deltaMove = moveX - this.state.xstart
        const scrollRange = carousel.offsetWidth - bar.offsetWidth
        const carouselRange = carouselContentChild.offsetWidth - carousel.offsetWidth

        const deltaMoveCarousel = (carouselRange / scrollRange) * deltaMove

        this.setState({ xpoint: moveX })

        bar.style.left = `${moveX - bar.offsetWidth / 2}px`
        carouselContentChild.style.left = `${(this.state.contentOffsetLeft - deltaMoveCarousel)}px`

    }

    contentManager = (event) => {

        const carousel = document.querySelector('.carousel')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')

        const moveX = event.clientX - carousel.offsetLeft;

        const deltaMove = moveX - this.state.xstart
        const scrollRange = carousel.offsetWidth - bar.offsetWidth
        const carouselRange = carouselContentChild.offsetWidth - carousel.offsetWidth

        const deltaMoveScrollbar = (scrollRange / carouselRange) * deltaMove
        console.log(deltaMoveScrollbar)
        this.setState({ xpoint: moveX })
        bar.style.left = `${(this.state.barOffsetLeft - deltaMoveScrollbar)}px`
        carouselContentChild.style.left = `${this.state.contentOffsetLeft + deltaMove}px`


    }

    moveRightHandler(event) {
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')

        const deltaCarouselContentWidth = carouselContentChild.offsetWidth / this.props.elements

        const scrollRange = scrollbar.offsetWidth - bar.offsetWidth
        const carouselRange = carouselContentChild.offsetWidth - scrollbar.offsetWidth

        const deltaMoveScrollbar = (scrollRange / carouselRange) * deltaCarouselContentWidth

        bar.style.left = `${bar.offsetLeft + deltaMoveScrollbar}px`
        carouselContentChild.style.left = `${carouselContentChild.offsetLeft - deltaCarouselContentWidth}px`
    }

    moveLeftHandler(event) {
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')

        const deltaCarouselContentWidth = carouselContentChild.offsetWidth / this.props.elements

        const scrollRange = scrollbar.offsetWidth - bar.offsetWidth
        const carouselRange = carouselContentChild.offsetWidth - scrollbar.offsetWidth

        const deltaMoveScrollbar = (scrollRange / carouselRange) * deltaCarouselContentWidth

        
        bar.style.left = `${bar.offsetLeft - deltaMoveScrollbar}px`
        carouselContentChild.style.left = `${(carouselContentChild.offsetLeft) + deltaCarouselContentWidth}px`
    }

    componentDidMount() {

        const carousel = document.querySelector('.carousel')
        const carouselContent = document.querySelector('.carousel-content')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const dragRegister = document.querySelector('.carousel .dragRegister')

        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')

        const leftCoursor = document.querySelector('.carousel .left-coursor')
        const rightCoursor = document.querySelector('.carousel .right-coursor')

        const percentOfLargeScrollView = carouselContentChild.offsetWidth / carousel.offsetWidtht
        const elementDeltaWidth = percentOfLargeScrollView * carousel.offsetWidtht

        bar.style.width = `${elementDeltaWidth}px`

    }

    render() {

        return (
            <div className="carousel col-11">
                <div className="dragRegister" onMouseUp={event => this.endDrag(event)} onMouseDown={event => this.startDrag(event)} ></div>
                <div className="left-coursor" onClick={event => this.moveLeftHandler(event)}><Arrow /></div>
                <div className="carousel-content"  >{this.props.children}</div>
                <div className="right-coursor" onClick={event => this.moveRightHandler(event)}><Arrow /></div>
                <div className="scrollbar" onMouseUp={event => this.endDrag(event)} onMouseDown={event => this.startDrag(event)} >
                    <div className="bar"></div>
                </div>

            </div>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.element,
    elements: PropTypes.number
};

export default Carousel;
