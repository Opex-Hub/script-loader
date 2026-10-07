'use client'

import { useEffect, useState } from 'react'

const scripts = [
  {
    title: 'Blox Fruit Script',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/flazhy/QuantumOnyx/refs/heads/main/QuantumOnyx.lua"))()',
  },
  {
    title: 'Steal an Egg Script',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/PulseZax/Loader/refs/heads/main/.lua"))()',
  },
]

export default function Page() {
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toUTCString())
    updateTime()
    const interval = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(interval)
  }, [])

  async function copyScript(title: string, code: string) {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedTitle(title)
      window.setTimeout(() => setCopiedTitle(null), 2000)
    } catch {
      setCopiedTitle(null)
    }
  }

  return (
    <main className="page-shell">
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />

      <header className="hero">
        <div className="eyebrow"><span /> OPEX HUB <span /></div>
        <h1>Script Loader</h1>
        <p>Quick access to the latest scripts and tools.</p>
      </header>

      <section className="scripts-grid" aria-label="Available scripts">
        {scripts.map((script) => (
          <article className="script-container" key={script.title}>
            <div className="card-heading">
              <div className="script-icon" aria-hidden="true">&lt;/&gt;</div>
              <div>
                <p className="card-kicker">SCRIPT RESOURCE</p>
                <h2 className="script-title">{script.title}</h2>
              </div>
              <span className="status-pill"><span /> Active</span>
            </div>
            <div className="script-content">
              <code>{script.code}</code>
              <button className="copy-btn" onClick={() => copyScript(script.title, script.code)} type="button">
                {copiedTitle === script.title ? 'Copied' : 'Copy Script'}
              </button>
            </div>
          </article>
        ))}
      </section>

      <p className="current-time" aria-live="polite">{currentTime}</p>

      <section className="info-card coming-soon">
        <div className="section-icon" aria-hidden="true">✦</div>
        <p className="card-kicker">ON THE WAY</p>
        <h2>More Features Coming Soon</h2>
        <p>We&apos;re working hard to bring you more amazing scripts and tools.</p>
        <ul>
          <li>New script releases</li>
          <li>Enhanced functionality</li>
          <li>Improved user experience</li>
        </ul>
      </section>

      <section className="info-card opex-section">
        <div className="section-icon" aria-hidden="true">↗</div>
        <p className="card-kicker">EXPLORE MORE</p>
        <h2>OPEX Hub Script</h2>
        <p>If you want to use the OPEX Hub script, get it here:</p>
        <a href="https://opex_.oneapp.dev/" target="_blank" rel="noreferrer" className="opex-link">Open OPEX Hub <span aria-hidden="true">↗</span></a>
      </section>

      <footer>OPEX HUB <span>•</span> Script Loader</footer>
    </main>
  )
}
