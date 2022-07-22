<template>
  <div class="player">
    <div class="player__controls">
      <div class="icon-double-arrow icon-32 player__prev player__btn" @click="$emit('prev')"/>
      <div :class="isPlaying ? 'icon-pause' : 'icon-play'" class="icon-32 player__btn" @click="toggle" />
      <div class="icon-double-arrow icon-32 player__next player__btn" @click="$emit('next')"/>
    </div>
    <div class="player__preview">
      <div class="player__timeline" @mousedown="setPosition($event)">
        <div class="player__timeline-progress" :style="`width: ${audioProgress}%`" />
      </div>
      <div class="player__time">
        {{ time }} / {{ duration }}
      </div>
    </div>
    <div class="player__volume">
      <div :class="{'icon-volume--muted': muted}" class="icon-24 icon-volume" @click="mute" />
      <div class="player__timeline" @mousedown="setVolume($event)">
        <div class="player__timeline-progress" :style="`width: ${volume}%`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
import time from "@/components/mixins/time";
import {Track} from "@/types";

@Component({
  name: "Player"
})
export default class Player extends Mixins(Vue, time) {
  @Prop() private track!: Track;

  player = new Audio()
  isPlaying = false
  time = ''
  duration = ''
  audioProgress = 0
  volume = 100
  previousVolume = 40

  get muted(): boolean {
    return this.volume / 100 === 0;
  }

  public toggle(): void {
    if (!this.track) {
      this.$store.commit('setCurrentTrackIndex', 0)
    }
    if (this.isPlaying) {
      this.player.pause()
      this.isPlaying = false
    } else {
      this.player.play()
      this.isPlaying = true
    }
  }

  init(): void {
    if(this.track) {
      this.player.src = this.track.src
      this.isPlaying = true
      this.player.play()

      this.player.ontimeupdate = () => {
        this.duration = this.toTime(this.player.duration);
        this.time = this.toTime(this.player.currentTime);
        this.audioProgress = this.player.currentTime / (this.player.duration / 100)
      }

      this.player.onended = () => {
        this.$store.commit('nextTrack')
        this.isPlaying = false
      }
    }
  }

  setPosition(e: any): void {
    if(!this.track) {
      return
    }

    const bounds = e.currentTarget.getBoundingClientRect();
    const seekPos = (e.clientX - bounds.left) / bounds.width.toFixed();
    this.player.currentTime = this.player.duration * seekPos
    this.player.play()
  }

  setVolume(e: any): void {
    const bounds = e.currentTarget.getBoundingClientRect();
    const seekPos = (e.clientX - bounds.left) / bounds.width.toFixed();
    this.volume = seekPos * 100
  }

  mute(): void {
    if (this.muted) {
      this.volume = this.previousVolume;
    } else {
      this.previousVolume = this.volume;
      this.volume = 0;
    }
  }

  @Watch('track')
  onTrackChanged(): void {
    this.init()
  }

  @Watch('volume')
  onVolumeChanged(): void {
    this.player.volume = this.volume / 100;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.player {
  position: relative;
  display: grid;
  grid-template-columns:  min-content 1fr 132px;
  grid-column-gap: 20px;
  padding: 10px 0;
  margin-bottom: 20px;

  &__btn {
    margin-right: 20px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  &__prev {
    transform: rotate(180deg);
  }

  &__volume, &__preview, &__controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .icon-volume {
    margin-right: 10px;
    cursor: pointer;

    &--muted {
      background-color: $c-dark-35;
    }
  }

  &__timeline {
    position: relative;
    width: 100%;
    height: 5px;
    background: $c-blue-15;
    border-radius: 4px;
    cursor: pointer;

    &::before {
      content: '';
      width: 100%;
      height: 300%;
      left: 0;
      top: -100%;
      position: absolute;
    }

    &-progress {
      width: 0;
      top: 0;
      left: 0;
      height: 100%;
      background: #009E95;
      position: absolute;
      transition: all .05s;
      border-radius: 4px;
    }

    &:hover {
      .player__preview {
        display: flex;
      }
    }
  }

  &__time {
    margin-left: 20px;
    white-space: nowrap;
  }
}
</style>
