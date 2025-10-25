import { Howl, Howler } from 'howler'

export interface AudioManager {
  playAmbientMusic(character: string): void
  stopAmbientMusic(): void
  playSoundEffect(sound: 'choice' | 'victory' | 'verse' | 'button'): void
  setVolume(volume: number): void
  mute(): void
  unmute(): void
}

class AudioManagerImpl implements AudioManager {
  private ambientMusic: Howl | null = null
  private soundEffects: Record<string, Howl> = {}
  private currentCharacter: string | null = null

  constructor() {
    // Initialize sound effects
    this.soundEffects = {
      choice: new Howl({
        src: ['/audio/choice.mp3'],
        volume: 0.3,
      }),
      victory: new Howl({
        src: ['/audio/victory.mp3'],
        volume: 0.4,
      }),
      verse: new Howl({
        src: ['/audio/verse.mp3'],
        volume: 0.3,
      }),
      button: new Howl({
        src: ['/audio/button.mp3'],
        volume: 0.2,
      }),
    }
  }

  playAmbientMusic(character: string): void {
    // Stop current music if playing
    if (this.ambientMusic) {
      this.ambientMusic.stop()
    }

    // Don't restart if same character
    if (this.currentCharacter === character) {
      return
    }

    this.currentCharacter = character

    // Create ambient music based on character
    const musicSrc = this.getMusicForCharacter(character)

    this.ambientMusic = new Howl({
      src: [musicSrc],
      volume: 0.2,
      loop: true,
      autoplay: true,
    })

    this.ambientMusic.play()
  }

  stopAmbientMusic(): void {
    if (this.ambientMusic) {
      this.ambientMusic.stop()
      this.ambientMusic = null
      this.currentCharacter = null
    }
  }

  playSoundEffect(sound: 'choice' | 'victory' | 'verse' | 'button'): void {
    const soundEffect = this.soundEffects[sound]
    if (soundEffect) {
      soundEffect.play()
    }
  }

  setVolume(volume: number): void {
    Howler.volume(volume)
  }

  mute(): void {
    Howler.mute(true)
  }

  unmute(): void {
    Howler.mute(false)
  }

  private getMusicForCharacter(character: string): string {
    switch (character) {
      case 'moses':
        return '/audio/moses-ambient.mp3'
      case 'david':
        return '/audio/david-ambient.mp3'
      case 'jesus':
        return '/audio/jesus-ambient.mp3'
      default:
        return '/audio/default-ambient.mp3'
    }
  }
}

export const audioManager = new AudioManagerImpl()
