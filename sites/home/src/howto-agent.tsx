import { createRoot } from "react-dom/client";
import { StudioThemeContext, ThinkingStatus } from "./studio/controls";
import { useSiteTheme } from "./useSiteTheme";

/* How to use, step 3: the thinking line in the recreated agent panel is the
   Studio's own ThinkingStatus (controls.tsx) — orb, shimmer and the line
   swap, unchanged — so the mock reads as the real thing. The static row in
   the markup stands in until this mounts. The orb follows the page theme,
   since the panel it sits in does. */

const noop = () => {};

function HowtoAgentStatus() {
  const theme = useSiteTheme();
  return (
    <StudioThemeContext.Provider value={{ theme, toggle: noop }}>
      <ThinkingStatus />
    </StudioThemeContext.Provider>
  );
}

const mount = document.getElementById("howto-agent-status");
if (mount) {
  mount.textContent = "";
  createRoot(mount).render(<HowtoAgentStatus />);
}
