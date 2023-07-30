import Icon from '@ant-design/icons'
import SVG from 'react-inlinesvg'
import Grid_2Plus from './grid-2-plus.svg'
import Plus from './plus.svg'

export const IconGrid_2Plus = (props) => (
	<Icon component={(iProps) => <SVG src={Grid_2Plus} {...iProps} />} {...props} />
)
export const IconPlus = (props) => <Icon component={(iProps) => <SVG src={Plus} {...iProps} />} {...props} />
