import React, {useEffect, useState, useRef} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import axios from '../axios';
import { IgrGeographicMap,IgrGeographicMapModule,IgrGeographicSymbolSeries,IgrGeographicProportionalSymbolSeries } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule,MarkerType,IgrSizeScale,IgrValueBrushScale } from 'igniteui-react-charts';
import{IgrDataContext} from 'igniteui-react-core';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
        columns={columns}
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <React.Fragment>
      <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
      <ClearButton type="button" onClick={onClear}>X</ClearButton>
    </React.Fragment>
  );

IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();
const Poi = () => {
    const [ data, setData ] = useState([]);

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        axios.get('/poi').then((res) => {
            console.log(res);
            setData(res.data);
            onDataLoaded(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    
    const map = useRef(null);
    const onDataLoaded = (jsonData) => {

        // const brushes = [
        //     "rgba(252, 32, 32, 0.4)",  // semi-transparent red
        // ];
        const sizeScale = new IgrSizeScale({});
        sizeScale.minimumValue = 15;
        sizeScale.maximumValue = 60;
        const brushScale = new IgrValueBrushScale({});
        brushScale.brushes = "rgba(252, 32, 32, 0.4)";
        brushScale.minimumValue = 0;
        brushScale.maximumValue = 40;
        const symbolSeries = new IgrGeographicProportionalSymbolSeries({ name:'symbolSeries'});
        symbolSeries.dataSource = jsonData;
        symbolSeries.markerType = MarkerType.Hidden;
        symbolSeries.radiusScale = sizeScale;
        symbolSeries.fillScale = brushScale;        
        symbolSeries.fillMemberPath = "poi_id";
        // symbolSeries.radiusMemberPath = "poi_id";
        symbolSeries.latitudeMemberPath = "lat";
        symbolSeries.longitudeMemberPath = "lon";
        symbolSeries.markerOutline = "rgba(252, 32, 32)";
        symbolSeries.tooltipTemplate = createTooltip;
        map.current.series.add(symbolSeries);
        
    }
    const createTooltip = (context) => {
        const dataContext = context.dataContext || IgrDataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item;
        if (!dataItem) return null;

        return (<div>
            <div className="tooltipTitle">{dataItem.name}</div>
            <div className="tooltipBox">
                <div className="tooltipRow">
                    <div className="tooltipLbl">Latitude:</div>
                    <div className="tooltipVal">{dataItem.lat}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Longitude:</div>
                    <div className="tooltipVal">{dataItem.lon}</div>
                </div>
            </div>
        </div>)
    }
    
    return (
        // <div style={{height:'100%', width:'100%'}}>
        <Container>
        <Row className="justify-content-md-center">
          <Col sm={5} style={{padding:"2% 2% 2% 2%"}}>
            <IgrGeographicMap
            ref={map}
            windowRect = { {left: 0.01, top: 0.1, width: 0.1, height: 0.6} }
            width= "600px"
            height= "500px"
            zoomable="true" 
            />
        </Col>
        <Col sm={7} style={{padding:"8% 2% 2% 18%"}}>        
          <DataTable
              columns={[
                  {
                      name: 'POI ID',
                      selector: 'poi_id',
                      sortable: true,
                  },
                  {
                      name: 'POI Name',
                      selector: 'name',
                      sortable: true,
                  },
                  {
                      name: 'POI Lat',
                      selector: 'lat',
                      sortable: true,
                  },
                  {
                      name: 'POI Lon',
                      selector: 'lon',
                      sortable: true,
                  }
              ]}
              // data={data}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              selectableRows
              persistTableHead
              />
            </Col>
        </Row>
        </Container>

    // </div>
    );
}

export default Poi;

