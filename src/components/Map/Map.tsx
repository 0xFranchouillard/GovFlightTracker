import React, { FunctionComponent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { TimeLine } from '@/components/TimeLine/TimeLine';
import ModalAirport from '@/components/ModalAirport/ModalAirport';
import Marker from '@/components/Marker/Marker';
import { IAirport } from '@/App';
import { myStyles, POLYLINE_OPTIONS } from './mapConfig';
import { flights } from '@/ressources/flights';

const center = {
    lat : 48.969,
    lng : 2.441,
};

interface IMap {
    airports : Array<IAirport>;
}

export interface ICoords {
    lat : number,
    lng : number
}

export const Map : FunctionComponent<IMap> = memo(({ airports }) => {
    const [infos, setInfos] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [activeAirport, setActiveAirport] = useState<any>(null);
    const [activeAirports, setActiveAirports] = useState<any>(null);
    const [activeFlights, setActiveFlights] = useState<any>(null);
    const [gMap, setGmap] = useState<any>();
    const [gMaps, setGmaps] = useState<any>();
    const polys : Array<any> = useMemo(() => [], []);

    const handleMapLoad = useCallback((map : any, maps : any) => {
        setGmap(map);
        setGmaps(maps);
    }, []);

    const createFlightPaths = useCallback((dep : ICoords, dest : ICoords) => {
        const poly = new gMaps.Polyline({
            path : [
                dep,
                dest
            ],
            ...POLYLINE_OPTIONS.DASHED
        });
        polys.push(poly);
        poly.setMap(gMap);
    }, [gMaps, gMap, polys]);

    const resetPolys = useCallback(() => {
        polys.forEach((poly) => {
            poly.setVisible(false);
        });
        setActiveAirports([])
    }, [polys]);

    const handleOnChange = useCallback((map : any) => {
        setInfos(map);
    }, []);

    const handleModalIsOpen = useCallback((airport : any) => {
        setModalIsOpen(true);
        setActiveAirport(airport);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalIsOpen(false);
        setActiveAirport(null);
    }, []);

    const checkActivesFlights = useCallback((airports : any) : void => {
        const isActivesAirports : Array<any> = [];

        if (!activeFlights || activeFlights.length === 0)
            return;


        airports.forEach((airport : any) => {
            activeFlights.forEach((flight : any) => {
                const depLat = parseFloat(flight.departure[0].laltitude_decimal_degress);
                const depLng = parseFloat(flight.departure[0].longitude_decimal_degress);
                const destLat = parseFloat(flight.destination[0].laltitude_decimal_degress);
                const destLng = parseFloat(flight.destination[0].longitude_decimal_degress);
                const airportLat = parseFloat(airport.laltitude_decimal_degress);
                const airportLng = parseFloat(airport.longitude_decimal_degress);

                if ((depLat === airportLat && depLng === airportLng) || (destLng === airportLng && destLat === airportLat)) {
                    isActivesAirports.push(airport);
                }
            });
        });
        setActiveAirports(isActivesAirports);
    }, [activeFlights]);

    const isRenderingAirportMarker = useCallback((airport : IAirport) : boolean => {
        let needRender = false;
        if (!activeAirports || activeAirports.length === 0)
            return false;

        activeAirports.forEach((air : IAirport) => {
            if (air.ICAO_code === airport.ICAO_code) {
                needRender = true;
            }
        });

        return needRender;
    }, [activeAirports]);

    const renderAirports = useMemo(() => {
        if (!infos)
            return null;
        return airports.map((airport, idx) => {
            const { center : { lat, lng }, zoom } = infos;
            const latCheck = parseFloat(airport.laltitude_decimal_degress) - lat;
            const longCheck = parseFloat(airport.longitude_decimal_degress) - lng;
            const canRender = (latCheck > -2.5 && latCheck < 2.5) && (longCheck > -2.5 && longCheck < 2.5) && zoom >= 8;

            return (canRender || isRenderingAirportMarker(airport)) &&
                <Marker
                    key={ JSON.stringify(airport) }
                    airport={ airport }
                    handleModalIsOpen={ handleModalIsOpen }
                    lat={ parseFloat(airport.laltitude_decimal_degress) }
                    lng={ parseFloat(airport.longitude_decimal_degress) }/>;
        });
    }, [airports, infos, handleModalIsOpen, isRenderingAirportMarker]);

    const handleTimeLine = useCallback(async (str1 : string, str2 : string) => {
        const activeFlights = flights.filter((flight) => {
            const firstseen = (flight.firstseen.split(' ')[0]).split('-');
            const actualDateFlight = new Date(`${ firstseen[0] }-${ firstseen[1] }`).valueOf();
            const dateOne = new Date(str1).valueOf();
            const dateTwo = new Date(str2).valueOf();

            if (dateOne < dateTwo)
                return (actualDateFlight >= dateOne && actualDateFlight <= dateTwo);
            return (actualDateFlight >= dateTwo && actualDateFlight <= dateOne);
        });
        activeFlights.forEach((flight) => {
            createFlightPaths({
                lat : parseFloat(flight.departure[0].laltitude_decimal_degress),
                lng : parseFloat(flight.departure[0].longitude_decimal_degress)
            }, {
                lat : parseFloat(flight.destination[0].laltitude_decimal_degress),
                lng : parseFloat(flight.destination[0].longitude_decimal_degress)
            });
        });
        setActiveFlights(activeFlights);
    }, [createFlightPaths]);

    const callbackTimeLine = useCallback((str1 : string, str2 : string) => {
        resetPolys();
        handleTimeLine(str1, str2);
    }, [resetPolys, handleTimeLine]);

    useEffect(() => {
        checkActivesFlights(airports);
    }, [activeFlights, airports, checkActivesFlights]);

    return (
        <div style={ { height : '90vh', width : '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ {
                    key : process.env.REACT_APP_GOOGLE_MAP_KEY || '',
                    libraries : ['geometry']
                } }
                defaultCenter={ center }
                defaultZoom={ 1 }
                yesIWantToUseGoogleMapApiInternals
                resetBoundsOnResize
                onChange={ handleOnChange }
                options={ { styles : myStyles } }
                onGoogleApiLoaded={ ({ map, maps }) => handleMapLoad(map, maps) }
            >
                { renderAirports }
            </GoogleMapReact>
            <ModalAirport isVisible={ modalIsOpen } onClose={ handleModalClose } airport={ activeAirport }/>
            <TimeLine callback={ callbackTimeLine }/>
        </div>
    );
});