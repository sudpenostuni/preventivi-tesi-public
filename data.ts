// Mappa degli ID dei file immagine pubblici su Google Drive corrispondenti al nome del materiale
export const DRIVE_IMAGE_IDS: Record<string, string> = {
  "BIANCO COTONE TELA": "1YFcuRj6QvMPuHiEpnoYYt1-4Iho7DIkX",
  "BIANCO PERLATO perlato": "1hslF54wyVPmfKUF6k7TZ3eTL4WdwbfJk",
  "BIANCO PURO VINILE": "1s8ct69skGFllCuPk0GWo0KMG9fUBXjzZ",
  "BLU COBALTO EFFETTO PELLE": "1ewggZsRJc8AW4SGQMEQHoUOjZ6xNu17k",
  "BLU ELETTRICO spalmato": "1k2QQxwER29Vd4ITwb_u1mid5nw1I4M6l",
  "BLU galassia VINILE": "", // Non presente tra i 40 file su Drive
  "BLU KLEIN VINILE": "1_44fZkwNu4K2f-Ll4rUSt2VC9gjArwKp",
  "BLU MARINO EFFETTO PELLE": "1NVoz3ESrSaxhmlFC1uYw9b3Jfm_LiIiJ",
  "BLU NAVY spalmato": "1VN2Vxlo4moNpRdLS-txi9a_SUC0dJxHt",
  "BLU OLTREMARE vinile": "1X8U6C9zT4LXUwmag3JnQtopy6tKFj73o",
  "BLU REALE seta": "1OTXJPRK2ZCjNDMF_WuQ7YnSx0sY9fTkD",
  "BORDEAUX seta": "1LVSOXG2KSkr30m1mQ1QbSYwBD9Oez7LD",
  "CANVAS tela": "1XpoKUOnnVEN_-0ovZEYqjPXhUllwwRdl",
  "CELESTE POLVERE spalmato": "1ykZRxGwr84pDYGgM90LMve_K_dc1U80I",
  "CREMA vinile": "1uspDjoh9O5GwXoEhO92scsaeIIPWWMMP",
  "GLICINE spalmato": "", // Non presente tra i 40 file su Drive
  "GRIGIO LONDRA TELA": "1xJM0kxxBzw6VCzFrnTzXZvVX9z3cXG3e",
  "MARRONE effetto pelle": "1430751nlr4uk1HJfxCI6O3Mi3L0GBzDe",
  "NERO NOTTE spalmato": "10zGkGncN5wi8ldtbBXz8mGLPv0KFVfhW",
  "NERO SETA": "1GXJXqzj-q9vs_Ri2W90PxVhmRX3FlpVE",
  "NERO TELA": "1S36XFjYUx449qKhzjD9RL5FNAcKbkMXo",
  "NERO vinile": "1WSaH45EvTb1ZdLabzLxSvcIGpN5TVk8W",
  "ORO ANTICO seta": "1BaaEh7JpxTkM-bxZ-CFvOfQv0f5UwdOm",
  "ORO BIANCO seta": "1FhxphBXocf4dJQC45xMBzDqq6xftDb7N",
  "ORO GIALLO tela": "1y7B2bzt0e8RBMicsMRtOnNS-gTq4UdkE",
  "ORO GLICINE seta": "1E67nFkbR0M7oerPlFfPqfLF0aFQi6yE2",
  "ORO ROSA seta": "1UTRa4pMqYQ0ngXN3C8o7F_ZtcKzVaTCx",
  "PERGAMENA effetto pelle": "1542bES9oDQva8ZO7N37GpX-ypszS1qlp",
  "PORPORA perlato": "1h4XVHMzd3mElnylBzhVYyupSMT2j8x4S",
  "RAME effetto pelle": "16SBiVtwHMk2xmAj41fWWDMw5nGPrh1TF",
  "ROSA CONFETTO spalmato": "1lJMikMkYy4Z4T7riq88TaeXthl_PCfRa",
  "ROSA PASTELLO tela": "1Ak235jXY5inHbh_g5kENYQ4Llawno_x3",
  "ROSSO CARDINALE VINILE": "11ztNyTFOtKM_CL1W-3kysTj7YPtgDpoG",
  "ROSSO CARMINIO EFFETTO PELLE": "1UDUe04-hvsqDqKVy8ZfyMceUvSO2haqw",
  "ROSSO POMPEIANO vinile": "1d5MbekrN10zLk9vNHKmR-hS_otPyOhyn",
  "SABBIA effetto pelle": "1xOXWm436pnQ2o5glR7WIdAuS3p8aGEo3",
  "TORTORA spalmato": "1VQEdU6kiNiHMsnGaYreQIcHkMPHbMrdt",
  "VERDE CLOROFILLA vinile": "1NzMPILRqejS72BrWCNmTd9U_EdwhDPXJ",
  "VERDE MALACHITE effetto pelle": "1dPSmDdZgBamtGo6kF5rwJGnmF9P8JGRu",
  "VERDE MARINO spalmato": "1hifQmyFeRx7COH9powFJ42ZuVcRsLq3Z",
  "VERDE PINO seta": "1a2nduEHKppdaJtYCIBJAeO-9amEPzaoz",
  "VERDE VERONESE vinile": "18g18BkdXJffLpoBXgchkaN0P2vIEuUIr",
};

