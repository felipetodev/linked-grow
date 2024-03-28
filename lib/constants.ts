export const TONE_OPTIONS = [
  { value: "enthusiastic", label: "😃 Entusiasta" },
  { value: "professional", label: "👔 Profesional" },
  { value: "friendly", label: "👋 Amigable" },
  { value: "formal", label: "🎩 Formal" },
  { value: "motivational", label: "🌟 Motivador" },
  { value: "funny", label: "😄 Divertido" },
  { value: "dramatic", label: "🎭 Dramático" },
  { value: "honest", label: "🤫 Sincero" },
  { value: "casual", label: "😎 Casual" },
  { value: "persuasive", label: "🤔 Persuasivo" },
  { value: "creative", label: "🎨 Creativo" },
  { value: "passionate", label: "🔥 Apasionado" },
  { value: "informative", label: "📚 Informativo" }
] as const

export const EMPTY_FORMAT = {
  type: 'post-generator',
  format: '',
  value: ''
} as const

export const FORMAT_TEMPLATES_EN = [
  {
    type: 'post-generator',
    value: '0',
    format: `\
If you're in {x function}, study:

1. {skill 1}
2. {skill 2}
3. {skill 3}
4. {skill 4}
5. {skill 5}
6. {skill 6}
7. {skill 7}
8. {skill 8}
9. {skill 9}
10. {skill 10}

{X} is just {define x differently}.`,
  },
  {
    type: 'post-generator',
    value: '1',
    format: `\
"{X} has changed"

1. {before}
2. {before}
3. {before}

Exactly! It's a {what it is changed to}

1. {new}
2. {new}
3. {new}

Stop complaining and start "{the right thing}". This is the ${new Date().getFullYear()} way to {X}.`,
  },
  {
    type: 'post-generator',
    value: '2',
    format: `\
This is your reminder to do {X}. Be {y}.

{most popular question 1 in 8 words}

✅ {tip to overcome question 1 in 8 words}

{most popular question 2 in 8 words}

✅ {tip to overcome question 2 in 8 words}

{most popular question 3 in 8 words}

✅ {tip to overcome question 3 in 8 words}

{most popular question 4 in 6 words}

✅ {tip to overcome question 4 in 6 words}`,
  }
]
