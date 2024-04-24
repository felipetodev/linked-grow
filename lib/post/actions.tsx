import 'server-only'

import {
  createAI,
  getMutableAIState,
  render,
  createStreamableValue,
} from 'ai/rsc'
import { z } from 'zod'
import OpenAI from 'openai'
import { Post } from '@/components/posts/post-context'
import { CardsIdeas } from '@/app/(dashboard)/ideas/components/cards-ideas'
import { CardsSkeleton } from '@/app/(dashboard)/ideas/components/cards-skeleton'
import { IconLoader } from '@tabler/icons-react'
import { YoutubeLoader } from "langchain/document_loaders/web/youtube"
import { learningDefaultPrompt, postGeneratorPrompt } from '@/lib/prompt'
import { type Document } from "langchain/document"
import {
  type PostLearningGenerator,
  type PostGenerator,
  type PostJobGenerator,
  PostYoutubeGenerator
} from '@/lib/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

function contentMessage({ type, message }: PostGenerator) {
  switch (type) {
    case 'post':
      return message
    case 'ideas':
      return `List of ideas: ${message}`
    default:
      return message
  }
}

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
        content: contentMessage(state)
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  console.log(aiState.get().messages)

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
        textNode = <Post content={textStream.value} />
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
    },
    functions: {
      listIdeas: {
        description: 'List of at least 6 different ideas for your next LinkedIn post. Each idea should be separated by a new line.',
        parameters: z.object({
          idea: z.object({
            message: z.string().describe('The message with the ideas to list')
          })
        }),
        render: async function* ({ idea }) {
          yield (
            <CardsSkeleton />
          )

          await new Promise((resolve) => setTimeout(resolve, 1000))

          // aiState.done({
          //   ...aiState.get(),
          //   messages: [
          //     ...aiState.get().messages,
          //     {
          //       id: crypto.randomUUID(),
          //       role: 'function',
          //       name: 'listIdeas',
          //       content: JSON.stringify(idea)
          //     }
          //   ]
          // })

          const messageIdeas = idea.message
            .split('\n')
            .filter(Boolean)
            .map(idea => ({
              // regex removes possible ordered list numbers
              message: idea.replace(/^\d+[.)]\s+/, ''),
              id: crypto.randomUUID()
            }))

          return <CardsIdeas ideas={messageIdeas} />
        }
      },
    }
  })

  return {
    id: crypto.randomUUID(),
    display: ui,
  }
}

async function submitLearningForm(state: PostLearningGenerator) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: `\
Recientemente estuve aprendiendo ${state.message.learnship}.
Los aspectos más destacados de mi experiencia de aprendizaje fueron ${state.message.how}.
La clave para mi aprendizaje son ${state.message.keys}.

Ayudame a crear un post para LinkedIn motivando a las demas personas.`
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <IconLoader className="animate-spin" />,
    messages: [
      {
        role: 'system',
        content: await postGeneratorPrompt({
          format: state.format || learningDefaultPrompt,
          tone: state.tone
        } as PostGenerator),
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
        textNode = <Post content={textStream.value} />
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
  })

  return {
    id: crypto.randomUUID(),
    display: ui,
  }
}

async function submitJobDescriptionForm(state: PostJobGenerator) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: `\
Crea una descripción de trabajo para empresa ${state.message.company}.
El puesto de trabajo es ${state.message.jobPosition}.
El rol del trabajo será ${state.message.jobRole}.
Las habilidades necesarias son ${state.message.stack}.
Las habilidades blandas son ${state.message.softSkills}.
Los beneficios de trabajar en esta empresa son ${state.message.benefits}.
`
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <IconLoader className="animate-spin" />,
    messages: [
      {
        role: 'system',
        content: await postGeneratorPrompt({
          format: state.format, // || jobDescriptionPrompt // <--------------------------- ✨👀
          tone: state.tone || 'professional'
        } as PostGenerator),
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
        textNode = <Post content={textStream.value} />
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
  })

  return {
    id: crypto.randomUUID(),
    display: ui,
  }
}

async function submitYoutubeForm(state: PostYoutubeGenerator) {
  'use server'

  let summary: Document[] = []
  try {
    const loader = YoutubeLoader.createFromUrl(state.message.url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();
    summary = docs.map(({ pageContent, metadata }) => ({
      pageContent,
      metadata: {
        ...metadata,
        description: metadata.description.replaceAll('\n', '')
      }
    }))
  } catch (e) {
    throw new Error(`${(e as Error).message}. Contacta a soporte para obtener ayuda`)
  }

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: `\
Crea un post en LinkedIn a partir de un resumen de un video de YouTube.
El link del video es: ${state.message.url}
# Utiliza el siguiente resumen para generar el post:
---------------------
Video Title: ${summary[0].metadata.title}
Video Author: ${summary[0].metadata.author}

${summary[0].pageContent}
---------------------

# Utiliza la descripción del video para complementar información en el post (solo si es necesario):
---------------------
${summary[0].metadata.description}
---------------------
Importante!:
Recuerda dar los creditos al autor del video, nombrando su nombre (con @ o #) y/o su canal y añadiendo el link de youtube al final del post.
No utilices markdown para las url en el post, solo texto plano.`
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <IconLoader className="animate-spin" />,
    messages: [
      {
        role: 'system',
        content: await postGeneratorPrompt({
          format: state.format,
          tone: state.tone,
        } as PostGenerator),
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
        textNode = <Post content={textStream.value} />
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
    submitLearningForm,
    submitJobDescriptionForm,
    submitYoutubeForm
  },
  initialUIState: [],
  initialAIState: { chatId: crypto.randomUUID(), messages: [] }
})
