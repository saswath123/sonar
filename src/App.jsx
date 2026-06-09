import { useState } from 'react'
import { Rocket, ShieldCheck, Zap, Server, ChevronRight } from 'lucide-react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Rocket size={64} className="hero-icon" />
      <h1>Deploy Faster.</h1>
      <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Welcome to the AI world!</h2>
      <p>
        Experience the power of automated CI/CD pipelines, seamless SonarQube integration, 
        and flawless deployment. Build with confidence.
      </p>

      <button className="action-btn" onClick={() => setCount((count) => count + 1)}>
        Deployments Triggered: {count} <ChevronRight size={20} />
      </button>

      <div className="feature-grid">
        <div className="feature-card">
          <Zap size={32} className="feature-icon" />
          <span className="feature-title">Fast Builds</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Vite-powered React</span>
        </div>
        <div className="feature-card">
          <ShieldCheck size={32} className="feature-icon" />
          <span className="feature-title">Code Quality</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>SonarQube Checks</span>
        </div>
        <div className="feature-card">
          <Server size={32} className="feature-icon" />
          <span className="feature-title">Automated CD</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>GitHub Actions</span>
        </div>
      </div>
    </div>
  )
}

export default App
