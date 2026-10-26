# Teaching Software Engineering in a Studio Class with AI

# Setup
## https://github.com/gwincr11/studio-based-cs

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/gwincr11/studio-based-cs)

- Wait for codespace to build
- view -> Terminal
- run scripts/start-app in the terminal
- A website should open for you.

### Overview of contents

An outline-led, 38-slide presentation introducing a proposed class, followed by a distinct hands-on studio and guest discussions. Slide titles and order follow the presenter's course outline. The warm mineral palette, architectural typography, and geometric details remain a visual theme rather than a competing narrative.

Sections, cards, steps, and selectors use descriptive labels without decorative numbering. The footer retains the slide counter.

Sample feedback and the ADR example are illustrative. Workshop participants bring their own problems. The CMU slide describes the presenter's experience, not an institution-wide policy. Guest slides introduce conversations rather than asserting guest findings.

## Bundled workshop app

[`src/`](src/README.md) contains an independent Flask + React Islands +
PostgreSQL starter, with a working message board to verify the full stack before
teams build their own solution. It includes agent instructions, planning/review/
refactoring agents, browser tools, lint/type/test scripts, pre-commit hooks, and
GitHub Actions. The presentation's existing app and commands remain separate.

Open this repository in Codespaces to install both projects and PostgreSQL using
the root `.devcontainer/` setup, then run `./scripts/start-app` and open
the URL printed in the terminal (port 5000, or the next available port). For local
setup, run `./scripts/setup` first. The root
`render.yaml` deploys the starter as a free Render web service with an externally
provided PostgreSQL URL. See the starter README for requirements, account limits,
and deployment steps.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
./scripts/start-slides.sh
```

The launch script works from any working directory and forwards options to Vite, for example `./scripts/start-slides.sh --port 4317`. Stop the server with **Ctrl+C**. You can also use `npm run dev` directly.

Open the local URL printed by Vite. `npm run build` type-checks and creates the deployable `dist/` directory; `npm run preview` serves that build locally.

## Present

- **Arrow keys / Space:** advance through slides and incremental reveals.
- **O / Escape:** see the slide overview.
- **F:** fullscreen, where supported.
- **S:** open speaker notes (allow the browser popup).
- **Home / End:** jump to the first / last slide.
- **Touch:** swipe between slides; use the controls to explore diagrams and workshop scenarios.

Slide URLs are shareable (`/#/site` opens the studio definition; `/#/workshop` starts the shared studio; `/#/prototype` opens the AI build activity). For PDF export, open `/?print-pdf` in Chromium, then print to PDF in landscape with background graphics enabled. Each slide prints once with its fragment reveals visible; interactive panels print their current state.

## Presentation structure

| Slides | Chapter | Purpose |
| --- | --- | --- |
| 1–7 | The class idea | Title, agenda, studio definition, why engineering, why a studio, AI roles, and prompt logging |
| 8–10 | The course arc | Paired teaching topics and studio activities, first builds, and teams and problems |
| 11–16 | Design thinking | Overview, understanding, ideation, prototypes, validation, and iteration |
| 17–20 | Studio practice | Studio, review formats, the CMU presentation example, and scaling feedback with AI |
| 21–28 | Software engineering | Introducing engineering, ADRs, materials, quality attributes, throwing curveballs and examples, production, and shipping |
| 29–35 | The shared studio | Explicit transition, exchange problems, ideate with a Creative Matrix, build with AI, pinup review, curveball, and revision |
| 36–38 | Experiences from practice | Geoffrey Challen, Swift, and discussion |

Speaker notes on every slide contain talking points, facilitation instructions, and qualifications. The workshop has no fixed duration yet. Before presenting, confirm participant AI-tool access, a working starter, stakeholder arrangements, the guest introductions, and any local assessment or prompt-logging policies.

After exchanging problems, `/#/studio-ideate` introduces [LUMA Institute's Creative Matrix](https://www.luma-institute.com/creative-matrix/). Teams adapt the example's problem-moment columns and solution-enabler rows, generate ideas at their intersections, and choose a direction to prototype. A suggested five-minute sprint keeps ideation brief; the timing and example prompts are workshop adaptations, not a prescribed LUMA format.

The course explanation finishes before the shared studio begins. The course arc shows twelve ordered pairings in two columns: what is being taught and the studio component. In the workshop, everyone forms a team of two and finds another team. Teams discuss real problems they have, and each team proposes a solution to the other team's problem that day. They sketch alternatives, build software with AI, return to the other team for review, and revise in response to a constraint. The student-club signup problem remains an illustrative example in the course explanation and prepared curveballs, not an assigned workshop brief. Curveball selections carry between `/#/curveball` and `/#/constraint-architecture` without reloading the page; interactive choices reset on refresh. The material library provides presenter-controlled exploration. These controls run locally; they do not invoke AI or collect student prompts.

## Make it yours

- **`slides/index.html`** contains the slide content and speaker notes. Add a `<section id="shareable-name" data-title="Your slide title">` inside `.slides`; the footer count updates automatically. Put speaker notes in `<aside class="notes">`.
- **`slides/src/style.css`** defines the theme and layouts. Reuse `.eyebrow`, `.section-heading`, `.section-intro`, and `.margin-note`. Slides use a 1440 × 810 design canvas, scaled to fit the viewport.
- **`slides/src/main.ts`** initializes Reveal.js and connects the material and curveball controls. Use Reveal's `slidechanged` event for slide-specific animation lifecycles; stop timers or simulations when their slide is left.
- Add `class="fragment"` to reveal an element on the next advance. Use `data-fragment-index` to control ordering.
- Google Fonts supplies DM Sans and Libre Caslon Display; local system fallbacks keep the deck usable offline. Self-host the fonts if you need exact offline typography.

Reduced-motion preferences disable transitions. Interactive controls update directly without animated interpolation, remaining responsive to keyboard and pointer input.

## Browser checks

```sh
npx playwright install chromium
npm test
```

The browser checks cover outline order, the workshop transition, navigation, fragment sequencing, interactive selectors, cross-slide curveball state, keyboard activation, overview mode, reduced-motion behavior, print view, and content fitting the slide canvas on desktop and mobile.

## Slide-building agent

`.github/agents/slide-builder.agent.md` defines a repository custom agent for designing and implementing slides in the existing organic architecture theme. It covers D3 interactions, Reveal fragments, animation lifecycles, accessibility, and presentation layout.

In Copilot CLI, select it with `/agent slide-builder`, then describe the slide and its intended takeaway.
