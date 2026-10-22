import * as THREE from 'three';
import { mulberry32 } from '../util.js';

export const SUN_DIR = new THREE.Vector3(0.52, 0.66, 0.42).normalize();

const HORIZON = new THREE.Color('#c3d6ea');
const ZENITH = new THREE.Color('#3b78c8');
const MID = new THREE.Color('#7fb0e0');

const vert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * p;
    gl_Position.z = gl_Position.w; // always at the far plane
  }
`;
const frag = /* glsl */ `
  uniform vec3 uHorizon; uniform vec3 uMid; uniform vec3 uZenith; uniform vec3 uSun;
  uniform float uStorm;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    float h = max(d.y, 0.0);
    vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));
    col = mix(col, uZenith, smoothstep(0.15, 0.85, h));
    float s = max(dot(d, uSun), 0.0);
    col += vec3(1.0, 0.82, 0.55) * (pow(s, 6.0) * 0.14 + pow(s, 48.0) * 0.28);
    col += vec3(1.0, 0.97, 0.9) * smoothstep(0.9993, 0.9998, s) * 2.0;
    col = mix(col, uHorizon, smoothstep(0.0, -0.06, d.y));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export function createSky(scene, renderer, textures) {
  const root = new THREE.Group();
  root.name = 'sky';

  const skyMat = new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
    toneMapped: false,
    uniforms: {
      uHorizon: { value: HORIZON.clone() },
      uMid: { value: MID.clone() },
      uZenith: { value: ZENITH.clone() },
      uSun: { value: SUN_DIR.clone() },
      uStorm: { value: 0 },
    },
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), skyMat);
  dome.scale.setScalar(3000);
  dome.frustumCulled = false;
  dome.renderOrder = -10;
  root.add(dome);

  // clouds
  const clouds = [];
  const rng = mulberry32(31);
  const cloudMat = new THREE.SpriteMaterial({
    map: textures.cloud,
    transparent: true,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    opacity: 0.92,
    color: new THREE.Color('#f6f9ff'),
  });
  const cloudGroup = new THREE.Group();
  for (let i = 0; i < 70; i++) {
    const s = new THREE.Sprite(cloudMat);
    const w = 500 + rng() * 900;
    s.scale.set(w, w * 0.42, 1);
    s.position.set((rng() - 0.5) * 5200, 380 + rng() * 360, (rng() - 0.5) * 5200);
    s.renderOrder = -5;
    cloudGroup.add(s);
    clouds.push(s);
  }
  root.add(cloudGroup);

  // lights
  const hemi = new THREE.HemisphereLight(0xbcd6ff, 0x6f6a4c, 1.15);
  const sun = new THREE.DirectionalLight(0xfff1dc, 3.2);
  sun.castShadow = true;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.5;
  const cam = sun.shadow.camera;
  cam.near = 10; cam.far = 700;
  cam.left = cam.bottom = -110; cam.right = cam.top = 110;
  sun.shadow.mapSize.set(2048, 2048);
  scene.add(sun, sun.target, hemi);
  scene.add(root);

  scene.fog = new THREE.Fog(HORIZON.getHex(), 200, 900);
  scene.fog.color.copy(HORIZON);

  // Image based lighting from the sky itself.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envDome = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), skyMat.clone());
  envDome.material.depthTest = true;
  envDome.material.toneMapped = false;
  envDome.scale.setScalar(50);
  envScene.add(envDome);
  const envRT = pmrem.fromScene(envScene, 0.02, 0.1, 100);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.55;

  const api = {
    root,
    sun,
    hemi,
    fogColor: HORIZON,
    shadowTexel: 0.1,
    update(camera, focus, dt, time) {
      dome.position.copy(camera.position);
      cloudGroup.position.set(camera.position.x, 0, camera.position.z);
      for (const c of clouds) {
        c.position.x += dt * 6;
        if (c.position.x > 2600) c.position.x -= 5200;
      }
      // keep the shadow rig centred on the player, snapped to texels to avoid shimmer
      const texel = (cam.right - cam.left) / sun.shadow.mapSize.x;
      const fx = Math.round(focus.x / texel) * texel;
      const fy = Math.round(focus.y / texel) * texel;
      const fz = Math.round(focus.z / texel) * texel;
      sun.target.position.set(fx, fy, fz);
      sun.position.set(fx + SUN_DIR.x * 300, fy + SUN_DIR.y * 300, fz + SUN_DIR.z * 300);
      sun.target.updateMatrixWorld();
    },
    setShadowQuality(size, extent) {
      if (size === 0) {
        sun.castShadow = false;
        return;
      }
      sun.castShadow = true;
      if (sun.shadow.mapSize.x !== size) {
        sun.shadow.mapSize.set(size, size);
        sun.shadow.map?.dispose();
        sun.shadow.map = null;
      }
      cam.left = cam.bottom = -extent;
      cam.right = cam.top = extent;
      cam.updateProjectionMatrix();
    },
    setFog(near, far) {
      scene.fog.near = near;
      scene.fog.far = far;
    },
    setCloudsVisible(v) {
      cloudGroup.visible = v;
    },
  };
  return api;
}
