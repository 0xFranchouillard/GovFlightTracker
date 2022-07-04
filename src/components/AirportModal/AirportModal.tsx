import React, {FunctionComponent, memo, useEffect, useState} from 'react';
import styled from "styled-components";
import {Modal} from 'antd';

import airportPng from '@/ressources/airportIcons.webp'
import airportDiapo1 from '@/ressources/airportDiapo1.jpg'
import airportDiapo2 from '@/ressources/airportDiapo2.jpg'
import airportDiapo3 from '@/ressources/airportDiapo3.jpg'
import airportDiapo4 from '@/ressources/airportDiapo4.jpg'
import airportDiapo5 from '@/ressources/airportDiapo5.jpg'
import airportDiapo6 from '@/ressources/airportDiapo6.jpg'
import airportDiapo7 from '@/ressources/airportDiapo7.webp'

interface IAirportModal {
    isVisible: boolean | undefined;
    onClose: () => void;
    airport: any
}

const IconAirport = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50px;
  right: 1px;
  z-index: 10;
`;

const DiapoAirport = styled.img`
  margin-top: 5px;
  width: 100%;
  height: 200px;
  border: 3px solid;
  border-image: linear-gradient(45deg, turquoise, black) 1;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  color: #111;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
`;

const airportDiapos: Array<string> = [
    airportDiapo1,
    airportDiapo2,
    airportDiapo3,
    airportDiapo4,
    airportDiapo5,
    airportDiapo6,
    airportDiapo7
]

const AirportModal: FunctionComponent<IAirportModal> = memo(({isVisible, onClose, airport}) => {
    const [airportImg, setAirportImg] = useState<string>()

    useEffect(() => {
        setAirportImg(airportDiapos[Math.floor(Math.random() * airportDiapos.length)])
    }, [airport])

    return (
        <Modal closable style={{zIndex: 300}} title={<Title>{airport?.airport_name} Airport </Title>}
               visible={isVisible}
               onCancel={onClose}
               cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}} footer={false}>
            <IconAirport src={airportPng}/>
            <DiapoAirport src={airportImg}/>

            <Container>
                <p style={{marginTop: 20}}>City : {airport?.city_town}</p>
                <p>Country : {airport?.country}</p>
                <p>Altitude : {parseFloat(airport?.altitude)}m</p>
                <p>IATA Code : {airport?.IATA_code}</p>
                <p>ICAO Code : {airport?.ICAO_code}</p>
                <p>Latitude : {parseFloat(airport?.laltitude_decimal_degress)}</p>
                <p>Longitude : {parseFloat(airport?.longitude_decimal_degress)}</p>
            </Container>
        </Modal>
    );
});

export default AirportModal;