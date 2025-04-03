import style from './Slider.module.scss';

const Slider = ({images, className}) => {
    return (
        <div className={`${className} ${style.slider}`}>
            <img src={images[0]} />
        </div>
    )
};

export default Slider;