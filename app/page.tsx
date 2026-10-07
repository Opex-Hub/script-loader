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
  const [activeScript, setActiveScript] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState('')
  const [lootUrl, setLootUrl] = useState<string | null>(null)
  const [isLoadingLoot, setIsLoadingLoot] = useState(false)

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toUTCString())
    updateTime()
    const interval = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(interval)
  }, [])

  async function openLootLabs(index: number) {
    setActiveScript(null)
    setIsLoadingLoot(true)
    setLootUrl(null)

    try {
      const response = await fetch('https://lootapp.ai/inapp?tid=1725338')
      if (response.status === 204 || !response.ok) return
      const data = await response.json()
      if (typeof data.ptr === 'string' && data.ptr) {
        setActiveScript(index)
        setLootUrl(data.ptr)
      }
    } catch {
      // Keep the script hidden if the LootLabs step is unavailable.
    } finally {
      setIsLoadingLoot(false)
    }
  }

  function continueToLootLabs() {
    if (!lootUrl) return
    const url = lootUrl.startsWith('//') ? `https:${lootUrl}` : lootUrl
    window.open(url, '_blank', 'noopener,noreferrer')
    setLootUrl(null)
  }

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

      <section className="scripts-panel" aria-label="Available scripts">
        <div className="script-tabs" role="tablist" aria-label="Choose a script">
          {scripts.map((script, index) => (
            <button
              className={`script-tab${activeScript === index ? ' active' : ''}`}
              id={`script-tab-${index}`}
              key={script.title}
              onClick={() => openLootLabs(index)}
              role="tab"
              aria-selected={activeScript === index}
              aria-controls={`script-panel-${index}`}
              type="button"
            >
              <span className="tab-number">0{index + 1}</span>
              {script.title}
            </button>
          ))}
        </div>

        {scripts.map((script, index) => (
          <article
            className="script-container"
            id={`script-panel-${index}`}
            key={script.title}
            role="tabpanel"
            aria-labelledby={`script-tab-${index}`}
            hidden={activeScript !== index}
          >
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

      {isLoadingLoot && (
        <div className="loot-overlay" role="status" aria-live="polite">
          <div className="loot-dialog">
            <span className="card-kicker">LOOTLABS</span>
            <h2>Preparing your script</h2>
            <p>Loading the access step for {scripts[activeScript ?? 0].title}.</p>
            <div className="loot-loader" aria-hidden="true" />
          </div>
        </div>
      )}

      {lootUrl && !isLoadingLoot && (
        <div className="loot-overlay" role="dialog" aria-modal="true" aria-labelledby="loot-title">
          <div className="loot-dialog">
            <span className="card-kicker">LOOTLABS ACCESS</span>
            <h2 id="loot-title">Continue to unlock</h2>
            <p>Complete the LootLabs step, then return here to use {scripts[activeScript].title}.</p>
            <div className="loot-actions">
              <button className="copy-btn" onClick={continueToLootLabs} type="button">Continue</button>
              <button className="loot-dismiss" onClick={() => { setLootUrl(null); setActiveScript(null) }} type="button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
