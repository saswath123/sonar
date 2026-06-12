import { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Clock, RefreshCw, GitCommit, Rocket } from 'lucide-react';
import './App.css';

function App() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRuns = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/saswath123/sonar/actions/runs');
      if (!response.ok) throw new Error('Failed to fetch API');
      const data = await response.json();
      setRuns(data.workflow_runs.slice(0, 5));
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
    const interval = setInterval(fetchRuns, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status, conclusion) => {
    if (status !== 'completed') return <RefreshCw className="icon-spin text-blue" size={20} />;
    if (conclusion === 'success') return <CheckCircle className="text-green" size={20} />;
    return <XCircle className="text-red" size={20} />;
  };

  const getStatusClass = (status, conclusion) => {
    if (status !== 'completed') return 'status-progress';
    if (conclusion === 'success') return 'status-success';
    return 'status-error';
  };

  const calculateSuccessRate = () => {
    if (!runs.length) return 0;
    const completed = runs.filter(r => r.status === 'completed');
    if (!completed.length) return 0;
    const successes = completed.filter(r => r.conclusion === 'success').length;
    return Math.round((successes / completed.length) * 100);
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="header-title">
          <Activity size={32} className="text-primary" />
          <h1>Real-Time CI/CD Dashboard</h1>
        </div>
        <p className="subtitle">AI-Enhanced Deployment Tracker</p>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-title">Success Rate</span>
          <span className="metric-value">{calculateSuccessRate()}%</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Recent Deployments</span>
          <span className="metric-value">{runs.length}</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Last Updated</span>
          <span className="metric-value text-small">{lastUpdated || '...'}</span>
        </div>
      </div>

      <div className="pipelines-container">
        <div className="pipelines-header">
          <h2>Latest Pipeline Runs</h2>
          {loading && <RefreshCw className="icon-spin" size={20} />}
        </div>
        
        {error && <div className="error-message">Error: {error}</div>}

        <div className="pipeline-list">
          {runs.map((run) => (
            <div key={run.id} className={`pipeline-item ${getStatusClass(run.status, run.conclusion)}`}>
              <div className="pipeline-info">
                <div className="pipeline-name">{run.name}</div>
                <div className="pipeline-meta">
                  <GitCommit size={14} /> 
                  <span>{run.head_commit?.message?.substring(0, 30) || 'Manual Trigger'}...</span>
                </div>
              </div>
              <div className="pipeline-status">
                <div className="status-badge">
                  {getStatusIcon(run.status, run.conclusion)}
                  <span className="status-text">
                    {run.status === 'completed' ? run.conclusion : run.status}
                  </span>
                </div>
                <div className="pipeline-time">
                  <Clock size={14} />
                  {new Date(run.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-promo">
        <Rocket size={20} className="text-primary" />
        <span>Welcome to the AI world! Demonstrating real-world solutions.</span>
      </div>
    </div>
  );
}

export default App;
