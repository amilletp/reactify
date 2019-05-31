import React, { Fragment, useRef } from "react";
import { mapStateToProps, addRecentSong } from "../utils/utils";
import { connect } from "react-redux";
import { initFloatPlayer } from "../redux/actions/floatPlayerActions";
import * as Constants from "../constants/constants";

const FloatingPlayer = props => {
  // Del Store de Redux
  const { handleFloatPlayer, navigation } = props;
  const { status, prevSong, song } = props.floatPlayer;

  const audioRef = useRef();
  const sourceRef = useRef();

  if (
    status === "expanded" &&
    song &&
    sourceRef.current &&
    parseInt(sourceRef.current.id) !== song.id
  ) {
    sourceRef.current.src = song.audio;
    audioRef.current.load();
    let promise = audioRef.current.play();
    if (promise !== undefined) {
      promise
        .then(_ => {
          addRecentSong(song.id);
        })
        .catch(error => console.log(error));
    }
  }

  const handlePlay = e => {
    addRecentSong(song.id);
    e.target.className = "FloatingPlayer-root expanded";
    handleFloatPlayer(prevSong, song, "expanded");
  };

  var newStatus =
    status !== "expanded" && navigation.topBarValue !== Constants.PLAYER
      ? "hidden"
      : status;

  return (
    <Fragment>
      {song && (
        <div>
          <audio
            ref={audioRef}
            id="FloatingPlayer-audio"
            className={`FloatingPlayer-root ${newStatus}`}
            onPlay={handlePlay}
            controls
          >
            <source
              ref={sourceRef}
              id={song.id}
              src={song && song.audio}
              type="audio/mpeg"
            />
          </audio>
        </div>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleFloatPlayer: (prevSong, song, status) =>
      dispatch(initFloatPlayer(prevSong, song, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingPlayer);
