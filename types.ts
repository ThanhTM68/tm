export enum ViewState {
  HOME = 'HOME',
  FIREWORKS = 'FIREWORKS',
  GAME = 'GAME',
  ABOUT = 'ABOUT',
  PROFILE = 'PROFILE',
  MISSION_LOG = 'MISSION_LOG',
  ANIME = 'ANIME'
}

export interface MenuItem {
  id: ViewState;
  label: string;
  icon: string; // Emoji or SVG path
  description: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}