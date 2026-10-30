/* Transcript 004 / Moses (LCD Team Leader) and respondent #17. */
document.addEventListener("DOMContentLoaded", () => {
  const slot = document.getElementById("transcript-004-slot");
  if (!slot) return;
  const raw = `
LCD Team Leader: Moses: Before we begin, I'd like to confirm something. Have you ever personally experienced the Distortion Phenomenon?
#17: No. I haven't.
Moses: Have you ever believed yourself to be approaching such a transformation?
#17: ...I wouldn't know.
Moses: You wouldn't know?
#17: I know what Distortion is. I'm familiar with what can happen to those who experience it. But I don't believe that necessarily means I'd recognize it happening to myself.
Moses: That's a reasonable distinction. Do you believe you're susceptible to the phenomenon?
#17: I have no reason to believe I'm immune.
Moses: And what leads you to that conclusion?
#17: Things have changed. About me, I mean. There was a time when I wouldn't have considered something like this a possibility. Now I'm not so certain.
Moses: What sort of changes?
#17: Emotions, primarily.
Moses: Could you elaborate?
#17: For most of my existence, I was incapable of experiencing them. I could recognize emotions in others and understand what they meant, at least in principle. But I couldn't experience them myself. That changed a few years ago.
Moses: You mean you previously suppressed your emotions?
#17: No. There was nothing to suppress. I simply didn't have them.
Moses: I see. And how have you adjusted to experiencing them?
#17: ...I'm still trying to understand that.
Moses: After several years?
#17: Yes. I understand that might seem strange, but knowing what an emotion is and actually experiencing it are two very different things. I can recognize that something is affecting me without necessarily understanding why.
Moses: Can you give me an example?
#17: There are occasions when I find myself reconsidering decisions I would have made without hesitation before. Sometimes nothing about the circumstances has changed. Only my response to them.
Moses: Does that trouble you?
#17: I think it does.
Moses: You think?
#17: I'm not always certain what to call these things. Concern, discomfort, apprehension... I know there are differences between them. Recognizing which one I'm experiencing is another matter.
Moses: You seem quite aware of your own uncertainty, at least.
#17: It's difficult not to be when so much of what you experience is unfamiliar.
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
