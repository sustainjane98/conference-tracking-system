import Track from '../models/track.model';

const conference = {
  tracks: new Map<Track, boolean>([]),

  setTrackToFinished(track: Track) {
    this.tracks.set(track, true);
  },

  openTracks() {
    const openTracks: { key: Track; value: boolean }[] = [];

    for (const [key, value] of this.tracks.entries()) {
      if (!value) {
        openTracks.push({ key, value });
      }
    }

    return openTracks;
  },
};

export default conference;
