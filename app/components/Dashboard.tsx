"use client";

import { useEffect, useMemo, useState } from "react";
import { StateCode, stateProfiles, STORAGE_KEYS } from "../lib/dmv-data";

type Attempt = { state: StateCode; correct: number; total: number; date: string };

export function Dashboard() {
  const [selected, setSelected] = useState<StateCode>("CA");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [stateSearch, setStateSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.selectedState) as StateCode | null;
    if (saved && stateProfiles.some((item) => item.code === saved)) setSelected(saved);
    try {
      setAttempts(JSON.parse(localStorage.getItem(STORAGE_KEYS.attempts) || "[]"));
      setMistakeCount(JSON.parse(localStorage.getItem(STORAGE_KEYS.mistakes) || "[]").length);
    } catch {
      setAttempts([]);
    }
  }, []);

  const chooseState = (code: StateCode) => {
    setSelected(code);
    localStorage.setItem(STORAGE_KEYS.selectedState, code);
  };

  const stats = useMemo(() => {
    const total = attempts.reduce((sum, item) => sum + item.total, 0);
    const correct = attempts.reduce((sum, item) => sum + item.correct, 0);
    return {
      tests: attempts.length,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    };
  }, [attempts]);

  const selectedProfile = stateProfiles.find((item) => item.code === selected)!;
  const searchResults = useMemo(() => {
    const query = stateSearch.trim().toLowerCase();
    if (!query) return [];
    return stateProfiles.filter((profile) =>
      profile.code.toLowerCase().includes(query) ||
      profile.name.toLowerCase().includes(query) ||
      profile.englishName.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [stateSearch]);

  return (
    <main>
      <section className="drive-hero">
        <div className="sky-sun" aria-hidden="true" />
        <div className="cloud cloud-one" aria-hidden="true"><i /><i /></div>
        <div className="cloud cloud-two" aria-hidden="true"><i /><i /></div>
        <div className="cloud cloud-three" aria-hidden="true"><i /><i /></div>
        <div className="hill hill-one" aria-hidden="true" />
        <div className="hill hill-two" aria-hidden="true" />
        <div className="animated-road" aria-hidden="true"><div className="lane-markings" /></div>
        <div className="race-car race-one" aria-hidden="true"><span>🏎️</span><i /></div>
        <div className="race-car race-two" aria-hidden="true"><span>🏎️</span><i /></div>
        <div className="hero-content shell">
          <h1>先选对州，<br /><em>再练对题。</em></h1>
          <p className="hero-copy">每个州的考试规则都不一样。选择你要申请 Permit 的州，开始一场贴近当地手册的双语模拟考试。</p>
          <a className="hero-cta" href="#state-heading">选择考试州 <span>↓</span></a>
        </div>
      </section>

      <section className="state-section shell" aria-labelledby="state-heading">
        <div className="section-heading">
          <div>
            <span className="step-kicker">STEP 01</span>
            <h2 id="state-heading">你在哪个州考试？</h2>
          </div>
          <p>覆盖美国 50 州与华盛顿特区。先选择所在地，再进入对应练习。</p>
        </div>
        <div className="state-picker">
          <div className="state-controls">
            <label className="search-block">
              <span>搜索州 / 地区</span>
              <div><i aria-hidden="true">⌕</i><input value={stateSearch} onChange={(event) => setStateSearch(event.target.value)} placeholder="输入 CA、加州或 California" /></div>
            </label>
            <label className="select-block">
              <span>或浏览全部</span>
              <select value={selected} onChange={(event) => chooseState(event.target.value as StateCode)}>
                {stateProfiles.map((profile) => <option key={profile.code} value={profile.code}>{profile.name} · {profile.englishName} ({profile.code})</option>)}
              </select>
            </label>
            {stateSearch && <div className="search-results">
              {searchResults.length ? searchResults.map((profile) => (
                <button key={profile.code} onClick={() => { chooseState(profile.code); setStateSearch(""); }}><b>{profile.code}</b><span>{profile.name}<small>{profile.englishName}</small></span><i>→</i></button>
              )) : <p>没有找到匹配的州，请检查拼写。</p>}
            </div>}
          </div>
          <article className="selected-state-card" style={{ "--state-accent": selectedProfile.accent } as React.CSSProperties}>
            <span className="state-code">{selectedProfile.code}</span>
            <div>
              <span className={`library-status ${selectedProfile.curated ? "curated" : "core"}`}>{selectedProfile.curated ? "州专属题库" : "通用核心题库"}</span>
              <h3>{selectedProfile.name}</h3>
              <small>{selectedProfile.englishName} · {selectedProfile.agency}</small>
              <p>{selectedProfile.note}</p>
              <b>{selectedProfile.officialPassRule}</b>
            </div>
          </article>
          <div className="popular-states">
            <span>快速选择</span>
            {(["CA", "NY", "FL", "TX", "NJ", "WA"] as StateCode[]).map((code) => {
              const profile = stateProfiles.find((item) => item.code === code)!;
              return <button key={code} className={selected === code ? "active" : ""} onClick={() => chooseState(code)}>{code} · {profile.name.replace("州", "")}</button>;
            })}
          </div>
        </div>
        <div className="start-strip">
          <div>
            <span>当前选择</span>
            <strong><i style={{ background: selectedProfile.accent }} />{selectedProfile.name}</strong>
          </div>
          <div className="start-meta"><span>20 道模拟题</span><span>约 15 分钟</span><span>自动收集错题</span></div>
          <div className="start-actions">
            <a className="important-button" href={`/exam?state=${selected}&mode=important`}><b>★</b> 重要题型</a>
            <a className="primary-button" href={`/exam?state=${selected}`}>完整模拟考试 <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="dashboard-band">
        <div className="shell dash-grid">
          <div>
            <span className="step-kicker light">YOUR PROGRESS</span>
            <h2>每一次练习，<br />都让你更接近上路。</h2>
          </div>
          <div className="stat"><strong>{stats.tests}</strong><span>已完成考试</span></div>
          <div className="stat"><strong>{stats.accuracy}<sup>%</sup></strong><span>累计正确率</span></div>
          <div className="stat accent-stat"><strong>{mistakeCount}</strong><span>待攻克错题</span><a href="/mistakes">进入错题本 →</a></div>
        </div>
      </section>

      <section className="how shell">
        <div className="section-heading">
          <div><span className="step-kicker">HOW IT WORKS</span><h2>三步练到会</h2></div>
          <p>成绩和错题只保存在当前设备，不需要注册。</p>
        </div>
        <div className="how-grid">
          <article><b>01</b><span>选择考试州</span><p>覆盖 50 州与华盛顿特区；已核对的州提供专属题库，其余州提供核心安全题与官方入口。</p></article>
          <article><b>02</b><span>选择练习模式</span><p>完成整套模拟，或用“重要题型”集中练习关键安全规则。</p></article>
          <article><b>03</b><span>专练薄弱题</span><p>答错的题自动进入错题本，答对后可从清单移除。</p></article>
        </div>
      </section>
    </main>
  );
}
