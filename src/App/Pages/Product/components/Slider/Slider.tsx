import './Slider.scss';

const Slider = ({images, className}) => {
    return (
        <div className={`${className} slider`}>
            <img src={images[0]} />
        </div>
    )
};

export default Slider;