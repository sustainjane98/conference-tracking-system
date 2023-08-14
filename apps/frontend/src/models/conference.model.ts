import Track from '../models/track.model';
import { TrackState } from '../enums/track-state.enum';

const conference = {
  tracks: new Set<Track>([]),

  setTrackToFinished(track: Track) {
    track.state = TrackState.FULL;
    this.tracks.add(track);
  },

  openTracks() {
    const openTracks: typeof this.tracks = new Set();

    for (const track of this.tracks) {
      if (track.state !== TrackState.FULL) {
        openTracks.add(track);
      }
    }

    return openTracks;
  },
};

export default conference;