// Seleziona se utilizzare le immagini da Google Drive (true) o i Blob di Vercel Storage (false).
// Di default è impostato su FALSE per utilizzare i Blob di Vercel Storage che sono ALLINEATI AL 100%
// con le descrizioni dei materiali (es. BIANCO COTONE.png corrisponde esattamente a BIANCO COTONE TELA).
// Se si desidera usare Google Drive una volta allineati manualmente gli ID, impostare su TRUE.
export const USE_GOOGLE_DRIVE = true;

const getDriveUrl = (matName: string, fallback: string): string => {
  if (!USE_GOOGLE_DRIVE) {
    return fallback;
  }
  const driveId = DRIVE_IMAGE_IDS[matName];
  if (driveId) {
    // Utilizza il servizio ufficiale di Google per servire le miniature ad alta risoluzione
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }
  return fallback;
};

const RAW_MATS = [
  { n: "BIANCO COTONE TELA", p: 30, c: "#F8F8FF", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BIANCO%20COTONE.png" },
  { n: "BIANCO PERLATO perlato", p: 35, c: "#F5F5F0", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BIANCO%20PERLATO.png" },
  { n: "BIANCO PURO VINILE", p: 30, c: "#FFFFFF", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BIANCO%20PURO.png" },
  { n: "BLU COBALTO EFFETTO PELLE", p: 25, c: "#0047AB", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20COBALTO.png" },
  { n: "BLU ELETTRICO spalmato", p: 25, c: "#0000FF", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20ELETTRICO.png" },
  { n: "BLU galassia VINILE", p: 25, c: "#2F4F4F", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20GALASSIA.png" },
  { n: "BLU KLEIN VINILE", p: 30, c: "#002FA7", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20KLEIN.png" },
  { n: "BLU MARINO EFFETTO PELLE", p: 30, c: "#000080", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20MARINO.png" },
  { n: "BLU NAVY spalmato", p: 30, c: "#000080", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20NAVY.png" },
  { n: "BLU OLTREMARE vinile", p: 30, c: "#000080", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20OLTREMARE.png" },
  { n: "BLU REALE seta", p: 35, c: "#4169E1", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BLU%20REALE.png" },
  { n: "BORDEAUX seta", p: 35, c: "#800000", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/BORDEAUX%2002.png" },
  { n: "CANVAS tela", p: 30, c: "#D2B48C", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/CANVAS.png" },
  { n: "CELESTE POLVERE spalmato", p: 30, c: "#B2DFFD", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/CELESTE%20POLVERE.png" },
  { n: "CREMA vinile", p: 30, c: "#FFFDD0", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/CREMA.png" },
  { n: "GLICINE spalmato", p: 30, c: "#DDA0DD", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/GLICINE.png" },
  { n: "GRIGIO LONDRA TELA", p: 25, c: "#808080", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/GRIGIO%20LONDRA.png" },
  { n: "MARRONE effetto pelle", p: 30, c: "#8B4513", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/MARRONE.png" },
  { n: "NERO SETA", p: 30, c: "#000000", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/NERO%20SETA.png" },
  { n: "NERO TELA", p: 25, c: "#000000", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/NERO%20TELA.png" },
  { n: "NERO NOTTE spalmato", p: 30, c: "#2F4F4F", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/NERO%20NOTTE.png" },
  { n: "NERO vinile", p: 30, c: "#000000", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/NERO%20VINILE.png" },
  { n: "ORO ANTICO seta", p: 35, c: "#B8860B", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ORO%20ANTICO.png" },
  { n: "ORO BIANCO seta", p: 35, c: "#FAFAD2", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ORO%20BIANCO.png" },
  { n: "ORO GIALLO tela", p: 35, c: "#FFD700", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ORO%20GIALLO.png" },
  { n: "ORO GLICINE seta", p: 35, c: "#DDA0DD", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ORO%20GLICINE.png" },
  { n: "ORO ROSA seta", p: 30, c: "#B76E79", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ORO%20ROSA.png" },
  { n: "PERGAMENA effetto pelle", p: 30, c: "#F0E68C", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/PERGAMENA.png" },
  { n: "PORPORA perlato", p: 30, c: "#800080", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/PORPORA.png" },
  { n: "RAME effetto pelle", p: 25, c: "#B87333", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/RAME.png" },
  { n: "ROSA CONFETTO spalmato", p: 30, c: "#F8C8DC", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ROSA%20CONFETTO.png" },
  { n: "ROSA PASTELLO tela", p: 25, c: "#FFB6C1", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ROSA%20PASTELLO.png" },
  { n: "ROSSO CARDINALE VINILE", p: 30, c: "#C41E3A", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ROSSO%20CARDINALE.png" },
  { n: "ROSSO CARMINIO EFFETTO PELLE", p: 30, c: "#960018", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ROSSO%20CARMINIO.png" },
  { n: "ROSSO POMPEIANO vinile", p: 30, c: "#C32148", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/ROSSO%20POMPEIANO.png" },
  { n: "SABBIA effetto pelle", p: 35, c: "#F4A460", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/SABBIA.png" },
  { n: "TORTORA spalmato", p: 30, c: "#D2B48C", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/TORTORA.png" },
  { n: "VERDE CLOROFILLA vinile", p: 25, c: "#4C9A2A", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/VERDE%20VERONESE.png" },
  { n: "VERDE MALACHITE effetto pelle", p: 30, c: "#004D40", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/VERDE%20MALACHITE.png" },
  { n: "VERDE MARINO spalmato", p: 30, c: "#3CB371", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/VERDE%20MARINO.png" },
  { n: "VERDE PINO seta", p: 35, c: "#01796F", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/VERDE%20PINO.png" },
  { n: "VERDE VERONESE vinile", p: 30, c: "#4C9A2A", img: "https://igldbauri3xjgejr.public.blob.vercel-storage.com/immagini%20compresse/VERDE%20VERONESE.png" }
];

// Ordina alfabeticamente i materiali
const SORTED_RAW_MATS = [...RAW_MATS].sort((a, b) => a.n.localeCompare(b.n, 'it'));

// Assegna dinamicamente l'URL di Google Drive basato sul nome del materiale
export const THESIS_MATS = SORTED_RAW_MATS.map((mat) => ({
  ...mat,
  img: getDriveUrl(mat.n, mat.img)
}));

export const WA_PHONE = "393917972545";
export const LOGO_URL = "https://sudpen.weebly.com/uploads/5/1/0/3/51034189/editor/logo-2020.png?1761932030";
export const GSHEET_URL = "https://script.google.com/macros/s/AKfycbwF6i92Gzk_auVGtT7s-8zR4AHR5lRc6MZTweA-R7YB4EDXNR9lCHXD1jxmrgCz8zOf/exec";
export const PRICING = { bw: 0.05, color: { base: 0.30 } };
