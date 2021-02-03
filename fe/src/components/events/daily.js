import React,{useState, useEffect} from 'react';
import axios from '../../axios';
import { Bar, options } from 'react-chartjs-2';

const Edaily = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/events/daily').then((res) => {
            // console.log(res);
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])        
    return(        
        <div style={{height:"100%", width:"100%"}}>
            <Bar data={{
                    labels: data.map((edate) => {
                        let d = (edate.date).split("T");
                        let da = d[0];
                        let time = d[1].split(".");
                        return ['Date : '+da, 'Time : '+time[0]];
                    }),
                    datasets: [
                      {
                        label: 'Event Number',
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
                        data: data.map((ename) => {
                            return ename.events;
                        })
                        }                        
                    ],
                    options:options
            }}/>
        </div>
    )
}

export default Edaily;