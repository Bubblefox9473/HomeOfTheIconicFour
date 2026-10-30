/* Transcript 004 / Moses (LCD Team Leader) and respondent #17. */
document.addEventListener("DOMContentLoaded", () => {
  const slot = document.getElementById("transcript-004-slot");
  if (!slot) return;
  const raw = `
/*__TRANSCRIPT_004_DATA__*/
`;
  const lines = raw.trim().split("\n").map(line => {
    const match = line.match(/^(LCD Team Leader: Moses|Moses|#17): (.*)$/);
    if (!match) throw new Error("Malformed transcript line");
    return [match[1] === "#17" ? "respondent" : "interviewer", match[2]];
  });
  const record = document.createElement("details");
  record.className = "transcript-record transcript-expanded transcript-004";
  record.innerHTML = '<summary class="transcript-toggle"><span>TRANSCRIPT / 004 <small>LCD × LC:NN / FIELD INTERVIEW</small></span><span class="transcript-action">OPEN RECORD</span></summary><div class="interview-legend"><span class="legend-interviewer">LCD TEAM LEADER MOSES / INTERVIEWER</span><span class="legend-respondent">#17 / RESPONDENT</span></div><div class="interview-dialogue"></div><div class="transcript-footer">END OF TRANSCRIPT / 004</div>';
  const body = record.querySelector(".interview-dialogue");
  for (const [speaker, words] of lines) {
    const line = document.createElement("div");
    line.className = "interview-line " + speaker;
    const label = document.createElement("span");
    label.className = "line-speaker";
    label.textContent = speaker === "interviewer" ? "MOSES" : "#17";
    const p = document.createElement("p");
    p.textContent = words;
    line.append(label, p);
    body.append(line);
  }
  slot.replaceWith(record);
});
