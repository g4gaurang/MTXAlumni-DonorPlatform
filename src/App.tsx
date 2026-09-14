import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleUserRound,
  Clock3,
  CloudCog,
  Database,
  FileCheck2,
  Filter,
  Gift,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Layers3,
  Link2,
  LockKeyhole,
  Mail,
  Menu,
  MessageSquareText,
  Network,
  PanelTop,
  Route,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  UsersRound,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type IconName =
  | 'profile'
  | 'engagement'
  | 'workflow'
  | 'analytics'
  | 'architecture'
  | 'gift'
  | 'community'
  | 'research'
  | 'finance'

const iconMap: Record<IconName, LucideIcon> = {
  profile: CircleUserRound,
  engagement: HeartHandshake,
  workflow: Workflow,
  analytics: BarChart3,
  architecture: Blocks,
  gift: Gift,
  community: UsersRound,
  research: Search,
  finance: CircleDollarSign,
}

const challenges = [
  {
    title: 'Fragmented constituent information',
    icon: 'profile' as IconName,
    problem: 'Alumni, donor, student, event, gift, volunteer, and communication information may reside in separate systems.',
    people: 'Advancement services, gift officers, alumni teams, data leaders',
    consequence: 'Staff reconcile records manually and may act without relevant context.',
    response: 'Create a governed constituent view that connects identities, affiliations, households, relationships, interests, interactions, gifts, and institutional involvement.',
    measures: ['Profile completeness', 'Duplicate rate', 'Matched records', 'Unresolved data issues'],
  },
  {
    title: 'Inconsistent engagement history',
    icon: 'engagement' as IconName,
    problem: 'Gift officers and alumni teams may not have a shared record of communications, meetings, events, volunteering, and stewardship.',
    people: 'Gift officers, alumni relations, stewardship teams',
    consequence: 'Outreach can become disconnected or repeat prior conversations.',
    response: 'Capture cross-channel activity on a shared engagement timeline and make relevant history available to authorized staff.',
    measures: ['Engaged constituents', 'Contact coverage', 'Activity recency', 'Cross-channel participation'],
  },
  {
    title: 'Manual fundraising workflows',
    icon: 'workflow' as IconName,
    problem: 'Portfolio reviews, assignments, approvals, acknowledgements, and follow-up tasks frequently depend on spreadsheets or email.',
    people: 'Development leaders, gift officers, advancement services',
    consequence: 'Ownership is harder to see and time-sensitive activity may stall.',
    response: 'Use configurable workflows for prospect development, gift opportunities, approvals, task management, and stewardship.',
    measures: ['Portfolio coverage', 'Overdue actions', 'Opportunity aging', 'Acknowledgement turnaround'],
  },
  {
    title: 'Generic communications',
    icon: 'community' as IconName,
    problem: 'Broad outreach can overlook constituent interests, affiliations, giving patterns, and preferred communication channels.',
    people: 'Annual giving, alumni relations, communications teams',
    consequence: 'Messages may be less relevant and preferences harder to honor.',
    response: 'Build governed audience segments and configurable engagement journeys using approved constituent information.',
    measures: ['Audience reach', 'Engagement rate', 'Response by segment', 'Communication preferences'],
  },
  {
    title: 'Limited fundraising visibility',
    icon: 'analytics' as IconName,
    problem: 'Leadership may receive delayed or conflicting views of pipeline activity, campaign progress, gifts, and participation.',
    people: 'Advancement executives, foundation leaders, development managers',
    consequence: 'Planning discussions rely on inconsistent definitions or stale reports.',
    response: 'Provide role-based dashboards using governed definitions and traceable source data.',
    measures: ['Pipeline value', 'Campaign progress', 'Participation', 'Forecast variance'],
  },
  {
    title: 'Difficult system modernization',
    icon: 'architecture' as IconName,
    problem: 'Institutions often operate established advancement, student, finance, payment, marketing, and reporting systems that cannot be replaced at once.',
    people: 'CIOs, technology directors, advancement operations',
    consequence: 'Large replacement programs can delay priority capabilities.',
    response: 'Introduce product capabilities in phases and connect them through standards-based integration patterns.',
    measures: ['Connected systems', 'Synchronized records', 'Failed exchanges', 'Manual handoffs retired'],
  },
]

const journeyStages = [
  {
    name: 'Discover and Connect',
    short: 'Discover',
    constituent: 'Update profile details, affiliations, and contact preferences.',
    team: 'Match identities, review affiliation history, and resolve record questions.',
    support: 'Constituent matching, profile creation, affiliation history, contact preferences, and directory updates.',
    data: 'Source ownership, identity rules, consent, and profile completeness.',
    measures: 'Matched records, profile updates, unresolved identity issues.',
  },
  {
    name: 'Engage and Participate',
    short: 'Engage',
    constituent: 'Join events, communities, volunteer work, mentoring, surveys, and digital interactions.',
    team: 'Coordinate programs and understand cross-channel participation.',
    support: 'Events, communities, volunteering, mentoring, communications, surveys, and digital interaction.',
    data: 'Participation taxonomy, channel preferences, and engagement definitions.',
    measures: 'Active participants, event attendance, volunteer activity.',
  },
  {
    name: 'Identify and Qualify',
    short: 'Qualify',
    constituent: 'Receive engagement relevant to known interests and relationships.',
    team: 'Review research, interest indicators, networks, and capacity information.',
    support: 'Research workspaces, relationship maps, qualification tasks, and staff review.',
    data: 'Approved data sources, research provenance, and access boundaries.',
    measures: 'Qualification activity, review age, portfolio readiness.',
  },
  {
    name: 'Cultivate Relationships',
    short: 'Cultivate',
    constituent: 'Build an ongoing relationship through coordinated, contextual contact.',
    team: 'Manage portfolios, plans, meetings, tasks, contact reports, and opportunities.',
    support: 'Portfolio assignment, engagement plans, interaction history, and opportunity development.',
    data: 'Relationship manager ownership, contact-report standards, and plan status.',
    measures: 'Portfolio coverage, plan progress, contact recency.',
  },
  {
    name: 'Solicit and Commit',
    short: 'Solicit',
    constituent: 'Review a documented opportunity aligned with institutional priorities.',
    team: 'Coordinate strategy, proposals, pledges, approvals, and attribution.',
    support: 'Solicitation plans, proposal workflow, commitments, campaigns, and approvals.',
    data: 'Stage definitions, amount handling, approvals, and campaign credit.',
    measures: 'Proposal activity, stage movement, pending approvals.',
  },
  {
    name: 'Process and Acknowledge',
    short: 'Process',
    constituent: 'Receive clear confirmation and acknowledgement of a contribution.',
    team: 'Coordinate gift entry, payment status, designation, receipts, and exceptions.',
    support: 'Gift review, receipting, acknowledgements, finance coordination, and exception queues.',
    data: 'Designation mapping, financial controls, receipt rules, and audit history.',
    measures: 'Processing status, exception volume, acknowledgement turnaround.',
  },
  {
    name: 'Steward and Reengage',
    short: 'Steward',
    constituent: 'See impact, receive recognition, and choose future ways to participate.',
    team: 'Deliver stewardship plans, impact communications, and pledge follow-up.',
    support: 'Recognition, reporting, pledge activity, participation, and future engagement.',
    data: 'Stewardship commitments, recognition preferences, and outcome records.',
    measures: 'Plans due, impact messages completed, follow-up status.',
  },
]

