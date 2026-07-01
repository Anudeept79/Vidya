import { useState, useEffect } from 'react'
import { EXAMS, SUBJECTS, SYLLABUS, NOTES, QUIZ, BOOKS, FREE_LINKS, PYQ, PLAN } from './data.js'

const NAV = [
  ['home', 'Home'], ['syllabus', 'Syllabus'], ['books', 'Books'],
  ['practice', 'Practice'], ['pyq', 'Past Papers'], ['current', 'Current Affairs'],
  ['builder', 'Study Builder'], ['plan', 'Plan & Tracker']
]

function useProgress() {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vk_progress') || '{}') } catch { return {} }
  })
  useEffect(() => {
    try { localStorage.setItem('vk_progress', JSON.stringify(progress)) } catch {}
  }, [progress])
  const toggle = (id) => setProgress(p => ({ ...p, [id]: !p[id] }))
  return [progress, toggle]
}

function ExamTabs({ exam, setExam }) {
  return (
    <div className="exam-tabs">
      {Object.entries(EXAMS).map(([k, v]) => (
        <button key={k} className={k === exam ? 'active' : ''} onClick={() => setExam(k)}>{v.label}</button>
      ))}
    </div>
  )
}

function Quiz({ bank }) {
  const [answered, setAnswered] = useState({})
  return (
    <>
      {bank.map((item, qi) => {
        const done = answered[qi] !== undefined
        return (
          <div className="quiz-q" key={qi}>
            <div className="qn">{qi + 1}. {item.q}</div>
            {item.o.map((o, oi) => {
              let cls = 'opt'
              if (done && oi === item.a) cls += ' correct'
              if (done && answered[qi] === oi && oi !== item.a) cls += ' wrong'
              return (
                <button key={oi} className={cls}
                  onClick={() => !done && setAnswered(a => ({ ...a, [qi]: oi }))}>
                  {String.fromCharCode(65 + oi)}. {o}
                </button>
              )
            })}
            {done && <div className="explain">{item.e}</div>}
          </div>
        )
      })}
    </>
  )
}

