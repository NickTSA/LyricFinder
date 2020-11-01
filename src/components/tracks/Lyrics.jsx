import React, { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Lyrics(props) {
  const [lyrics, setLyrics] = useState({});
  const [track, setTrack] = useState();

  useEffect(() => {
    async function fetchLyrics() {
      await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=
        ${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
        .then(res => res.json())
        .then(res => {
          setLyrics(res.message.body.lyrics);

          return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=
            ${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
          );
        })
        .then(res => res.json())
        .then(res => setTrack(res.message.body.track));
    }
    fetchLyrics();
  }, [props.match.params.id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className={`list-group-item`}>
            <strong>Explicit Words</strong>:{" "}
            {track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className={`list-group-item`}>
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
          </li>
        </ul>
      </div>
    );
  }
}

export default Lyrics;