const roles = [
  ['Alumni and Community Members', 'Maintain profiles and preferences, register for events, volunteer, join communities, and contribute through accessible digital services.', GraduationCap],
  ['Donors', 'Review giving history, manage preferences, complete contributions, and receive relevant acknowledgement and stewardship information.', Gift],
  ['Alumni Relations Teams', 'Coordinate programs, communities, volunteers, events, and communications with a shared view of participation.', UsersRound],
  ['Gift Officers', 'Review portfolios, understand relationship history, plan outreach, document interactions, manage opportunities, and coordinate stewardship.', BriefcaseBusiness],
  ['Advancement Services', 'Manage constituent data, gift administration, acknowledgements, data quality, reporting definitions, and operational controls.', Settings2],
  ['Prospect Research', 'Evaluate approved research, document sources, map relationships, and prepare information for staff review.', Search],
  ['Finance and Gift Processing', 'Review gift details, payment status, designations, exceptions, and reconciliation activity with traceable records.', CircleDollarSign],
  ['Institutional Leaders', 'Review participation, campaign progress, donor pipelines, fundraising activity, and areas needing attention.', Building2],
  ['Platform and Data Administrators', 'Configure roles, business rules, data mappings, access, quality controls, and integration monitoring.', Database],
] as const

const capabilityGroups = [
  ['Constituent and Relationship Management', 'Create a governed foundation for people, organizations, affiliations, and connected relationships.', ['Unified constituent profiles', 'Affiliation and education history', 'Household and relationship networks', 'Interest and preference management', 'Identity matching', 'Data-quality workflows', 'Consent and communication preferences'], Network],
  ['Alumni Engagement', 'Support participation across events, communities, volunteering, mentoring, and digital channels.', ['Event management', 'Communities and chapters', 'Volunteer opportunities', 'Mentoring programs', 'Surveys and feedback', 'Digital self-service', 'Cross-channel engagement history'], HeartHandshake],
  ['Fundraising and Development', 'Coordinate relationship development from portfolio assignment through commitment and stewardship.', ['Prospect portfolios', 'Moves management', 'Opportunity tracking', 'Campaigns and appeals', 'Pledges and commitments', 'Proposal and approval workflows', 'Stewardship planning'], Target],
  ['Gift Administration', 'Manage contribution records, designations, acknowledgements, reconciliation support, and exceptions.', ['Gift entry and review', 'Gift designation', 'Payment status', 'Matching gifts', 'Tribute and memorial gifts', 'Acknowledgements and receipts', 'Finance reconciliation support', 'Exception management'], Gift],
  ['Communications and Journeys', 'Design governed outreach and participation paths using approved content and preferences.', ['Audience segmentation', 'Communication preferences', 'Email and digital outreach', 'Event communications', 'Engagement journeys', 'Message templates', 'Response tracking'], Route],
  ['Analytics and Administration', 'Give leaders and administrators traceable views, controls, and configurable rules.', ['Fundraising dashboards', 'Engagement analytics', 'Campaign reporting', 'Portfolio health', 'Data-quality monitoring', 'Role and access management', 'Audit history', 'Configurable business rules'], BarChart3],
] as const

const profiles = [
  {
    id: 'jordan',
    initials: 'JM',
    name: 'Jordan Mercer',
    subtitle: 'Northbridge College · Class of 2012',
    affiliations: ['Alumni · Arts & Humanities', 'Former student mentor'],
    network: ['2 institutional relationships', 'Household connection recorded'],
    timeline: ['Regional gathering attended', 'Profile preference updated', 'Mentoring interest submitted'],
    events: '3 attended · 1 upcoming',
    interests: 'Mentoring, arts programs',
    giving: 'Recurring participation · amounts restricted',
    preferences: 'Email · quarterly updates',
    manager: 'Avery K. · Regional engagement',
    activities: ['Confirm mentoring match', 'Prepare event follow-up'],
    stewardship: 'Impact update scheduled',
  },
  {
    id: 'samira',
    initials: 'SP',
    name: 'Samira Patel',
    subtitle: 'Redwood Institute · Class of 2006',
    affiliations: ['Alumni · Engineering', 'Advisory council volunteer'],
    network: ['4 institutional relationships', 'Employer affiliation recorded'],
    timeline: ['Advisory meeting completed', 'Campaign briefing viewed', 'Contact report added'],
    events: '2 attended · none upcoming',
    interests: 'Student access, innovation',
    giving: 'Campaign commitment · amount restricted',
    preferences: 'Email and phone · no text',
    manager: 'Morgan L. · Principal relationships',
    activities: ['Share approved impact brief'],
    stewardship: 'Annual report delivered',
  },
  {
    id: 'theo',
    initials: 'TW',
    name: 'Theo Williams',
    subtitle: 'Lakeview University · Friend of the institution',
    affiliations: ['Community member', 'Event volunteer'],
    network: ['No household relationship recorded'],
    timeline: ['Volunteer shift completed', 'Newsletter preference saved'],
    events: '1 attended · 2 upcoming',
    interests: 'Community programs',
    giving: 'No giving information available',
    preferences: 'Email · event notices',
    manager: 'Not assigned',
    activities: [],
    stewardship: 'Not applicable',
  },
]

