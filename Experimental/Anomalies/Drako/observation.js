/* Archival observation controls: visual-only demonstration, never a live containment claim. */
(() => {
  const suite = document.getElementById("observation-suite");
  if (!suite) return;
  const view = suite.querySelector("#drako-observation-view");
  const status = suite.querySelector("#drako-observation-status");
  const controls = [...suite.querySelectorAll("[data-observation-control]")];
  if (!view || !status) return;
  const state = { lights: true, filter: false, static: false, shutter: false };
  const labels = {
    lights: ["LAMPS / OFF", "LAMPS / ON"],
    filter: ["COGNITIVE FILTER / OFF", "COGNITIVE FILTER / ON"],
    static: ["SIGNAL INTERFERENCE / OFF", "SIGNAL INTERFERENCE / ON"],
    shutter: ["SEAL OBSERVATION WINDOW", "REOPEN OBSERVATION WINDOW"]
  };
  function render() {
    view.dataset.lights = state.lights ? "on" : "off";
    view.dataset.filter = state.filter ? "on" : "off";
    view.dataset.static = state.static ? "on" : "off";
    view.dataset.shutter = state.shutter ? "closed" : "open";
    for (const control of controls) {
      const key = control.dataset.observationControl;
      if (!(key in state)) continue;
      control.setAttribute("aria-pressed", String(state[key]));
      control.textContent = labels[key][state[key] ? 1 : 0];
    }
    const pieces = [
      state.shutter ? "WINDOW SEALED" : "WINDOW OPEN",
      state.lights ? "LIGHTS ON" : "LIGHTS OFF",
      state.filter ? "FILTER ACTIVE" : "FILTER BYPASSED",
      state.static ? "SIGNAL DISTORTED" : "SIGNAL NORMAL"
    ];
    status.textContent = pieces.join(" / ") + " — SIMULATED VISUAL ONLY.";
  }
  controls.forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.observationControl;
    if (!(key in state)) return;
    state[key] = !state[key];
    render();
  }));
  render();
})();
