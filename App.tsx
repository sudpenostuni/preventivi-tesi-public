import React, { useState, useRef, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { 
  Sparkles, Trash2, Loader2, FileScan, 
  Send, Plus, Minus, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, ArrowDown, ArrowUp, User, Palette, Receipt, CheckCircle2, X, Info,
  Lock, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { THESIS_MATS, WA_PHONE, LOGO_URL, GSHEET_URL, PRICING, USE_GOOGLE_DRIVE, DRIVE_IMAGE_IDS } from './data';
import { CraftsmanshipModal } from './components/CraftsmanshipModal';

export const ENGRAVINGS = [
  { 
    id: 'oro_brillante', 
    name: 'ORO brillante', 
    color: '#E5C060', 
    bgClass: 'bg-gradient-to-br from-[#FFE89C] via-[#D4AF37] to-[#9E7815]',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #FFE89C 0%, #D4AF37 45%, #9E7815 70%, #FFE89C 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#D4AF37',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.25))',
    },
    svgStyle: {
      stroke: '#D4AF37',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.25))',
    },
    svgTextFill: '#D4AF37'
  },
  { 
    id: 'argento_lucido', 
    name: 'ARGENTO (lucido)', 
    color: '#D1D5DB', 
    bgClass: 'bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #C2C5CC 45%, #7C7F85 70%, #FFFFFF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#C0C0C0',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.3))',
    },
    svgStyle: {
      stroke: '#C2C5CC',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.3))',
    },
    svgTextFill: '#C2C5CC'
  },
  { 
    id: 'rosso_lucido', 
    name: 'ROSSO lucido', 
    color: '#EF4444', 
    bgClass: 'bg-gradient-to-br from-red-300 via-red-600 to-red-800',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #FCA5A5 0%, #C41E3A 45%, #7F1D1D 70%, #FCA5A5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#C41E3A',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgStyle: {
      stroke: '#C41E3A',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgTextFill: '#C41E3A'
  },
  { 
    id: 'verde_glossy', 
    name: 'VERDE glossy', 
    color: '#10B981', 
    bgClass: 'bg-gradient-to-br from-emerald-300 via-emerald-600 to-emerald-800',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #A7F3D0 0%, #059669 45%, #064E3B 70%, #A7F3D0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#059669',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgStyle: {
      stroke: '#059669',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgTextFill: '#059669'
  },
  { 
    id: 'bronzo_lucido', 
    name: 'BRONZO lucido', 
    color: '#D97706', 
    bgClass: 'bg-gradient-to-br from-amber-200 via-amber-600 to-amber-900',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #FDE68A 0%, #D97706 45%, #78350F 70%, #FDE68A 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#D97706',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgStyle: {
      stroke: '#D97706',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.2))',
    },
    svgTextFill: '#D97706'
  },
  { 
    id: 'argento_pastello', 
    name: 'ARGENTO pastello', 
    color: '#E2E8F0', 
    bgClass: 'bg-slate-300 border border-slate-400',
    textStyle: {
      color: '#E2E8F0',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.25))',
    },
    svgStyle: {
      stroke: '#E2E8F0',
      fill: 'none',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.25))',
    },
    svgTextFill: '#E2E8F0'
  },
  { 
    id: 'lilla_pastello', 
    name: 'LILLA pastello', 
    color: '#E9D5FF', 
    bgClass: 'bg-purple-200 border border-purple-300',
    textStyle: {
      color: '#E9D5FF',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.25))',
    },
    svgStyle: {
      stroke: '#E9D5FF',
      fill: 'none',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.25))',
    },
    svgTextFill: '#E9D5FF'
  },
  { 
    id: 'bianco_puro', 
    name: 'BIANCO puro', 
    color: '#FFFFFF', 
    bgClass: 'bg-white border border-gray-300',
    textStyle: {
      color: '#FFFFFF',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.3))',
    },
    svgStyle: {
      stroke: '#FFFFFF',
      fill: 'none',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.3))',
    },
    svgTextFill: '#FFFFFF'
  },
  { 
    id: 'nero_notte', 
    name: 'NERO notte', 
    color: '#111827', 
    bgClass: 'bg-gradient-to-br from-gray-850 via-gray-950 to-black',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #4B5563 0%, #111827 60%, #030712 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#111827',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.15))',
    },
    svgStyle: {
      stroke: '#111827',
      fill: 'none',
      filter: 'drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.15))',
    },
    svgTextFill: '#111827'
  },
  { 
    id: 'blu_marino', 
    name: 'BLU marino', 
    color: '#1E3A8A', 
    bgClass: 'bg-gradient-to-br from-blue-400 via-blue-800 to-blue-950',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #1D4ED8 45%, #172554 70%, #60A5FA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#1E3A8A',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.15))',
    },
    svgStyle: {
      stroke: '#1E3A8A',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.15))',
    },
    svgTextFill: '#1E3A8A'
  },
  { 
    id: 'rosa_gold', 
    name: 'ROSA GOLD', 
    color: '#F472B6', 
    bgClass: 'bg-gradient-to-br from-[#FFE4E1] via-[#E0A899] to-[#C87564]',
    textStyle: {
      backgroundImage: 'linear-gradient(135deg, #FFF0EE 0%, #E0A899 45%, #A35C4E 70%, #FFF0EE 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#E0A899',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.25))',
    },
    svgStyle: {
      stroke: '#E0A899',
      fill: 'none',
      filter: 'drop-shadow(0.5px 1px 0px rgba(0,0,0,0.15)) drop-shadow(-0.5px -0.5px 0px rgba(255,255,255,0.25))',
    },
    svgTextFill: '#E0A899'
  }
];

