import React, { FunctionComponent, memo } from 'react';
import styled from 'styled-components';

import flightIcon from '@/ressources/flightIcon.png';

interface IMarker {
    flight : any;
    lat : number;
    lng : number;
    handleModalIsOpen : (airport : any) => void;
}

const Wrapper = styled.img`
  @keyframes pulse {
    from {
      transform : translate(-50%, -50%) rotate(90deg) scale(1);
      opacity   : 1;
    }
    50% {
      transform : translate(-50%, -50%) rotate(90deg) scale(1);
      opacity   : 0.25;
    }
    to {
      transform : translate(-50%, -50%) rotate(180deg) scale(1);
      opacity   : 1;
    }
  }
  
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 25px;
  user-select: none;
  transform: translate(-50%, -50%) rotate(80deg);
  cursor: pointer;
  -webkit-transition: margin 0.5s ease-out;
  -moz-transition: margin 0.5s ease-out;
  -o-transition: margin 0.5s ease-out;
  
  &:hover {
    z-index: 1;

    -webkit-animation : pulse 1s infinite;
    -moz-animation    : pulse 1s infinite;
    -o-animation      : pulse 1s infinite;
    animation         : pulse 1s infinite;
  }
`;

const FlightMarker : FunctionComponent<IMarker> = memo(({ flight, handleModalIsOpen }) => {
    return (
        <div>
            <Wrapper
                src={ flightIcon }
                onClick={ () => handleModalIsOpen(flight) }
            />
        </div>
    );
});

export default FlightMarker;