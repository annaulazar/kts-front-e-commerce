import * as React from 'react'
import classNames from "classnames";
import Icon, { IconProps } from 'components/icons/Icon';

const CheckIcon: React.FC<IconProps> = ({color='primary',...props}) => <Icon {...props} >
        <path d="M4 11.6129L9.87755 18L20 7" className={classNames(props.className,"stroke",color)} stroke-width="2"/>
</Icon>

export default CheckIcon;