export const isEngravingAllowedForMat = (engravingId: string, matName: string): boolean => {
  const normMat = matName.toUpperCase();
  const id = engravingId.toLowerCase();

  // Escludi dall'eliminazione oro e argento: oro e argento sono sempre consentiti.
  if (id.includes('oro') || id.includes('argento')) {
    return true;
  }

  // Corrispondenza colori per contrasto minimo:
  if (id === 'bianco_puro') {
    if (normMat.includes('BIANCO') || normMat.includes('CREMA') || normMat.includes('PERGAMENA') || normMat.includes('SABBIA')) {
      return false;
    }
  }

  if (id === 'nero_notte') {
    if (normMat.includes('NERO')) {
      return false;
    }
  }

  if (id === 'blu_marino') {
    if (normMat.includes('BLU')) {
      return false;
    }
  }

  if (id === 'rosso_lucido') {
    if (normMat.includes('ROSSO') || normMat.includes('BORDEAUX') || normMat.includes('PORPORA')) {
      return false;
    }
  }

  if (id === 'verde_glossy') {
    if (normMat.includes('VERDE')) {
      return false;
    }
  }

  if (id === 'lilla_pastello') {
    if (normMat.includes('LILLA') || normMat.includes('GLICINE') || normMat.includes('ROSA')) {
      return false;
    }
  }

  if (id === 'bronzo_lucido') {
    if (normMat.includes('MARRONE') || normMat.includes('RAME') || normMat.includes('BRONZO') || normMat.includes('SABBIA') || normMat.includes('TORTORA') || normMat.includes('CANVAS')) {
      return false;
    }
  }

  return true;
};

export const getAllowedEngravingsForMat = (matName: string) => {
  return ENGRAVINGS.filter(e => isEngravingAllowedForMat(e.id, matName));
};

const UniversitySeal: React.FC<{ color: string, style?: React.CSSProperties }> = ({ color, style }) => (
  <svg 
    style={{ color, ...style }}
    className="mx-auto w-12 h-12 opacity-90" 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2"
  >
    <defs>
      <path id="text-arc-top" d="M 16 50 A 34 34 0 0 1 84 50" />
      <path id="text-arc-bottom" d="M 16 50 A 34 34 0 0 0 84 50" />
    </defs>
    <circle cx="50" cy="50" r="45" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="39" strokeWidth="1" strokeDasharray="1 1" />
    <circle cx="50" cy="50" r="35" strokeWidth="1" />
    
    <path d="M 33 55 C 39 50, 47 51, 50 54 C 53 51, 61 50, 67 55 L 67 41 C 61 36, 53 37, 50 40 C 47 37, 39 36, 33 41 Z" strokeWidth="1.2" fill="none" />
    <path d="M 50 40 L 50 54" strokeWidth="1.2" />
    <path d="M 35 44 C 40 40, 46 41, 48 43 M 65 44 C 60 40, 54 41, 52 43" strokeWidth="0.8" opacity="0.7" />
    
    <text x="50" y="63" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="currentColor" className="font-serif">1981</text>
    <text x="50" y="32" fontSize="7" fontWeight="bold" textAnchor="middle" fill="currentColor" className="font-serif" letterSpacing="1">OSTUNI</text>
    
    <text fontSize="7.5" fontWeight="bold" fill="currentColor" className="font-serif">
      <textPath href="#text-arc-top" startOffset="50%" textAnchor="middle">
        SUD PEN
      </textPath>
    </text>
    <text fontSize="5.5" fontWeight="bold" fill="currentColor" className="font-serif">
      <textPath href="#text-arc-bottom" startOffset="50%" textAnchor="middle">
        VIRTUS ET VOLUNTAS
      </textPath>
    </text>
  </svg>
);

