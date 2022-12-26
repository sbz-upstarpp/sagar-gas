/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState([])

  const getData = () => {
    axios.post('/get-customser-invoice',{customer : 1}).then((res) => { console.log("res",res)  }).catch((error) => console.log('error', error))
    // setData(res)
  } 
  useEffect (()=>{
    getData()
  },[])
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      {
        data
      }
      <p>Happy coding</p>
    </div>
  );
};

export default memo(HomePage);