function SubjectDetail({ id, onBack, progress, toggle, goPractice }) {
  const s = SUBJECTS.find(x => x.id === id)
  const note = NOTES[id]
  return (
    <>
      <div style={{ margin: '18px 0 6px' }}><button className="back" onClick={onBack}>← All subjects</button></div>
      <div className="reader">
        <div className="banner">
          <div className="kick">{note ? note.kicker : 'Syllabus'}</div>
          <h2>{note ? note.title : s.name}</h2>
        </div>
        <div className="body">
          {note
            ? <div dangerouslySetInnerHTML={{ __html: note.html }} />
            : <><p>{s.blurb}</p><h3>Syllabus map</h3><ul>{(SYLLABUS[id] || []).map((t, i) => <li key={i}>{t}</li>)}</ul></>}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22, alignItems: 'center' }}>
            {QUIZ[id] && <button className="btn ghost" onClick={() => goPractice(id)}>Attempt quiz</button>}
            <button className={'track-btn' + (progress[id] ? ' done' : '')} onClick={() => toggle(id)}>
              {progress[id] ? '✓ Marked read' : 'Mark as read'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [exam, setExam] = useState('tgpsc1')
  const [view, setView] = useState('home')
  const [openSub, setOpenSub] = useState(null)
  const [quizSub, setQuizSub] = useState(null)
  const [progress, toggle] = useProgress()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [view, openSub])

  const subs = SUBJECTS.filter(s => s.exam.includes(exam))
  const goto = (v) => { setOpenSub(null); setQuizSub(null); setView(v) }
  const goPractice = (id) => { setOpenSub(null); setView('practice'); setQuizSub(id) }

  function SubjectCards() {
    return (
      <div className="grid">
        {subs.map((s, i) => (
          <div className="card" key={s.id} onClick={() => setOpenSub(s.id)}>
            <div className="accent" style={{ background: s.accent }}></div>
            {progress[s.id] && <div className="doneflag">✅</div>}
            <div className="idx">{String(i + 1).padStart(2, '0')}</div>
            <h3>{s.name}</h3><p>{s.blurb}</p>
            <div className="tags">{s.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    )
  }

  let content
  if (openSub) {
    content = <SubjectDetail id={openSub} onBack={() => setOpenSub(null)} progress={progress} toggle={toggle} goPractice={goPractice} />
  } else if (view === 'home') {
    const total = subs.length, done = subs.filter(s => progress[s.id]).length
    content = (
      <>
        <section className="hero">
          <div className="eyebrow">From zero to exam-ready</div>
          <h2>The complete desk for Telangana & Central government exams.</h2>
          <p>Every subject in the official syllabus — illustrated notes, practice papers, past-paper links, a current-affairs system and a daily study plan. Free forever, one page, open it daily.</p>
          <div className="stat-row">
            <div className="stat"><b>{SUBJECTS.length}</b><span>Subjects</span></div>
            <div className="stat"><b>4</b><span>Exam tracks</span></div>
            <div className="stat"><b>{done}/{total}</b><span>Marked read</span></div>
          </div>
        </section>
        <div className="honest"><b>An honest promise:</b> this covers <b>every topic in the official TGPSC & SSC syllabus</b> and gives real, structured preparation. It is <b>not a guarantee of selection</b> — these exams pick a few from lakhs, and clearing them takes months of daily effort, practice papers and revision. Share it as a genuine study companion, and it will genuinely help.</div>
        <ExamTabs exam={exam} setExam={setExam} />
        <div className="callout"><b>{EXAMS[exam].label}:</b> {EXAMS[exam].pattern}</div>
        <div className="sec-head"><h2>Subjects</h2><div className="rule"></div></div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: 0 }}>Every subject has full illustrated notes + quiz. Tap to open; mark it read to track progress (saved on this device).</p>
        <SubjectCards />
      </>
    )
  } else if (view === 'syllabus') {
    content = (
      <>
        <div className="sec-head"><h2>Complete Syllabus</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <div className="callout"><b>Papers / stages:</b><ul style={{ margin: '8px 0 0' }}>{EXAMS[exam].stages.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        <div className="honest"><b>Coverage assurance:</b> every subject below maps to the official {EXAMS[exam].label} syllabus.</div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))' }}>
          {subs.map(s => (
            <div className="card nohover" key={s.id}>
              <div className="accent" style={{ background: s.accent }}></div>
              <h3>{s.name}</h3>
              <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 13.5, color: 'var(--ink-soft)' }}>
                {(SYLLABUS[s.id] || []).map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </>
    )
  } else if (view === 'books') {
    content = (
      <>
        <div className="sec-head"><h2>Books & Free Links</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
          {BOOKS[exam].map((b, i) => (
            <div className="card nohover" key={i}>
              <div className="accent" style={{ background: 'var(--gold)' }}></div>
              <div className="idx">{b.s}</div><h3 style={{ fontSize: 17 }}>{b.b}</h3>
              {b.l && <a href={b.l} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>Official / source ↗</a>}
            </div>
          ))}
        </div>
        <div className="sec-head"><h2>Free Resources</h2><div className="rule"></div></div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
          {FREE_LINKS.map((l, i) => (
            <div className="card nohover" key={i}>
              <h3 style={{ fontSize: 16 }}>{l.t}</h3>
              <a href={l.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>{l.u.replace('https://', '')} ↗</a>
            </div>
          ))}
        </div>
        <div className="callout">Start with the <b>free NCERTs</b> before any paid guide. For Telangana papers, Telugu Akademi material is the standard.</div>
      </>
    )
  } else if (view === 'practice') {
    const qsubs = subs.filter(s => QUIZ[s.id])
    content = (
      <>
        <div className="sec-head"><h2>Practice Papers</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>Pick a subject for its question bank.</p>
        <div className="grid">
          {qsubs.map(s => (
            <div className="card" key={s.id} onClick={() => setQuizSub(s.id)}>
              <div className="accent" style={{ background: s.accent }}></div>
              <h3>{s.name}</h3><p>{(QUIZ[s.id] || []).length} ready questions · tap to attempt</p>
            </div>
          ))}
        </div>
        {quizSub && QUIZ[quizSub] && (
          <div className="reader">
            <div className="banner"><div className="kick">Question bank</div><h2>{SUBJECTS.find(s => s.id === quizSub).name}</h2></div>
            <div className="body"><Quiz bank={QUIZ[quizSub]} /></div>
          </div>
        )}
      </>
    )
  } else if (view === 'pyq') {
    const p = PYQ[exam]
    content = (
      <>
        <div className="sec-head"><h2>Past Question Papers</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <div className="honest"><b>Most important step of all.</b> Previous-year papers show real difficulty, repeated topics and question style. Serious aspirants solve 5–10 years under timed conditions — it matters more than any notes.</div>
        <div className="reader">
          <div className="banner"><div className="kick">{EXAMS[exam].label}</div><h2>How to use past papers</h2></div>
          <div className="body">
            <p>{p.note}</p>
            <h3>The 4-step method</h3>
            <ul>
              <li><b>Solve untimed first</b> — understand each question, mark unknown topics.</li>
              <li><b>Solve timed next</b> — full paper under the real clock and negative marking.</li>
              <li><b>Analyse</b> — list every wrong/guessed question; those are revision targets.</li>
              <li><b>Repeat older years</b> — patterns repeat; recognise them.</li>
            </ul>
            <h3>Official sources</h3>
            <ul>{p.links.map((l, i) => <li key={i}><a href={l[1]} target="_blank" rel="noopener noreferrer">{l[0]} ↗</a></li>)}</ul>
          </div>
        </div>
      </>
    )
  } else if (view === 'current') {
    content = (
      <div className="reader">
        <div className="banner"><div className="kick">{NOTES.current.kicker}</div><h2>{NOTES.current.title}</h2></div>
        <div className="body"><div dangerouslySetInnerHTML={{ __html: NOTES.current.html }} /></div>
      </div>
    )
  } else if (view === 'builder') {
    content = (
      <>
        <div className="sec-head"><h2>Study Builder</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, maxWidth: '70ch' }}>
          Build a focused session in one tap. Pick a subject to jump straight to its illustrated notes, or straight to its quiz. Everything here is fully free and works offline once loaded.
        </p>
        <div className="grid">
          {subs.map(s => (
            <div className="card nohover" key={s.id}>
              <div className="accent" style={{ background: s.accent }}></div>
              {progress[s.id] && <div className="doneflag">✅</div>}
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                <button className="track-btn" onClick={() => setOpenSub(s.id)}>Read notes</button>
                {QUIZ[s.id] && <button className="track-btn" onClick={() => goPractice(s.id)}>Take quiz</button>}
              </div>
            </div>
          ))}
        </div>
        <div className="callout"><b>Suggested daily session:</b> read one subject's notes (20 min) → take its quiz (20 min) → explain the hardest point aloud in your own words (20 min). Mark it read on the subject page to track progress.</div>
      </>
    )
  } else if (view === 'plan') {
    const total = subs.length, done = subs.filter(s => progress[s.id]).length
    const pct = total ? Math.round(done / total * 100) : 0
    content = (
      <>
        <div className="sec-head"><h2>Daily Plan & Progress</h2><div className="rule"></div></div>
        <ExamTabs exam={exam} setExam={setExam} />
        <div className="reader" style={{ marginTop: 12 }}>
          <div className="banner"><div className="kick">{EXAMS[exam].label}</div><h2>Your reading progress</h2></div>
          <div className="body">
            <div className="prog-bar"><i style={{ width: pct + '%' }}></i></div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{done} of {total} subjects marked read ({pct}%). Progress is saved on this device.</p>
          </div>
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, maxWidth: '70ch' }}>A sustainable routine layers foundation → practice → revision. Consistency beats intensity.</p>
        {PLAN.map((p, i) => (
          <div className="card nohover" key={i} style={{ marginBottom: 14 }}>
            <div className="accent" style={{ background: p[3] }}></div>
            <div className="idx">{p[0]}</div><h3>{p[1]}</h3><p>{p[2]}</p>
          </div>
        ))}
        <div className="callout"><b>Daily block (repeat):</b> 20 min read a concept → 20 min apply via quiz → 20 min explain it aloud. Then next subject.</div>
      </>
    )
  }

  return (
    <>
      <header className="top">
        <div className="wrap">
          <div className="brand">
            <div className="seal">వి</div>
            <div><h1>Vidya Kendra</h1><div className="sub">TGPSC · SSC · Complete Desk</div></div>
          </div>
          <nav>
            {NAV.map(([v, label]) => (
              <button key={v} className={view === v && !openSub ? 'active' : ''} onClick={() => goto(v)}>{label}</button>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap">{content}</main>
      <footer className="wrap">
        <div><b>Vidya Kendra</b> — a complete study companion for TGPSC (Group 1/2/3) & SSC (CGL/CHSL). Syllabus reflects the 2026 exam structure. It is a genuine preparation tool, <b>not a guarantee of selection</b> — success needs consistent daily effort. Always cross-check the official notification at <a href="https://www.tgpsc.gov.in" target="_blank" rel="noopener noreferrer">tgpsc.gov.in</a> and <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer">ssc.gov.in</a>.</div>
      </footer>
    </>
  )
}
