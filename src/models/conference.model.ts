import Track from '@/models/track.model';

const conference = {
  tracks: new Map<Track, boolean>([]),

  get openTracks() {
    const openTracks: { key: Track; value: boolean }[] = [];

    for (let [key, value] of this.tracks.entries()) {
      if (!value) {
        openTracks.push({ key, value });
      }
    }

    return openTracks;
  },
};

export default conference;
