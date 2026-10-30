/* Local-only Neutral04 player. No copyrighted track is distributed by this site. */
(() => {
  const station = document.getElementById("facility-audio");
  if (!station) return;
  const audio = station.querySelector("#facility-audio-element");
  const fileInput = station.querySelector("#facility-track-file");
  const play = station.querySelector("#facility-audio-play");
  const mute = station.querySelector("#facility-audio-mute");
  const volume = station.querySelector("#facility-audio-volume");
  const status = station.querySelector("#facility-audio-status");
  if (!audio || !fileInput || !play || !mute || !volume || !status) return;

  const settingsKey = "nnc04:facility-audio:volume";
  let objectUrl = null;
  let hasTrack = false;
  function setStatus(message) { status.textContent = message; }
  function sync() {
    play.disabled = !hasTrack;
    play.textContent = audio.paused ? "PLAY TRACK ▶" : "PAUSE TRACK ❚❚";
    play.setAttribute("aria-label", audio.paused ? "Play selected audio" : "Pause selected audio");
    mute.textContent = audio.muted ? "UNMUTE" : "MUTE";
    mute.setAttribute("aria-pressed", String(audio.muted));
  }
  let savedVolume = 25;
  try {
    const stored = Number(localStorage.getItem(settingsKey));
    if (localStorage.getItem(settingsKey) !== null && Number.isFinite(stored)) {
      savedVolume = Math.max(0, Math.min(100, stored));
    }
  } catch { /* Blocked local storage should not prevent playback. */ }
  volume.value = String(savedVolume);
  audio.volume = savedVolume / 100;
  audio.loop = true;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const likelyAudio = file.type.startsWith("audio/") || /\.(mp3|ogg|opus|wav|m4a|aac|flac)$/i.test(file.name);
    if (!likelyAudio) {
      setStatus("UNSUPPORTED FILE TYPE — SELECT AN AUDIO FILE.");
      fileInput.value = "";
      return;
    }
    audio.pause();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    audio.src = objectUrl;
    audio.load();
    hasTrack = true;
    setStatus("LOCAL TRACK READY — PRESS PLAY TO BEGIN.");
    sync();
  });
  play.addEventListener("click", async () => {
    if (!hasTrack) return;
    if (!audio.paused) {
      audio.pause();
      setStatus("PLAYBACK PAUSED.");
      return;
    }
    try {
      await audio.play();
      setStatus("LOCAL PLAYBACK ACTIVE / LOOP ENABLED.");
    } catch {
      setStatus("PLAYBACK BLOCKED OR FILE UNSUPPORTED — TRY ANOTHER FORMAT.");
    }
    sync();
  });
  mute.addEventListener("click", () => {
    audio.muted = !audio.muted;
    sync();
  });
  volume.addEventListener("input", () => {
    const value = Math.max(0, Math.min(100, Number(volume.value) || 0));
    audio.volume = value / 100;
    try { localStorage.setItem(settingsKey, String(value)); } catch { /* optional */ }
  });
  audio.addEventListener("pause", sync);
  audio.addEventListener("play", sync);
  audio.addEventListener("error", () => {
    if (!hasTrack) return;
    audio.pause();
    setStatus("COULD NOT DECODE TRACK — TRY MP3, OGG, OR WAV.");
    sync();
  });
  window.addEventListener("pagehide", () => {
    audio.pause();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }, { once: true });
  sync();
})();