const opportunities = [
  { id: 1, name: 'Access Fund conversation', constituent: 'Samira P.', stage: 'Cultivation', campaign: 'Access Initiative', owner: 'Morgan L.', amount: 125000, next: 'Share approved impact brief', history: 'Advisory meeting · 12 days ago' },
  { id: 2, name: 'Annual participation renewal', constituent: 'Jordan M.', stage: 'Solicitation Planning', campaign: 'Annual Participation', owner: 'Avery K.', amount: 5000, next: 'Review outreach plan', history: 'Regional gathering · 20 days ago' },
  { id: 3, name: 'Community program interest', constituent: 'Theo W.', stage: 'Identification', campaign: 'Community Programs', owner: 'Unassigned', amount: 0, next: 'Staff qualification review', history: 'Volunteer shift · 8 days ago' },
  { id: 4, name: 'Innovation program proposal', constituent: 'Casey R.', stage: 'Proposal Presented', campaign: 'Innovation Initiative', owner: 'Morgan L.', amount: 250000, next: 'Proposal follow-up', history: 'Proposal shared · 5 days ago' },
  { id: 5, name: 'Scholarship commitment', constituent: 'Riley C.', stage: 'Commitment', campaign: 'Access Initiative', owner: 'Avery K.', amount: 75000, next: 'Confirm documentation', history: 'Commitment discussion · 3 days ago' },
  { id: 6, name: 'First conversation', constituent: 'Alex N.', stage: 'Qualification', campaign: 'Annual Participation', owner: 'Avery K.', amount: 10000, next: 'Complete research review', history: 'Event interaction · 16 days ago' },
  { id: 7, name: 'Program impact plan', constituent: 'Jamie D.', stage: 'Stewardship', campaign: 'Community Programs', owner: 'Morgan L.', amount: 50000, next: 'Schedule impact update', history: 'Acknowledgement sent · 24 days ago' },
]

const pipelineStages = ['Identification', 'Qualification', 'Cultivation', 'Solicitation Planning', 'Proposal Presented', 'Commitment', 'Stewardship']

const analyticsData = {
  Engagement: {
    metrics: [['Active alumni', '18,420'], ['Event participation', '3,180'], ['Volunteer participation', '740'], ['Multi-channel engagement', '4,260']],
    chart: [{ name: 'Q1', primary: 6200, secondary: 2900 }, { name: 'Q2', primary: 7100, secondary: 3300 }, { name: 'Q3', primary: 7800, secondary: 3900 }, { name: 'Q4', primary: 8460, secondary: 4260 }],
    summary: 'Illustrative quarterly trend for active and multi-channel engagement.',
  },
  Fundraising: {
    metrics: [['Pipeline value', '$8.4M'], ['Campaign progress', '61%'], ['Donor participation', '12.8%'], ['Pledges current', '87%']],
    chart: [{ name: 'Identify', primary: 92, secondary: 0 }, { name: 'Qualify', primary: 68, secondary: 0 }, { name: 'Cultivate', primary: 55, secondary: 0 }, { name: 'Propose', primary: 31, secondary: 0 }, { name: 'Commit', primary: 18, secondary: 0 }],
    summary: 'Illustrative opportunity count by simplified pipeline stage.',
  },
  Operations: {
    metrics: [['Portfolio coverage', '82%'], ['Overdue activities', '37'], ['Acknowledgements pending', '16'], ['Data exceptions', '54']],
    chart: [{ name: 'Mon', primary: 76, secondary: 0 }, { name: 'Tue', primary: 61, secondary: 0 }, { name: 'Wed', primary: 58, secondary: 0 }, { name: 'Thu', primary: 49, secondary: 0 }, { name: 'Fri', primary: 42, secondary: 0 }],
    summary: 'Illustrative open operational exceptions over one week.',
  },
  Stewardship: {
    metrics: [['Plans due', '28'], ['Impact messages complete', '142'], ['Recognition activities', '64'], ['Follow-ups open', '19']],
    chart: [{ name: 'Jan', primary: 24, secondary: 18 }, { name: 'Feb', primary: 31, secondary: 22 }, { name: 'Mar', primary: 38, secondary: 29 }, { name: 'Apr', primary: 49, secondary: 35 }],
    summary: 'Illustrative completed impact and recognition activity.',
  },
}

const architectureLayers = [
  ['Experience Layer', 'Alumni portal, donor experience, staff workspaces, mobile access, leadership dashboards.', PanelTop],
  ['Product Capability Layer', 'Constituent management, engagement, fundraising, gift administration, stewardship, events, communications, analytics.', Layers3],
  ['Workflow and Intelligence Layer', 'Business rules, approvals, journey orchestration, alerts, AI assistance, data-quality controls.', BrainCircuit],
  ['Integration Layer', 'APIs, events, middleware, secure files, webhooks, identity federation, payment connections.', GitBranch],
  ['Data and Governance Layer', 'Constituent records, relationship data, gift information, documents, consent, audit history, reporting data.', Database],
  ['Infrastructure Layer', 'Institution-approved cloud, platform services, identity, monitoring, security, backup, and recovery services.', CloudCog],
] as const

const connectionCategories = [
  'Student information systems', 'Advancement and CRM platforms', 'Financial and accounting systems',
  'Payment processors', 'Marketing and communication platforms', 'Event platforms',
  'Identity and access services', 'Data warehouses and analytics tools', 'Document and content-management systems',
  'Collaboration tools', 'Prospect research and data-enrichment providers',
]

const configurationItems = [
  'Constituent types', 'Affiliations and relationships', 'Engagement models', 'Fundraising stages',
  'Gift classifications', 'Campaign structures', 'Approval workflows', 'Stewardship plans',
  'Communication preferences', 'Staff roles and permissions', 'Data-quality rules', 'Reports and dashboards',
  'Retention policies', 'Integration mappings',
]

const roadmap = [
  ['Phase 1', 'Establish the Constituent Foundation', ['Constituent profiles', 'Identity matching', 'Relationship data', 'Preferences', 'Core integrations', 'Data governance']],
  ['Phase 2', 'Connect Engagement', ['Events', 'Communities', 'Volunteering', 'Communications', 'Digital self-service', 'Engagement history']],
  ['Phase 3', 'Modernize Fundraising Operations', ['Portfolios', 'Moves management', 'Opportunities', 'Campaigns', 'Gift workflows', 'Stewardship']],
  ['Phase 4', 'Expand Intelligence', ['Advanced analytics', 'Governed AI assistance', 'Forecasting', 'Additional integrations', 'Workflow optimization']],
] as const

