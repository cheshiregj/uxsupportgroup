export type AgendaRowDetails = {
  description?: string;
  outcomes?: string[];
};

export type AgendaRow = {
  time: string;
  title: string;
  facilitator?: string;
  /** Short topic/theme label rendered as a pill on facilitator cards (e.g. "Trust", "Multimodal"). */
  theme?: string;
  details?: AgendaRowDetails;
};

export type AgendaSessionWithDay = AgendaRow & {
  /** "Day 1" | "Day 2" */
  dayLabel: string;
  /** Day-level theme (e.g. "The Shift", "The Practice"). */
  dayTheme: string;
};

export const DAY1_THEME = "The Shift";
export const DAY2_THEME = "The Practice";

/** Long-form day labels used in the facilitator modal session list. */
export const DAY1_DATE_LABEL = "Day 1 · Thu, Jun 18";
export const DAY2_DATE_LABEL = "Day 2 · Fri, Jun 19";

/** Timezone suffix appended to agenda times when shown in the modal. */
export const SUMMIT_TIME_SUFFIX = "EDT";

/** First-name keys used in the agenda; map full facilitator name -> agenda key. */
const FACILITATOR_AGENDA_KEY: Record<string, string> = {
  "Suyen Stevenson": "Suyen",
  "Danny Setiawan": "Danny",
  "Silvia Balu": "Silvia",
  "Esther Greenfield-Jakar": "Esther",
  "Corey Malone": "Corey",
  "Volkan Unsal": "Volkan",
  "Renata Rocha": "Renata",
  "Alexis Brochu": "Alexis",
};

/** Rows we don't want to surface as a facilitator's "primary" session. */
const NON_PRIMARY_TITLE_PATTERNS = [
  /^Welcome/i,
  /^Close/i,
  /^Break/i,
  /Day 2 preview/i,
];

const isPrimaryTitle = (title: string) =>
  !NON_PRIMARY_TITLE_PATTERNS.some((re) => re.test(title));

/** Returns all agenda rows this facilitator is listed on, across both days, in order. */
export function getFacilitatorAgendaSessions(
  facilitatorName: string,
): AgendaSessionWithDay[] {
  const key = FACILITATOR_AGENDA_KEY[facilitatorName];
  if (!key) return [];
  const matches = (row: AgendaRow) =>
    !!row.facilitator &&
    row.facilitator.split("/").map((s) => s.trim()).includes(key);
  return [
    ...AGENDA_DAY1.filter(matches).map((r) => ({
      ...r,
      dayLabel: "Day 1",
      dayTheme: DAY1_THEME,
    })),
    ...AGENDA_DAY2.filter(matches).map((r) => ({
      ...r,
      dayLabel: "Day 2",
      dayTheme: DAY2_THEME,
    })),
  ];
}

/** Picks the most substantive session for a facilitator (skips Welcome/Close/Break). */
export function getPrimaryFacilitatorSession(
  facilitatorName: string,
  excludeTitles: string[] = [],
): AgendaSessionWithDay | undefined {
  return getPrimaryFacilitatorSessions(facilitatorName, excludeTitles)[0];
}

/** All substantive sessions for a facilitator (skips Welcome/Close/Break + caller-excluded titles). */
export function getPrimaryFacilitatorSessions(
  facilitatorName: string,
  excludeTitles: string[] = [],
): AgendaSessionWithDay[] {
  const exclude = new Set(excludeTitles);
  return getFacilitatorAgendaSessions(facilitatorName).filter(
    (s) => isPrimaryTitle(s.title) && !exclude.has(s.title),
  );
}

export const agendaRowKey = (row: AgendaRow) => `${row.time}-${row.title}`;

export const hasAgendaDetails = (row: AgendaRow) =>
  Boolean(
    row.details &&
      (row.details.description || (row.details.outcomes && row.details.outcomes.length > 0)),
  );

