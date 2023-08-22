import axios from 'axios';
import moment from 'moment';

import { /*useEffect, */ useState } from "react";

const App = () => {

  const [msg, setMsg] = useState("Starting");

  const addOne = () => {
    // console.log("adding one");
    const data = {new_message: `now it's ${moment().format('HH:MM:ss')}`};
    const req_init = moment();
    axios.post('/.netlify/functions/store_message', data)
    .then((response) => {
      // console.log(response.data);
      const elapsed_s = (moment() - req_init)/1000.0;
      setMsg(`Function reply: < ${response.data.message} > [session just created: ${response.data.just_created}] {elapsed in request: ${elapsed_s} s}`);
    })
    .catch((err) => {
      const elapsed_s = (moment() - req_init)/1000.0;
      setMsg(`Storing errored. {elapsed in request: ${elapsed_s} s}`);
      console.error(err);
    });
  }

  const getLast = () => {
    // console.log("getting last one");
    const req_init = moment();
    axios.post('/.netlify/functions/get_last_message')
    .then((response) => {
      // console.log(response.data);
      const elapsed_s = (moment() - req_init)/1000.0;
      setMsg(`Function reply: < ${response.data.last_message} > [session just created: ${response.data.just_created}] {elapsed in request: ${elapsed_s} s}`);
    })
    .catch((err) => {
      const elapsed_s = (moment() - req_init)/1000.0;
      setMsg(`Reading errored. {elapsed in request: ${elapsed_s} s}`);
      console.error(err);
    });
  }

  return (
    <>
      <button onClick={addOne}>
        Add message
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
