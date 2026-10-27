"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [lastPingTime, setLastPingTime] = useState(null);

  const testBackendConnection = async () => {
    setIsLoadingApi(true);
    const startTime = performance.now();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const elapsed = Math.round(performance.now() - startTime);
      setApiResponse({
        status: res.status,
        ok: res.ok,
        latency: `${elapsed}ms`,
        data: data,
        url: `${backendUrl}/api/health`,
      });
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setApiResponse({
        status: "Offline / CORS",
        ok: false,
        latency: `${elapsed}ms`,
        error: err.message,
        tip: "Backend is not running or unreachable from this browser session. Start it locally with: npm run dev:backend",
      });
    } finally {
      setIsLoadingApi(false);
      setLastPingTime(new Date().toLocaleTimeString());
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>⚡</div>
          <span>DemoApp • FullStack</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusPill} id="live-status-pill">
            <span className={styles.pulseDot}></span>
            <span>Vercel Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroTag}>Next.js + Express + Docker + CI/CD</div>
          <h1 className={styles.title}>
            Fullstack Pipeline <span className={styles.gradientText}>in Action</span>
          </h1>
          <p className={styles.subtitle}>
            Continuous deployment verified. Every push to the <code style={{ color: "#38bdf8" }}>master</code> branch is
            automatically tested, built, and shipped straight to production.
          </p>
        </section>

        {/* Metrics Grid */}
        <section className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Frontend</span>
              <span className={styles.metricIcon}>▲</span>
            </div>
            <div className={styles.metricValue}>Next.js 16</div>
            <div className={styles.metricDetail}>App Router • Vercel Edge Hosted</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Backend</span>
              <span className={styles.metricIcon}>⚙️</span>
            </div>
            <div className={styles.metricValue}>Express.js</div>
            <div className={styles.metricDetail}>Port 5000 • CORS Configured</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>CI / CD</span>
              <span className={styles.metricIcon}>🚀</span>
            </div>
            <div className={styles.metricValue}>GitHub Actions</div>
            <div className={styles.metricDetail}>Automated Lint & Production Deploy</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Containers</span>
              <span className={styles.metricIcon}>🐳</span>
            </div>
            <div className={styles.metricValue}>Docker Ready</div>
            <div className={styles.metricDetail}>Multi-stage builds supported</div>
          </div>
        </section>

        {/* Interactive Testing Console */}
        <section className={styles.consoleSection}>
          <div className={styles.consoleHeader}>
            <div className={styles.consoleTitleGroup}>
              <h2>Interactive Diagnostics Console</h2>
              <p>Test real-time client-side interactivity and backend connectivity.</p>
            </div>
          </div>

          <div className={styles.consoleGrid}>
            {/* Panel 1: Backend API Tester */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>
                <span>📡</span>
                <span>Express API Health Ping</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                Pings your Express backend endpoint <code style={{ color: "#38bdf8" }}>/api/health</code> to test cross-origin communication.
              </p>
              <div>
                <button
                  id="ping-api-btn"
                  className={styles.actionBtn}
                  onClick={testBackendConnection}
                  disabled={isLoadingApi}
                >
                  {isLoadingApi ? "Pinging Server..." : "Ping Backend API"}
                </button>
              </div>

              <div className={styles.responseBox} id="api-response-viewer">
                {apiResponse ? (
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <span style={{ color: "#64748b" }}>
                    Click &quot;Ping Backend API&quot; to inspect live response, status, and latency.
                  </span>
                )}
              </div>
              {lastPingTime && (
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  Last tested at: {lastPingTime}
                </span>
              )}
            </div>

            {/* Panel 2: React 19 State Counter */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>
                <span>⚛️</span>
                <span>React 19 Reactivity Test</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                Verify client-side hydration, event handling, and state management.
              </p>
              <div className={styles.counterWrap}>
                <div className={styles.btnGroup}>
                  <button
                    id="decrement-btn"
                    className={styles.circleBtn}
                    onClick={() => setCount((prev) => prev - 1)}
                    title="Decrement"
                  >
                    -
                  </button>
                  <button
                    id="increment-btn"
                    className={styles.circleBtn}
                    onClick={() => setCount((prev) => prev + 1)}
                    title="Increment"
                  >
                    +
                  </button>
                </div>
                <div className={styles.countDisplay} id="count-display">
                  {count}
                </div>
                <button
                  id="reset-btn"
                  className={styles.secondaryBtn}
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>
              <div style={{ marginTop: "auto", fontSize: "0.8rem", color: "#64748b" }}>
                Current state value: <strong>{count}</strong> • Rendering seamlessly via Next.js App Router
              </div>
            </div>
          </div>
        </section>

        {/* CI/CD Pipeline Steps Overview */}
        <section className={styles.pipelineSection}>
          <h2 className={styles.sectionHeading}>Your Active DevOps Workflow</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Step 1</span>
              <h3>Git Push</h3>
              <p>Commits to the <code>master</code> branch trigger the GitHub Actions runner.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Step 2</span>
              <h3>Quality Gate</h3>
              <p>Automated ESLint and syntax checks validate code integrity.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Step 3</span>
              <h3>Build Next.js</h3>
              <p>Vercel CLI compiles the production bundle and optimizes assets.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Step 4</span>
              <h3>Production Deploy</h3>
              <p>Artifacts are distributed across Vercel’s global Edge network.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>Fullstack Next.js & Express Monorepo • Deployed with GitHub Actions</div>
        <div>
          <a
            href="https://github.com/Akash-FD/demo-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
