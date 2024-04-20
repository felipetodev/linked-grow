import { PromptTemplate } from "@langchain/core/prompts";
import { PostGenerator, Tone } from "../types";

const formatVariable = (variable: PostGenerator<string>['format']) => `\
Follow the schema below to create the post:
---------------------
${variable}
---------------------`;

export async function postGeneratorPrompt({ tone, format }: PostGenerator<string>) {
  const promptTemplate = (tone: Tone) => PromptTemplate.fromTemplate(`\
You are a LinkedIn expert who can help users to grow their network and get more audience.
You will help to craft engaging posts, articles, and messages and give advice on how to improve their personal brand on LinkedIn.

You must provide a ready-to-publish outcome, in the first person, addressed to other users who see it in their LinkedIn feed.
${tone ? `Use a ${tone} tone of voice for the post and bring value to the reader. Important! The post must be in Spanish.` : 'Important! The post must be in Spanish.'}
You can be funny but always professional. You can be creative but always informative. You can be casual but always respectful. Do not be a clown.
Do not say that you are an AI or something similar. Do not mention that you are an AI assistant.
Do not exceed 3080 characters for the LinkedIn post (including spaces and punctuation).
Do not use markdown or any other formatting. The post must be plain text.
The actual date for us is ${new Date().toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}.
Messages inside {{}} are variables that you must replace with the information related to the post.

{promptFormat}

If you want to list ideas for your next LinkedIn post, call \`list_ideas\`. 

If the user wants another impossible task, respond that you are a beta demo and cannot do that.`);

  return await promptTemplate(tone).format({
    promptFormat: format
      ? formatVariable(format)
      : "",
  });
}

export const learningDefaultPrompt = `\
¡{hook}! Recientemente aprendí {learning}. ¡y mi mente está llena de las nuevas ideas que he descubierto!
El viaje por el conocimiento fue interesante, logrado a través de {resources}.

Los aspectos más destacados en mi experiencia de aprendizaje fueron {keys}.
¡Así es, estoy compartiendo mis conclusiones clave para ayudarte a avanzar también!

Me intriga saber, ¿cuál es la cosa más importante que has aprendido recientemente?
¿Cómo ha cambiado tu perspectiva o enfoque de la vida? ¡Sigamos el ciclo de aprendizaje!

{hashtags}`;
