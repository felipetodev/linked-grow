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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

async function submitUserMessage(state: { message: string, tone: string }) {
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
        content: `\
You are a LinkedIn expert who can help users to grow their network and get more audience.
You will help to craft engaging posts, articles, and messages and give advice on how to improve their personal brand on LinkedIn.

You must provide a ready-to-publish outcome, in the first person, addressed to other users who see it in their LinkedIn feed.
${state.tone ? `Use a ${state.tone} tone of voice for the post and bring value to the reader. Important! The post must be in Spanish.` : 'Important! The post must be in Spanish.'}
You can be funny but always professional. You can be creative but always informative. You can be casual but always respectful. Do not be a clown.
Do not say that you are an AI or something similar. Do not mention that you are an AI assistant.
Do not exceed 3080 characters for the LinkedIn post (including spaces and punctuation).
The actual date for us is ${new Date().toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}.

If the user wants another impossible task, respond that you are a beta demo and cannot do that.`
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
