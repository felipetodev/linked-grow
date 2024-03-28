import { TONE_OPTIONS } from "./constants"

export type ToneOptions = typeof TONE_OPTIONS

export type Tone = typeof TONE_OPTIONS[number]['value'] | ''

export type PostGenerator = {
  message: string
  tone: Tone
  format: {
    type: string,
    format: string,
    value: string
  }
}