const ThesisCoverOverlay: React.FC<{ 
  foil: typeof ENGRAVINGS[0]; 
  candidateName: string;
}> = ({ foil, candidateName }) => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
    <div 
      className="w-full h-full absolute inset-0 flex flex-col justify-between select-none"
      style={{
        paddingTop: '17.5%',
        paddingBottom: '11.5%',
        paddingLeft: '21.5%',
        paddingRight: '13.5%',
        transform: 'rotate(-11.3deg) scale(0.72)',
        transformOrigin: 'center center',
      }}
    >
      {/* University Seal & Title */}
      <div className="text-center space-y-0.5">
        <UniversitySeal color={foil.color} style={{ filter: foil.svgStyle.filter }} />
        
        <h4 
          className="font-serif text-[7.5px] sm:text-[9.5px] font-extrabold leading-tight tracking-wide"
          style={foil.textStyle}
        >
          Università degli Studi
        </h4>
        <p 
          className="text-[5.5px] sm:text-[7px] font-serif font-semibold italic opacity-85 tracking-wide"
          style={foil.textStyle}
        >
          Dipartimento specializzato
        </p>
      </div>

      {/* Main Thesis Title Block */}
      <div className="text-center space-y-1 my-auto py-1.5">
        <h2 
          className="text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.2em] font-serif leading-none"
          style={foil.textStyle}
        >
          TESI
        </h2>
        <p 
          className="text-[6.5px] sm:text-[8px] italic font-serif leading-snug max-w-[90%] mx-auto font-medium"
          style={foil.textStyle}
        >
          "La tutela del patrimonio storico-artistico nel diritto internazionale ed europeo"
        </p>
      </div>

      {/* Candidate / Advisor section */}
      <div className="flex justify-between items-end text-[5px] sm:text-[6.5px] font-serif w-full px-1.5 leading-tight">
        <div className="text-left space-y-0.5">
          <p className="opacity-80 italic text-[4.5px] sm:text-[5.5px]" style={foil.textStyle}>Relatore</p>
          <p className="font-extrabold" style={foil.textStyle}>Chiar.mo Prof.</p>
          <p className="font-extrabold" style={foil.textStyle}>Annoluce</p>
        </div>
        <div className="text-right space-y-0.5">
          <p className="opacity-80 italic text-[4.5px] sm:text-[5.5px]" style={foil.textStyle}>Laureando</p>
          <p className="font-extrabold whitespace-nowrap" style={foil.textStyle}>
            {candidateName ? candidateName.toUpperCase() : 'BRUNO FIORETTI'}
          </p>
        </div>
      </div>

      {/* Academic Year */}
      <div className="text-center mt-0.5">
        <p 
          className="text-[5px] sm:text-[6px] font-serif font-bold tracking-widest opacity-80 uppercase"
          style={foil.textStyle}
        >
          Anno Accademico 2025/26
        </p>
      </div>
    </div>
  </div>
);

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
  engravingColor?: string;
}

