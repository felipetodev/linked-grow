import 'server-only'

import {
  createAI,
  getMutableAIState,
  render,
  createStreamableValue,
} from 'ai/rsc'
import OpenAI from 'openai'
import { PostContent } from '@/components/post-content'
import { IconLoader } from '@tabler/icons-react'
import { postGeneratorPrompt } from '@/lib/prompt'
import type { PostGenerator } from '../types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

async function submitUserMessage(state: PostGenerator) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: state.message
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  console.log(state)

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <IconLoader className="animate-spin" />,
    messages: [
      {
        role: 'system',
        content: await postGeneratorPrompt(state),
      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <PostContent content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: crypto.randomUUID(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    }
    // functions: {}
  })

  return {
    id: crypto.randomUUID(),
    display: ui,
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: crypto.randomUUID(), messages: [] }
})
