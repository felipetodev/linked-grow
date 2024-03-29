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
  value: '',
  tag: 'all'
} as const

export const FORMAT_TEMPLATES_EN = [
  {
    type: 'post-generator',
    value: '0',
    tag: 'all',
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
    tag: 'all',
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
    tag: 'all',
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
  },
  {
    type: 'post-generator',
    value: '3',
    tag: 'stories',
    format: `\
This 1 mindset shift changed everything for me as an {x}.

When I started my {x}, I focused on:

- {focus 1}
- {focus 2}
- {focus 3}

I did this for 5-6 months when I started, and I was burned out. It was mentally draining. 

Not because I wasn’t working hard.

It was because I was doing so many things, and they all were very different.

The best way is to focus on 1 thing at a time and give your best.

I was focusing on the wrong things.

Now, I am focusing on:`
  },
  {
    type: 'post-generator',
    value: '4',
    tag: 'learnings',
    format: `\
I’ve got {achievement in numbers}, but {x} was the hardest.

When I started {x}, I had:
1. 
2.
3.
4. 

And that was the best part.

{share why it was the best part}

But one thing I had was My love and passion for {x}

Here’s what I did:
1. 
2. 
3. 
4. 
5.`
  },
  {
    type: 'post-generator',
    value: '5',
    tag: 'expertise',
    format: `\
{x} is not just about {x} and {x}.

It’s about:
- {soft skill 1}
- {soft skill 2}
- {soft skill 3}
- {soft skill 4}
 
When I started {x}, it was about sharing what I was learning.
 
It’s also about transforming myself into a more disciplined person and following good habits.

{customer testomonial}
 
For me, this is what {x} is.
 
Not {vanity metric 1}
Not {vanity metric 2}
Not {vanity metric 3}
Not {vanity metric 4}
 
But that {real impact}.
 
When people start recognizing you for your {x} – this is {x}.`
  },
  {
    type: 'post-generator',
    value: '6',
    tag: 'learnings',
    format: `\
Exactly {time} ago, I started {X}. So, here's my {x} wrapped: 


> {highlight 1}
> {highlight 2}
> {highlight 3}
> {highlight 4}
> {highlight 5}
> {highlight 6}
> {highlight 7}

I am sure I am missing out on a few things, but these were the key highlights. 

{x} will always be special. 

Can't wait to see what {X} has in store.`
  },
  {
    type: 'post-generator',
    value: '7',
    tag: 'expertise',
    format: `\
I went from {x} to {X} in a year but grew from {x} to {x} in less than {X}.

How?
I changed my {x}.

If you look at my {previous} {x} ago, {mistake}. {what I am doing now}

Here’s what I do broadly:

1. {thing I do now}
{short explanation}

2. {thing I do now}
{short explanation}

3. {thing I do now}
{short explanation}

4. {thing I do now}
{short explanation}`
  },
  {
    type: 'post-generator',
    value: '8',
    tag: 'celebrate',
    format: `\
{x} lessons I've learned in {x} years of my {x} journey.

I'm excited to share that I've completed {x} years.

It's been an extraordinary ride filled with ups and downs, but I'm grateful for every experience that has shaped me along the way.

Here are {x} lessons:



Thank you all for your continuous support and encouragement. 

Here's to even more exciting adventures ahead!`
  }
]
