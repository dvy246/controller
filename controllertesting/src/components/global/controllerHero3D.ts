/**
 * controllerHero3D.ts — PS5 controller 3D hero engine.
 * Dynamically imported by ControllerHero.astro ONLY when the hero enters the
 * viewport (IntersectionObserver) AND the browser is idle (requestIdleCallback).
 * Keeping the engine out of the critical script means the homepage loads
 * without shipping the ~555KB Three.js bundle on every visit.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { parseGamepadState } from '../../lib/gamepad.ts';

export function startHero3D() {
  const container = document.getElementById('hero-container') as HTMLElement | null;
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null;
  const spinner = document.getElementById('loading-spinner') as HTMLElement | null;

  if (!container || !canvas || container.dataset.threeInitialized === 'true') return;
  container.dataset.threeInitialized = 'true';

  let scene: any, camera: any, renderer: any, controls: any;
  let controllerModel: any;
  let isInteracting = false;

  function initThreeJS() {
    if (!container || !canvas || !spinner) return;
    spinner.classList.add('active');

    try {
      scene = new THREE.Scene();

      // Camera setup
      camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 1.2, 4);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(5, 5, 2);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x8b5cf6, 1.8);
      fillLight.position.set(-5, 0, 5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      rimLight.position.set(0, 5, -5);
      scene.add(rimLight);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.04;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.target.set(0, 0, 0);

      controls.addEventListener('start', () => isInteracting = true);
      controls.addEventListener('end', () => isInteracting = false);

      loadControllerModel();
      window.addEventListener('resize', onWindowResize);
      renderer.setAnimationLoop(animate);
    } catch (err) {
      console.warn('WebGL Context init error:', err);
      if (spinner) spinner.style.display = 'none';
    }
  }

  function loadControllerModel() {
    const rendererSafe = renderer as THREE.WebGLRenderer | null;
    const ktx2Loader = rendererSafe
      ? new KTX2Loader().setTranscoderPath('/libs/basis/').detectSupport(rendererSafe)
      : null;
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    if (ktx2Loader) loader.setKTX2Loader(ktx2Loader);
    const modelPath = '/models/controller.glb';

    loader.load(
      modelPath,
      (gltf: any) => {
        controllerModel = gltf.scene;

        controllerModel.traverse((child: any) => {
          if (child.isMesh && child.material) {
            if (child.material.isMeshStandardMaterial) {
              child.material.envMapIntensity = 1.8;
              child.material.needsUpdate = true;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(controllerModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / (maxDim || 1);
        controllerModel.scale.set(scale, scale, scale);

        controllerModel.position.sub(center.multiplyScalar(scale));

        controllerModel.rotation.x = 0.2;
        controllerModel.rotation.y = -0.3;

        scene.add(controllerModel);

        if (spinner) spinner.classList.remove('active');
        if (canvas) canvas.classList.add('loaded');
      },
      undefined,
      (error: any) => {
        console.error('Error loading 3D model GLB:', error);
        // Fallback: build a sleek procedural 3D gamepad mesh if GLB fails to fetch
        buildProceduralGamepad();
      }
    );
  }

  function buildProceduralGamepad() {
    const group = new THREE.Group();

    // Main Body Shell
    const bodyGeo = new THREE.BoxGeometry(2.2, 1.2, 0.4);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3, metalness: 0.8 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(bodyMesh);

    // Left & Right Grips
    const gripGeo = new THREE.CylinderGeometry(0.3, 0.25, 1.2, 32);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.5 });

    const leftGrip = new THREE.Mesh(gripGeo, gripMat);
    leftGrip.position.set(-1.1, -0.4, 0);
    leftGrip.rotation.z = 0.3;
    group.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, gripMat);
    rightGrip.position.set(1.1, -0.4, 0);
    rightGrip.rotation.z = -0.3;
    group.add(rightGrip);

    // Thumbsticks
    const stickGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 32);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2, metalness: 0.5 });

    const ls = new THREE.Mesh(stickGeo, stickMat);
    ls.position.set(-0.5, -0.2, 0.25);
    group.add(ls);

    const rs = new THREE.Mesh(stickGeo, stickMat);
    rs.position.set(0.5, -0.2, 0.25);
    group.add(rs);

    group.rotation.x = 0.2;
    group.rotation.y = -0.3;

    controllerModel = group;
    scene.add(controllerModel);

    if (spinner) spinner.classList.remove('active');
    if (canvas) canvas.classList.add('loaded');
  }

  const clock = new THREE.Clock();

  function animate() {
    clock.getDelta();
    if (controls) controls.update();

    if (controllerModel && !isInteracting) {
      controllerModel.rotation.y += 0.003;
      controllerModel.position.y = Math.sin(clock.getElapsedTime()) * 0.04;
    }

    pollGamepad();

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    let activeGp = null;
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i]?.connected) { activeGp = gamepads[i]; break; }
    }

    const statusDot = document.getElementById('status-dot') as HTMLElement | null;
    const statusText = document.getElementById('status-text') as HTMLElement | null;
    const telemetryData = document.getElementById('telemetry-data') as HTMLElement | null;

    if (activeGp && statusDot && statusText && telemetryData) {
      const state = parseGamepadState(activeGp);
      statusDot.classList.add('connected');
      statusText.style.color = '#fff';
      statusText.textContent = `Connected: ${state.detectedModel || 'Gamepad'}`;

      telemetryData.style.display = 'flex';
      const lsVal = document.getElementById('ls-val');
      if (lsVal) lsVal.textContent = `${state.leftStick.x.toFixed(2)}, ${state.leftStick.y.toFixed(2)}`;
      const rsVal = document.getElementById('rs-val');
      if (rsVal) rsVal.textContent = `${state.rightStick.x.toFixed(2)}, ${state.rightStick.y.toFixed(2)}`;
    } else if (statusDot && statusText && telemetryData) {
      statusDot.classList.remove('connected');
      statusText.style.color = 'rgba(255,255,255,0.6)';
      statusText.textContent = 'Awaiting Gamepad';
      telemetryData.style.display = 'none';
    }
  }

  function onWindowResize() {
    if (!camera || !renderer || !container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  initThreeJS();
}