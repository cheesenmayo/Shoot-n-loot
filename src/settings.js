// Graphics presets + persisted user settings.

const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

export const PRESETS = {
  low: {
    id: 'low', label: 'Low',
    pixelRatio: 0.75, shadowMap: 0, shadowExtent: 90,
    viewDistance: 450, propDistance: 360, shadowDistance: 0,
    lodNear: 170, lodMid: 380,
    grassRadius: 0, grassDensity: 0, bushDensity: 0.35,
    detailNormals: false, clouds: false, envMap: false,
    particles: 0.4, botDetailDistance: 140,
  },
  default: {
    id: 'default', label: 'Default',
    pixelRatio: 1, shadowMap: 2048, shadowExtent: 100,
    viewDistance: 800, propDistance: 650, shadowDistance: 120,
    lodNear: 280, lodMid: 650,
    grassRadius: 48, grassDensity: 0.9, bushDensity: 0.75,
    detailNormals: false, clouds: true, envMap: true,
    particles: 0.75, botDetailDistance: 260,
  },
  ultra: {
    id: 'ultra', label: 'Ultra',
    get pixelRatio() { return dpr(); }, shadowMap: 4096, shadowExtent: 130,
    viewDistance: 1400, propDistance: 1150, shadowDistance: 200,
    lodNear: 420, lodMid: 900,
    grassRadius: 85, grassDensity: 1.3, bushDensity: 1,
    detailNormals: true, clouds: true, envMap: true,
    particles: 1, botDetailDistance: 450,
  },
};

const KEY = 'shootnloot.settings.v1';
const defaults = { graphics: 'default', sensitivity: 1.0, volume: 0.6, fov: 70, invertY: false, showFps: false };

export const settings = { ...defaults };

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(settings, JSON.parse(raw));
  } catch { /* storage may be unavailable */ }
  if (!PRESETS[settings.graphics]) settings.graphics = 'default';
  return settings;
}

export function saveSettings() {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch { /* ignore */ }
}

export const graphics = () => PRESETS[settings.graphics];
