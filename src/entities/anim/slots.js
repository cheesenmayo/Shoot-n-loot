// Indices into the animator's spring arrays (X = value, V = velocity).
let n = 0;
// critically damped
export const S_SPEED = n++, S_MOVE = n++, S_CROUCH = n++, S_AIR = n++, S_AIM = n++, S_ADS = n++, S_SPRINT = n++, S_RW = n++, S_LW = n++;
export const S_LEANF = n++, S_LEANS = n++, S_TURN = n++, S_HEADX = n++, S_HEADY = n++, S_HEADZ = n++, S_DIRX = n++, S_DIRZ = n++;
export const S_IDLEY = n++, S_IDLEP = n++;
// pose-family parameters
export const S_P0 = n++, S_P1 = n++, S_P2 = n++, S_P3 = n++, S_P4 = n++, S_P5 = n++;
// under-damped
export const Z_DIP = n++, Z_KB = n++, Z_KP = n++, Z_KR = n++, Z_ROCK = n++, Z_HX = n++, Z_HZ = n++, Z_HY = n++, Z_HEADX = n++, Z_HEADY = n++, Z_PONY = n++, Z_PONYZ = n++;
export const NS = n;
