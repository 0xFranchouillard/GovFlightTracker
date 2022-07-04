import React, {FunctionComponent, memo} from 'react';
import styled from 'styled-components';

import airportPng from '@/ressources/airportIcons.png'

interface IAirportMarker {
    airport: any;
    lat: number;
    lng: number;
    handleModalIsOpen: (airport: any) => void;
}

interface IWrapper {
    airport: any;
}

const Wrapper = styled.img<IWrapper>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35px;
  height: 35px;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.airport ? 'pointer' : 'default')};

  &:hover {
    z-index: 1;
  }
`;

interface IAirportName {
    airportName: string
}

const AirportName = styled.p<IAirportName>`
  position: absolute;
  left: 20px;
  bottom: -19px;
  width: ${(props) => `${props.airportName.length}ch`};
  text-align: left;
  font-size: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  color: red;
`;

const AirportMarker: FunctionComponent<IAirportMarker> = memo(({airport, handleModalIsOpen}) => {
    return (
        <div>
            <AirportName
                airportName={`${airport.city_town} ${airport.airport_name} Airport`}>{`${airport.city_town} ${airport.airport_name} Airport`}</AirportName>
            <Wrapper
                src={airportPng}
                onClick={() => handleModalIsOpen(airport)}
                airport={airport}
            />
        </div>
    );
});

export default AirportMarker;