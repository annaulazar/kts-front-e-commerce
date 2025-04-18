import * as React from 'react'
import classNames from "classnames";
import styles from './Icon.module.scss'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number;
    height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({width=24,height=24,children,color,...props}) => <svg {...props} className={classNames(props.className,styles.Icon)} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
    {children}
</svg>

export default Icon;
