import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { Chrono } from "react-chrono";


export const TimeLine : FunctionComponent = memo(() => {
    const items = [{
        title: "2017",
    }, {
        title: "2018",
    }, {
        title: "2019",
    }, {
        title: "2020",
    }, {
        title: "2021",
    }, {
        title: "2022",
    }];

    return (
        <div style={{ marginTop: 50 }}>
            <Chrono scrollable={false} hideControls onScrollEnd={() => console.log('la')} borderLessCards items={items} mode={'HORIZONTAL'}/>
        </div>
    )
});