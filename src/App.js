import axios from 'axios';
import moment from 'moment';

import { /*useEffect, */ useState } from "react";

const App = () => {

  const [msg, setMsg] = useState("Starting");

  const addOne = () => {
    // console.log("adding one");
    const data = {new_message: `now it's ${moment().format('HH:MM:ss')}`};
    axios.post('/.netlify/functions/store_row', data)
    .then((response) => {
      // console.log(response.data);
      setMsg(`Function reply: < ${response.data.message} >`);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const getLast = () => {
    // console.log("getting last one");
    axios.post('/.netlify/functions/get_last_row')
    .then((response) => {
      // console.log(response.data);
      setMsg(`Function reply: < ${response.data.last_row} >`);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <button onClick={addOne}>
        Add row
      </button>
      <button onClick={getLast}>
        Read last
      </button>
      <div>
        {msg}
      </div>
    </>
  )
}

export default App
