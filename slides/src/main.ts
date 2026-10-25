import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import 'reveal.js/dist/reveal.css';
import './style.css';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function createCurveballs() {
  const conditions = [
    {
      label: 'Dependencies',
      title: 'A package you depend on disappears.',
      context: 'The signup component is no longer available. Your next release still needs to work.',
      qualities: 'Maintainability · Modifiability',
      question: 'Can you replace the dependency without rewriting the signup workflow?',
    },
    {
      label: 'Devices',
      title: 'The club now needs this on phones.',
      context: 'Members are signing up between classes. A desktop-only workflow no longer fits their day.',
      qualities: 'Usability · Portability',
      question: 'Which interaction assumptions fail on a small screen, touch input, or an unreliable connection?',
    },
    {
      label: 'Demand',
      title: 'Usage jumps 10× for an event.',
      context: 'The club promotes a major event. Many people try to find and claim the remaining shifts at once.',
      qualities: 'Scalability · Performance',
      question: 'Where does work accumulate, and how will you test response time and correct signups under load?',
    },
    {
      label: 'Trust',
      title: 'The stakeholder wants member data private.',
      context: 'The organizer needs contact details. Other members should not be able to browse them.',
      qualities: 'Security · Privacy',
      question: 'Where are access rules enforced, and what member data does the system actually need to retain?',
    },
    {
      label: 'Technology',
      title: 'A technology is no longer allowed.',
      context: 'The organization cannot approve your chosen service. The project must use an acceptable alternative.',
      qualities: 'Modifiability · Architectural flexibility',
      question: 'Which boundaries let you change the service without changing the entire application?',
    },
  ];
  let selected = 0;
  const groups = document.querySelectorAll<HTMLElement>('.condition-controls');
  function update(index: number) {
    selected = index;
    const condition = conditions[index];
    groups.forEach(group => group.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index))));
    document.querySelector('#curveball-label')!.textContent = condition.label.toUpperCase();
    document.querySelector('#curveball-title')!.textContent = condition.title;
    document.querySelector('#curveball-context')!.textContent = condition.context;
    document.querySelector('#architecture-condition')!.textContent = condition.title;
    document.querySelector('#architecture-qualities')!.textContent = condition.qualities;
    document.querySelector('#architecture-question')!.textContent = condition.question;
  }
  groups.forEach(group => group.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => update(index))));
  document.querySelector('#next-curveball')!.addEventListener('click', () => update((selected + 1) % conditions.length));
}

function createMaterialLibrary() {
  const materials = [
    {
      kicker: 'Persistence / Relationships / Operations',
      title: 'How should this system remember?',
      description: 'Relational, document, and key-value databases organize data differently. Begin with the access patterns and consistency your problem needs.',
      question: 'Compare two options for event shifts and signups. Explain integrity, migrations, and operational burden.',
    },
    {
      kicker: 'Conventions / Ecosystem / Longevity',
      title: 'Which structure helps this team build?',
      description: 'A framework supplies conventions and reusable machinery. It also shapes dependencies, deployment options, and future upgrades.',
      question: 'Compare a small server-rendered application with a separate client and API for this club. What complexity does each introduce?',
    },
    {
      kicker: 'Runtime / Types / Tooling',
      title: 'What properties does the language bring?',
      description: 'Languages differ in runtime behavior, type systems, tooling, and libraries. Familiarity is useful, but it is not the only criterion.',
      question: 'Compare language options against our deployment environment and maintenance needs. Which claims should we verify?',
    },
    {
      kicker: 'License / Maintenance / Supply chain',
      title: 'Whose work are we building on?',
      description: 'Packages can accelerate construction. Inspect their licenses, maintenance, dependencies, and the cost of replacing them.',
      question: 'Evaluate this dependency and an alternative. Where should we isolate it, and how would we keep it updated?',
    },
    {
      kicker: 'Deployment / Reliability / Cost',
      title: 'Where will the software live?',
      description: 'Managed services, serverless functions, and long-running servers move operational responsibilities around. None makes those responsibilities disappear.',
      question: 'Compare hosting options for our traffic pattern. Explain secrets, backups, recovery, recurring cost, and who operates the service.',
    },
  ];
  const controls = document.querySelectorAll<HTMLButtonElement>('.material-controls button');
  controls.forEach((button, index) => button.addEventListener('click', () => {
    const material = materials[index];
    controls.forEach((control, i) => control.setAttribute('aria-pressed', String(i === index)));
    document.querySelector('#material-kicker')!.textContent = material.kicker.toUpperCase();
    document.querySelector('#material-title')!.textContent = material.title;
    document.querySelector('#material-description')!.textContent = material.description;
    document.querySelector('#material-question')!.textContent = material.question;
  }));
}

createCurveballs();
createMaterialLibrary();

// Space and Enter should activate a focused button, not also advance Reveal.
document.querySelectorAll('button').forEach(button => button.addEventListener('keydown', event => {
  if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
}));

const deck = new Reveal({
  width: 1440,
  height: 810,
  margin: 0.035,
  minScale: 0.15,
  maxScale: 1.5,
  hash: true,
  controls: false,
  progress: false,
  center: false,
  scrollActivationWidth: 0,
  transition: motionPreference.matches ? 'none' : 'fade',
  transitionSpeed: 'default',
  backgroundTransition: 'none',
  pdfSeparateFragments: false,
  plugins: [Notes],
});

const previous = document.querySelector<HTMLButtonElement>('#previous')!;
const next = document.querySelector<HTMLButtonElement>('#next')!;
function updateNavigation() {
  const index = deck.getIndices().h;
  const total = deck.getTotalSlides();
  document.querySelector('#slide-number')!.textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#slide-total')!.textContent = String(total).padStart(2, '0');
  document.querySelector('#slide-title')!.textContent = deck.getCurrentSlide().dataset.title ?? '';
  document.querySelector<HTMLElement>('#progress')!.style.width = `${((index + 1) / total) * 100}%`;
  previous.disabled = deck.isFirstSlide();
  next.disabled = deck.isLastSlide();
}

document.querySelector('#begin')!.addEventListener('click', () => deck.next());
document.querySelector('#restart')!.addEventListener('click', () => deck.slide(0));
previous.addEventListener('click', () => deck.prev());
next.addEventListener('click', () => deck.next());
motionPreference.addEventListener('change', event => deck.configure({ transition: event.matches ? 'none' : 'fade' }));
deck.on('slidechanged', updateNavigation);
deck.on('fragmentshown', updateNavigation);
deck.on('fragmenthidden', updateNavigation);
await deck.initialize();
document.querySelectorAll<HTMLButtonElement>('#begin, #restart').forEach(button => { button.disabled = false; });
updateNavigation();
