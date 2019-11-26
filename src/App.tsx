/* eslint-disable */
import React from 'react';
import './App.scss';
import DtmRajw from './components/dtm_rajw'
import {useEffect} from 'react';
import axios from 'axios';

const App: React.FC = () => {

  // const url = 'http://10.41.15.125:3333/flightsInternationaldestinationcsutommenu.json'
  const url = '/json/DtmData.json'

  const [originData, setOriginData] = React.useState(null)

  // const dtm = {}

  // useEffect(()=> {
  
  //   const fetchData = async () => {
  //     const result = await axios(url);
  //     console.log('result',result)
  //     setOriginData(result.data)
  //   }
  
  //   fetchData()
  // }, [])




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
      {typeof originData}
     {/* {JSON.stringify(originData)} */}
      <DtmRajw data={{'Dtm' : originData }} /> 
    </div>
  );
}

export default App;
