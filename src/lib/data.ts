// English manuscript sample (the service edits English, so this stays English in both UI languages)
export type Seg = { t: string; k: "same" | "del" | "ins"; c?: number };
export const ORIGINAL =
  "The results of this study was shown that the patients which received the treatment had a significant improvment in their recovery, however the reason for that is not clear and need further investigation.";
export const SEGMENTS: Seg[] = [
  { t: "The results of this study ", k: "same" },
  { t: "was shown", k: "del" }, { t: "show", k: "ins", c: 0 },
  { t: " that ", k: "same" },
  { t: "the ", k: "del" },
  { t: "patients ", k: "same" },
  { t: "which", k: "del" }, { t: "who", k: "ins", c: 1 },
  { t: " received the treatment ", k: "same" },
  { t: "had a significant improvment in their recovery", k: "del" },
  { t: "recovered significantly faster", k: "ins", c: 2 },
  { t: ", however", k: "del" }, { t: "; however,", k: "ins", c: 3 },
  { t: " the ", k: "same" },
  { t: "reason for that is not clear", k: "del" },
  { t: "underlying mechanism remains unclear", k: "ins", c: 4 },
  { t: " and ", k: "same" },
  { t: "need", k: "del" }, { t: "requires", k: "ins", c: 5 },
  { t: " further investigation.", k: "same" },
];
export const COMMENTS = [
  "Subject–verb agreement: “results … show”. Present tense is standard for reporting findings.",
  "Use “who” (not “which”) when the antecedent is people.",
  "Tightened for concision and to state the finding directly (“recovered significantly faster”). Please confirm this matches your data.",
  "“However” joining two clauses needs a semicolon before and a comma after.",
  "“Reason for that” is vague. “Underlying mechanism” is the expected term here. Please confirm the intended meaning.",
  "Subject–verb agreement: the subject “mechanism” is singular, so “requires”.",
];
