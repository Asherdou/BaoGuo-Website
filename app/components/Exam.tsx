"use client";

import { useEffect, useMemo, useState } from "react";
import { englishForQuestion, importantQuestionsForState, profileForState, questionsForState, STATE_CODES, StateCode, STORAGE_KEYS } from "../lib/dmv-data";

type Result = { correct: number; total: number } | null;

export function Exam() {
  const [state, setState] = useState<StateCode>("CA");
  const [importantMode, setImportantMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [result, setResult] = useState<Result>(null);
  const [language, setLanguage] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("state") as StateCode | null;
    const saved = localStorage.getItem(STORAGE_KEYS.selectedState) as StateCode | null;
    const next = requested && STATE_CODES.includes(requested) ? requested : saved || "CA";
    setState(next);
    setImportantMode(params.get("mode") === "important");
    localStorage.setItem(STORAGE_KEYS.selectedState, next);
  }, []);

  const profile = profileForState(state);
  const examQuestions = useMemo(() => importantMode ? importantQuestionsForState(state) : questionsForState(state), [importantMode, state]);
  const current = examQuestions[index];
  const answered = Object.keys(answers).length;

  const finish = () => {
    const wrong = examQuestions.filter((q) => answers[q.id] !== q.answer);
    const correct = examQuestions.length - wrong.length;
    const nextResult = { correct, total: examQuestions.length };
    setResult(nextResult);
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.mistakes) || "[]") as string[];
      localStorage.setItem(STORAGE_KEYS.mistakes, JSON.stringify([...new Set([...existing, ...wrong.map((q) => q.id)])]));
      const attempts = JSON.parse(localStorage.getItem(STORAGE_KEYS.attempts) || "[]");
      attempts.unshift({ state, correct, total: examQuestions.length, date: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.attempts, JSON.stringify(attempts.slice(0, 30)));
    } catch { /* local storage may be unavailable */ }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers({});
    setFlagged([]);
    setIndex(0);
    setResult(null);
  };

  if (result) {
    const percent = Math.round((result.correct / result.total) * 100);
    const passed = percent >= (state === "NY" ? 70 : 80);
    return (
      <main className="exam-shell shell result-page">
        <div className={`result-badge ${passed ? "pass" : "retry"}`}>{passed ? "PASS" : "KEEP GOING"}</div>
        <p className="eyebrow"><span /> {profile.name} · 模拟成绩</p>
        <h1>{passed ? "这次状态很好。" : "再练一轮，就更稳。"}</h1>
        <div className="score-ring" style={{ "--score": `${percent * 3.6}deg` } as React.CSSProperties}>
          <div><strong>{percent}<sup>%</sup></strong><span>{result.correct} / {result.total} 答对</span></div>
        </div>
        <p className="result-copy">{passed ? "你达到了本模拟卷采用的及格线。继续复习错题，可以把偶然答对变成真正掌握。" : "错题已经自动加入错题本。先看解析，再针对薄弱题练习。"}</p>
        <div className="result-actions">
          <a className="primary-button" href="/mistakes">练习错题 <span>→</span></a>
          <button className="secondary-button" onClick={restart}>重新考试</button>
          <a className="text-link" href="/">更换州</a>
        </div>
        <div className="result-list">
          <h2>本次答题回顾</h2>
          {examQuestions.map((q, i) => {
            const isCorrect = answers[q.id] === q.answer;
            const english = englishForQuestion(q);
            const reviewPrompt = language === "en" ? english.prompt : q.prompt;
            const reviewOptions = language === "en" ? english.options : q.options;
            return <article key={q.id} className={isCorrect ? "correct" : "wrong"}>
              <span>{isCorrect ? "✓" : "×"}</span>
              <div><b>{i + 1}. {reviewPrompt}</b><p>{isCorrect ? (language === "en" ? "Correct" : "回答正确") : `${language === "en" ? "Correct answer" : "正确答案"}：${reviewOptions[q.answer]}`}</p></div>
            </article>;
          })}
        </div>
      </main>
    );
  }

  return (
    <main className="exam-shell shell">
      <div className="exam-topbar">
        <div>
          <span className="step-kicker">{importantMode ? "ESSENTIAL TEST" : "PRACTICE TEST"}</span>
          <h1>{profile.name} · {importantMode ? "重要题型测试" : "Permit 模拟考试"}</h1>
        </div>
        <div className="exam-controls">
          <div className="language-switch" role="group" aria-label="试题语言">
            <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>English</button>
          </div>
          <a href="/" className="state-switch"><i style={{ background: profile.accent }} />{state} · 更换州</a>
        </div>
      </div>

      <div className="exam-layout">
        <aside className="question-nav">
          <div className="progress-copy"><span>答题进度</span><b>{answered}/{examQuestions.length}</b></div>
          <div className="progress-track"><i style={{ width: `${(answered / examQuestions.length) * 100}%` }} /></div>
          <div className="question-dots">
            {examQuestions.map((q, i) => (
              <button key={q.id} onClick={() => setIndex(i)} className={`${i === index ? "current" : ""} ${answers[q.id] !== undefined ? "done" : ""} ${flagged.includes(q.id) ? "flagged" : ""}`}>{i + 1}</button>
            ))}
          </div>
          <div className="legend"><span><i className="done" /> 已作答</span><span><i className="flagged" /> 待确认</span></div>
          <a className="manual-link" href={profile.handbookUrl} target="_blank" rel="noreferrer">查看 {profile.agency} 官方手册 ↗</a>
        </aside>

        <section className="question-panel">
          <div className="question-meta"><span>QUESTION {String(index + 1).padStart(2, "0")}</span><b>{importantMode ? `★ 重要题型 · ${current.category}` : current.category}</b></div>
          <h2>{language === "en" ? englishForQuestion(current).prompt : current.prompt}</h2>
          <div className="options" role="radiogroup" aria-label="答案选项">
            {(language === "en" ? englishForQuestion(current).options : current.options).map((option, optionIndex) => (
              <button
                key={option}
                role="radio"
                aria-checked={answers[current.id] === optionIndex}
                className={answers[current.id] === optionIndex ? "selected" : ""}
                onClick={() => setAnswers({ ...answers, [current.id]: optionIndex })}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span><b>{option}</b><i aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="question-actions">
            <button className={`flag-button ${flagged.includes(current.id) ? "active" : ""}`} onClick={() => setFlagged(flagged.includes(current.id) ? flagged.filter((id) => id !== current.id) : [...flagged, current.id])}>⚑ {flagged.includes(current.id) ? "已标记待确认" : "标记待确认"}</button>
            <div>
              <button className="nav-button" disabled={index === 0} onClick={() => setIndex(index - 1)}>← 上一题</button>
              {index < examQuestions.length - 1 ? (
                <button className="primary-button compact" onClick={() => setIndex(index + 1)}>下一题 →</button>
              ) : (
                <button className="primary-button compact" onClick={finish}>提交考试 →</button>
              )}
            </div>
          </div>
          {index === examQuestions.length - 1 && answered < examQuestions.length && <p className="unanswered-note">还有 {examQuestions.length - answered} 题未作答；提交后未答题会按错题记录。</p>}
        </section>
      </div>
      <p className="disclaimer">{importantMode && "“重要题型”是按安全影响与常见知识点整理的重点练习，并不代表官方考试权重。"} 本网站为学习工具，不隶属于任何州 DMV；模拟题并非官方原题。州规则可能更新，请以官方手册为准。</p>
    </main>
  );
}
