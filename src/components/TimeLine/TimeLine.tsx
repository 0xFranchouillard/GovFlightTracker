import React, { FunctionComponent, memo, useCallback } from 'react';
import { Slider } from 'antd';

import styled from 'styled-components';
import { marks } from '@/components/TimeLine/Marks';
import airportPng from '@/ressources/airportIcons.png';

export interface ITimeLine {
    callback : (str1 : string, str2 : string) => void;
}

const Title = styled.p`
  color: #ff6600;
  font-style: italic;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
  font-size: 20px;
  font-family: 'Muli', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
`;

export const TimeLine : FunctionComponent<ITimeLine> = memo(({ callback }) => {

    const handleOnChange = useCallback((value : any) => {
        callback(marks[value[0]].label?.props?.defaultValue, marks[value[1]].label?.props?.defaultValue);
    }, [callback]);

    return (
        <div style={ { marginTop : 10, paddingRight : 20, paddingLeft : 20 } }>
            <div style={ { display : 'flex', flexDirection : 'row', justifyContent : 'center' } }>
                <Title style={ { marginBottom : 10 } }>flight range selector</Title>
                <img alt="flightLogo" style={ { marginLeft : 5, transform : 'rotate(35deg)', marginTop : -5 } }
                     src={ airportPng } height="30px" width="30px"/>
            </div>
            <Slider onChange={ handleOnChange }
                    handleStyle={ [{ borderColor : '#ff6600' }, { borderColor : '#ff6600' }] }
                    trackStyle={ [{ height : 6 }, { height : 6 }] }
                    tipFormatter={ (value) => marks[value || 0].label?.props?.defaultValue } range marks={ marks }
                    step={ null }
                    style={ { marginTop : -5 } }
            />
        </div>
    );
});