const slideVariants = {
  initial: (direction: 'up' | 'down') => ({
    y: direction === 'up' ? 120 : -120,
    opacity: 0,
    scale: 0.98,
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "spring", stiffness: 320, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 }
    }
  },
  exit: (direction: 'up' | 'down') => ({
    y: direction === 'up' ? -120 : 120,
    opacity: 0,
    scale: 0.98,
    transition: {
      y: { type: "spring", stiffness: 320, damping: 28 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  })
};

const App: React.FC = () => {
  const [tJobs, setTJobs] = useState<Job[]>([]);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState(0);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [activeSections, setActiveSections] = useState({ covers: false, calc: false, summary: true });
  const [selectedMatIndex, setSelectedMatIndex] = useState<number | null>(null);
  const [showCraftsmanshipModal, setShowCraftsmanshipModal] = useState(false);
  const [activeEngravings, setActiveEngravings] = useState<Record<number, string>>({});
  const [introUnlocked, setIntroUnlocked] = useState(false);
  
  const modalEngravingId = selectedMatIndex !== null 
    ? (() => {
        const mat = THESIS_MATS[selectedMatIndex];
        const allowed = getAllowedEngravingsForMat(mat.n);
        const current = activeEngravings[selectedMatIndex];
        if (current && allowed.some(e => e.id === current)) {
          return current;
        }
        return allowed[0]?.id || 'oro_brillante';
      })()
    : 'oro_brillante';
  const modalFoil = ENGRAVINGS.find(e => e.id === modalEngravingId) || ENGRAVINGS[0];
  
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
    if (isStarted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (introUnlocked) {
      setTimeout(() => {
        const el = document.getElementById('startup-carousel');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isStarted, currentStep, introUnlocked]);

  useEffect(() => {
    const logOpening = async () => {
      if (!GSHEET_URL) return;
      try {
        const payload = {
          azione: "APERTURA",
          cliente: "VISITATORE",
          categoria: "ACCESSO SITO",
          totale: "0.00",
          copie: 0,
          dettagli: "Accesso alla pagina di consultazione/preventivo",
          dispositivo: navigator.userAgent,
          risoluzione: `${window.screen.width}x${window.screen.height}`,
          lingua: navigator.language || 'it'
        };
        await fetch(GSHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.error("Error logging opening:", e);
      }
    };
    logOpening();
  }, []);

  const handleThesisSelect = (idx: number) => {
    const mat = THESIS_MATS[idx];
    const allowed = getAllowedEngravingsForMat(mat.n);
    const chosenActive = activeEngravings[idx];
    const chosenEngraving = chosenActive && allowed.some(e => e.id === chosenActive)
      ? chosenActive
      : allowed[0]?.id || 'oro_brillante';
    setTJobs([...tJobs, { 
      id: Date.now().toString(), 
      name: mat.n, 
      bwPages: 0, 
      colorPages: 0, 
      cps: 1, 
      matIdx: idx,
      engravingColor: chosenEngraving 
    }]);
    setDirection('up');
    setIsStarted(true);
    setCurrentStep(1);
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
    
    // Generiamo una descrizione estremamente dettagliata per ciascuna tesi presente
    const dettagliLavori = tJobs.map((j, idx) => {
      const mat = THESIS_MATS[j.matIdx];
      const costoSingolo = calculateJobCost(j);
      const engravingLabel = ENGRAVINGS.find(e => e.id === (j.engravingColor || 'oro_brillante'))?.name || 'ORO brillante';
      return `Tesi #${idx + 1} (${j.name}) - Incisione: ${engravingLabel} | Copie: ${j.cps} | Pagg. B&N: ${j.bwPages} (${fmt(j.bwPages * PRICING.bw)}) | Pagg. Colori: ${j.colorPages} (${fmt(j.colorPages * PRICING.color.base)}) | Copertina: ${fmt(mat?.p || 30)} (Subtotale tesi: ${fmt(costoSingolo)})`;
    }).join('; ');

    const payload = {
      azione: "PREVENTIVO",
      cliente: customer.toUpperCase() || 'ANONIMO WEB',
      categoria: 'PREVENTIVO TESI',
      totale: total.toFixed(2),
      copie: tJobs.reduce((acc, j) => acc + safeNum(j.cps), 0),
      dettagli: dettagliLavori,
      dispositivo: navigator.userAgent,
      risoluzione: `${window.screen.width}x${window.screen.height}`,
      lingua: navigator.language || 'it'
    };

    try {
      await fetch(GSHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error("Error logging to spreadsheet:", e);
    }
  };

  const [showSavedToast, setShowSavedToast] = useState(false);

  const saveReceiptPng = () => {
    logToSheet();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurazione dimensioni del volantino/scontrino
    const width = 750;
    const headerHeight = 310;
    const itemHeight = 170;
    const footerHeight = 240;
    const height = headerHeight + (tJobs.length * itemHeight) + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Sfondo carta premium - leggermente avorio/grigio chiaro caldissimo
    ctx.fillStyle = '#FAF9F6';
    ctx.fillRect(0, 0, width, height);

    // Bordo decorativo esterno doppio
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // --- SEZIONE INTESTAZIONE (HEADER) ---
    // Logo Circolare Elegante
    const logoX = width / 2;
    const logoY = 90;
    const logoRadius = 38;
    ctx.beginPath();
    ctx.arc(logoX, logoY, logoRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#111827'; // Dark slate/nero elegante
    ctx.fill();

    // Iniziali "SP" inside logo
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SP', logoX, logoY + 2);

    // Nome Brand
    ctx.font = 'black 32px sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText('SUDPEN', width / 2, 175);

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('STAMPA E RILEGATURA TESI D\'ECCELLENZA', width / 2, 202);

    // Linea tratteggiata di separazione superiore
    ctx.beginPath();
    ctx.setLineDash([8, 6]);
    ctx.moveTo(40, 225);
    ctx.lineTo(width - 40, 225);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // Ripristina linea continua

    // Dettagli Ordine
    ctx.textAlign = 'left';
    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = '#4B5563';
    const dataCorrente = new Date().toLocaleString('it-IT', { 
      day: '2-digit', month: '2-digit', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
    ctx.fillText(`DATA: ${dataCorrente}`, 50, 260);
    
    const codiceOrdine = `TESI-${Math.floor(100000 + Math.random() * 900000)}`;
    ctx.fillText(`PREVENTIVO: ${codiceOrdine}`, 50, 285);

    ctx.textAlign = 'right';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText(`CLIENTE: ${customer.toUpperCase()}`, width - 50, 260);
    
    ctx.font = 'italic 12px monospace';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('Riepilogo preventivo non fiscale', width - 50, 285);

    // Linea solida prima degli articoli
    ctx.beginPath();
    ctx.moveTo(40, 310);
    ctx.lineTo(width - 40, 310);
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 3;
    ctx.stroke();

    // --- SEZIONE ARTICOLI (ITEMS) ---
    let currentY = 345;
    tJobs.forEach((j, idx) => {
      const mat = THESIS_MATS[j.matIdx];
      const engravingLabel = ENGRAVINGS.find(e => e.id === (j.engravingColor || 'oro_brillante'))?.name || 'ORO brillante';
      const costoArticolo = calculateJobCost(j);

      // Titolo Tesi a sinistra
      ctx.textAlign = 'left';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#1E3A8A'; // Deep Navy Blue
      ctx.fillText(`#${idx + 1} TESI: ${j.name.toUpperCase()}`, 50, currentY);

      // Prezzo a destra
      ctx.textAlign = 'right';
      ctx.font = 'bold 21px sans-serif';
      ctx.fillStyle = '#111827';
      ctx.fillText(fmt(costoArticolo), width - 50, currentY);

      // Dettagli a sinistra
      ctx.textAlign = 'left';
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText(`• Incisione: ${engravingLabel.toUpperCase()}`, 65, currentY + 32);
      ctx.fillText(`• Copie: ${j.cps} pz  |  Pagine B&N: ${j.bwPages}  |  Pagine Colori: ${j.colorPages}`, 65, currentY + 58);

      // Composizione prezzo
      ctx.font = 'italic 12.5px sans-serif';
      ctx.fillStyle = '#6B7280';
      const prezzoBase = mat?.p || 30;
      const costoBw = j.bwPages * PRICING.bw;
      const costoColore = j.colorPages * PRICING.color.base;
      ctx.fillText(`[Copia singola: Copertina ${fmt(prezzoBase)} + Stampato B&N ${fmt(costoBw)} + Stampato Colori ${fmt(costoColore)}]`, 65, currentY + 82);

      // Separatore tratteggiato tra articoli
      if (idx < tJobs.length - 1) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(50, currentY + 110);
        ctx.lineTo(width - 50, currentY + 110);
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      currentY += itemHeight;
    });

    // Spazio prima del totale
    currentY += 10;

    // Linea solida prima del totale
    ctx.beginPath();
    ctx.moveTo(40, currentY);
    ctx.lineTo(width - 40, currentY);
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 3;
    ctx.stroke();

    currentY += 45;

    // --- SEZIONE TOTALI ---
    ctx.textAlign = 'left';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#374151';
    const totalCopies = tJobs.reduce((acc, j) => acc + safeNum(j.cps), 0);
    ctx.fillText(`COPIE TOTALI: ${totalCopies}`, 50, currentY);

    ctx.textAlign = 'right';
    ctx.font = 'black 32px sans-serif';
    ctx.fillStyle = '#059669'; // Emerald Green
    ctx.fillText(`TOTALE COMPLESSIVO: ${fmt(total)}`, width - 50, currentY + 5);

    ctx.textAlign = 'left';
    ctx.font = 'italic 12px sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('Prezzi comprensivi di IVA e rilegatura professionale tesi.', 50, currentY + 32);

    // --- SEZIONE FOOTER ---
    currentY += 100;
    
    // Linea ondulata o tratteggiata finale
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.moveTo(120, currentY);
    ctx.lineTo(width - 120, currentY);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    currentY += 35;
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#1E3A8A';
    ctx.fillText('GRAZIE PER AVER SCELTO SUDPEN!', width / 2, currentY);

    ctx.font = 'italic 13.5px sans-serif';
    ctx.fillStyle = '#4B5563';
    ctx.fillText('Salva questa ricevuta in galleria e mostrala in sede per procedere con la stampa.', width / 2, currentY + 26);

    // Download dell'immagine in PNG
    const link = document.createElement('a');
    link.download = `SUDPEN_RICEVUTA_${customer.toUpperCase().replace(/\s+/g, '_') || 'TESI'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Mostra un feedback all'utente
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 4000);
  };

  const calculateJobCost = (j: Job) => {
      const mat = THESIS_MATS[j.matIdx];
      const cost = ((safeNum(j.bwPages) * PRICING.bw) + (safeNum(j.colorPages) * PRICING.color.base) + (mat?.p || 30)) * safeNum(j.cps);
      return cost;
  }
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-6 space-y-6">
      
      {/* Selected Material Modal */}
      <AnimatePresence>
        {false && (
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
                className="bg-white w-full max-w-md rounded-3xl overflow-y-auto max-h-[90vh] shadow-2xl no-scrollbar flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative w-full aspect-[3/4] bg-gray-900 overflow-hidden shrink-0">
                  <img 
                    src={THESIS_MATS[selectedMatIndex].img} 
                    alt={THESIS_MATS[selectedMatIndex].n} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dynamic engraving overlay in Modal */}
                  <ThesisCoverOverlay foil={modalFoil} candidateName={customer} />

                  <button 
                    onClick={() => setSelectedMatIndex(null)}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors z-10"
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
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider">
                        Incisione: {modalFoil.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 px-6 pb-6 shrink-0">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* 2. CONFIGURATORE STEP-BY-STEP */}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {!isStarted && (
          <motion.div
            key="screen-covers"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
             {/* 4. SCHERMATA DI AVVIO / CONFIGURATORE */}
             <div className="bg-white rounded-4xl p-10 card-shadow flex flex-col items-center animate-slide">
                <div className="w-full flex flex-col items-center gap-10">
                  <img src={LOGO_URL} className="h-32 w-auto opacity-100" alt="Sudpen" />
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Preventivo Tesi</h1>
                    <p className="text-gray-400 text-sm font-medium">Calcola il costo della tua tesi in 1 minuto.</p>
                  </div>
                  <div className="w-full flex flex-col items-center gap-4">
                    <button 
                      onClick={() => setShowCraftsmanshipModal(true)}
                      className="text-gray-500 hover:text-gray-700 font-extrabold text-sm tracking-wider uppercase flex items-center gap-2 py-2 transition-colors duration-200 cursor-pointer"
                    >
                      Scopri di più <Info size={16} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => {
                        setIntroUnlocked(true);
                        setTimeout(() => {
                          const el = document.getElementById('startup-carousel');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 150);
                      }}
                      className="relative overflow-hidden w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 btn-touch shadow-lg shadow-emerald-900/20 cursor-pointer"
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', repeatDelay: 1 }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        Iniziamo <ArrowDown size={20} />
                      </span>
                    </button>
                  </div>
                </div>
             </div>

             {/* Carosello Scelta Copertine */}
             {introUnlocked && (
               <div id="startup-carousel" className="space-y-2 animate-slide" style={{ animationDelay: '0.1s' }}>
                   {/* Reel Container */}
                   <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-6 px-6 py-3 flex flex-row gap-5">
                     {THESIS_MATS.map((m, i) => {
                       const allowedFoilOptions = getAllowedEngravingsForMat(m.n);
                       const engravingId = activeEngravings[i] && allowedFoilOptions.some(x => x.id === activeEngravings[i])
                         ? activeEngravings[i]
                         : allowedFoilOptions[0]?.id || 'oro_brillante';
                       const currentFoil = ENGRAVINGS.find(e => e.id === engravingId) || ENGRAVINGS[0];

                       return (
                         <motion.div 
                           key={i} 
                           className="w-[82vw] max-w-[310px] snap-center snap-always flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 shrink-0 cursor-default"
                           animate={i === 0 ? {
                             x: [0, -35, 10, 0]
                           } : { x: 0 }}
                           transition={i === 0 ? {
                             delay: 2,
                             duration: 1.2,
                             ease: "easeInOut"
                           } : {}}
                         >
                           <div className="w-full aspect-[3/4] relative bg-gray-900 overflow-hidden shrink-0">
                             <img 
                               src={m.img} 
                               alt={m.n} 
                               className="w-full h-full object-cover"
                               loading="lazy"
                             />
                             
                             {/* Dynamic engraving overlay */}
                             <ThesisCoverOverlay foil={currentFoil} candidateName={customer} />

                             {/* Swipe Hint on First Image */}
                             {i === 0 && (
                               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                                  <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: [0, 1, 0], x: [20, 0, -20] }}
                                    transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="bg-black/50 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                                  >
                                     Swipe <ArrowLeft size={14} />
                                  </motion.div>
                               </div>
                             )}
                           </div>

                           {/* Swatch Selectors for Engraving */}
                           <div className="pt-3 pb-2 flex flex-col items-center justify-center space-y-1.5 bg-white shrink-0">
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                               Incisione: <span className="font-extrabold text-black">{currentFoil.name}</span>
                             </span>
                             <div className="flex gap-1.5 items-center">
                               {allowedFoilOptions.map((e) => {
                                 const isSelected = engravingId === e.id;
                                 return (
                                   <button
                                     key={e.id}
                                     type="button"
                                     onClick={(ev) => {
                                       ev.stopPropagation(); // Evita l'apertura della modale
                                       setActiveEngravings(prev => ({ ...prev, [i]: e.id }));
                                     }}
                                     className={`w-6 h-6 rounded-full border transition-all active:scale-90 ${
                                       isSelected 
                                         ? 'border-brandBlue scale-110 shadow-sm shadow-brandBlue/35' 
                                         : 'border-transparent hover:border-gray-300 hover:scale-105'
                                     } p-[2px] bg-white cursor-pointer`}
                                     title={e.name}
                                   >
                                     <div className={`w-full h-full rounded-full ${e.bgClass}`} />
                                   </button>
                                 );
                               })}
                             </div>
                           </div>

                           <div className="pt-1 pb-4 px-4 flex flex-col gap-3 bg-white shrink-0">
                              <div className="flex justify-center">
                                <span className="px-3.5 py-1.5 bg-brandBlue/5 text-brandBlue font-extrabold text-xs rounded-full uppercase tracking-wider">
                                  Prezzo Copertina: {fmt(m.p)}
                                </span>
                              </div>
                              
                              <button
                                type="button"
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  handleThesisSelect(i);
                                }}
                                className="relative overflow-hidden w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                {/* Shimmer effect */}
                                <motion.div
                                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none"
                                  initial={{ x: '-100%' }}
                                  animate={{ x: '100%' }}
                                  transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', repeatDelay: 1 }}
                                />
                                <span className="relative z-10 flex items-center gap-1.5">
                                  Scegli soluzione <ArrowDown size={14} />
                                </span>
                              </button>
                           </div>
                         </motion.div>
                       );
                     })}
                   </div>
               </div>
             )}
          </motion.div>
        )}

        {/* STEP 1: CONFIGURAZIONE PAGINE & COPIE */}
        {isStarted && currentStep === 1 && (
          <motion.div
            key="screen-step1"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            ref={detailsRef}
            className="space-y-6"
          >
            {/* Tasto Sali in cima */}
            <button
              onClick={() => {
                setDirection('down');
                setIsStarted(false);
                setCurrentStep(1);
              }}
              className="w-full h-11 bg-slate-200/90 hover:bg-slate-300 text-slate-700 font-extrabold text-xs uppercase rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-slate-300/60 shadow-sm cursor-pointer"
            >
              <ArrowUp size={16} className="animate-bounce" /> Sali (Cambia Copertina)
            </button>
            {tJobs.length > 0 ? (
              <div className="space-y-6">
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
                          
                          {/* Incisione scelta */}
                          <div className="flex items-center gap-1.5 mt-1 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100 w-fit">
                            <span className="text-[9px] font-extrabold text-gray-400 uppercase">Incisione scelta:</span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2.5 h-2.5 rounded-full ${ENGRAVINGS.find(e => e.id === j.engravingColor)?.bgClass || 'bg-gradient-to-br from-[#FFE89C] via-[#D4AF37] to-[#9E7815]'} shadow-inner`} />
                              <span className="text-[9px] font-black uppercase text-gray-700">
                                {ENGRAVINGS.find(e => e.id === j.engravingColor)?.name || 'ORO brillante'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setTJobs(p => p.filter(x => x.id !== j.id))} className="text-gray-300 p-1 hover:text-red-400 transition-colors cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Didascalia nera ben visibile */}
                    <div>
                      <p className="text-xs font-extrabold text-gray-900 text-center leading-tight">
                        Inserisci il numero di pagine della tesi o carica il tuo file PDF per l'analisi automatica.
                      </p>
                    </div>

                    {/* Tasto Analizza PDF */}
                    <div className="pt-1">
                       <button 
                          onClick={() => {
                            const el = document.getElementById(`f-${j.id}`) as HTMLInputElement;
                            el?.click();
                          }} 
                          className="w-full h-12 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all border border-emerald-200 cursor-pointer shadow-sm" 
                        >
                          {analyzingId === j.id ? <Loader2 className="animate-spin" size={18} /> : <FileScan size={18} />}
                          {analyzingId === j.id ? 'Analisi del file in corso...' : 'Carica & Analizza PDF'}
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
                        {j.fileName && (
                          <div className="mt-2 text-center text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Analizzato: {j.fileName}
                          </div>
                        )}
                    </div>

                    {/* Campi di input migliorati, visualizzati come righe con didascalie */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between gap-4 bg-gray-50/70 p-3.5 rounded-3xl border border-gray-100/80 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-800 uppercase tracking-tight">Pagine Bianco & Nero</span>
                          <span className="text-[10px] text-gray-400 font-bold leading-normal">Pagine di solo testo o tabelle</span>
                        </div>
                        <div className="w-32 shrink-0">
                          <NumIn v={j.bwPages} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, bwPages: v as number} : x))} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 bg-gray-50/70 p-3.5 rounded-3xl border border-gray-100/80 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-800 uppercase tracking-tight">Pagine a Colori</span>
                          <span className="text-[10px] text-gray-400 font-bold leading-normal">Immagini, grafici o elementi colorati</span>
                        </div>
                        <div className="w-32 shrink-0">
                          <NumIn v={j.colorPages} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, colorPages: v as number} : x))} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 bg-gray-50/70 p-3.5 rounded-3xl border border-gray-100/80 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-800 uppercase tracking-tight">Numero di Copie</span>
                          <span className="text-[10px] text-gray-400 font-bold leading-normal">Quante copie desideri stampare</span>
                        </div>
                        <div className="w-32 shrink-0">
                          <NumIn v={j.cps} min={1} onChange={v => setTJobs(p => p.map(x => x.id === j.id ? {...x, cps: v as number} : x))} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Pulsante per aggiungere un'altra tesi */}
                <button 
                  onClick={() => {
                    setDirection('down');
                    setIsStarted(false);
                    setCurrentStep(1);
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/20 hover:border-white/45 text-white/70 hover:text-white rounded-3xl font-extrabold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer bg-white/5 active:scale-[0.98]"
                >
                  ➕ Aggiungi un'altra tesi / copertina
                </button>

                {/* Shimmering Button to proceed to summary */}
                <button
                  onClick={() => {
                    setDirection('up');
                    setCurrentStep(2);
                  }}
                  className="relative overflow-hidden w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 btn-touch shadow-lg shadow-emerald-900/20 cursor-pointer mt-8"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', repeatDelay: 1 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Calcola Preventivo <ArrowDown size={20} className="animate-bounce" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-4xl p-10 text-center space-y-4">
                <p className="text-white/40 text-sm font-medium italic">Nessuna copertina nel preventivo. Torna alla schermata iniziale per sceglierne una.</p>
                <button 
                  onClick={() => {
                    setDirection('down');
                    setIsStarted(false);
                  }}
                  className="mx-auto block bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer border border-white/10 active:scale-[0.98]"
                >
                  ↩ Scegli Copertina
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 2: RIEPILOGO E ORDINE */}
        {isStarted && currentStep === 2 && (
          <motion.div
            key="screen-step2"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            {/* Tasto Sali in cima al Step 2 */}
            <button
              onClick={() => {
                setDirection('down');
                setCurrentStep(1);
              }}
              className="w-full h-11 bg-slate-200/90 hover:bg-slate-300 text-slate-700 font-extrabold text-xs uppercase rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-slate-300/60 shadow-sm cursor-pointer"
            >
              <ArrowUp size={16} className="animate-bounce" /> Sali (Modifica Pagine)
            </button>

            <div className="bg-white rounded-4xl p-6 card-shadow space-y-6 border border-gray-100">
              {tJobs.length > 0 ? (
                <div className="space-y-6">
                  {/* Ricevuta di riepilogo costi */}
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Dettagli Articoli</h4>
                    <div className="space-y-4 divide-y divide-gray-100">
                      {tJobs.map((j, idx) => {
                        const mat = THESIS_MATS[j.matIdx];
                        const jobCost = calculateJobCost(j);
                        const engravingLabel = ENGRAVINGS.find(e => e.id === (j.engravingColor || 'oro_brillante'))?.name || 'ORO brillante';
                        return (
                          <div key={j.id} className="pt-4 first:pt-0 space-y-1">
                            <div className="flex justify-between items-start">
                              <span className="font-black text-sm uppercase text-gray-900 leading-tight">
                                #{idx + 1} {j.name}
                              </span>
                              <span className="font-black text-sm text-brandBlue">{fmt(jobCost)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] text-gray-500 font-medium">
                              <div>Incisione: <span className="font-bold text-gray-800 uppercase">{engravingLabel}</span></div>
                              <div>Copertina: {fmt(mat.p)}</div>
                              <div>Pagine B&N: {j.bwPages} ({fmt(j.bwPages * PRICING.bw)})</div>
                              <div>Pagine Colori: {j.colorPages} ({fmt(j.colorPages * PRICING.color.base)})</div>
                              <div className="col-span-2 border-t border-dashed border-gray-100 mt-1 pt-1">
                                Numero copie: <span className="font-bold text-gray-800">{j.cps}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Totale */}
                  <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-emerald-800/60 tracking-wider">Totale Preventivato</span>
                      <span className="text-xs text-emerald-800/80 font-medium">IVA inclusa, stampa professionale</span>
                    </div>
                    <span className="text-3xl font-black text-emerald-700">{fmt(total)}</span>
                  </div>

                  {/* Input Nome */}
                  <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Intestazione Ordine (Nome e Cognome)</label>
                      <input 
                        type="text" 
                        placeholder="INSERISCI IL TUO NOME PER IL FRONTESPIZIO" 
                        value={customer} 
                        onChange={e => setCustomer(e.target.value)} 
                        className="w-full h-14 px-5 border rounded-xl font-bold text-sm uppercase focus:ring-2 focus:ring-brandBlue/10 focus:border-brandBlue outline-none transition-all placeholder:text-gray-300 bg-gray-50" 
                      />
                  </div>

                  {/* Tasto Salva Ordine in Galleria (Sblocca con Nome) */}
                  <button 
                      onClick={saveReceiptPng} 
                      disabled={tJobs.length === 0 || !customer.trim()}
                      className={`relative overflow-hidden w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all btn-touch cursor-pointer ${
                        !customer.trim() 
                          ? "bg-gray-150 text-gray-400 border border-gray-300/60 cursor-not-allowed shadow-none" 
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/20"
                      }`}
                  >
                    {/* Shimmer effect only when unlocked */}
                    {customer.trim() && (
                      <motion.div
                        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', repeatDelay: 1 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      {!customer.trim() ? (
                        <>
                          Inserisci il nome per salvare <Lock size={18} className="text-gray-400" />
                        </>
                      ) : (
                        <>
                          Salva Ordine in Galleria <Download size={20} className="animate-bounce" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm font-medium">Nessun articolo nel preventivo</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* FOOTER INFO */}
      <div className="pt-8 pb-12 text-center">
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">sudpen listino aggiornato a : aprile 2026</p>
      </div>
      <CraftsmanshipModal isOpen={showCraftsmanshipModal} onClose={() => setShowCraftsmanshipModal(false)} />
      
      {/* Toast Notifica Salvataggio Ricevuta */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-slate-900 border border-emerald-500/30 text-white rounded-3xl p-5 shadow-2xl flex items-center gap-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 size={24} className="animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider">Ricevuta Salvata!</p>
              <p className="text-white/70 text-xs font-medium">Scontrino PNG scaricato con successo nella tua galleria.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Analytics />
    </div>
  );
};

export default App;
