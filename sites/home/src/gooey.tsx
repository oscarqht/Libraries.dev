import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useSiteTheme } from "./useSiteTheme";
import {
  GooeyStudio,
  MorphDemo,
  MoveDemo,
  BendDemo,
  GOOEY_EXAMPLE_DEFAULTS as D,
} from "./studio/gooey";

/* Gooey detail page — the demo page's own prototypes as examples first,
   then a mini playground beneath. Both come from the Studio module, whose
   demos are the live gooey demo page's prototypes ported verbatim (same
   geometry, physics defaults, fills and shadows), so the three surfaces
   cannot drift. The playground renders the public variant: same demos,
   but only the effect switch and the two surface knobs, and no Agent tab
   — the deeper tuning stays in the Studio. */

function GooeyPage(): JSX.Element {
  const theme = useSiteTheme();
  return (
    <>
      <div className="detail-examples">
        <div className="example-row-full">
          <MorphDemo group={D.group} knobs={D.morph} theme={theme} />
        </div>
        <div className="example-row-split">
          <div className="example-cell">
            <MoveDemo group={D.group} knobs={D.move} theme={theme} />
          </div>
          <div className="example-cell">
            <BendDemo group={D.group} knobs={D.bend} theme={theme} />
          </div>
        </div>
      </div>

      <p className="detail-playground-label">Playground</p>
      <GooeyStudio variant="public" theme={theme} />
    </>
  );
}

const rootEl = document.getElementById("playground-root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <GooeyPage />
    </StrictMode>
  );
}
