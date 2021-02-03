import React, {useEffect,useState} from 'react';
import axios from 'axios';
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
      <TextField id="search" type="text" placeholder="Filter By Date" aria-label="Search Input" value={filterText} onChange={onFilter} />
      <ClearButton type="button" onClick={onClear}>X</ClearButton>
    </React.Fragment>
  );
const Shourly = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(item => item.newdate && item.newdate.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);
    useEffect(()=>{
        axios.get('/stats/hourly').then((res) => {
            console.log(res.data);
            const newdata = res.data.map((item)=>{
                let {date, hour, events, impressions, clicks, revenue} = item;
                let newdate = date.split("T")[0];
                let newtime = date.split("T")[1].split(".")[0];
                return {events, hour, newdate, newtime, impressions, clicks, revenue};
 
             })
             setData(newdata);
             setLoading(false);
         }).catch((err)=>{
             console.log(err);
         })
     },[])
     if(loading === 'true'){
         return 'Loading';
     }
    return(
        <div style={{height:"100%", width:"100%"}}>
            <DataTable
            columns={[
                {
                    name: 'Date',
                    selector: 'newdate',
                    sortable: true,
                },
                {
                    name: 'Time',
                    selector: 'newtime',
                    sortable: true,
                },
                {
                    name: 'Stats Hours',
                    selector: 'hour',
                    sortable: true,
                },
                {
                    name: 'Stats Impressions',
                    selector: 'impressions',
                    sortable: true,
                },
                {
                    name: 'Stats Clicks',
                    selector: 'clicks',
                    sortable: true,
                },
                {
                    name: 'Stats Revenue',
                    selector: 'revenue',
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
        </div>
    )

}

export default Shourly;