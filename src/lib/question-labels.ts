/**
 * Maps assessment answer keys (e.g. "P0-Q1_ROLE") to human-readable question labels.
 * Used by CRM assessment viewer to show full Q&A instead of raw keys.
 */
import {
  P0_QUESTIONS,
  SR_QUESTIONS,
  IA_QUESTIONS,
  CM_QUESTIONS,
  GE_QUESTIONS,
  CO_QUESTIONS,
} from "@/data/assessment-questions";

const ALL_QUESTIONS = [
  ...P0_QUESTIONS,
  ...SR_QUESTIONS,
  ...IA_QUESTIONS,
  ...CM_QUESTIONS,
  ...GE_QUESTIONS,
  ...CO_QUESTIONS,
];

// code → label map
const questionMap = new Map(ALL_QUESTIONS.map(q => [q.code, q.label]));

// code → options map (for resolving value → display label)
const optionsMap = new Map(
  ALL_QUESTIONS.filter(q => q.options).map(q => [
    q.code,
    new Map(q.options!.map(o => [o.value, o.label])),
  ])
);

export function getQuestionLabel(code: string): string {
  return questionMap.get(code) || code;
}

export function getAnswerLabel(code: string, value: any): string {
  if (value == null) return "—";
  const opts = optionsMap.get(code);
  if (!opts) return Array.isArray(value) ? value.join(", ") : String(value);
  if (Array.isArray(value)) {
    return value.map(v => opts.get(v) || v).join(", ");
  }
  return opts.get(String(value)) || String(value);
}

export function getTotalQuestionCount(): number {
  return ALL_QUESTIONS.length;
}
