import { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, Badge, Button } from '../components/ui'
import { WandSparkleIcon, SendIcon, BookIcon, CheckIcon } from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'

const SUGGESTED_PROMPTS = ['Explain this topic', 'Make me a study plan', 'Quiz me', 'Summarize my notes']

const MOCK_REPLIES = {
  'explain this topic':
    "Happy to help! Pick a topic from your Planner and I'll break it down step by step. (Sample response — real AI explanations are coming soon 🌱)",
  'make me a study plan':
    "Here's a sample plan: 45 min Calculus, 30 min Biology, then a 20 min English review. Once I'm fully connected, I'll tailor this to your real tasks!",
  'quiz me':
    "Sample quiz question: what's the derivative of x²? (Real personalized quizzes are coming soon — this is just a preview!)",
  'summarize my notes':
    "I'd summarize your uploaded notes right here. Note uploads and real summarization are coming soon 🌸",
}

const FALLBACK_REPLY =
  "That's a great question! I'm still learning — real AI-powered answers are coming soon. For now, this is a sample response. 🌱"

const CAPABILITIES = [
  'Explain tricky topics in plain language',
  'Build a personalized study plan',
  'Quiz you before an exam',
  'Summarize your notes',
]

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi Asmita! I'm your AI Sensei 🌸 Ask me anything about your studies, or try one of the prompts below.",
  },
  { id: 2, role: 'user', text: 'Can you make me a study plan for this week?' },
  {
    id: 3,
    role: 'assistant',
    text: "Sure! Based on your tasks, I'd suggest 45 min of Calculus and 30 min of Biology today, then balance English and History across the week. Want me to add these to your Planner?",
  },
]

function getMockReply(text) {
  return MOCK_REPLIES[text.trim().toLowerCase()] ?? FALLBACK_REPLY
}

function ChatBubble({ role, text }) {
  const isAssistant = role === 'assistant'
  return (
    <div className={['flex items-end gap-2', isAssistant ? 'justify-start' : 'justify-end'].join(' ')}>
      {isAssistant && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse">
          <WandSparkleIcon size={14} />
        </span>
      )}
      <div
        className={[
          'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isAssistant
            ? 'rounded-bl-sm bg-surface text-text'
            : 'rounded-br-sm bg-primary text-text-inverse',
        ].join(' ')}
      >
        {text}
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse">
        <WandSparkleIcon size={14} />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.2s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.1s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint" />
      </div>
    </div>
  )
}

export function AiSensei() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: getMockReply(trimmed) },
      ])
      setIsTyping(false)
    }, 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-primary/20 blur-3xl"
        />
        <Card
          variant="elevated"
          padding="lg"
          className="relative overflow-hidden border-primary-soft/60 bg-gradient-to-br from-primary-softer via-bg-elevated to-primary-soft"
        >
          <PetalShape className="pointer-events-none absolute -top-2 right-12 h-12 w-12 rotate-12 text-primary/25" />
          <PetalShape className="pointer-events-none absolute bottom-3 left-8 hidden h-8 w-8 -rotate-12 text-primary-strong/20 sm:block" />

          <div className="relative flex flex-wrap items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-strong">Your friendly study guide</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">AI Sensei 🌸</h1>
              <p className="mt-1 max-w-md text-text-muted">
                Ask questions, build a plan, or get quizzed — all in one cozy chat.
              </p>
            </div>
            <Badge variant="streak" icon={WandSparkleIcon}>
              Preview · sample responses
            </Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* chat */}
        <Card padding="none" className="flex flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse">
              <WandSparkleIcon size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold text-text">Sensei</p>
              <p className="truncate text-xs text-text-muted">Sample mode · not connected to live AI</p>
            </div>
          </div>

          <div className="flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role} text={m.text} />
            ))}
            {isTyping && <TypingBubble />}
            <div ref={bottomRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border p-3">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary-strong"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Sensei anything…"
              className="min-w-0 flex-1 rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              icon={SendIcon}
              disabled={!input.trim() || isTyping}
              className="!px-3.5"
              aria-label="Send message"
            />
          </form>
        </Card>

        {/* sidebar */}
        <div className="flex flex-col gap-6">
          <Card variant="outline" className="relative overflow-hidden border-primary-soft">
            <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
                <WandSparkleIcon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold text-text">AI-powered guidance is on its way</p>
                <p className="text-sm text-text-muted">
                  Sensei will soon connect to real AI to explain topics, build custom plans, and quiz you
                  personally. For now, enjoy this sample preview!
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="What Sensei can help with" icon={BookIcon} />
            <ul className="flex flex-col gap-2.5">
              {CAPABILITIES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green-strong">
                    <CheckIcon size={10} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
