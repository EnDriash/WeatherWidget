import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from '../assets/media/icons/arrow.svg';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.bar = React.createRef();
        this.scrollbar = React.createRef();
        this.dragRegister = React.createRef();
        this.carousel = React.createRef();
        this.myRef = React.createRef();
        this.carouselContentChild = document.querySelector(
            '.carousel-content *:first-child'
        );
    }

    state = {
        xpoint: 0,
        xstart: 0,
        xend: 0,
        contentOffsetLeft: 0,
        barOffsetLeft: 0
    };

    componentDidMount() {
        this.carouselContentChild = document.querySelector(
            '.carousel-content *:first-child'
        );
        const percentOfLargeScrollView =
            this.carousel.current.offsetWidth /
            this.carouselContentChild.offsetWidth;
        const elementDeltaWidth =
            percentOfLargeScrollView * this.scrollbar.current.offsetWidth;

        this.bar.current.style.width = `${elementDeltaWidth}px`;
    }

    clickEffect(event) {
        this.customCursor = document.createElement('div');
        this.customCursor.className = 'clickEffect';
        this.customCursor.style.top = event.clientY + 'px';
        this.customCursor.style.left = event.clientX + 'px';
        this.dragRegister.current.appendChild(this.customCursor);
    }

    clickEffectDeleted() {
        const elements = this.dragRegister.current.querySelectorAll(
            '.clickEffect'
        );

        elements.forEach((elem) => {
            elem.classList.add('deleted');
            elem.addEventListener('transitionend', () => {
                elem.remove(this.customCursor);
            });
        });
    }

    widthInterpolation(value, containerWidth) {
        const elementDeltaWidth = containerWidth / this.props.elements;

        return (
            Math.round(value / elementDeltaWidth) * elementDeltaWidth
        ).toFixed(2);
    }

    offsetCarouselInterpolation() {
        this.bar.current.style.left = `${this.widthInterpolation(
            this.bar.current.offsetLeft,
            this.scrollbar.current.offsetWidth
        )}px`;
        this.carouselContentChild.style.left = `${this.widthInterpolation(
            this.carouselContentChild.offsetLeft,
            this.carouselContentChild.offsetWidth
        )}px`;
    }

    offsetValidator() {
        const scrollBarEndpoint =
            this.scrollbar.current.offsetWidth - this.bar.current.offsetWidth;
        const carouselContentEndpoint =
            -this.carouselContentChild.offsetWidth +
            this.carousel.current.offsetWidth;

        if (
            this.bar.current.offsetLeft < 0 ||
            this.carouselContentChild.offsetLeft > 0
        ) {
            this.bar.current.style.left = `1px`;
            this.carouselContentChild.style.left = `-1px`;
        }

        if (
            this.bar.current.offsetLeft > scrollBarEndpoint ||
            this.carouselContentChild.offsetLeft < carouselContentEndpoint
        ) {
            this.bar.current.style.left = `${
                this.carousel.current.offsetWidth - this.bar.current.offsetWidth
            }px`;
            this.carouselContentChild.style.left = `${
                -this.carouselContentChild.offsetWidth +
                this.carousel.current.offsetWidth
            }px`;
        }
    }

    getDeltaMove(startPoint = false, type, delta) {
        if (startPoint) {
            delta = startPoint - this.state.xstart;
        }

        const scrollRange =
            this.carousel.current.offsetWidth - this.bar.current.offsetWidth;
        const carouselRange =
            this.carouselContentChild.offsetWidth -
            this.carousel.current.offsetWidth;

        switch (type) {
            case 'carousel':
                return (carouselRange / scrollRange) * delta;
            case 'scrollbar':
                return (scrollRange / carouselRange) * delta;
            default:
                return delta;
        }
    }

    startDrag = (event) => {
        this.clickEffectDeleted();
        this.setState({
            xstart: event.clientX - this.carousel.current.offsetLeft,
            contentOffsetLeft: this.carouselContentChild.offsetLeft,
            barOffsetLeft: this.bar.current.offsetLeft
        });

        if (event.target.className === 'dragRegister') {
            this.clickEffect(event);
            this.dragRegister.current.addEventListener(
                'mousemove',
                this.contentManager,
                false
            );
        } else {
            this.scrollbar.current.addEventListener(
                'mousemove',
                this.scrollBarManager,
                false
            );
            this.dragRegister.current.addEventListener(
                'mousemove',
                this.scrollBarManager,
                false
            );
        }
    };

    endDrag = () => {
        this.dragRegister.current.removeEventListener(
            'mousemove',
            this.contentManager,
            false
        );
        this.scrollbar.current.removeEventListener(
            'mousemove',
            this.scrollBarManager,
            false
        );
        this.dragRegister.current.removeEventListener(
            'mousemove',
            this.scrollBarManager,
            false
        );

        this.clickEffectDeleted();
        this.offsetCarouselInterpolation();
        this.offsetValidator();
    };

    scrollBarManager = (event) => {
        const moveX = event.clientX - this.carousel.current.offsetLeft;

        this.setState({ xpoint: moveX });

        this.bar.current.style.left = `${
            moveX - this.bar.current.offsetWidth / 2
        }px`;
        this.carouselContentChild.style.left = `${
            this.state.contentOffsetLeft - this.getDeltaMove(moveX, 'carousel')
        }px`;
    };

    contentManager = (event) => {
        const moveX = event.clientX - this.carousel.current.offsetLeft;

        this.setState({ xpoint: moveX });
        this.bar.current.style.left = `${
            this.state.barOffsetLeft - this.getDeltaMove(moveX, 'scrollbar')
        }px`;
        this.carouselContentChild.style.left = `${
            this.state.contentOffsetLeft + this.getDeltaMove(moveX)
        }px`;
    };

    moveRightHandler(event) {
        this.clickEffect(event);
        const deltaCarouselContentWidth =
            this.carouselContentChild.offsetWidth / this.props.elements;

        this.bar.current.style.left = `${
            this.bar.current.offsetLeft +
            this.getDeltaMove(undefined, 'scrollbar', deltaCarouselContentWidth)
        }px`;
        this.carouselContentChild.style.left = `${
            this.carouselContentChild.offsetLeft - deltaCarouselContentWidth
        }px`;

        this.offsetValidator();
        this.clickEffectDeleted();
    }

    moveLeftHandler(event) {
        this.clickEffect(event);
        const deltaCarouselContentWidth =
            this.carouselContentChild.offsetWidth / this.props.elements;

        this.bar.current.style.left = `${
            this.bar.current.offsetLeft -
            this.getDeltaMove(undefined, 'scrollbar', deltaCarouselContentWidth)
        }px`;
        this.carouselContentChild.style.left = `${
            this.carouselContentChild.offsetLeft + deltaCarouselContentWidth
        }px`;

        this.offsetValidator();
        this.clickEffectDeleted();
    }

    render() {
        return (
            <div
                className="carousel col-11 col-md-10 col-sm-9"
                ref={this.carousel}>
                <div
                    className="dragRegister"
                    ref={this.dragRegister}
                    onMouseUp={(event) => this.endDrag(event)}
                    onMouseDown={(event) => this.startDrag(event)}
                />

                <div
                    className="left-coursor"
                    onClick={(event) => this.moveLeftHandler(event)}>
                    <Arrow />
                </div>
                <div className="carousel-content" ref={this.carouselContent}>
                    {this.props.children}
                </div>
                <div
                    className="right-coursor"
                    onClick={(event) => this.moveRightHandler(event)}>
                    <Arrow />
                </div>
                <div
                    className="scrollbar"
                    ref={this.scrollbar}
                    onMouseUp={(event) => this.endDrag(event)}
                    onMouseDown={(event) => this.startDrag(event)}>
                    <div className="bar" ref={this.bar} />
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
