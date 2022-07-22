<template>
  <div id="app">
    <div class="container">
      <Player
          ref="player"
          :track="tracks[currentTrackIndex]"
          @prev="prev"
          @next="next"
      />
      <input v-model="search" placeholder="Search for artists or tracks" class="search-input">
      <div class="track-list">
        <TrackLine
            v-for="(track, index) in getTracksBySearch(search)"
            :key="index"
            :track="track"
            :is-playing="currentTrackIndex === index"
            @play="setTrack(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import Player from "@/components/Player.vue";
import TrackLine from "@/components/TrackLine.vue";
import {mapGetters, mapState} from "vuex";

@Component({
  name: 'App',
  components: {
    Player, TrackLine
  },
  computed: {
    ...mapState(['tracks', 'currentTrackIndex']),
    ...mapGetters(['getTracksBySearch'])
  }
})
export default class App extends Vue {
  @Ref('player') readonly player!: Player

  public currentTrackIndex!: number

  search = ''

  setTrack (index: number): void {
    if (index !== this.currentTrackIndex) {
      this.$store.commit('setCurrentTrackIndex', index)
    } else {
      this.player.toggle()
    }
  }

  prev(): void {
    this.$store.commit('prevTrack')
  }

  next(): void {
    this.$store.commit('nextTrack')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.track-list {
  border: 1px solid $c-blue;
  border-radius: 5px;
}

.search-input {
  width: 100%;
  margin-bottom: 40px;
  padding: 10px 20px;
  border: 1px solid $c-blue;
  outline: none;
  border-radius: 5px;
}
</style>
