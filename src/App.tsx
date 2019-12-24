/* eslint-disable */
import React from 'react';
import './App.scss';
import DtmRajw from './components/dtm_rajw'
import {useEffect} from 'react';
import Preview from './components/preview'


const App: React.FC = () => {

  // const url = 'http://10.41.15.125:3333/flightsInternationaldestinationcsutommenu.json'
  // const url = '/json/DtmData.json'
  const url = '/json/fullDtm.json'

  const [originData, setOriginData] = React.useState(null)

  useEffect(()=>{
    // fetchData()
    fetch(url)
    .then(res =>  res.json())
    .then(data => {
      setOriginData(data);
      
    })

  }, [])



  return (
    <div className="App">
      <Preview data={{'Dtm' : originData }} /> 
      {/* <DtmRajw data={{'Dtm' : originData }} />  */}
    </div>
  );
}

export default App;
