"use client";

import { useEffect, useMemo, useState } from "react";
import { englishForQuestion, questions, StateCode, stateProfiles, STORAGE_KEYS } from "../lib/dmv-data";

export function MistakePractice() {
  const [ids, setIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<StateCode | "ALL">("ALL");
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [language, setLanguage] = useState<"zh" | "en">("zh");

  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem(STORAGE_KEYS.mistakes) || "[]")); } catch { setIds([]); }
  }, []);

  const mistakes = useMemo(() => questions.filter((q) => ids.includes(q.id) && (filter === "ALL" || q.state === filter)), [ids, filter]);
  const current = mistakes[Math.min(active, Math.max(mistakes.length - 1, 0))];

  const removeCurrent = () => {
    if (!current) return;
    const next = ids.filter((id) => id !== current.id);
    setIds(next);
    localStorage.setItem(STORAGE_KEYS.mistakes, JSON.stringify(next));
    setChoice(null);
    if (active >= mistakes.length - 1) setActive(Math.max(0, active - 1));
  };

  const chooseFilter = (value: StateCode | "ALL") => {
    setFilter(value);
    setActive(0);
    setChoice(null);
  };

  return (
    <main className="mistake-page shell">
      <div className="mistake-hero">
        <div><span className="step-kicker">MISTAKE REVIEW</span><h1>错题不是终点，<br /><em>是最短的复习清单。</em></h1></div>
        <div className="mistake-count"><strong>{ids.length}</strong><span>道待攻克错题</span></div>
      </div>

      <div className="filter-row" aria-label="按州筛选">
        <button className={filter === "ALL" ? "active" : ""} onClick={() => chooseFilter("ALL")}>全部</button>
        <label>按州筛选
          <select value={filter} onChange={(event) => chooseFilter(event.target.value as StateCode | "ALL")}>
            <option value="ALL">全部州</option>
            {stateProfiles.map((profile) => <option key={profile.code} value={profile.code}>{profile.code} · {profile.name}</option>)}
          </select>
        </label>
        <div className="language-switch review-language" role="group" aria-label="试题语言">
          <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>English</button>
        </div>
      </div>

      {!current ? (
        <section className="empty-state">
          <div className="empty-icon"><span>✓</span></div>
          <span className="step-kicker">ALL CLEAR</span>
          <h2>{ids.length ? "这个州暂时没有错题" : "错题本还是空的"}</h2>
          <p>{ids.length ? "切换到“全部”看看其他州，或开始新一轮模拟考试。" : "完成一次模拟考试后，答错和未答的题会自动出现在这里。"}</p>
          <a href="/" className="primary-button">选择州并开始考试 <span>→</span></a>
        </section>
      ) : (
        <section className="review-card">
          <div className="review-meta"><span>{current.state} · {current.category}</span><b>{active + 1} / {mistakes.length}</b></div>
          <h2>{language === "en" ? englishForQuestion(current).prompt : current.prompt}</h2>
          <div className="options review-options">
            {(language === "en" ? englishForQuestion(current).options : current.options).map((option, i) => {
              const revealed = choice !== null;
              const className = revealed && i === current.answer ? "correct" : revealed && i === choice ? "wrong" : choice === i ? "selected" : "";
              return <button key={option} className={className} disabled={revealed} onClick={() => setChoice(i)}><span>{String.fromCharCode(65 + i)}</span><b>{option}</b><i /></button>;
            })}
          </div>
          {choice !== null && (
            <div className={`explanation ${choice === current.answer ? "right" : "wrong"}`}>
              <strong>{choice === current.answer ? "回答正确" : "再看一次正确答案"}</strong>
              <p>{language === "en" ? englishForQuestion(current).explanation : current.explanation}</p>
            </div>
          )}
          <div className="review-actions">
            <button className="nav-button" disabled={active === 0} onClick={() => { setActive(active - 1); setChoice(null); }}>← 上一题</button>
            <div>
              {choice === current.answer && <button className="mastered-button" onClick={removeCurrent}>✓ 我已掌握，移出错题本</button>}
              <button className="primary-button compact" onClick={() => { setActive((active + 1) % mistakes.length); setChoice(null); }}>下一题 →</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
