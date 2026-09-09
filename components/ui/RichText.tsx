import type { ReactNode } from "react";
import Highlight, { type HighlightVariant } from "./Highlight";

/**
 * RichText — inline highlight parser for editorial copy (site-wide).
 *
 * Data copy in `data/*.ts` stays plain strings; emphasis is marked inline so
 * editors never touch JSX. Words are ONLY styled, never re-written.
 *
 * Exactly two markers, per the site-wide highlight rules:
 *
 *   *word*    → blue brush — ONE word only
 *   _phrase_  → champagne underline — 2–4 word sets
 *
 * Everything else renders verbatim, so un-marked copy is unaffected.
 */
const PATTERN = /\*([^*\n]+)\*|_([^_\n]+)_/g;

const VARIANT_BY_GROUP: Record<number, HighlightVariant> = {
  1: "brush",
  2: "underline",
};

export default function RichText({
  children,
  onDark = false,
}: {
  children: string;
  onDark?: boolean;
}) {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  // matchAll() clones the regex internally — the module-level PATTERN is
  // never mutated, so this stays safe across renders.
  for (const match of children.matchAll(PATTERN)) {
    if (match.index > last) parts.push(children.slice(last, match.index));
    for (const group of [1, 2]) {
      const text = match[group];
      if (text) {
        parts.push(
          <Highlight
            key={`h-${key++}`}
            variant={VARIANT_BY_GROUP[group]}
            onDark={onDark}
          >
            {text}
          </Highlight>,
        );
      }
    }
    last = match.index + match[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}
