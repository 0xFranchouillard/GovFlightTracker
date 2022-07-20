import React, { FunctionComponent, memo } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import flightIcon from '@/ressources/flightIcon.png';

interface IFlightModal {
    isVisible : boolean | undefined;
    onClose : () => void;
    flight : any;
}

const FlightIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 10;
  transform: rotate(80deg);
`;

const Paragraph = styled.p`
  font-weight: bolder;
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

const FlightModal : FunctionComponent<IFlightModal> = memo(({ isVisible, onClose, flight }) => {
    return (
        <Modal closable style={ { zIndex : 300 } } title={ <Title>{ flight?.callsign } Flight </Title> }
               visible={ isVisible }
               onCancel={ onClose }
               cancelButtonProps={ { style : { display : 'none' } } } okButtonProps={ { style : { display : 'none' } } }
               footer={ false }>
            <FlightIcon src={flightIcon}/>

            <Container>
                <Paragraph style={{ marginTop: 20 }}>Depart : {flight?.departure[0].country} {flight?.departure[0].airport_name}</Paragraph>
                <Paragraph>Destination : {flight?.destination[0].country} {flight?.destination[0].airport_name}</Paragraph>
                <p>First seen : {flight?.firstseen}</p>
                <p>Last seen : {flight?.lastseen}</p>

                <p>ICAO24 : {flight?.icao24}</p>

            </Container>
        </Modal>
    );
});

export default FlightModal;