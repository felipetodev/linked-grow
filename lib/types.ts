import { TONE_OPTIONS } from "./constants"

export type ToneOptions = typeof TONE_OPTIONS

export type Tone = typeof TONE_OPTIONS[number]['value'] | ''

export type FormatTemplateProps = {
  type: string,
  template: string,
  value: string
}

export type PostGenerator = {
  message: string
  tone: Tone
  format: FormatTemplateProps
  type: 'post' | 'ideas'
  tag: 'all' | 'ideas' | 'job'
}

export type JobDescriptionProps = {
  jobDescription: string
  stack: string
  softSkills: string
  benefits: string
  format: FormatTemplateProps
  tone: Tone
  type: 'job'
  tag: 'job'
}
