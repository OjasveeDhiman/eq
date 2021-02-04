import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {options, Radar} from 'react-chartjs-2';

const Sdaily = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('/stats/daily').then((res)=>{
            // console.log(res.data);
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <div style={{width:"100%", height:"100%"}}>
        <Radar data={{
            labels: data.map((edate) => {
                let d = (edate.date).split("T");
                let da = d[0];
                let time = d[1].split(".");
                return ['Date : '+da, 'Time : '+time[0]];
            }),
            datasets: [
              {
                label: 'Stats Impression',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(220,192,192,0.4)',
                borderColor: 'rgba(220,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(220,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(220,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((simpressions) => {
                    return simpressions.impressions;
                }),
                // type:'bubble'
                },
                {
                    label: 'Stats Click',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data.map((sclicks) => {
                        return sclicks.clicks;
                    }),
                    // type:'line'
                    },
                    {
                        label: 'Stats Revenue',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(32, 16, 69,0.4)',
                        borderColor: 'rgba(32, 16, 69,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(32, 16, 69,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(32, 16, 69, 1)',
                        pointHoverBorderColor: 'rgba(32, 16, 69, 1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data.map((srevenue) => {
                            return srevenue.revenue;
                        }),
                        // type:'bar'
                        }                                      
            ],
            options:options
    }}/>
        </div>
    )
}

export default Sdaily;