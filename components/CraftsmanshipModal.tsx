import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, BookOpen, Layers, Award, 
  CheckCircle2, Flame, Sparkles, Quote, Star
} from 'lucide-react';

interface CraftsmanshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CraftsmanshipModal: React.FC<CraftsmanshipModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'materiali' | 'processo' | 'rito' | 'anatomia'>('materiali');

  const pillars = [
    {
      title: "1. Personalizzazione Cromatica",
      desc: "Una palette completa per riflettere l'identità del progetto."
    },
    {
      title: "2. Qualità Artigianale",
      desc: "Copertine fatte a mano che garantiscono unicità e prestigio tattile."
    },
    {
      title: "3. Precisione Tecnica",
      desc: "Tecnologia digitale per incisioni e rilegature di standard superiore."
    }
  ];

  const specs = [
    {
      title: "Anima in Cartone da 3.5 mm",
      desc: "Spessore superiore allo standard per conferire rigidità eccezionale e un'importanza tattile immediata."
    },
    {
      title: "Rivestimento Termovirante",
      desc: "Materiale acrilico di qualità che reagisce al calore dell'incisione per restituire caratteri nitidi e profondi."
    },
    {
      title: "I Capitelli e Nastrino",
      desc: "Dettagli d'eccellenza rifiniti a mano: capitelli in tela e segnalibro in raso in ogni volume."
    },
    {
      title: "Rilegatura Protetta",
      desc: "Brossura fresata con grecatura meccanica, colla a caldo poliuretanica e garza di rinforzo."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "La Copertina",
      desc: "Ogni copertina viene realizzata a mano e su misura all'interno del nostro laboratorio."
    },
    {
      num: "02",
      title: "La Stampa",
      desc: "Verifica e adattamento manuale dei margini del PDF, seguita da stampa ad alta densità su carta 100gr."
    },
    {
      num: "03",
      title: "La Doratura",
      desc: "Incisione a caldo punto per punto del testo e loghi universitari, per riflessi brillanti e indelebili."
    },
    {
      num: "04",
      title: "La Pressa",
      desc: "Ore di pressione costante per l'asciugatura naturale delle colle: un riposo tecnico che non può essere accelerato."
    },
    {
      num: "05",
      title: "La Consegna",
      desc: "Il momento in cui la tesi emerge dalla sua custodia: un pezzo unico e vivissimo pronto al debutto."
    }
  ];

  const collections = [
    {
      name: "Linea Seta",
      focus: "Il lusso dei riflessi vibranti",
      desc: "Texture levigata e cangiante, con riflessi cromatici brillanti che donano una lucentezza senza tempo.",
      variants: ["Verde Pino", "Blu Reale", "Oro Glicine", "Oro Rosa", "Bordeaux", "Oro Giallo", "Oro Antico", "Oro Bianco", "Nero"]
    },
    {
      name: "Linea Vinile",
      focus: "Modernità e dinamismo",
      desc: "Superficie liscia, design pulito e contemporaneo. Versatilità e modernità si fondono in un rivestimento unico.",
      variants: ["Verde Clorofilla", "Verde Veronese", "Blu Klein", "Blu Oltremare", "Rosso Cardinale", "Rosso Pompeiano", "Crema", "Bianco Puro", "Nero", "Blu Galassia", "Rosso Radica", "Verde Radica"]
    },
    {
      name: "Linea Effetto Pelle",
      focus: "L'autorevolezza della tradizione",
      desc: "Una piacevole sensazione di sostanza. La grana classica evoca un’eleganza istituzionale, per tesi tradizionali.",
      variants: ["Verde Malachite", "Blu Cobalto", "Blu Marino", "Rosso Carminio", "Marrone", "Rame", "Sabbia", "Pergamena"]
    },
    {
      name: "Linea Spalmato",
      focus: "L'eleganza soft-touch",
      desc: "Finitura setosa e moderna con un incredibile effetto soft-touch. Ricercata al tatto e perfetta per toni pastello.",
      variants: ["Verde Marino", "Celeste Polvere", "Blu Elettrico", "Blu Navy", "Glicine", "Rosa Confetto", "Tortora", "Nero Notte"]
    },
    {
      name: "Linea Tela",
      focus: "La sobrietà organica",
      desc: "Tatto naturale, trama evidente ed intreccio organico delle fibre che richiama le grandi e prestigiose biblioteche.",
      variants: ["Rosa Pastello", "Bianco Cotone", "Canvas", "Canvas Canapa", "Grigio Londra", "Nero", "Nero Galassia"]
    },
    {
      name: "Linea Perlato",
      focus: "Opulenza ed eleganza",
      desc: "Una selezione sofisticata per riflessi iridescenti profondi. Estetica luminosa, prestigiosa ed unica.",
      variants: ["Porpora (Perla)", "Bianco (Perlato)"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 350 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md overflow-x-hidden overflow-y-auto"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#FCFAF5] to-[#F5F0E4] text-stone-850 rounded-3xl overflow-hidden shadow-2xl border border-[#DCD3C1] flex flex-col my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header decorativo in stile libro / tesi classica */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#C5A880] to-amber-600 z-10" />

            {/* Chiudi */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 bg-stone-200/50 hover:bg-stone-200 p-2.5 rounded-full backdrop-blur-md transition-all border border-stone-300/30 z-20"
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>

            {/* Titolo Principale in stile Classico */}
            <div className="p-6 pb-4 border-b border-[#E6DCBF] text-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.15),transparent_60%)] -z-10" />
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Sparkles size={16} className="text-amber-700/80" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-800 font-mono">Anatomia di un'Eccellenza</span>
                <Sparkles size={16} className="text-amber-700/80" />
              </div>
              <h2 className="text-2xl font-black font-serif uppercase tracking-wider text-stone-900">TESI SUDPEN</h2>
              <p className="text-amber-800/85 text-[11px] font-semibold italic mt-0.5">La perfezione legata a mano • Dal 1983</p>
            </div>

            {/* Tabs di Navigazione Classiche ordinate per: Materiali, Processo, Rito, Anatomia */}
            <div className="flex bg-[#EAE3D2] p-1 border-b border-[#DCD3C1] shrink-0 gap-1 overflow-x-auto no-scrollbar scroll-smooth">
              {[
                { id: 'materiali', label: 'Materiali', icon: Award },
                { id: 'processo', label: 'Il Processo', icon: Flame },
                { id: 'rito', label: 'Il Rito', icon: BookOpen },
                { id: 'anatomia', label: 'Anatomia', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center gap-1.5 flex-1 px-3 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border shrink-0 ${
                      isSelected 
                        ? 'bg-white border-[#D2C5AC] text-stone-900 shadow-sm'
                        : 'bg-transparent border-transparent text-stone-600 hover:text-stone-950 hover:bg-white/20'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-amber-700' : 'opacity-80 text-stone-500'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Contenuto Dinamico / Scrollabile */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6 scroll-smooth bg-[#FDFBF7]">
              <AnimatePresence mode="wait">
                {activeTab === 'rito' && (
                  <motion.div
                    key="rito"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E4DBC5] relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 text-stone-300/10 -mb-6 -mr-4">
                        <BookOpen size={120} />
                      </div>
                      <h3 className="text-amber-800 font-extrabold uppercase text-xs tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                        <Quote size={14} className="text-amber-700" /> Un rituale artigianale
                      </h3>
                      <p className="text-stone-800 leading-relaxed text-sm antialiased font-serif font-medium italic">
                        "In un ambito dove la tecnologia incontra ancora la mano dell'uomo, esiste un luogo dove il tempo sembra rallentare per mettersi al servizio della perfezione."
                      </p>
                      <div className="mt-4 pt-4 border-t border-[#EAE3D2] text-stone-600 text-xs flex items-center gap-1 font-sans">
                        Dal <strong className="text-amber-800 font-black">1983</strong> creiamo capolavori, orgogliosamente made in Puglia.
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-amber-850 uppercase tracking-widest pl-1 font-mono">La Promessa Sudpen</span>
                      <div className="grid gap-3">
                        {pillars.map((p, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#FAF6EE]/50 border border-[#EADFC7]/60 items-start">
                            <div className="p-2.5 bg-[#FAF6EE] text-amber-800 rounded-xl font-mono font-black text-xs select-none border border-[#DFD3BA] shrink-0">
                              0{i + 1}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider leading-snug font-serif">{p.title}</h4>
                              <p className="text-xs text-stone-600 leading-relaxed font-normal">{p.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-600/5 to-amber-400/5 p-4 rounded-2xl border border-amber-600/15 flex gap-3 items-center">
                      <div className="bg-[#FAF6EE] text-amber-700 p-2.5 rounded-full shrink-0 border border-[#E7DDBD]">
                        <Star size={16} className="fill-amber-650/10 text-amber-700" />
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-amber-800 uppercase tracking-wider mb-0.5 font-mono">Ogni Lavoro è un Capolavoro</p>
                        <p className="text-stone-600">Ogni tesi è curata maniacalmente per brillare, unendo unicità estetica e precisione.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'anatomia' && (
                  <motion.div
                    key="anatomia"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-1">
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block font-mono">La Scheda Tecnica</span>
                      <h3 className="text-lg font-black uppercase text-stone-900 font-serif">Materiali & Ampiezza d’Eccellenza</h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {specs.map((s, idx) => (
                        <div key={idx} className="bg-[#FAF6EE]/50 border border-[#EADFC7]/60 rounded-2xl p-4 flex gap-3 items-start hover:border-[#D2C5AC] transition-all">
                          <CheckCircle2 className="text-amber-700 mt-0.5 shrink-0" size={16} />
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#5C4D37] font-serif">{s.title}</h4>
                            <p className="text-xs text-stone-600 leading-relaxed font-normal">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#EAE3D2]/40 border border-[#DCD3C1] text-center">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.2em] block mb-1 font-mono">Incisioni Superiori</span>
                      <p className="text-xs text-stone-700 leading-relaxed max-w-lg mx-auto font-normal">
                        La nostra finitura acrilica <strong className="text-stone-900 font-extrabold">termovirante</strong> reagisce perfettamente al calore dell'oro o del nastro di incisione, garantendo una lucentezza e profondità caratteri nettamente superiori rispetto alle rilegature express di massa.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'processo' && (
                  <motion.div
                    key="processo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <span className="text-[10px] font-black text-amber-850 uppercase tracking-widest pl-1 block font-mono">Le Fasi del Lavoro Artigianale</span>

                    <div className="relative border-l border-[#DECDB3] pl-6 ml-3 space-y-6">
                      {steps.map((st, i) => (
                        <div key={i} className="relative">
                          {/* Dot temporale stile spillone dorato */}
                          <div className="absolute -left-[31px] top-0.5 w-[11px] h-[11px] bg-amber-600 rounded-full border-2 border-white shadow-md" />
                          
                          <div className="space-y-0.5">
                            <span className="text-[13px] font-extrabold text-amber-800 tracking-wide font-mono mr-1.5">{st.num}.</span>
                            <span className="font-extrabold text-sm text-stone-900 uppercase tracking-wider font-serif">{st.title}</span>
                            <p className="text-xs text-stone-600 leading-relaxed font-normal pt-1">{st.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'materiali' && (
                  <motion.div
                    key="materiali"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-5"
                  >
                    <span className="text-[10px] font-black text-amber-850 uppercase tracking-widest pl-1 block font-mono">Guida Pratica alle Nostre Linee</span>

                    <div className="grid gap-4">
                      {collections.map((col, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-[#FAF6EE]/50 border border-[#EADFC7]/60 flex flex-col gap-2 hover:bg-[#FAF6EE] hover:border-[#D2C5AC] transition-all">
                          <div className="flex justify-between items-start flex-wrap gap-1">
                            <div>
                              <h4 className="font-black text-sm text-stone-900 uppercase tracking-wider font-serif">{col.name}</h4>
                              <p className="text-[10px] text-amber-850 font-extrabold uppercase tracking-widest italic">{col.focus}</p>
                            </div>
                            <span className="text-[9px] font-bold bg-[#EAE3D2] border border-[#DFCFA2]/45 px-2.5 py-0.5 rounded-full text-stone-800 font-mono">
                              {col.variants.length} VARIANTI
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed pr-2 font-normal">
                            {col.desc}
                          </p>
                          <div className="pt-2">
                            <span className="text-[9px] font-black text-[#5C4D37] uppercase tracking-widest block mb-1 font-mono">Colori disponibili:</span>
                            <div className="flex flex-wrap gap-1">
                              {col.variants.map((v, vidx) => (
                                <span key={vidx} className="text-[9px] font-bold px-2 py-1 bg-[#F5EFE4] border border-[#DECDB3]/30 text-stone-800 rounded-md font-sans">
                                  {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pulsanti / Bottom Action Classica */}
            <div className="p-6 border-t border-[#E6DCBF] bg-[#F4EFE2]/70 flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="text-center sm:text-left flex-1 space-y-0.5 font-sans">
                <span className="text-[9px] font-black text-amber-850 uppercase tracking-widest font-mono">Scegli la tua Eccellenza</span>
                <p className="text-xs text-stone-600">Tutte le copertine sono disponibili nel calcolatore principale.</p>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto h-12 px-6 bg-brandBlue hover:bg-brandBlue/90 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-1.5 shrink-0 font-sans"
              >
                CONFIGURA LA TUA TESI
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
