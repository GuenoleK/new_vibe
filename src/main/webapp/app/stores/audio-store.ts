import { observable, computed } from 'mobx';

class AudioStore {
  @observable
  isMusicPlaying = false;

  @observable
  currentPlayingAudio: HTMLAudioElement;

  playMusic = async (audio: HTMLAudioElement) => {
    // If an occurence of an audio file is running
    // We stop it
    if (this.currentPlayingAudio && audio !== this.currentPlayingAudio) {
      this.stopMusic();
      this.isMusicPlaying = false;
    }

    // We set the new audio then we play the music
    this.currentPlayingAudio = audio;
    if (!this.isMusicPlaying) {
      this.currentPlayingAudio.play();
      this.isMusicPlaying = true;
    }
  };

  pauseMusic = async () => {
    if (this.currentPlayingAudio && this.isMusicPlaying) {
      this.currentPlayingAudio.pause();
      this.isMusicPlaying = false;
    }
  };

  stopMusic = () => {
    if (this.currentPlayingAudio) {
      this.currentPlayingAudio.pause();
      this.currentPlayingAudio.currentTime = 0;
      this.isMusicPlaying = false;
    }
  };

  audioEnded = () => {
    this.currentPlayingAudio.currentTime = 0;
    this.isMusicPlaying = false;
  };
}

export const audioStore = new AudioStore();
