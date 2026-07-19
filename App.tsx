import React, { useState, useRef, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { 
  Sparkles, Trash2, Loader2, FileScan, 
  Send, Plus, Minus, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, User, Palette, Receipt, CheckCircle2, X
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

const DRIVE_FILES = [
  "1NzMPILRqejS72BrWCNmTd9U_EdwhDPXJ",
  "1dPSmDdZgBamtGo6kF5rwJGnmF9P8JGRu",
  "18g18BkdXJffLpoBXgchkaN0P2vIEuUIr",
  "1a2nduEHKppdaJtYCIBJAeO-9amEPzaoz",
  "1hifQmyFeRx7COH9powFJ42ZuVcRsLq3Z",
  "1ykZRxGwr84pDYGgM90LMve_K_dc1U80I",
  "1ewggZsRJc8AW4SGQMEQHoUOjZ6xNu17k",
  "1_44fZkwNu4K2f-Ll4rUSt2VC9gjArwKp",
  "1OTXJPRK2ZCjNDMF_WuQ7YnSx0sY9fTkD",
  "1NVoz3ESrSaxhmlFC1uYw9b3Jfm_LiIiJ",
  "1k2QQxwER29Vd4ITwb_u1mid5nw1I4M6l",
  "1X8U6C9zT4LXUwmag3JnQtopy6tKFj73o",
  "1VN2Vxlo4moNpRdLS-txi9a_SUC0dJxHt",
  "1E67nFkbR0M7oerPlFfPqfLF0aFQi6yE2",
  "1Ak235jXY5inHbh_g5kENYQ4Llawno_x3",
  "1lJMikMkYy4Z4T7riq88TaeXthl_PCfRa",
  "1UTRa4pMqYQ0ngXN3C8o7F_ZtcKzVaTCx",
  "11ztNyTFOtKM_CL1W-3kysTj7YPtgDpoG",
  "1UDUe04-hvsqDqKVy8ZfyMceUvSO2haqw",
  "1d5MbekrN10zLk9vNHKmR-hS_otPyOhyn",
  "1LVSOXG2KSkr30m1mQ1QbSYwBD9Oez7LD",
  "1h4XVHMzd3mElnylBzhVYyupSMT2j8x4S",
  "1430751nlr4uk1HJfxCI6O3Mi3L0GBzDe",
  "16SBiVtwHMk2xmAj41fWWDMw5nGPrh1TF",
  "1y7B2bzt0e8RBMicsMRtOnNS-gTq4UdkE",
  "1xOXWm436pnQ2o5glR7WIdAuS3p8aGEo3",
  "1VQEdU6kiNiHMsnGaYreQIcHkMPHbMrdt",
  "1BaaEh7JpxTkM-bxZ-CFvOfQv0f5UwdOm",
  "1542bES9oDQva8ZO7N37GpX-ypszS1qlp",
  "1uspDjoh9O5GwXoEhO92scsaeIIPWWMMP",
  "1FhxphBXocf4dJQC45xMBzDqq6xftDb7N",
  "1s8ct69skGFllCuPk0GWo0KMG9fUBXjzZ",
  "1hslF54wyVPmfKUF6k7TZ3eTL4WdwbfJk",
  "1YFcuRj6QvMPuHiEpnoYYt1-4Iho7DIkX",
  "1XpoKUOnnVEN_-0ovZEYqjPXhUllwwRdl",
  "1xJM0kxxBzw6VCzFrnTzXZvVX9z3cXG3e",
  "1GXJXqzj-q9vs_Ri2W90PxVhmRX3FlpVE",
  "1S36XFjYUx449qKhzjD9RL5FNAcKbkMXo",
  "1WSaH45EvTb1ZdLabzLxSvcIGpN5TVk8W",
  "10zGkGncN5wi8ldtbBXz8mGLPv0KFVfhW"
];

const App: React.FC = () => {
  const [tJobs, setTJobs] = useState<Job[]>([]);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState(0);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeSections, setActiveSections] = useState({ covers: false, calc: false, summary: true });
  const [selectedMatIndex, setSelectedMatIndex] = useState<number | null>(null);
  const [showCraftsmanshipModal, setShowCraftsmanshipModal] = useState(false);
  const [activeEngravings, setActiveEngravings] = useState<Record<number, string>>({});
  const [showAligner, setShowAligner] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manualMatches, setManualMatches] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('drive_manual_matches_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const initial: Record<string, string> = {};
    Object.entries(DRIVE_IMAGE_IDS).forEach(([matName, driveId]) => {
      initial[matName] = driveId;
    });
    return initial;
  });

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('drive_api_key') || '');
  const [isLoadingNames, setIsLoadingNames] = useState(false);
  const [fetchedFileNames, setFetchedFileNames] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('drive_fetched_file_names');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });
  const [pasteInput, setPasteInput] = useState('');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('drive_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('drive_fetched_file_names', JSON.stringify(fetchedFileNames));
  }, [fetchedFileNames]);

  const handleAutoAlignWithNames = (namesMap: Record<string, string>) => {
    const updatedMatches = { ...manualMatches };
    let alignedCount = 0;

    THESIS_MATS.forEach(m => {
      // Trova se esiste un file di Drive con nome simile al nome del materiale
      const foundId = Object.keys(namesMap).find(driveId => {
        const driveFileName = namesMap[driveId];
        if (!driveFileName) return false;

        const cleanMat = m.n.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanFile = driveFileName.toLowerCase()
          .replace(/\.(jpg|jpeg|png|webp|gif|bmp)/gi, '')
          .replace(/[^a-z0-9]/g, '');

        return cleanMat === cleanFile || cleanMat.includes(cleanFile) || cleanFile.includes(cleanMat);
      });

      if (foundId) {
        updatedMatches[m.n] = foundId;
        alignedCount++;
      }
    });

    setManualMatches(updatedMatches);
    return alignedCount;
  };

  const handleParseAndApplyPastedList = (text: string) => {
    if (!text.trim()) {
      setToastMessage({ type: 'error', text: 'Per favore, inserisci del testo da analizzare.' });
      return;
    }

    const lines = text.split('\n');
    const tempNames = { ...fetchedFileNames };
    let parsedCount = 0;

    lines.forEach(line => {
      const driveIdRegex = /1[a-zA-Z0-9_-]{32}/;
      const match = line.match(driveIdRegex);
      if (match) {
        const driveId = match[0];
        let fileName = line
          .replace(driveId, '')
          .replace(/https:\/\/drive\.google\.com\/[^\s]*/g, '')
          .replace(/[\/?:=,;_➔>\t()\"\'\[\]-]/g, ' ')
          .replace(/\.(jpg|jpeg|png|webp|gif|bmp)/gi, '')
          .trim();

        if (fileName) {
          tempNames[driveId] = fileName;
          parsedCount++;
        }
      }
    });

    if (parsedCount > 0) {
      setFetchedFileNames(tempNames);
      const alignedCount = handleAutoAlignWithNames(tempNames);
      setToastMessage({
        type: 'success',
        text: `Trovati e importati ${parsedCount} file di Drive! Di questi, ${alignedCount} materiali sono stati allineati automaticamente.`
      });
      setPasteInput('');
    } else {
      setToastMessage({
        type: 'error',
        text: 'Nessun ID di Drive valido con nome file trovato nel testo inserito. Assicurati che ogni riga contenga un ID di 33 caratteri e il relativo nome.'
      });
    }
  };

  const handleFetchNamesWithApiKey = async () => {
    if (!apiKey.trim()) {
      setToastMessage({ type: 'error', text: 'Per favore, inserisci una chiave API di Google valida.' });
      return;
    }

    setIsLoadingNames(true);
    setToastMessage({ type: 'info', text: 'Recupero dei nomi dei file da Google Drive in corso...' });
    const tempNames = { ...fetchedFileNames };
    let successCount = 0;

    await Promise.all(
      DRIVE_FILES.map(async (driveId) => {
        try {
          const res = await fetch(`https://www.googleapis.com/drive/v3/files/${driveId}?key=${apiKey.trim()}`);
          if (res.ok) {
            const data = await res.json();
            if (data.name) {
              tempNames[driveId] = data.name;
              successCount++;
            }
          }
        } catch (e) {
          console.error("Errore fetch nome per", driveId, e);
        }
      })
    );

    setFetchedFileNames(tempNames);
    setIsLoadingNames(false);

    if (successCount > 0) {
      const alignedCount = handleAutoAlignWithNames(tempNames);
      setToastMessage({
        type: 'success',
        text: `Nomi recuperati da Drive: ${successCount}/40! Allineati automaticamente ${alignedCount} materiali.`
      });
    } else {
      setToastMessage({
        type: 'error',
        text: 'Errore nel recupero. Verifica che la Chiave API sia corretta e che i file di Drive siano condivisi come "Chiunque abbia il link".'
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('drive_manual_matches_v2', JSON.stringify(manualMatches));
  }, [manualMatches]);
  
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

  const sendWa = () => {
    logToSheet();
    let txt = `*PREVENTIVO TESI SUDPEN*\n`;
    txt += `------------------------------\n`;
    txt += `Cliente: ${customer.toUpperCase() || 'N/D'}\n`;
    tJobs.forEach((j) => {
      const engravingLabel = ENGRAVINGS.find(e => e.id === (j.engravingColor || 'oro_brillante'))?.name || 'ORO brillante';
      txt += `\ncopertina selezionata : ${j.name.toUpperCase()}\n`;
      txt += `Incisione: ${engravingLabel.toUpperCase()}\n`;
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
        <div className="space-y-2 animate-slide" style={{ animationDelay: '0.1s' }}>
            <div className="px-1 text-white/80 text-xs font-black uppercase tracking-widest mb-1 flex items-center justify-between">
              <span>Sfoglia le Copertine</span>
              <span className="text-[10px] font-medium opacity-60 normal-case">Scorri di lato →</span>
            </div>
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
                    className="w-[82vw] max-w-[310px] snap-center snap-always flex flex-col bg-white cursor-pointer rounded-3xl overflow-hidden shadow-xl border border-gray-100 shrink-0"
                    onClick={() => setSelectedMatIndex(i)}
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

                    {/* Swatch Selectors for Engraving (SOPRA prezzo copertina) */}
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
                              } p-[2px] bg-white`}
                              title={e.name}
                            >
                              <div className={`w-full h-full rounded-full ${e.bgClass}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-1 pb-4 flex items-center justify-center bg-white shrink-0">
                       <span className="px-3.5 py-1.5 bg-brandBlue/5 text-brandBlue font-extrabold text-xs rounded-full uppercase tracking-wider">
                         Prezzo Copertina: {fmt(m.p)}
                       </span>
                    </div>
                  </motion.div>
                );
              })}
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
                    
                    {/* Scelta colore incisione per questo preventivo */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Colore Incisione Copertina</label>
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const allowedForMat = getAllowedEngravingsForMat(j.name);
                          const activeColorId = j.engravingColor && allowedForMat.some(x => x.id === j.engravingColor)
                            ? j.engravingColor
                            : allowedForMat[0]?.id || 'oro_brillante';
                          return allowedForMat.map(e => {
                            const isSelected = activeColorId === e.id;
                            return (
                              <button
                                key={e.id}
                                type="button"
                                onClick={() => setTJobs(p => p.map(x => x.id === j.id ? { ...x, engravingColor: e.id } : x))}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all active:scale-[0.97] ${
                                  isSelected
                                    ? 'bg-brandBlue/10 text-brandBlue border-brandBlue/30'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full ${e.bgClass} shadow-inner`} />
                                <span>{e.name}</span>
                              </button>
                            );
                          });
                        })()}
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
                            const engravingLabel = ENGRAVINGS.find(e => e.id === (j.engravingColor || 'oro_brillante'))?.name || 'ORO brillante';
                            return (
                              <div key={j.id} className="pt-4 first:pt-0">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="font-black text-sm uppercase text-gray-800">{j.name}</span>
                                      <span className="font-bold text-sm text-gray-900">{fmt(jobCost)}</span>
                                  </div>
                                  <div className="text-[11px] text-gray-500 font-medium space-y-0.5">
                                      <div>Incisione: <span className="font-bold text-gray-700">{engravingLabel}</span></div>
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
            <div className="w-full flex flex-col items-center gap-4">
              <button 
                onClick={() => { setIsStarted(true); setActiveSections({ covers: true, calc: true, summary: true }); }}
                className="w-full h-16 bg-brandBlue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 btn-touch shadow-lg shadow-blue-900/20"
              >
                Iniziamo <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setShowCraftsmanshipModal(true)}
                className="text-brandBlue/90 hover:text-brandBlue font-extrabold text-sm tracking-wider uppercase flex items-center gap-2 py-2 transition-colors duration-200"
              >
                Scopri di più <Sparkles size={16} className="text-amber-500 fill-amber-500/20 animate-pulse" />
              </button>
            </div>
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



      {/* 5. ALLINEATORE VISIVO STRUMENTO */}
      <div className="mt-4 border-t border-white/10 pt-6">
        <button 
          onClick={() => setShowAligner(!showAligner)}
          className="mx-auto block text-white/40 hover:text-white/80 font-bold text-[10px] uppercase tracking-widest transition-colors py-2 px-4 rounded-full border border-white/5 bg-white/5 active:scale-[0.98] cursor-pointer"
        >
          {showAligner ? "❌ Chiudi Strumento Allineamento" : "🔧 Strumento Allineamento Immagini Drive"}
        </button>

        {showAligner && (
          <div className="mt-4 bg-white rounded-4xl p-6 text-gray-900 space-y-6 card-shadow animate-slide max-w-4xl mx-auto">
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase text-gray-800">Allineatore Immagini Google Drive</h3>
              <p className="text-xs text-gray-500">
                Usa questo strumento per associare ciascuno dei <strong>{THESIS_MATS.length} materiali</strong> all'immagine corretta presente su Google Drive.<br />
                A sinistra vedi la foto di riferimento originale (Vercel) che è corretta al 100%. A destra vedi la foto caricata da Google Drive. Seleziona l'immagine corretta dal menu a tendina o usa l'allineamento automatico.<br />
                Copia poi il codice JSON generato e incollalo in <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">data.ts</code>.
              </p>
            </div>

            {/* PANNELLO STRUMENTI INTELLIGENTI (OPZIONE B) */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brandBlue animate-pulse" />
                  <h4 className="text-sm font-black uppercase text-gray-800 tracking-wider">Opzione B: Allineamento Automatico Intelligente</h4>
                </div>
                <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Altamente Raccomandato
                </span>
              </div>

              {toastMessage && (
                <div className={`p-3 rounded-xl text-xs font-bold flex justify-between items-center ${
                  toastMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' :
                  toastMessage.type === 'error' ? 'bg-red-50 text-red-800 border border-red-100' :
                  'bg-blue-50 text-blue-800 border border-blue-100'
                }`}>
                  <span>{toastMessage.text}</span>
                  <button onClick={() => setToastMessage(null)} className="text-[10px] font-bold uppercase hover:underline opacity-60 ml-2">Chiudi</button>
                </div>
              )}

              <p className="text-xs text-gray-600 leading-relaxed">
                Dal momento che hai rinominato i file nella cartella Drive con i nomi corretti dei materiali, non è necessario fare l'associazione a mano! Scegli uno di questi due metodi per allineare tutto istantaneamente:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Metodo 1: Chiave API Google */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[9px] bg-gray-100 text-gray-600 font-black uppercase px-2 py-0.5 rounded">Metodo 1</span>
                    <h5 className="font-extrabold text-xs text-gray-900 uppercase">Verifica tramite Chiave API Google</h5>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Inserisci una chiave API di Google per recuperare in tempo reale i nomi reali di tutti i file direttamente da Drive.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Incolla qui la tua API Key di Google..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-xl text-xs font-mono bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brandBlue/20"
                    />
                    <button
                      onClick={handleFetchNamesWithApiKey}
                      disabled={isLoadingNames}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-black uppercase py-2.5 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoadingNames ? "Caricamento in corso..." : "🔍 Recupera Nomi e Allinea"}
                    </button>
                  </div>
                </div>

                {/* Metodo 2: Copia e Incolla la Lista dei File */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[9px] bg-gray-100 text-gray-600 font-black uppercase px-2 py-0.5 rounded">Metodo 2</span>
                    <h5 className="font-extrabold text-xs text-gray-900 uppercase">Copia e Incolla Lista File</h5>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Copia e incolla un testo qualsiasi contenente gli ID di Drive e i nomi dei file. L'app li estrarrà e li abbinerà automaticamente!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      placeholder="Esempio: &#10;VERDE PINO seta -> 1a2nduEHKppdaJtYCIBJAeO-9amEPzaoz&#10;Oppure incolla il testo inviato in chat o l'output di uno script..."
                      value={pasteInput}
                      onChange={(e) => setPasteInput(e.target.value)}
                      rows={2}
                      className="w-full p-2 border border-gray-200 rounded-xl text-xs font-mono bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brandBlue/20 resize-none"
                    />
                    <button
                      onClick={() => handleParseAndApplyPastedList(pasteInput)}
                      className="w-full bg-brandBlue hover:bg-brandBlue/90 text-white text-[11px] font-black uppercase py-2.5 px-3 rounded-xl transition-all cursor-pointer"
                    >
                      🚀 Analizza Testo e Allinea
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistiche allineamento */}
              <div className="bg-gray-100/60 p-3 rounded-2xl flex flex-wrap justify-between items-center gap-2 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span>File con nome conosciuto:</span>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full font-extrabold">
                    {Object.keys(fetchedFileNames).length} / 40
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {Object.keys(fetchedFileNames).length > 0 && (
                    <button
                      onClick={() => {
                        const count = handleAutoAlignWithNames(fetchedFileNames);
                        setToastMessage({ type: 'success', text: `Allineamento automatico rieseguito con successo! Associati ${count} materiali.` });
                      }}
                      className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-[10px] font-black uppercase rounded-lg cursor-pointer"
                    >
                      🔄 Riavvia Matching Intelligente
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setFetchedFileNames({});
                      setManualMatches({});
                      localStorage.removeItem('drive_fetched_file_names');
                      setToastMessage({ type: 'info', text: 'Stato di allineamento resettato.' });
                    }}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-lg cursor-pointer"
                  >
                    🗑️ Reset Allineamento
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 no-scrollbar divide-y divide-gray-100">
              {THESIS_MATS.map((m, idx) => {
                const keyNum = idx + 1;
                const selectedDriveId = manualMatches[m.n] || "";
                const driveImgUrl = selectedDriveId ? `https://lh3.googleusercontent.com/d/${selectedDriveId}` : "";
                
                // Controlla se lo stesso Drive ID è usato da più materiali (escluso se vuoto)
                const isDuplicated = selectedDriveId 
                  ? Object.values(manualMatches).filter(id => id === selectedDriveId).length > 1
                  : false;

                return (
                  <div key={m.n} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center py-4 first:pt-0">
                    <div className="text-xs font-black text-gray-400 w-8 shrink-0">#{keyNum}</div>
                    
                    {/* Visual Comparison */}
                    <div className="flex gap-4 items-center shrink-0">
                      {/* Vercel Ref (Correct) */}
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-gray-400">Ref Vercel</span>
                        <div className="w-14 h-18 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center">
                          <img 
                            src={m.img} 
                            alt={`${m.n} Ref`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="text-gray-300 font-bold">➔</div>

                      {/* Drive Current */}
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-gray-400">Drive</span>
                        <div className="w-14 h-18 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center relative">
                          {driveImgUrl ? (
                            <img 
                              src={driveImgUrl} 
                              alt={`${m.n} Drive`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-300 font-bold">Vuoto</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Material Selector & Drive ID dropdown */}
                    <div className="flex-1 w-full space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs uppercase text-gray-900">{m.n}</span>
                        {isDuplicated && (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-black uppercase rounded tracking-wider">
                            ⚠️ ID Duplicato
                          </span>
                        )}
                        {!selectedDriveId && (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-[8px] font-black uppercase rounded tracking-wider">
                            Non Associato
                          </span>
                        )}
                      </div>

                      <select
                        value={selectedDriveId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setManualMatches(prev => ({ ...prev, [m.n]: val }));
                        }}
                        className="w-full p-2 border rounded-xl text-xs bg-gray-50 font-bold focus:outline-none focus:ring-2 focus:ring-brandBlue/20 text-gray-900"
                      >
                        <option value="">-- Associa un'immagine da Drive --</option>
                        {DRIVE_FILES.map((fid, fidx) => {
                          const customName = fetchedFileNames[fid];
                          return (
                            <option key={fid} value={fid}>
                              Drive File #{fidx + 1} {customName ? `(${customName})` : `(${fid.substring(0, 8)}...)`}
                            </option>
                          );
                        })}
                      </select>
                      <div className="text-[9px] text-gray-400 font-mono flex flex-wrap justify-between items-center gap-1">
                        <span>Drive ID corrente: {selectedDriveId || "Nessuno"}</span>
                        {selectedDriveId && fetchedFileNames[selectedDriveId] && (
                          <span className="text-brandBlue font-bold bg-brandBlue/5 px-1.5 py-0.5 rounded text-[8px] uppercase">
                            Nome su Drive: "{fetchedFileNames[selectedDriveId]}"
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Generated Code Output */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-gray-500">Mappatura Ordinata (Copia questo per data.ts):</label>
                <button
                  onClick={() => {
                    const codeLines = THESIS_MATS.map(m => {
                      const matchedDriveId = manualMatches[m.n] || "";
                      return `  "${m.n}": "${matchedDriveId}",`;
                    }).join('\n');

                    const code = `// Mappa degli ID dei file immagine pubblici su Google Drive corrispondenti al nome del materiale
export const DRIVE_IMAGE_IDS: Record<string, string> = {
${codeLines}
};`;
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                    copied ? 'bg-green-500 text-white animate-pulse' : 'bg-brandBlue text-white hover:bg-brandBlue/90'
                  }`}
                >
                  {copied ? "✓ Copiato!" : "📋 Copia Codice DRIVE_IMAGE_IDS"}
                </button>
              </div>
              
              <textarea
                readOnly
                value={`// Mappa degli ID dei file immagine pubblici su Google Drive corrispondenti al nome del materiale
export const DRIVE_IMAGE_IDS: Record<string, string> = {
${THESIS_MATS.map(m => {
  const matchedDriveId = manualMatches[m.n] || "";
  return `  "${m.n}": "${matchedDriveId}",`;
}).join('\n')}
};`}
                rows={8}
                className="w-full p-3 font-mono text-[10px] bg-gray-900 text-green-400 rounded-xl resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* FOOTER INFO */}
      <div className="pt-8 pb-12 text-center">
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">sudpen listino aggiornato a : aprile 2026</p>
      </div>
      <CraftsmanshipModal isOpen={showCraftsmanshipModal} onClose={() => setShowCraftsmanshipModal(false)} />
      <Analytics />
    </div>
  );
};

export default App;
