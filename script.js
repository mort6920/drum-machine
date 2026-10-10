// Map each key to a human-readable display name
const padNames = {
  Q: 'Heater 1',
  W: 'Heater 2',
  E: 'Heater 3',
  A: 'Heater 4',
  S: 'Clap',
  D: 'Open HH',
  Z: 'Kick-n-Hat',
  X: 'Kick',
  C: 'Closed HH',
};

const display = document.getElementById('display');

/**
 * Play the audio clip for a given key letter and update the display.
 * @param {string} key - uppercase single letter (Q W E A S D Z X C)
 */
function triggerPad(key) {
  const audio = document.getElementById(key);
  const pad = audio && audio.closest('.drum-pad');

  if (!audio) return;

  // Restart from the beginning so rapid hits work
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Autoplay policy may block on first interaction — silently ignore
  });

  // Update the display
  display.textContent = padNames[key] || key;

  // Flash the active style
  if (pad) {
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 150);
  }
}

// ── Click handlers ──────────────────────────────────────────────────────────
document.querySelectorAll('.drum-pad').forEach((pad) => {
  pad.addEventListener('click', () => {
    // The key letter is the trimmed text content (excluding the hidden audio element)
    const key = pad.childNodes[0].textContent.trim();
    triggerPad(key);
  });
});

// ── Keyboard handlers ────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (padNames[key]) {
    triggerPad(key);
  }
});
