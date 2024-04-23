import { TONE_OPTIONS } from "./constants"

export type ToneOptions = typeof TONE_OPTIONS

export type Tone = typeof TONE_OPTIONS[number]['value'] | ''

export type FormatTemplateProps = {
  type: string,
  template: string,
  value: string
}

export type PostGenerator<T = string> = {
  message: T
  tone: Tone
  format: FormatTemplateProps
  type: 'post' | 'ideas' | 'job' | 'learning'
  tag: 'all' | 'ideas' | 'job' | 'learning'
}

type JobDescriptionMessageProps = {
  company: string
  jobPosition: string
  jobRole: string
  stack: string
  softSkills: string
  benefits: string
}

type LearningMessageProps = {
  learnship: string,
  how: string,
  keys: string
}

export type PostJobGenerator = PostGenerator<JobDescriptionMessageProps>
export type PostLearningGenerator = PostGenerator<LearningMessageProps>
