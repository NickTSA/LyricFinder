import React, { useState, useEffect } from "react";

export const Context = React.createContext();

export function Provider(props) {
  let initialState = {
    track_list: [],
    heading: ""
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
        .then(res => res.json())
        .then(res =>
          setState({
            track_list: res.message.body.track_list,
            heading: "Top 10 tracks"
          })
        )
        .catch(err => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
}

export const Consumer = Context.Consumer;
