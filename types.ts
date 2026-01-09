
export type AppState = 'setup' | 'ready' | 'shaking' | 'revealed';

export interface Winner {
  name: string;
  time: string;
}

export interface Settings {
  names: string[];
  allowRepeat: boolean;
  drawCount: number;
}