export const AGENDA_DAY1: AgendaRow[] = [
  {
    time: "09:00 AM",
    title: "Welcome",
    facilitator: "Suyen",
  },
  {
    time: "09:15 AM",
    title: "Keynote: Designer's New Mandate",
    facilitator: "Danny",
  },
  {
    time: "10:00 AM",
    title:
      "Create Your Summit Agent (build a simple agent you'll use/refine throughout the summit)",
    facilitator: "Danny",
  },
  { time: "10:45 AM", title: "Break" },
  {
    time: "11:00 AM",
    title: "Trust, Transparency & Control",
    facilitator: "Silvia",
  },
  {
    time: "12:00 PM",
    title: "Designing with Agentic AI — From Vision to Outcome",
    facilitator: "Esther",
    details: {
      description:
        "In this session, you'll learn to treat AI as a \"creative intern\" rather than just a tool. Drawing on a decade of experience in cross-functional leadership, Esther bridges the gap between complex AI and practical productivity by focusing on agentic workflows that automate the \"drag\" of execution.\n\nYou'll explore multimodal systems that move rapidly from problem statements to a wide range of tangible outcomes. By mastering these agentic workflows, designers can reclaim their creative energy and stay focused where it matters most.",
    },
  },
  {
    time: "12:45 PM",
    title: "Multimodal Futures",
    facilitator: "Corey",
    details: {
      description:
        "You've been designing context your whole career — what users see, hear, feel, and bring with them into every moment of an experience. Agentic AI needs exactly that thinking, and right now, almost nobody is applying it.\n\nIn this workshop, you'll learn to see AI agents the way a designer should: not as black boxes, but as systems that fuse signals — voice, vision, text, history — to build confidence and take action. You'll map what your agent perceives, where its blind spots are, and what a real person actually feels when they encounter it. Groups break into moderated rooms, define what their agent should and shouldn't do, then use AI to generate a customer journey and suggest multimodal inputs. No code required.",
      outcomes: [
        "A high-level specification for an agentic AI",
        "A journey map with multimodal sources called out",
        "A short video of the end-user journey",
      ],
    },
  },
  {
    time: "01:30 PM",
    title: "Close & Day 2 preview",
    facilitator: "Suyen/Danny",
  },
];

export const AGENDA_DAY2: AgendaRow[] = [
  {
    time: "09:00 AM",
    title: "Welcome back",
    facilitator: "Suyen",
  },
  {
    time: "09:15 AM",
    title: "Orchestrating Complexity",
    facilitator: "Volkan",
    details: {
      description:
        "Three Agents, No Hero: A Field Report From the Orchestrator's Seat.\n\nEvery generation of design tools has promised to reduce complexity and merely moved it. In 2026, complexity has relocated to the orchestrator's seat, where judgment-per-agent halves with every parallel agent you add. This is why you need a Review Budget more than you need another tool.",
    },
  },
  { time: "10:15 AM", title: "Break" },
  {
    time: "10:30 AM",
    title: "Building Your Process",
    facilitator: "Suyen",
    details: {
      description:
        "In this hands-on workshop, you'll explore where human judgment should stay in the loop when automating workflows, and design systems that speed decisions without abdicating responsibility — running AI systems that don't break trust.\n\nWe'll explore questions like:\n• Where should humans stay in the loop, and what actually happens if they don't?\n• How do you speed up decisions without abdicating responsibility?\n• How do you talk about automation decisions with your team and stakeholders?",
      outcomes: [
        "A framework for guardrail moments — concrete decision points where you automate information gathering but keep human judgment in the loop",
        "Three design patterns: draft modes, proposal systems, and soft guardrails (flag-but-don't-block) you can steal for your own work",
        "Shared vocabulary like 'system proposes vs. system decides' to navigate team and stakeholder conversations",
      ],
    },
  },
  {
    time: "11:30 AM",
    title: "Your Path Forward",
    facilitator: "Renata",
  },
  {
    time: "12:15 PM",
    title: "Break",
  },
  {
    time: "12:30 PM",
    title: "Design Your AI Networking Agent (teams refine + collaborate with other agents)",
    facilitator: "Alexis",
    details: {
      description:
        "A practical workshop designed to help UX and product designers automate their professional outreach. The session shifts the focus from manual networking to an architectural approach, teaching you how to build a personalized AI networking agent.\n\nUsing a combination of Claude, Notion, and Gmail, you'll integrate these platforms into a functional automation framework for managing relationships. This hands-on experience aims to provide immediate utility, allowing creative professionals to apply their technical skills to their own career infrastructure — empowering you to maintain a robust professional network without the burden of constant manual upkeep.",
    },
  },
  {
    time: "01:35 PM",
    title: "Close",
    facilitator: "Suyen/Danny",
  },
];
