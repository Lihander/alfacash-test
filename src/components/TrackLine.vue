<template>
  <div :class="{'track--active': isPlaying}" class="track" @click="$emit('play')">
    <div class="track__info">
      <div class="icon-melody icon-24 track__icon" />
      <h4>{{ track.artist }} - {{ track.name}}</h4>
    </div>
    <div class="track__time">{{ duration }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import {Track} from "@/types";
import time from "@/components/mixins/time";

@Component({
  name: "TrackLine",
})
export default class TrackLine extends Mixins(Vue, time) {
  @Prop() private track!: Track;
  @Prop() private isPlaying = false;

  duration = ''

  mounted(): void {
    const audio = new Audio(this.track.src)

    audio.onloadedmetadata = () => {
      this.duration = this.toTime(audio.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid $c-blue;
  cursor: pointer;
  transition: $transition;

  &__info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__icon {
    margin-right: 20px;
    background-color: $c-blue;
  }

  &--active {
    background-color: $c-blue-15;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: $c-blue-05;
  }
}
</style>
