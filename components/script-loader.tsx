'use client'

import { useEffect, useState } from 'react'
import { Check, Clock3, Copy, ExternalLink, KeyRound, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const scripts = [
  {
    name: 'Blox Fruit Script',
    description: 'Quantum Onyx loader',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/flazhy/QuantumOnyx/refs/heads/main/QuantumOnyx.lua"))()',
  },
  {
    name: 'Steal an Egg Script',
    description: 'PulseZax loader',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/PulseZax/Loader/refs/heads/main/.lua"))()',
  },
]

function ScriptCard({ name, description, code }: (typeof scripts)[number]) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <article className="script-card">
      <div className="card-heading">
        <div className="script-icon"><KeyRound aria-hidden="true" /></div>
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <span className="active-badge"><span />Active</span>
      </div>
      <div className="code-panel">
        <code>{code}</code>
      </div>
      <Button onClick={copyCode} className="copy-button" variant="secondary">
        {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
        {copied ? 'Copied to clipboard' : 'Copy script'}
      </Button>
    </article>
  )
}

export function ScriptLoader() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toUTCString())
    updateTime()
    const timer = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="loader-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="loader-content">
        <header className="hero">
          <div className="eyebrow"><Sparkles aria-hidden="true" /> OPEX COMMUNITY</div>
          <h1>Script <span>Loader</span></h1>
          <p>Quick access to the latest community scripts, all in one place.</p>
        </header>

        <section className="scripts-grid" aria-label="Available scripts">
          {scripts.map((script) => <ScriptCard key={script.name} {...script} />)}
        </section>

        <p className="time-stamp"><Clock3 aria-hidden="true" /> {currentTime || 'Loading time...'}</p>

        <section className="info-card">
          <div className="info-icon"><Sparkles aria-hidden="true" /></div>
          <div>
            <h2>More features coming soon</h2>
            <p>We're working hard to bring you more useful scripts and tools.</p>
            <div className="feature-list"><span>New releases</span><span>Enhanced functionality</span><span>Better experience</span></div>
          </div>
        </section>

        <section className="hub-card">
          <div>
            <p className="eyebrow">FEATURED HUB</p>
            <h2>OPEX Hub Script</h2>
            <p>Want to explore the full OPEX Hub? Visit the official page.</p>
          </div>
          <Button asChild className="hub-button">
            <a href="https://opex_.oneapp.dev/" target="_blank" rel="noreferrer">Open OPEX Hub <ExternalLink data-icon="inline-end" /></a>
          </Button>
        </section>

        <footer>Use scripts responsibly and only in experiences where you have permission.</footer>
      </div>
    </main>
  )
}

export default ScriptLoader