const differentiators = [
  ['Connected advancement lifecycle', 'Coordinate constituent discovery, engagement, development, gift administration, and stewardship through shared context.'],
  ['Platform and cloud flexibility', 'Deploy through an institution-approved architecture without requiring a single cloud or application platform.'],
  ['Reusable higher-education workflows', 'Start with adaptable processes and data structures shaped around advancement operations.'],
  ['Configurable institutional operating model', 'Reflect local roles, stages, approvals, terminology, and governance through configuration.'],
  ['Governed engagement intelligence', 'Pair AI-assisted insights with staff review, traceable sources, access controls, and recorded outcomes.'],
  ['Modular implementation approach', 'Introduce selected capabilities alongside current systems and expand according to institutional priorities.'],
]

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p className="section-intro">{body}</p>}
    </div>
  )
}

function DemoButton({ onClick, children = 'Request a Product Demonstration', variant = 'primary' }: { onClick: () => void; children?: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return <button className={`button button-${variant}`} onClick={onClick}>{children}<ArrowRight size={17} aria-hidden="true" /></button>
}

function Header({ onDemo }: { onDemo: () => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['Product', 'product'], ['Challenges', 'challenges'], ['Advancement Journey', 'journey'],
    ['Experiences', 'experiences'], ['Capabilities', 'capabilities'], ['Analytics', 'analytics'],
    ['Architecture', 'architecture'], ['Adoption', 'adoption'],
  ]
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="MTX Alumni and Donor Platform home"><span>MTX</span><small>Alumni &amp; Donor</small></a>
        <button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className="sr-only">Toggle navigation</span>{open ? <X /> : <Menu />}
        </button>
        <div id="mobile-menu" className={`nav-links ${open ? 'nav-open' : ''}`}>
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <button className="nav-cta" onClick={() => { setOpen(false); onDemo() }}>Request a Demo</button>
        </div>
      </nav>
    </header>
  )
}

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow light">MTX Higher Education</p>
          <h1>Turn lifelong connections into meaningful engagement.</h1>
          <p>MTX Alumni &amp; Donor Platform connects constituent relationships, fundraising activity, gifts, events, communications, and stewardship in a configurable environment that works with your institution’s technology ecosystem.</p>
          <div className="hero-actions">
            <DemoButton onClick={onDemo} />
            <a className="button button-ghost" href="#journey">Explore the Advancement Journey<ArrowRight size={17} /></a>
          </div>
          <div className="hero-trust"><ShieldCheck size={19} /><span>Platform-agnostic · Modular · Governed by design</span></div>
        </div>
        <div className="product-preview" aria-label="Illustrative constituent relationship workspace">
          <div className="preview-top">
            <span>Illustrative product view</span>
            <div className="preview-actions"><Search size={16} /><Bell size={16} /><span className="avatar mini">RM</span></div>
          </div>
          <div className="preview-body">
            <aside className="preview-sidebar" aria-hidden="true"><div className="preview-logo">M</div>{[CircleUserRound, HeartHandshake, Target, Gift, BarChart3].map((Icon, i) => <Icon key={i} size={18} className={i === 0 ? 'active-icon' : ''} />)}</aside>
            <div className="preview-main">
              <div className="profile-header">
                <div className="avatar">AR</div>
                <div><p className="preview-kicker">Constituent profile</p><h3>Alex Rowan</h3><span>Fictional profile · Class of 2015</span></div>
                <span className="status success"><Check size={12} /> Active</span>
              </div>
              <div className="mini-grid">
                <div className="preview-card"><span>Engagement</span><strong>Multi-channel</strong><small>Last activity 6 days ago</small></div>
                <div className="preview-card"><span>Giving history</span><strong>3 participations</strong><small>Amounts restricted</small></div>
                <div className="preview-card"><span>Stewardship</span><strong>On schedule</strong><small>Next update in 14 days</small></div>
              </div>
              <div className="preview-lower">
                <div className="relationship-card">
                  <div className="card-title"><span>Relationship connections</span><Network size={15} /></div>
                  <div className="network-visual" role="img" aria-label="Abstract network showing four institutional relationships">
                    <span className="node node-main">AR</span><span className="node n1">P</span><span className="node n2">C</span><span className="node n3">V</span>
                    <i className="line l1" /><i className="line l2" /><i className="line l3" />
                  </div>
                </div>
                <div className="activity-card">
                  <div className="card-title"><span>Upcoming activity</span><CalendarDays size={15} /></div>
                  <p><span className="activity-dot violet" />Regional event <small>Oct 18</small></p>
                  <p><span className="activity-dot amber" />Portfolio review <small>Oct 24</small></p>
                  <div className="recommendation"><Sparkles size={14} /><span><b>Recommended follow-up</b>Review event interests before outreach</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OutcomeStrip() {
  const outcomes = [
    ['Connected constituent relationships', Network],
    ['Coordinated advancement workflows', Workflow],
    ['Actionable engagement intelligence', BrainCircuit],
    ['Flexible technology foundation', Blocks],
  ]
  return (
    <section className="outcome-wrap" id="product" aria-labelledby="outcome-title">
      <div className="outcome-label"><span id="outcome-title">Product objectives</span><small>Designed to support</small></div>
      {outcomes.map(([label, Icon]) => <div className="outcome" key={label as string}><Icon size={21} /><span>{label as string}</span></div>)}
    </section>
  )
}

