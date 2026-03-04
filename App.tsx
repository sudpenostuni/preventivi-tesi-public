import React, { useState, useRef, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { 
  Sparkles, Trash2, Loader2, FileScan, 
  Send, Plus, Minus, ChevronDown, ChevronUp, ArrowRight, User, Palette, Receipt, CheckCircle2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { THESIS_MATS, WA_PHONE, LOGO_URL, GSHEET_URL, PRICING } from './data';

const fmt = (v: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(v);
const safeNum = (v: any) => parseInt(v?.toString() || '0') || 0;

const NumIn = ({ v, onChange, min = 0 }: { v: number, onChange: (v: number | '') => void, min?: number }) => (
  <div className="flex items-center border rounded-xl overflow-hidden h-12 bg-gray-50">
    <button onClick={() => onChange(Math.max(min, safeNum(v) - 1))} className="w-12 h-full flex justify-center items-center active:bg-gray-200 border-r">
      <Minus size={16} className="text-gray-500" />
    </button>
    <input 
      type="number" 
      value={v} 
      onChange={e => onChange(e.target.value === '' ? '' : Math.max(min, parseInt(e.target.value)))} 
      className="w-full text-center font-bold bg-transparent focus:outline-none text-sm" 
    />
    <button onClick={() => onChange(safeNum(v) + 1)} className="w-12 h-full flex justify-center items-center active:bg-gray-200 border-l">
      <Plus size={16} className="text-gray-500" />
    </button>
  </div>
);

interface Job {
  id: string;
  name: string;
  bwPages: number;
  colorPages: number;
  cps: number;
  matIdx: number;
  fileName?: string;
}

const App: React.FC = () => {
  const [tJobs, setTJobs] = useState<Job[]>([]);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState(0);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeSections, setActiveSections] = useState({ covers: false, calc: false, summary: true });
  const [selectedMatIndex, setSelectedMatIndex] = useState<number | null>(null);
  
  const detailsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tot = 0;
    tJobs.forEach(j => {
      const mat = THESIS_MATS[j.matIdx];
      tot += ((safeNum(j.bwPages) * PRICING.bw) + (safeNum(j.colorPages) * PRICING.color.base) + (mat?.p || 30)) * safeNum(j.cps);
    });
    setTotal(tot);
  }, [tJobs]);

  useEffect(() => {
    const logOpening = async () => {
      if (!GSHEET_URL) return;
      try {
        await fetch(GSHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ azione: "APERTURA", utente: navigator.userAgent })
        });
      } catch (e) {
        console.error("Error logging opening:", e);
      }
    };
    logOpening();
  }, []);

  const handleThesisSelect = (idx: number) => {
    const mat = THESIS_MATS[idx];
    setTJobs([...tJobs, { id: Date.now().toString(), name: mat.n, bwPages: 0, colorPages: 0, cps: 1, matIdx: idx }]);
    setActiveSections(prev => ({ ...prev, calc: true }));
    setSelectedMatIndex(null);
    
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const goToSummary = () => {
      setActiveSections(prev => ({ ...prev, summary: true }));
      setTimeout(() => {
          if (summaryRef.current) {
              summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, 100);
  }

  const analyze = async (id: string, file: File) => {
    setAnalyzingId(id);
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      console.error("PDF.js not loaded");
      setAnalyzingId(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const doc = await pdfjsLib.getDocument(url).promise;
    let bw = 0, col = 0;
    for (let i = 1; i <= doc.numPages; i++) {
      const p = await doc.getPage(i);
      const vp = p.getViewport({ scale: 0.1 });
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');
      if (!ctx) continue;
      cvs.width = vp.width; cvs.height = vp.height;
      await p.render({ canvasContext: ctx, viewport: vp }).promise;
      const d = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
      let isC = false;
      for (let j = 0; j < d.length; j += 40) {
        if (Math.abs(d[j] - d[j+1]) > 20 || Math.abs(d[j+1] - d[j+2]) > 20) { isC = true; break; }
      }
      isC ? col++ : bw++;
      p.cleanup();
    }
    setTJobs(p => p.map(j => j.id === id ? { ...j, bwPages: bw, colorPages: col, fileName: file.name } : j));
    setAnalyzingId(null);
    URL.revokeObjectURL(url);
  };

  const logToSheet = async () => {
    if (!GSHEET_URL) return;
    const details = tJobs.map(j => `${j.name} (${j.cps}cp)`).join(', ');
    const data = {
      customer: customer.toUpperCase() || 'ANONIMO WEB',
      category: 'PREVENTIVO TESI',
      total: total.toFixed(2),
      itemCount: tJobs.reduce((acc, j) => acc + safeNum(j.cps), 0),
      platform: `Web App - Dettagli: ${details}` 
    };
    try {
      await fetch(GSHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error(e);
    }
  };

  const sendWa = () => {
    logToSheet();
    let txt = `*PREVENTIVO TESI SUDPEN*\n`;
    txt += `------------------------------\n`;
    txt += `Cliente: ${customer.toUpperCase() || 'N/D'}\n`;
    tJobs.forEach((j) => {
      txt += `\ncopertina selezionata : ${j.name.toUpperCase()}\n`;
      txt += `copie : ${j.cps}\n`;
      txt += `Pagine Bianco e nero: ${j.bwPages}\n`;
      txt += `Pagine colori : ${j.colorPages}\n`;
    });
    txt += `\n*TOTALE : ${fmt(total)}*`;
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(txt)}`, '_blank');
  };

  const calculateJobCost = (j: Job) => {
      const mat = THESIS_MATS[j.matIdx];
      const cost = ((safeNum(j.bwPages) * PRICING.bw) + (safeNum(j.colorPages) * PRICING.color.base) + (mat?.p || 30)) * safeNum(j.cps);
      return cost;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-6 space-y-6">
      
      {/* 1. REEL COPERTINE (Sempre visibile) */}
      {isStarted && (
        <div className="space-y-4 animate-slide" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-4xl overflow-hidden card-shadow relative">
              {/* Reel Container */}
              <div className="h-[60vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-black p-2 space-y-4">
                {THESIS_MATS.map((m, i) => (
                  <div 
                    key={i} 
                    className="w-full aspect-[3/4] snap-center snap-always relative flex items-center justify-center bg-gray-900 cursor-pointer rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    onClick={() => setSelectedMatIndex(i)}
                  >
                    <img 
                      src={m.img} 
                      alt={m.n} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Swipe Hint on First Image */}
                    {i === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                         <motion.div 
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
                           transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                           className="bg-black/50 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                         >
                            Swipe <ArrowRight className="-rotate-90" size={14} />
                         </motion.div>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                       <div className="w-full">
                         <p className="text-white font-black uppercase text-lg leading-none mb-1">{m.n}</p>
                         <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Clicca per dettagli</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      )}

      {/* Selected Material Modal */}
      <AnimatePresence>
        {selectedMatIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedMatIndex(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={THESIS_MATS[selectedMatIndex].img} 
                  alt={THESIS_MATS[selectedMatIndex].n} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedMatIndex(null)}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-black uppercase text-gray-900 leading-tight mb-2">
                    {THESIS_MATS[selectedMatIndex].n}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-brandBlue/10 text-brandBlue font-bold text-sm rounded-full uppercase tracking-wider">
                      Prezzo Copertina: {fmt(THESIS_MATS[selectedMatIndex].p)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => handleThesisSelect(selectedMatIndex)}
                    className="w-full h-14 bg-brandBlue text-white rounded-xl font-bold text-lg uppercase tracking-wide shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  >
                    Seleziona questa <CheckCircle2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedMatIndex(null)}
                    className="w-full h-14 bg-gray-100 text-gray-500 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors"
                  >
                    Torna alla consultazione
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DETTAGLI STAMPA */}
      {isStarted && (
        <div ref={detailsRef} className="space-y-4 animate-slide" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={() => setActiveSections(p => ({...p, calc: !p.calc}))}
            className="w-full bg-white/10 text-white p-5 rounded-3xl flex items-center justify-between border border-white/20 backdrop-blur-sm btn-touch"
          >
            <div className="flex items-center gap-3">
              <FileScan size={20} />
              <span className="font-bold uppercase tracking-tight text-sm">Dettagli Stampa</span>
            </div>
            {activeSections.calc ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div className={`section-transition ${activeSections.calc ? 'section-open' : 'section-closed'}`}>
            {tJobs.length > 0 ? (
              <div className="space-y-4">
                {tJobs.map(j => (
                  <div key={j.id} className="bg-white rounded-4xl p-6 card-shadow space-y-6 border border-gray-100">
                    <div className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
                           <img src={THESIS_MATS[j.matIdx].img} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Copertina:</p>
                          <span className="font-black text-sm uppercase text-brandBlue">{j.name}</span>
                        </div>
                      </div>
                      <button onClick={() => setTJobs(p => p.filter(x => x.id !== j.id))} className="text-gray-300 p-1 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Didascalia nera ben visibile */}
                    <div className="pb-4">
                      <p className="text-xs font-bold text-gray-900 text-center leading-tight">
                        Inserisci il numero di pagine manualmente o carica il tuo file per analisi automatica.
                      </p>
                    </div>

                    {/* Campi di input SPOSTATI IN ALTO */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Bianco e Nero</label>
                        <NumIn v={j.bwPages} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, bwPages: v as number} : x))} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Colori</label>
                        <NumIn v={j.colorPages} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, colorPages: v as number} : x))} />
                      </div>
                      <div className="col-span-2 space-y-1.5 pt-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Numero di Copie</label>
                        <NumIn v={j.cps} min={1} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, cps: v as number} : x))} />
                      </div>
                    </div>

                    {/* Tasto Analizza PDF in fondo */}
                    <div className="pt-2">
                       <button 
                          onClick={() => {
                            const el = document.getElementById(`f-${j.id}`) as HTMLInputElement;
                            el?.click();
                          }} 
                          className="w-full h-12 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-3 active:scale-[0.98] transition-all border border-gray-200" 
                        >
                          {analyzingId === j.id ? <Loader2 className="animate-spin" size={18} /> : <FileScan size={18} />}
                          {analyzingId === j.id ? 'Analisi in corso...' : 'Analizza PDF'}
                        </button>
                        <input 
                          id={`f-${j.id}`} 
                          type="file" 
                          className="hidden" 
                          accept="application/pdf" 
                          onChange={e => {
                            if (e.target.files?.[0]) analyze(j.id, e.target.files[0]);
                          }} 
                        />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-4xl p-10 text-center">
                <p className="text-white/40 text-sm font-medium italic">Seleziona un colore sopra per procedere</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. RIEPILOGO E CONFERMA (Nuova Tab) */}
      {isStarted && (
        <div ref={summaryRef} className="space-y-4 animate-slide" style={{ animationDelay: '0.3s' }}>
           <button 
             onClick={() => setActiveSections(p => ({...p, summary: !p.summary}))}
             className="w-full bg-white/10 text-white p-5 rounded-3xl flex items-center justify-between border border-white/20 backdrop-blur-sm btn-touch"
           >
             <div className="flex items-center gap-3">
               <Receipt size={20} />
               <span className="font-bold uppercase tracking-tight text-sm">Riepilogo Ordine</span>
             </div>
             {activeSections.summary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
           </button>
           <div className={`section-transition ${activeSections.summary ? 'section-open' : 'section-closed'}`}>
             <div className="bg-white rounded-4xl p-6 card-shadow space-y-6">
                {tJobs.length > 0 ? (
                  <div className="space-y-6">
                    {/* Dettagli Costi */}
                    <div className="space-y-4 divide-y divide-gray-100">
                        {tJobs.map(j => {
                            const mat = THESIS_MATS[j.matIdx];
                            const jobCost = calculateJobCost(j);
                            return (
                              <div key={j.id} className="pt-4 first:pt-0">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="font-black text-sm uppercase text-gray-800">{j.name}</span>
                                      <span className="font-bold text-sm text-gray-900">{fmt(jobCost)}</span>
                                  </div>
                                  <div className="text-[11px] text-gray-500 font-medium space-y-0.5">
                                      <div>Copertina: {fmt(mat.p)}</div>
                                      <div>Pagine: {j.bwPages} Bianco e Nero, {j.colorPages} Colori</div>
                                      <div>Copie: {j.cps}</div>
                                  </div>
                              </div>
                            );
                        })}
                    </div>
                    
                    {/* Totale */}
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                        <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Totale Stimato</span>
                        <span className="text-2xl font-black text-brandBlue">{fmt(total)}</span>
                    </div>

                    {/* Input Nome */}
                    <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Intestazione Ordine</label>
                        <input 
                          type="text" 
                          placeholder="INSERISCI IL TUO NOME" 
                          value={customer} 
                          onChange={e => setCustomer(e.target.value)} 
                          className="w-full h-14 px-5 border rounded-xl font-bold text-sm uppercase focus:ring-2 focus:ring-brandBlue/10 focus:border-brandBlue outline-none transition-all placeholder:text-gray-300 bg-gray-50 animate-blink-orange" 
                        />
                    </div>

                    {/* Tasto WhatsApp */}
                    <button 
                        onClick={sendWa} 
                        disabled={tJobs.length === 0}
                        className={`w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all btn-touch shadow-xl ${tJobs.length > 0 ? 'bg-[#25D366] text-white shadow-green-900/20' : 'bg-gray-100 text-gray-300 shadow-none grayscale cursor-not-allowed'}`}
                    >
                      Invia Ordine WhatsApp <Send size={20} />
                    </button>

                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 text-sm font-medium">Nessun articolo nel carrello</div>
                )}
             </div>
           </div>
        </div>
      )}

      {/* 4. SLAB DINAMICO (Solo Navigazione) */}
      <div className="bg-white rounded-4xl p-10 card-shadow flex flex-col items-center animate-slide">
        {!isStarted ? (
          <div className="w-full flex flex-col items-center gap-10">
            <img src={LOGO_URL} className="h-32 w-auto opacity-100" alt="Sudpen" />
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Preventivo Tesi</h1>
              <p className="text-gray-400 text-sm">Calcola il costo della tua stampa professionale</p>
            </div>
            <button 
              onClick={() => { setIsStarted(true); setActiveSections({ covers: true, calc: true, summary: true }); }}
              className="w-full h-16 bg-brandBlue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 btn-touch shadow-lg shadow-blue-900/20"
            >
              Iniziamo <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <img src={LOGO_URL} className="h-8 w-auto" alt="Sudpen" />
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Totale Parziale</p>
                <p className="text-2xl font-black text-brandBlue">{fmt(total)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER INFO */}
      <div className="pt-8 pb-12 text-center">
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Sudpen 2024 • Professional Print Solution</p>
      </div>
      <Analytics />
    </div>
  );
};

export default App;
