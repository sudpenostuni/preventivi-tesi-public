import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inizializza Firestore indicando il databaseId specificato nella configurazione
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

export interface PreventivoItem {
  id: string;
  name: string;
  materiale: string;
  materialePrezzo: number;
  incisione: string;
  incisioneNome: string;
  bwPages: number;
  colorPages: number;
  cps: number;
  costoSubtotale: number;
}

export interface PreventivoData {
  cliente: string;
  totale: number;
  copieTotali: number;
  items: PreventivoItem[];
  stato: 'nuovo' | 'in_lavorazione' | 'completato' | 'annullato';
}

export const savePreventivoToFirestore = async (data: PreventivoData) => {
  try {
    const preventiviRef = collection(db, 'preventivi');
    const docRef = await addDoc(preventiviRef, {
      ...data,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      dispositivo: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : ''
    });
    console.log('Preventivo salvato su Firestore con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Errore durante il salvataggio su Firestore:', error);
    throw error;
  }
};
