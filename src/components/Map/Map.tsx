import React, {FunctionComponent, memo, useCallback, useMemo, useState} from 'react'
import GoogleMapReact from 'google-map-react';

import ModalAirport from "@/components/Modal/Modal";
import Marker from "@/components/Marker/Marker";
import {IAirport} from "@/App";
import {myStyles} from './mapConfig'

const center = {
    lat: 48.969,
    lng: 2.441,
};

interface IMap {
    airports: Array<IAirport>
}

export const Map: FunctionComponent<IMap> = memo(({airports}) => {
    const [infos, setInfos] = useState<any>(null)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [activeAirport, setActiveAirport] = useState<any>(null)

    const handleOnChange = useCallback((map: any) => {
        setInfos(map)
    }, [])

    const handleModalIsOpen = useCallback((airport: any) => {
        setModalIsOpen(true)
        setActiveAirport(airport)
    }, [])

    const handleModalClose = useCallback(() => {
        setModalIsOpen(false)
        setActiveAirport(null)
    }, [])

    const renderAirports = useMemo(() => {
        if (!infos)
            return null
        return airports.map((airport, idx) => {
            const {center: {lat, lng}, zoom} = infos
            const latCheck = parseFloat(airport.laltitude_decimal_degress) - lat
            const longCheck = parseFloat(airport.longitude_decimal_degress) - lng
            const canRender = (latCheck > -1.9 && latCheck < 1.9) && (longCheck > -1.9 && longCheck < 1.9) && zoom >= 8
            return canRender && <Marker
                key={JSON.stringify(airport)}
                airport={airport}
                handleModalIsOpen={handleModalIsOpen}
                lat={parseFloat(airport.laltitude_decimal_degress)}
                lng={parseFloat(airport.longitude_decimal_degress)}/>
        })
    }, [airports, infos, handleModalIsOpen])

    return (
        <div style={{height: '90vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_KEY || '',
                }}
                defaultCenter={center}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                resetBoundsOnResize
                onChange={handleOnChange}
                options={{styles: myStyles}}
            >
                {renderAirports}
            </GoogleMapReact>
            <ModalAirport isVisible={modalIsOpen} onClose={handleModalClose} airport={activeAirport}/>
        </div>
    );
})