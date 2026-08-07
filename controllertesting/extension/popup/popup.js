/**
 * Controller Quick Check — popup logic.
 * Polls the Gamepad API in a rAF loop: drift, circularity (rim sampling),
 * polling-rate estimate, vibration. JSON/CSV export. All data stays local.
 */

import { parseGamepadState, calculateCircularityError } from './lib/gamepad-analyzer.js';

const STATUS = document.getElementById('gp-status');
const MODEL = document.getElementById('gp-model');

const L_DRIFT = document.getElementById('m-left-drift');
const R_DRIFT = document.getElementById('m-right-drift');
const CIRC = document.getElementById('m-circ-error');
const POLL = document.getElementById('m-polling');

const BTN_VIBRATE = document.getElementById('btn-vibrate');
const BTN_JSON = document.getElementById('btn-export-json');
const BTN_CSV = document.getElementById('btn-export-csv');

let rimSamples = [];
let lastTs = 0;
let tsWindow = [];
let lastDrift = { left: 0, right: 0 };
let circError = 0;
let activeId = '';

function setMetric(el, value, colorClass = '') {
  el.textContent = value;
  el.className = `metric-value ${colorClass}`;
}

function driftClass(pct) {
  if (pct > 10) return 'bad';
  if (pct > 2) return 'warn';
  return 'good';
}

function poll() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  let gp = null;
  for (let i = 0; i < pads.length; i++) {
    if (pads[i] && pads[i].connected) {
      gp = pads[i];
      break;
    }
  }

  if (!gp) {
    rimSamples = [];
    return requestAnimationFrame(poll);
  }

  const state = parseGamepadState(gp);

  if (MODEL.textContent !== state.id) {
    MODEL.textContent = `${state.detectedModel} — ${state.id}`;
    activeId = state.id;
    rimSamples = [];
    tsWindow = [];
  }

  if (!STATUS.classList.contains('connected')) {
    STATUS.classList.add('connected');
    STATUS.textContent = 'Controller connected';
  }

  lastDrift = { left: state.leftStick.driftPct, right: state.rightStick.driftPct };
  setMetric(L_DRIFT, `${state.leftStick.driftPct}%`, driftClass(state.leftStick.driftPct));
  setMetric(R_DRIFT, `${state.rightStick.driftPct}%`, driftClass(state.rightStick.driftPct));

  // Rim sampling for circularity (both sticks' outer range)
  const distL = Math.hypot(state.leftStick.x, state.leftStick.y);
  const distR = Math.hypot(state.rightStick.x, state.rightStick.y);
  if (distL > 0.85) rimSamples.push({ x: state.leftStick.x, y: state.leftStick.y });
  if (distR > 0.85) rimSamples.push({ x: state.rightStick.x, y: state.rightStick.y });
  if (rimSamples.length > 200) rimSamples.splice(0, rimSamples.length - 200);

  if (rimSamples.length >= 20) {
    circError = calculateCircularityError(rimSamples);
    setMetric(CIRC, `${circError}%`, circError > 12 ? 'bad' : circError > 5 ? 'warn' : 'good');
  }

  // Polling-rate estimate from Gamepad API timestamps
  if (lastTs && gp.timestamp > lastTs && gp.timestamp - lastTs < 250) {
    const dt = gp.timestamp - lastTs;
    if (dt > 0) {
      tsWindow.push(1000 / dt);
      if (tsWindow.length > 60) tsWindow.shift();
      if (tsWindow.length >= 10) {
        const avg = Math.round(tsWindow.reduce((a, b) => a + b, 0) / tsWindow.length);
        setMetric(POLL, `${avg} Hz`);
      }
    }
  }
  lastTs = gp.timestamp;

  BTN_JSON.disabled = false;
  BTN_CSV.disabled = false;

  requestAnimationFrame(poll);
}

BTN_VIBRATE.addEventListener('click', () => {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const p of pads) {
    if (p && p.connected && typeof p.vibrationActuator?.playEffect === 'function') {
      p.vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: 300,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0,
      }).catch(() => {});
      return;
    }
  }
});

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function snapshot() {
  return {
    tool: 'Controller Quick Check',
    site: 'https://controllertesting.com',
    timestamp: new Date().toISOString(),
    controller: activeId,
    model: MODEL.textContent.split(' — ')[0] || 'unknown',
    leftDriftPct: lastDrift.left,
    rightDriftPct: lastDrift.right,
    circularityErrorPct: circError,
    pollingRateHzEstimate: POLL.textContent,
    disclaimer: 'Browser diagnostic, not a hardware-lab certification.',
  };
}

BTN_JSON.addEventListener('click', () => {
  download(`controller-quick-check-${Date.now()}.json`, JSON.stringify(snapshot(), null, 2), 'application/json');
});

BTN_CSV.addEventListener('click', () => {
  const s = snapshot();
  const rows = [
    ['tool', 'site', 'timestamp', 'controller', 'model', 'leftDriftPct', 'rightDriftPct', 'circularityErrorPct', 'pollingRateHzEstimate'],
    [s.tool, s.site, s.timestamp, s.controller, s.model, s.leftDriftPct, s.rightDriftPct, s.circularityErrorPct, s.pollingRateHzEstimate],
  ];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  download(`controller-quick-check-${Date.now()}.csv`, csv, 'text/csv');
});

window.addEventListener('gamepadconnected', () => {
  STATUS.classList.add('connected');
  STATUS.textContent = 'Controller connected';
});
window.addEventListener('gamepaddisconnected', () => {
  STATUS.classList.remove('connected');
  STATUS.textContent = 'No controller connected — press any button';
});

requestAnimationFrame(poll);
