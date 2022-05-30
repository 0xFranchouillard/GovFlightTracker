import React, {ReactElement, useEffect, useState} from 'react';

import {airportsData} from "@/ressources/airports"

import {Map} from '@/components/Map/Map'

import './App.css';

export interface IAirport {
    laltitude_decimal_degress: string;
    longitude_decimal_degress: string;
    airport_name: string
}

function App(): ReactElement {
    const [airports, setAirports] = useState<Array<IAirport>>(airportsData)

    useEffect(() => {
        setAirports(airportsData)
    }, [])

    return (
        <div className="App">
            <Map airports={airports}/>
        </div>
    );
}

export default App;
