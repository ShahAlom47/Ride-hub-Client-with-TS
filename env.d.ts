interface ImportMetaEnv {
  VITE_APIKEY: string;
  VITE_AUTHDOMAIN: string;
  VITE_PROJECTID: string;
  VITE_STORAGEBUCKET: string;
  VITE_MESSAGINGSENDERID: string;
  VITE_APPID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: (...args: any[]) => void;
}