function Challenges() {
  const [selected, setSelected] = useState(0)
  const item = challenges[selected]
  const Icon = iconMap[item.icon]
  return (
    <section className="section section-tint" id="challenges">
      <div className="container">
        <SectionHeading eyebrow="Institutional challenges" title="Advancement teams need a clearer view of every relationship." body="Select a challenge to explore its operational impact and how a configurable product layer can respond." />
        <div className="challenge-layout">
          <div className="challenge-list" role="tablist" aria-label="Advancement challenges">
            {challenges.map((challenge, index) => {
              const CardIcon = iconMap[challenge.icon]
              return <button key={challenge.title} role="tab" aria-selected={selected === index} aria-controls="challenge-panel" className={`challenge-tab ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}><CardIcon size={20} /><span>{challenge.title}</span><ChevronRight size={17} /></button>
            })}
          </div>
          <div className="detail-panel" id="challenge-panel" role="tabpanel" tabIndex={0}>
            <div className="panel-icon"><Icon /></div><p className="eyebrow">Selected challenge</p><h3>{item.title}</h3>
            <div className="detail-grid">
              <div><span>Institutional challenge</span><p>{item.problem}</p></div>
              <div><span>Who experiences it</span><p>{item.people}</p></div>
              <div><span>Operational consequence</span><p>{item.consequence}</p></div>
              <div><span>How the product responds</span><p>{item.response}</p></div>
            </div>
            <div className="measure-row"><span>Measures the institution could monitor</span><div>{item.measures.map(m => <em key={m}>{m}</em>)}</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AdvancementJourney() {
  const [selected, setSelected] = useState(0)
  const stage = journeyStages[selected]
  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        <SectionHeading eyebrow="Advancement journey" title="One relationship, connected across the lifecycle." body="Follow a constituent relationship from first connection through continued participation. Each stage can align to institutional practices and governance." />
        <div className="journey-track" role="tablist" aria-label="Advancement lifecycle stages">
          {journeyStages.map((item, index) => <button key={item.name} role="tab" aria-selected={selected === index} onClick={() => setSelected(index)} className={selected === index ? 'active' : ''}><span>{index + 1}</span><small>{item.short}</small></button>)}
        </div>
        <div className="journey-panel" role="tabpanel">
          <div className="journey-title"><span>Stage {selected + 1} of 7</span><h3>{stage.name}</h3></div>
          <div className="journey-columns">
            <div><CircleUserRound /><span>Constituent experience</span><p>{stage.constituent}</p></div>
            <div><UsersRound /><span>Advancement-team activities</span><p>{stage.team}</p></div>
            <div><Blocks /><span>Product support</span><p>{stage.support}</p></div>
            <div><Database /><span>Data considerations</span><p>{stage.data}</p></div>
            <div><BarChart3 /><span>Suggested measures</span><p>{stage.measures}</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoleExperiences() {
  const [selected, setSelected] = useState(0)
  const [name, description, Icon] = roles[selected]
  return (
    <section className="section section-navy" id="experiences">
      <div className="container">
        <SectionHeading eyebrow="Role-based experiences" title="A focused workspace for each participant." body="People see the information and actions relevant to their responsibilities, supported by role-based permissions." />
        <div className="role-layout">
          <div className="role-grid" role="list" aria-label="Select a role">
            {roles.map(([role, , RoleIcon], index) => <button role="listitem" key={role} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)}><RoleIcon size={20} /><span>{role}</span></button>)}
          </div>
          <div className="role-detail">
            <div className="role-icon"><Icon /></div><span>Experience {String(selected + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{description}</p>
            <div className="role-note"><LockKeyhole size={18} /><span>Access and available actions can reflect institutional roles, policy, and consent.</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  const [selected, setSelected] = useState(0)
  const [name, description, items, Icon] = capabilityGroups[selected]
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <SectionHeading eyebrow="Product capabilities" title="A configurable solution layer for advancement." body="Reusable data models, experiences, workflows, analytics, and integration components can be introduced according to institutional priorities." />
        <div className="capability-layout">
          <div className="capability-tabs" role="tablist" aria-label="Capability families">
            {capabilityGroups.map(([group, , , GroupIcon], index) => <button key={group} role="tab" aria-selected={selected === index} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}><GroupIcon size={19} /><span>{group}</span><ChevronRight size={16} /></button>)}
          </div>
          <div className="capability-panel" role="tabpanel">
            <div className="capability-lead"><div className="panel-icon"><Icon /></div><div><p className="eyebrow">Capability family</p><h3>{name}</h3><p>{description}</p></div></div>
            <ul>{items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Constituent360() {
  const [selected, setSelected] = useState(0)
  const profile = profiles[selected]
  return (
    <section className="section section-tint" id="constituent-view">
      <div className="container">
        <SectionHeading eyebrow="Constituent 360" title="Bring the relationship into view." body="Explore a fictional workspace that brings relevant affiliations, engagement, giving, preferences, and work activity into shared context." />
        <div className="fiction-label"><FileCheck2 size={16} />Fictional data shown for demonstration purposes.</div>
        <div className="workspace">
          <aside className="profile-list" aria-label="Fictional constituent profiles">
            <div className="workspace-search"><Search size={16} /><span>Search constituents</span></div>
            {profiles.map((item, index) => <button key={item.id} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}><span className="avatar">{item.initials}</span><span><b>{item.name}</b><small>{item.subtitle}</small></span></button>)}
          </aside>
          <div className="profile-workspace">
            <div className="workspace-header">
              <div className="avatar large">{profile.initials}</div><div><span>Constituent workspace</span><h3>{profile.name}</h3><p>{profile.subtitle}</p></div>
              <button className="icon-button" aria-label="More profile actions"><span>•••</span></button>
            </div>
            <div className="profile-stats">
              <div><GraduationCap /><span>Affiliations</span><b>{profile.affiliations[0]}</b><small>{profile.affiliations[1]}</small></div>
              <div><Gift /><span>Giving summary</span><b>{profile.giving}</b><small>Visibility follows role permissions</small></div>
              <div><Mail /><span>Preferences</span><b>{profile.preferences}</b><small>Approved channels only</small></div>
            </div>
            <div className="workspace-columns">
              <div className="workspace-card">
                <div className="card-title"><span>Engagement timeline</span><Activity size={16} /></div>
                <ol>{profile.timeline.map((event, index) => <li key={event}><i /><div><b>{event}</b><small>{index === 0 ? 'Recent activity' : `${index + 1} months ago`}</small></div></li>)}</ol>
                <div className="subrow"><span>Event participation</span><b>{profile.events}</b></div>
                <div className="subrow"><span>Volunteer interests</span><b>{profile.interests}</b></div>
              </div>
              <div className="workspace-card">
                <div className="card-title"><span>Relationship context</span><Network size={16} /></div>
                {profile.network.map(item => <p className="network-item" key={item}><Link2 size={15} />{item}</p>)}
                <div className="subrow"><span>Relationship manager</span><b>{profile.manager}</b></div>
                <div className="subrow"><span>Stewardship status</span><b>{profile.stewardship}</b></div>
                <div className="activity-box"><span>Open activities</span>{profile.activities.length ? profile.activities.map(item => <p key={item}><Clock3 size={14} />{item}</p>) : <p className="empty-state">No open activity is recorded for this profile.</p>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pipeline() {
  const [campaign, setCampaign] = useState('Any campaign')
  const [owner, setOwner] = useState('Any owner')
  const [stage, setStage] = useState('Cultivation')
  const [openId, setOpenId] = useState<number | null>(1)
  const filtered = opportunities.filter(o => (campaign === 'Any campaign' || o.campaign === campaign) && (owner === 'Any owner' || o.owner === owner))
  const selectedOpportunity = opportunities.find(o => o.id === openId)
  const formatAmount = (amount: number) => amount ? `$${amount.toLocaleString()}` : 'Not entered'
  return (
    <section className="section" id="pipeline">
      <div className="container">
        <SectionHeading eyebrow="Fundraising workspace" title="Keep relationship development visible and coordinated." body="Use configurable stages, portfolio views, and activity context to support staff review and planning." />
        <div className="fiction-label"><FileCheck2 size={16} />Illustrative opportunities and values — not MTX or customer results.</div>
        <div className="pipeline-shell">
          <div className="pipeline-toolbar">
            <span><Filter size={16} />Filter pipeline</span>
            <label>Campaign<select value={campaign} onChange={e => setCampaign(e.target.value)}><option>Any campaign</option>{[...new Set(opportunities.map(o => o.campaign))].map(c => <option key={c}>{c}</option>)}</select></label>
            <label>Portfolio owner<select value={owner} onChange={e => setOwner(e.target.value)}><option>Any owner</option>{[...new Set(opportunities.map(o => o.owner))].map(o => <option key={o}>{o}</option>)}</select></label>
          </div>
          <div className="pipeline-stages" role="tablist" aria-label="Pipeline stages">
            {pipelineStages.map(item => {
              const count = filtered.filter(o => o.stage === item).length
              return <button key={item} role="tab" aria-selected={stage === item} onClick={() => { setStage(item); const first = filtered.find(o => o.stage === item); setOpenId(first?.id ?? null) }} className={stage === item ? 'active' : ''}><span>{item}</span><b>{count}</b></button>
            })}
          </div>
          <div className="pipeline-content">
            <div className="opportunity-list">
              <div className="list-heading"><span>{stage}</span><small>{filtered.filter(o => o.stage === stage).length} fictional opportunities</small></div>
              {filtered.filter(o => o.stage === stage).map(o => <button key={o.id} className={openId === o.id ? 'active' : ''} onClick={() => setOpenId(o.id)}><div><b>{o.name}</b><small>{o.constituent} · {o.campaign}</small></div><span>{formatAmount(o.amount)}</span><ChevronRight size={16} /></button>)}
              {!filtered.some(o => o.stage === stage) && <div className="empty-panel"><Search size={22} /><b>No opportunities match these filters.</b><span>Adjust the campaign or owner selection.</span></div>}
            </div>
            <div className="opportunity-detail">
              {selectedOpportunity && filtered.some(o => o.id === selectedOpportunity.id) ? <>
                <p className="eyebrow">Opportunity detail</p><h3>{selectedOpportunity.name}</h3>
                <div className="opportunity-value"><span>Illustrative forecast value</span><b>{formatAmount(selectedOpportunity.amount)}</b><small>For interface demonstration only</small></div>
                <dl>
                  <div><dt>Constituent</dt><dd>{selectedOpportunity.constituent}</dd></div>
                  <div><dt>Portfolio owner</dt><dd>{selectedOpportunity.owner}</dd></div>
                  <div><dt>Pending activity</dt><dd>{selectedOpportunity.next}</dd></div>
                  <div><dt>Relationship history</dt><dd>{selectedOpportunity.history}</dd></div>
                </dl>
              </> : <div className="empty-panel"><Target size={24} /><b>Select an opportunity</b><span>Choose a stage and open a record to review context.</span></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneyBuilder() {
  const options = {
    Audience: ['Recent graduates', 'Event participants', 'Volunteers', 'Lapsed donors', 'Alumni by academic affiliation'],
    Objective: ['Invite participation', 'Encourage profile updates', 'Support event follow-up', 'Begin stewardship activity', 'Reconnect inactive constituents'],
    Channel: ['Email', 'Portal message', 'Staff task', 'Direct mail'],
    Timing: ['Within 2 days', 'Within 1 week', 'On a selected date', 'After staff approval'],
    FollowUp: ['Create a staff review task', 'Send an approved resource', 'Invite to a related event', 'Record no follow-up'],
    Exit: ['Response received', 'Profile updated', 'Event registration completed', 'Staff closes journey'],
  }
  const [config, setConfig] = useState({ Audience: options.Audience[0], Objective: options.Objective[0], Channel: options.Channel[0], Timing: options.Timing[1], FollowUp: options.FollowUp[0], Exit: options.Exit[0] })
  const fields = [['Audience', 'Audience'], ['Objective', 'Engagement objective'], ['Channel', 'Communication channel'], ['Timing', 'Timing'], ['FollowUp', 'Follow-up action'], ['Exit', 'Exit condition']] as const
  return (
    <section className="section section-violet" id="journey-builder">
      <div className="container">
        <SectionHeading eyebrow="Engagement journey builder" title="Configure a respectful path to participation." body="Authorized users can combine approved audiences, channels, timing, and follow-up steps while honoring institutional policy and constituent preferences." />
        <div className="builder-shell">
          <div className="builder-form">
            {fields.map(([key, label], index) => <label key={key}><span><b>{index + 1}</b>{label}</span><select value={config[key]} onChange={e => setConfig({ ...config, [key]: e.target.value })}>{options[key].map(option => <option key={option}>{option}</option>)}</select></label>)}
          </div>
          <div className="builder-preview">
            <div className="preview-label"><Sparkles size={16} />Journey preview</div>
            <h3>{config.Objective}</h3><p>For <b>{config.Audience.toLowerCase()}</b>, use <b>{config.Channel.toLowerCase()}</b> {config.Timing.toLowerCase()}.</p>
            <div className="flow">
              <div><UsersRound /><span>Audience</span><b>{config.Audience}</b></div><ArrowRight />
              <div><MessageSquareText /><span>Approved channel</span><b>{config.Channel}</b></div><ArrowRight />
              <div><UserRoundCheck /><span>Staff-reviewed follow-up</span><b>{config.FollowUp}</b></div>
            </div>
            <div className="exit-condition"><Route size={18} /><span><b>Exit when:</b> {config.Exit}</span></div>
            <p className="builder-note"><ShieldCheck size={16} />Preferences, consent, role access, and approved content remain part of execution.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AIAssistance() {
  const uses = ['Summarize constituent engagement histories', 'Identify missing or inconsistent profile information', 'Suggest audience segments for staff review', 'Draft communications from approved templates', 'Highlight overdue stewardship activity', 'Surface relationship connections', 'Support fundraising forecasting', 'Recommend potential follow-up actions']
  const controls = ['Human review', 'Source traceability', 'Role-based access', 'Consent and preference enforcement', 'Approved content templates', 'Configurable data boundaries', 'Model and prompt records', 'Override capture', 'Performance monitoring']
  return (
    <section className="section section-dark" id="ai-assistance">
      <div className="container">
        <SectionHeading eyebrow="AI-assisted advancement" title="Use intelligence to prepare better-informed engagement." body="AI-assisted capabilities may help authorized users organize context, identify issues, and prepare work. Staff remain responsible for review and action." />
        <div className="ai-layout">
          <div className="ai-uses"><h3>Potential staff support</h3><div>{uses.map(item => <p key={item}><Sparkles size={15} />{item}</p>)}</div></div>
          <div className="ai-governance">
            <h3>A governed process</h3>
            <div className="governed-flow">{['Institutional data', 'AI-assisted insight', 'Staff review', 'Authorized action', 'Recorded outcome'].map((item, index) => <span key={item}>{index > 0 && <ArrowRight size={15} />}{item}</span>)}</div>
            <h3>Controls</h3><div className="control-grid">{controls.map(item => <span key={item}><Check size={14} />{item}</span>)}</div>
            <p className="ai-boundary"><ShieldCheck />AI does not independently contact constituents or make fundraising decisions. Protected characteristics are not used for donor scoring or targeting.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Analytics() {
  const [tab, setTab] = useState<keyof typeof analyticsData>('Engagement')
  const data = analyticsData[tab]
  const isArea = tab === 'Engagement' || tab === 'Stewardship'
  return (
    <section className="section" id="analytics">
      <div className="container">
        <SectionHeading eyebrow="Leadership analytics" title="Move from reports to management context." body="Role-based dashboards can bring participation, development, operations, and stewardship measures together using governed definitions." />
        <div className="analytics-shell">
          <div className="dashboard-head"><div><span>Advancement overview</span><h3>Executive dashboard</h3></div><div className="fiction-label"><FileCheck2 size={16} />Illustrative analytics — not MTX or customer results.</div></div>
          <div className="analytics-tabs" role="tablist">{Object.keys(analyticsData).map(name => <button role="tab" aria-selected={tab === name} key={name} className={tab === name ? 'active' : ''} onClick={() => setTab(name as keyof typeof analyticsData)}>{name}</button>)}</div>
          <div className="metric-grid">{data.metrics.map(([name, value]) => <div key={name}><span>{name}</span><b>{value}</b><small>Illustrative measure</small></div>)}</div>
          <div className="chart-card">
            <div><span>{tab} trend</span><p>{data.summary}</p></div>
            <div className="chart-wrap" role="img" aria-label={data.summary}>
              <ResponsiveContainer width="100%" height="100%">
                {isArea ? <AreaChart data={data.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.32}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/><XAxis dataKey="name" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="primary" stroke="#4f46e5" fill="url(#chartFill)" strokeWidth={3}/><Area type="monotone" dataKey="secondary" stroke="#f59e0b" fill="none" strokeWidth={2}/></AreaChart> : <BarChart data={data.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/><XAxis dataKey="name" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="primary" fill="#4f46e5" radius={[5, 5, 0, 0]}/></BarChart>}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  const [open, setOpen] = useState(3)
  return (
    <section className="section architecture-section" id="architecture">
      <div className="container">
        <SectionHeading eyebrow="Architecture and integration" title="Fit the product to your technology ecosystem." body="Use modern cloud, low-code, commercial software, open-source, or hybrid architecture patterns based on institutional needs." />
        <p className="architecture-position">MTX Alumni &amp; Donor Platform can serve as the primary advancement environment or introduce selected capabilities alongside existing institutional systems.</p>
        <div className="architecture-layout">
          <div className="layer-stack">
            {architectureLayers.map(([name, detail, Icon], index) => <div key={name} className={`layer ${open === index ? 'open' : ''}`}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><Icon /><span>{name}</span><ChevronDown /></button>{open === index && <p>{detail}</p>}</div>)}
          </div>
          <div className="connections-panel">
            <div><Network size={22} /><span>Institutional connection categories</span></div>
            <ul>{connectionCategories.map(item => <li key={item}><span className="neutral-icon"><Link2 size={14} /></span>{item}</li>)}</ul>
          </div>
        </div>
        <div className="integration-methods"><span>Portable integration patterns</span>{['APIs', 'Events', 'Middleware', 'Secure files', 'Webhooks', 'Identity federation'].map(item => <b key={item}>{item}</b>)}</div>
        <p className="ownership-note"><ShieldCheck size={18} />Institutional ownership of data, approved exchange services, and traceable integration operations remain central to the architecture.</p>
      </div>
    </section>
  )
}

function Configurability() {
  return (
    <section className="section" id="configurability">
      <div className="container configuration-layout">
        <div>
          <SectionHeading eyebrow="Configurability" title="Reflect institutional practice without hardcoding each workflow." body="Configuration can align terminology, stages, roles, controls, and reporting to an institution’s operating model while retaining reusable product patterns." />
          <div className="configuration-note"><Settings2 /><span><b>Configuration over custom code</b>Adapt controlled product settings as practices evolve.</span></div>
        </div>
        <div className="configuration-grid">{configurationItems.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b><Settings2 size={15} /></div>)}</div>
      </div>
    </section>
  )
}

function Adoption() {
  const [phase, setPhase] = useState(0)
  const current = roadmap[phase]
  return (
    <section className="section section-tint" id="adoption">
      <div className="container">
        <SectionHeading eyebrow="Modular adoption" title="Start with a priority. Expand with purpose." body="Selected capabilities can be introduced alongside existing systems, allowing institutions to sequence change around operational priorities and readiness." />
        <div className="roadmap-track" role="tablist" aria-label="Illustrative adoption phases">{roadmap.map(([number, title], index) => <button key={number} role="tab" aria-selected={phase === index} onClick={() => setPhase(index)} className={phase === index ? 'active' : ''}><span>{number}</span><b>{title}</b></button>)}</div>
        <div className="roadmap-panel" role="tabpanel">
          <div><span>{current[0]}</span><h3>{current[1]}</h3><p>Focus the operating model, data, workflows, and adoption activity around this set of capabilities.</p></div>
          <ul>{current[2].map(item => <li key={item}><Check />{item}</li>)}</ul>
        </div>
        <p className="roadmap-disclaimer"><Route size={17} />This sequence is illustrative and should be adapted to institutional priorities.</p>
      </div>
    </section>
  )
}

function DeliveryModel() {
  const cards = [
    ['Product', 'Reusable constituent and advancement data models, configurable workflows, digital experiences, reports, dashboards, integration patterns, documentation, and product enhancements.', Blocks],
    ['Implementation Services', 'Discovery, configuration, data conversion, integration, testing, training, deployment, and organizational readiness support.', Workflow],
    ['Managed Services', 'Production support, monitoring, releases, data-quality support, reporting assistance, enhancement delivery, and continued optimization.', Activity],
  ] as const
  return (
    <section className="section" id="delivery">
      <div className="container">
        <SectionHeading eyebrow="Product and delivery model" title="A product foundation, supported through adoption and operation." body="The product leads the experience. Services help institutions configure, introduce, and operate it within their environment." />
        <div className="delivery-grid">{cards.map(([title, body, Icon], index) => <article className={index === 0 ? 'featured' : ''} key={title}><div><Icon /><span>{index === 0 ? 'Core solution' : 'Adoption support'}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>
  )
}

function WhyMTX() {
  return (
    <section className="section why-section" id="why-mtx">
      <div className="container">
        <SectionHeading eyebrow="Why MTX Alumni & Donor Platform" title="Built around the realities of advancement modernization." />
        <div className="why-grid">{differentiators.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>
  )
}

function FinalCTA({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="final-cta">
      <div className="cta-network" aria-hidden="true"><span /><span /><span /><i /><i /></div>
      <div className="container">
        <p className="eyebrow light">Connect your advancement ecosystem</p><h2>Build stronger relationships across the institutional community.</h2>
        <p>Explore how MTX Alumni &amp; Donor Platform can connect constituent information, advancement workflows, fundraising activity, and stewardship while working with your existing technology environment.</p>
        <div className="hero-actions"><DemoButton onClick={onDemo} /><button className="button button-ghost" onClick={onDemo}>Discuss Your Advancement Roadmap<ArrowRight size={17} /></button></div>
      </div>
    </section>
  )
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    const focusable = dialog?.querySelectorAll<HTMLElement>('button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])')
    focusable?.[0]?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && focusable?.length) {
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey); previous?.focus() }
  }, [open, onClose, submitted])
  if (!open) return null
  const close = () => { setSubmitted(false); onClose() }
  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialogRef}>
        <button className="modal-close" onClick={close} aria-label="Close demonstration request"><X /></button>
        {!submitted ? <>
          <p className="eyebrow">Product demonstration</p><h2 id={titleId}>See connected advancement in context.</h2><p>Tell us about your institution and modernization priority. This prototype will not transmit or store the information entered below.</p>
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
            <div className="form-grid">
              <label>Name<input required autoComplete="name" /></label>
              <label>Institution<input required autoComplete="organization" /></label>
              <label>Work email<input required type="email" autoComplete="email" /></label>
              <label>Role<input required autoComplete="organization-title" /></label>
              <label>Current advancement environment<select required defaultValue=""><option value="" disabled>Select an option</option><option>Single primary platform</option><option>Multiple connected systems</option><option>Primarily manual processes</option><option>Currently assessing</option></select></label>
              <label>Primary modernization priority<select required defaultValue=""><option value="" disabled>Select an option</option><option>Constituent data foundation</option><option>Engagement</option><option>Fundraising operations</option><option>Gift administration</option><option>Analytics and intelligence</option><option>Integration</option></select></label>
            </div>
            <label>Optional message<textarea rows={3} /></label>
            <p className="privacy-note"><LockKeyhole size={15} />Demonstration only. Information is processed locally in your browser and discarded when closed.</p>
            <button className="button button-primary" type="submit">Submit Demonstration Request<ArrowRight size={17} /></button>
          </form>
        </> : <div className="confirmation" role="status"><div><Check /></div><p className="eyebrow">Request prepared</p><h2 id={titleId}>Thank you for exploring the prototype.</h2><p>No information was transmitted or stored. In a production experience, this confirmation would explain next steps.</p><button className="button button-primary" onClick={close}>Close confirmation</button></div>}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer><div className="container footer-grid"><a className="wordmark footer-mark" href="#top"><span>MTX</span><small>Alumni &amp; Donor</small></a><p>A configurable solution layer for connected advancement.</p><div><a href="#architecture">Architecture</a><a href="#adoption">Adoption</a><a href="#top">Back to top ↑</a></div></div><div className="container footer-bottom"><span>Interactive product prototype</span><span>Fictional data is used throughout.</span></div></footer>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openDemo = useMemo(() => () => setModalOpen(true), [])
  return (
    <>
      <Header onDemo={openDemo} />
      <main id="main-content">
        <Hero onDemo={openDemo} />
        <OutcomeStrip />
        <Challenges />
        <AdvancementJourney />
        <RoleExperiences />
        <Capabilities />
        <Constituent360 />
        <Pipeline />
        <JourneyBuilder />
        <AIAssistance />
        <Analytics />
        <Architecture />
        <Configurability />
        <Adoption />
        <DeliveryModel />
        <WhyMTX />
        <FinalCTA onDemo={openDemo} />
      </main>
      <Footer />
      <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
