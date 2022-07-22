import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTrackIndex: -1,
    tracks: [
      {
        name: 'Belabar',
        src: '/tracks/track-1.mp3',
        artist: 'Sunny9'
      },
      {
        name: 'Seedal',
        src: '/tracks/track-2.mp3',
        artist: '2D'
      },
      {
        name: 'Canton',
        src: '/tracks/track-3.mp3',
        artist: 'Benbient'
      },
      {
        name: 'Classicalised Dub',
        src: '/tracks/track-3.mp3',
        artist: 'DucK'
      }
    ],
  },
  getters: {
    getTracksBySearch: (state) => (search: string) => {
      if (search) {
        return state.tracks.filter(track =>
            track.name.toLowerCase().includes(search.toLowerCase()) || track.artist.toLowerCase().includes(search.toLowerCase())
        )
      }
      return state.tracks
    }
  },
  mutations: {
    setCurrentTrackIndex(state, index) {
      state.currentTrackIndex = index
    },
    nextTrack(state) {
      if (state.currentTrackIndex < state.tracks.length - 1) {
        state.currentTrackIndex++
      } else {
        state.currentTrackIndex = 0
      }
    },
    prevTrack(state) {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex--
      } else {
        state.currentTrackIndex = state.tracks.length - 1
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
