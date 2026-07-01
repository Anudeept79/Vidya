:root{
  --ink:#1a1410;--ink-soft:#4a4038;--paper:#f6f0e6;--paper-2:#efe6d6;
  --card:#fffdf9;--line:#e0d4c0;--gold:#b8862f;--gold-2:#d4a94a;
  --deep:#1e3a34;--deep-2:#2d5248;--clay:#c25a3a;--sky:#3a6ea5;
  --ok:#2f7d54;--bad:#c0392b;
  --shadow:0 2px 0 rgba(26,20,16,.06),0 12px 30px -12px rgba(26,20,16,.28);
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:ui-sans-serif,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box}html,body{margin:0}
body{font-family:var(--sans);color:var(--ink);background:radial-gradient(1200px 600px at 100% -10%,#fbf5ea,transparent),var(--paper);line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:var(--sky)}
.wrap{max-width:1120px;margin:0 auto;padding:0 18px}
header.top{background:linear-gradient(180deg,var(--deep),var(--deep-2));color:#f4ecdd;border-bottom:3px solid var(--gold);position:sticky;top:0;z-index:40}
.top .wrap{display:flex;align-items:center;gap:16px;padding:12px 18px}
.brand{display:flex;align-items:center;gap:12px;min-width:0}
.seal{width:44px;height:44px;border-radius:50%;flex:none;background:radial-gradient(circle at 30% 30%,var(--gold-2),var(--gold));display:grid;place-items:center;color:#1e3a34;font-family:var(--serif);font-weight:700;font-size:20px;box-shadow:inset 0 0 0 3px rgba(255,255,255,.25)}
.brand h1{font-family:var(--serif);font-size:20px;margin:0;letter-spacing:.3px;font-weight:700}
.brand .sub{font-size:11.5px;opacity:.8;letter-spacing:2px;text-transform:uppercase}
.top nav{margin-left:auto;display:flex;gap:4px;flex-wrap:wrap}
.top nav button{background:transparent;border:1px solid transparent;color:#e8dcc6;font:inherit;font-size:13.5px;padding:7px 12px;border-radius:8px;cursor:pointer}
.top nav button:hover{background:rgba(255,255,255,.08)}
.top nav button.active{background:var(--gold);color:#20241f;font-weight:600}
.hero{padding:30px 0 6px}
.eyebrow{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:700}
.hero h2{font-family:var(--serif);font-size:clamp(26px,5vw,42px);line-height:1.08;margin:8px 0 6px;max-width:20ch}
.hero p{max-width:62ch;color:var(--ink-soft);margin:0 0 14px}
.stat-row{display:flex;gap:26px;flex-wrap:wrap;margin-top:12px}
.stat{display:flex;flex-direction:column}
.stat b{font-family:var(--serif);font-size:24px;color:var(--deep)}
.stat span{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-soft)}
.honest{background:#fff6e2;border:1px solid var(--gold);border-left:5px solid var(--gold);border-radius:0 12px 12px 0;padding:14px 18px;margin:20px 0;font-size:14px}
.honest b{color:var(--deep)}
.exam-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0 6px}
.exam-tabs button{font:inherit;font-size:13px;padding:8px 14px;border-radius:999px;cursor:pointer;border:1px solid var(--line);background:var(--card);color:var(--ink-soft)}
.exam-tabs button.active{background:var(--deep);color:#f4ecdd;border-color:var(--deep)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:16px;margin:18px 0 40px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:var(--shadow);cursor:pointer;transition:transform .15s ease;position:relative;overflow:hidden}
.card.nohover{cursor:default}
.card:not(.nohover):hover{transform:translateY(-3px)}
.card .idx{font-family:var(--serif);font-size:13px;color:var(--gold);font-weight:700}
.card h3{font-family:var(--serif);margin:6px 0 6px;font-size:20px;line-height:1.15}
.card p{margin:0;font-size:13px;color:var(--ink-soft)}
.card .tags{margin-top:12px;display:flex;gap:6px;flex-wrap:wrap}
.tag{font-size:10.5px;letter-spacing:.5px;text-transform:uppercase;background:var(--paper-2);color:var(--ink-soft);padding:3px 8px;border-radius:6px;font-weight:600}
.card .accent{position:absolute;left:0;top:0;bottom:0;width:5px}
.card .doneflag{position:absolute;top:10px;right:12px;font-size:16px}
.sec-head{display:flex;align-items:baseline;gap:14px;margin:30px 0 4px}
.sec-head h2{font-family:var(--serif);font-size:26px;margin:0}
.sec-head .rule{flex:1;height:1px;background:var(--line)}
.reader{background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);overflow:hidden;margin:18px 0 44px}
.reader .banner{background:linear-gradient(135deg,var(--deep),var(--deep-2));color:#f4ecdd;padding:26px 28px}
.reader .banner .kick{font-size:11.5px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold-2)}
.reader .banner h2{font-family:var(--serif);font-size:28px;margin:6px 0 0}
.reader .body{padding:26px 28px}
.reader .body h3{font-family:var(--serif);color:var(--deep);font-size:21px;margin:26px 0 8px;padding-bottom:6px;border-bottom:2px solid var(--paper-2)}
.reader .body h4{font-size:15px;margin:18px 0 6px;color:var(--clay)}
.reader .body p,.reader .body li{font-size:15px;color:var(--ink)}
.reader .body ul{padding-left:20px}
.callout{background:var(--paper);border-left:4px solid var(--gold);border-radius:0 10px 10px 0;padding:12px 16px;margin:16px 0}
.callout b{color:var(--deep)}
.mnemonic{background:#fff6e2;border:1px dashed var(--gold);border-radius:10px;padding:12px 16px;margin:16px 0}
.back{background:transparent;border:1px solid var(--line);border-radius:9px;padding:7px 13px;cursor:pointer;font:inherit;font-size:13px;color:var(--ink-soft)}
.back:hover{background:var(--paper-2)}
.figbox{border:1px solid var(--line);border-radius:12px;padding:14px;background:#fffef9;margin:18px 0}
.figcap{font-size:12px;color:var(--ink-soft);text-align:center;margin-top:8px;font-style:italic}
.figbox table{width:100%;border-collapse:collapse;font-size:13.5px}
.figbox th{text-align:left;padding:8px;background:#eaf5ee}
.figbox td{padding:8px;border-top:1px solid #dfeee4}
.quiz-q{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin:14px 0}
.quiz-q .qn{font-weight:600;font-size:15px;margin-bottom:10px}
.opt{display:block;width:100%;text-align:left;font:inherit;font-size:14px;padding:10px 14px;margin:6px 0;border:1px solid var(--line);border-radius:9px;background:var(--card);cursor:pointer;transition:.12s}
.opt:hover{border-color:var(--gold)}
.opt.correct{background:#e7f5ec;border-color:var(--ok);color:#1c5a37}
.opt.wrong{background:#fbeae8;border-color:var(--bad);color:#8f2019}
.explain{margin-top:10px;font-size:13.5px;color:var(--ink-soft);background:var(--card);border-radius:8px;padding:10px 12px;border-left:3px solid var(--sky)}
.btn{font:inherit;font-size:14px;font-weight:600;padding:11px 18px;border-radius:10px;cursor:pointer;border:none}
.btn.primary{background:var(--gold);color:#241d0e}
.btn.primary:hover{background:var(--gold-2)}
.btn.ghost{background:var(--card);border:1px solid var(--line);color:var(--ink-soft)}
.track-btn{font:inherit;font-size:12.5px;padding:6px 12px;border-radius:8px;border:1px solid var(--line);background:var(--card);cursor:pointer;color:var(--ink-soft)}
.track-btn.done{background:#e7f5ec;border-color:var(--ok);color:#1c5a37}
.prog-bar{height:12px;background:var(--paper-2);border-radius:999px;overflow:hidden;margin:8px 0}
.prog-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--clay));border-radius:999px;transition:width .4s}
.gen-wrap{background:linear-gradient(180deg,#fffdf9,#f7efe1);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:24px;margin:18px 0 44px}
.gen-wrap h2{font-family:var(--serif);font-size:24px;margin:0 0 4px}
.gen-wrap .lead{color:var(--ink-soft);font-size:14px;margin:0 0 18px;max-width:70ch}
.gen-form{display:flex;flex-wrap:wrap;gap:10px;align-items:stretch}
.gen-form input{font:inherit;font-size:14px;padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:var(--card);flex:1;min-width:220px}
.mode-row{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 0}
.chip{font:inherit;font-size:13px;padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:var(--card);cursor:pointer;color:var(--ink-soft)}
.chip.active{background:var(--deep);color:#f4ecdd;border-color:var(--deep)}
.spinner{display:inline-block;width:16px;height:16px;border:2px solid var(--gold);border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite;vertical-align:-3px;margin-right:8px}
@keyframes spin{to{transform:rotate(360deg)}}
.loading{color:var(--ink-soft);font-size:14px;padding:16px 0}
.soon{background:linear-gradient(180deg,#fffdf9,#f7efe1);border:1px dashed var(--gold);border-radius:16px;padding:34px 26px;text-align:center;margin:18px 0 44px}
.soon h2{font-family:var(--serif);font-size:26px;margin:0 0 8px}
.soon p{color:var(--ink-soft);font-size:14px;max-width:60ch;margin:0 auto 6px}
footer{border-top:1px solid var(--line);padding:26px 0 40px;color:var(--ink-soft);font-size:13px}
@media(max-width:640px){.brand h1{font-size:17px}.reader .banner h2{font-size:22px}}
