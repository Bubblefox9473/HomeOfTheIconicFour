/* Transcript 004 renderer — reads the approved dialogue source as plain text.
   This keeps the interviewer's name and the respondent's record number visible
   without exposing any other identity. */
document.addEventListener("DOMContentLoaded", async () => {
  const slot = document.getElementById("transcript-004-slot");
  if (!slot) return;
  try {
    const response = await fetch("transcript-004.js", { cache: "no-cache" });
    if (!response.ok) throw new Error("Transcript source unavailable");
    const source = await response.text();
    const match = source.match(/const raw = `([\s\S]*?)`;/);
    if (!match) throw new Error("Transcript source incomplete");
    const lines = match[1].trim().split("\n")
      .filter(line => line.trim() && !line.includes("/*__TRANSCRIPT_004_DATA__*/"));
    if (lines.length !== 125) throw new Error("Transcript line count mismatch");
    const record = document.createElement("details");
    record.className = "transcript-record transcript-expanded transcript-004";
    record.innerHTML = '<summary class="transcript-toggle"><span>TRANSCRIPT / 004 <small>LCD × LC:NN / FIELD INTERVIEW</small></span><span class="transcript-action">OPEN RECORD</span></summary><div class="interview-legend"><span class="legend-interviewer">LCD TEAM LEADER MOSES / INTERVIEWER</span><span class="legend-respondent">#17 / RESPONDENT</span></div><div class="interview-dialogue"></div><div class="transcript-footer">END OF TRANSCRIPT / 004</div>';
    const body = record.querySelector(".interview-dialogue");
    for (const text of lines) {
      const parts = text.match(/^(LCD Team Leader: Moses|Moses|#17): (.*)$/);
      if (!parts) throw new Error("Malformed transcript entry");
      const interviewer = parts[1] !== "#17";
      const line = document.createElement("div");
      line.className = "interview-line " + (interviewer ? "interviewer" : "respondent");
      const speaker = document.createElement("span");
      speaker.className = "line-speaker";
      speaker.textContent = interviewer ? "MOSES" : "#17";
      const paragraph = document.createElement("p");
      paragraph.textContent = parts[2];
      line.append(speaker, paragraph);
      body.append(line);
    }
    slot.replaceWith(record);
  } catch {
    slot.textContent = "TRANSCRIPT / 004 — RECORD UNAVAILABLE";
  }
});
