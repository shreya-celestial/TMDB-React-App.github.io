import { styled, alpha, Box } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import PropTypes from 'prop-types';

const GREY = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Slider = styled(BaseSlider)(
	({ theme }) => `
    color: ${theme.palette.mode === 'light' ? 'rgba(1,180,228,1)' : 'rgba(1,180,228,1)'};
    height: 6px;
    width: 100%;
    padding: 16px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  
    &.${sliderClasses.disabled} { 
      pointer-events: none;
      cursor: default;
      color: ${theme.palette.mode === 'light' ? GREY[300] : GREY[600]};
      opacity: 0.5;
    }
  
    & .${sliderClasses.rail} {
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: ${theme.palette.mode === 'light' ? '#e1e9f6' : 'rgba(1,180,228,1)'};
    }
  
    & .${sliderClasses.track} {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
    }
  
    & .${sliderClasses.thumb} {
      position: absolute;
      width: 16px;
      height: 16px;
      margin-left: -6px;
      margin-top: -6px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      border: 8px solid currentColor;
      background-color: #fff;
  
      &:hover{
        box-shadow: 0 0 0 4px ${alpha(
		theme.palette.mode === 'light' ? 'rgba(1,180,228,1)' : 'rgba(1,180,228,1)',
		0.3
	)};
      }
      
      &.${sliderClasses.focusVisible} {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(1,180,228,1)' : 'rgba(1,180,228,0.2)'
		};
        outline: none;
      }
  
      &.${sliderClasses.active} {
        box-shadow: 0 0 0 5px ${alpha(
			theme.palette.mode === 'light' ? 'rgba(1,180,228,1)' : 'rgba(1,180,228,1)',
			0.5
		)};
        outline: none;
      }
    }
  
    & .${sliderClasses.mark} {
      position: absolute;
      width: 4px;
      height: 8px;
      border-radius: 2px;
      background-color: #e1e9f6;
      top: 37%;
      opacity: 0.7;
      transform: translateX(-50%);
    }
  
    & .${sliderClasses.markActive} {
      background-color: rgba(1,180,228,1);
    }

    & .valueLabel {
      font-family: IBM Plex Sans;
      font-weight: 600;
      font-size: 12px;
      position: relative;
      top: -2.8em;
      text-align: center;
      align-self: center;
    }

  `
);

function SliderValueLabel({ children }) {
	return <span className="valueLabel">{children}</span>;
}

SliderValueLabel.propTypes = {
	children: PropTypes.number,
};


const RangeSlider = ({ ...props }) => {
	return (
		<Box sx={{ padding: '0 8px' }}>
			<Slider {...props} slots={{ valueLabel: SliderValueLabel }} />
		</Box>
	);
}

export default RangeSlider;