import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Backpack,
  BookOpen,
  Box,
  CheckCircle2,
  Clipboard,
  Compass,
  Cpu,
  Crosshair,
  FileCode2,
  Gamepad2,
  Gauge,
  Github,
  Hammer,
  Heart,
  House,
  Keyboard,
  Layers3,
  ListFilter,
  Map,
  Menu,
  MessageCircle,
  MousePointer2,
  PackageOpen,
  Pickaxe,
  Play,
  Rocket,
  ScrollText,
  Search,
  Server,
  Shapes,
  Shield,
  Sparkles,
  TerminalSquare,
  TreePine,
  X,
} from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  icon: ReactNode;
};

type CopyCommandButtonProps = {
  command: string;
};

const navItems = [
  { label: 'Überblick', href: '#ueberblick' },
  { label: 'Spiel', href: '#spielprinzip' },
  { label: 'Vibe', href: '#look-feel' },
  { label: 'Starten', href: '#installation' },
  { label: 'Wiki', href: '#wiki' },
];

const siteBase = import.meta.env.BASE_URL;
const gameRepo = 'https://github.com/YoungJibbit95/Adventura';
const codeHref = (path: string) => `${gameRepo}/blob/main/${path}`;
const wikiIndexHref = `${siteBase}wiki/index.html`;
const wikiHref = (page: string) => `${siteBase}wiki/${page}`;

const currentMetrics = [
  { value: '49', label: 'Blocks', detail: 'Terrain, Pflanzen, Stationen, Licht, Ores und Campfire-Zustände.' },
  { value: '94', label: 'Items', detail: 'Block-Items, Nahrung, Werkzeuge, Materialien, Ruinenfunde und Dekor.' },
  { value: '50', label: 'Rezepte', detail: 'Inventory, Campfire, Cooking Pot, Workbench und Forge.' },
  { value: '12', label: 'Biome', detail: 'Wiesen, Wälder, Dünen, Ruinen, Seen, Gipfel, Mire und mehr.' },
  { value: '6', label: 'Structures', detail: 'Campsite, Watchtower, House, Desert Well, Ruin und Compact Village.' },
  { value: '4', label: 'Loot Tables', detail: 'Ruin-, Rare-Ruin-, Campsite- und Village-Crates.' },
];

const docsIndex = [
  { title: 'Schneller Überblick', category: 'Start', href: '#ueberblick', text: 'Was Adventura aktuell kann und wo du auf der Seite weitermachst.' },
  { title: 'Spiel-Loop', category: 'Gameplay', href: '#spielprinzip', text: 'Erkunden, sammeln, craften, kochen, bauen und nachts überleben.' },
  { title: 'Progression Guide', category: 'Gameplay', href: wikiHref('progression.html'), text: 'Früher Spielpfad mit Campfire, Cooking Pot, Workbench, Forge und Ruinen.' },
  { title: 'Pixel-Art Look', category: 'Content', href: '#look-feel', text: 'Cozy Farbwelt, kleine Welt-Signale, sanfte Animationen und klare Leseflächen.' },
  { title: 'Block Registry', category: 'Content', href: '#code-infos', text: 'Blockgruppen, Drops, Render-Layer, Lichtwerte und Tool-Level.' },
  { title: 'Items & Food', category: 'Content', href: wikiHref('content.html'), text: 'Item-Familien, Food-Werte, Tool-Durability und Materialpfade.' },
  { title: 'Crafting', category: 'Content', href: wikiHref('content.html'), text: 'Rezepte nach Stationen und Kategorien, vom ersten Tool bis zur Forge.' },
  { title: 'Server Authority', category: 'Technik', href: '#architektur', text: 'Der Server validiert World Edits, Inventar, Crafting und Entity-Snapshots.' },
  { title: 'Engine Deep Dive', category: 'Technik', href: wikiHref('engine.html'), text: 'Worldgen, Chunk Meshing, Lighting, Rendering, Assets und Performance.' },
  { title: 'Packet Flow', category: 'Technik', href: wikiHref('code-map.html'), text: 'Handshake, Login, Chunks, Block Actions, Inventory, Chat und Snapshots.' },
  { title: 'Lokal starten', category: 'Start', href: '#installation', text: 'Die wichtigsten Gradle-Kommandos für Launcher, Singleplayer und Server.' },
  { title: 'Controls', category: 'Start', href: wikiHref('controls.html'), text: 'Bewegung, Inventar, Chat, Debug-Overlays und Settings.' },
];

function CozyPixelScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`cozy-scene ${compact ? 'cozy-scene-compact' : ''}`} aria-hidden="true">
      <div className="scene-sky">
        <span className="pixel-sun" />
        <span className="pixel-cloud cloud-one" />
        <span className="pixel-cloud cloud-two" />
      </div>
      <span className="pixel-hill hill-back" />
      <span className="pixel-hill hill-front" />
      <div className="pixel-tree tree-left">
        <span className="tree-leaf leaf-a" />
        <span className="tree-leaf leaf-b" />
        <span className="tree-leaf leaf-c" />
        <span className="tree-trunk" />
      </div>
      <div className="pixel-tree tree-right">
        <span className="tree-leaf leaf-a" />
        <span className="tree-leaf leaf-b" />
        <span className="tree-leaf leaf-c" />
        <span className="tree-trunk" />
      </div>
      <div className="pixel-cabin">
        <span className="cabin-roof" />
        <span className="cabin-body" />
        <span className="cabin-door" />
        <span className="cabin-window" />
        <span className="cabin-smoke smoke-one" />
        <span className="cabin-smoke smoke-two" />
      </div>
      <span className="pixel-pond" />
      <div className="pixel-garden">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="pixel-fireflies">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('#top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrolled(window.scrollY > 48);
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)));

      const visible = navItems
        .map((item) => ({ href: item.href, element: document.querySelector(item.href) }))
        .filter((item): item is { href: string; element: Element } => Boolean(item.element))
        .reverse()
        .find((item) => item.element.getBoundingClientRect().top <= 150);

      setActiveSection(visible?.href ?? '#top');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-shell fixed left-0 right-0 top-0 z-50 ${scrolled ? 'nav-shell-scrolled' : ''}`}>
      <div className="nav-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-6">
        <a href="#top" className="brand-link" aria-label="Zur Adventura Startseite">
          <span className="brand-mark">
            <Layers3 className="h-5 w-5" />
          </span>
          <span>Adventura</span>
        </a>

        <div className="hidden min-w-0 items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={gameRepo} target="_blank" rel="noreferrer" className="icon-link hidden sm:grid" aria-label="Adventura auf GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href={wikiIndexHref} className="nav-cta hidden md:inline-flex">
            Wiki <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="icon-link grid md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Navigation öffnen"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mobile-menu md:hidden"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href={wikiIndexHref} onClick={() => setMobileMenuOpen(false)}>
              Wiki öffnen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const heroHighlights = [
    { title: 'Ruhig starten', detail: 'Campsite finden, Feuer machen und die ersten Werkzeuge bauen.' },
    { title: 'Weiter raus', detail: 'Wiesen, Wälder, Seen und Ruinen geben der Welt kleine Ziele.' },
    { title: 'Besser werden', detail: 'Kochen, Comfort, Workbench und Forge tragen den aktuellen Fortschritt.' },
  ];

  return (
    <section id="top" className="hero-section">
      <div className="hero-background" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 md:px-6 md:pb-14">
        <div className="hero-main">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="hero-copy"
          >
            <span className="eyebrow-pill">Cozy Voxel Prototype</span>
            <h1 className="font-pixel">Adventura</h1>
            <p className="hero-lead">
              Ein spielbarer Java-Prototyp mit Voxel-Welt, Survival-Werten, Crafting-Stationen und ruhigem Camp-Gefühl.
              Die Seite zeigt dir schnell, was schon da ist, wie du es startest und wo der wichtige Code liegt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#ueberblick" className="primary-action">
                <Gamepad2 className="h-5 w-5" />
                Überblick
              </a>
              <a href="#installation" className="secondary-action">
                <Rocket className="h-5 w-5" />
                Lokal starten
              </a>
              <a href={wikiIndexHref} className="secondary-action">
                <ScrollText className="h-5 w-5" />
                Wiki
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            className="hero-scene-card"
          >
            <CozyPixelScene />
          </motion.div>
        </div>

        <div className="hero-status-grid" aria-label="Aktuelle Projektkennzahlen">
          {heroHighlights.map((highlight) => (
            <a key={highlight.title} href="#spielprinzip" className="hero-status-card story-card">
              <strong>{highlight.title}</strong>
              <p>{highlight.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, children, icon }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-eyebrow">
        {icon}
        {eyebrow}
      </div>
      <h2 className="font-pixel">{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function OverviewSection() {
  const pillars = [
    {
      icon: <Compass className="h-7 w-7 text-emerald-300" />,
      title: 'In die Welt gehen',
      text: 'Du startest klein: Holz, Stein, Beeren, ein Lagerfeuer. Von dort aus wächst die Route fast von selbst.',
      tags: ['Erkunden', 'Sammeln', 'Überleben'],
    },
    {
      icon: <Hammer className="h-7 w-7 text-amber-300" />,
      title: 'Ein Camp bauen',
      text: 'Feuer, Cooking Pot, Matten und kleine Möbel machen die Base nicht nur hübscher, sondern auch nützlicher.',
      tags: ['Campfire', 'Comfort', 'Cooking'],
    },
    {
      icon: <Map className="h-7 w-7 text-sky-300" />,
      title: 'Weiterziehen',
      text: 'Wenn das Camp steht, locken andere Biome, Ruinen und bessere Werkzeuge. Nicht riesig, aber schon spielbar.',
      tags: ['Biome', 'Ruinen', 'Forge'],
    },
  ];

  const route = [
    { step: '01', title: 'Ankommen', text: 'Campsite sichern, Feuer machen, erste Nahrung und Holz mitnehmen.' },
    { step: '02', title: 'Einrichten', text: 'Werkzeuge bauen, kochen, Comfort sammeln und die kleine Base brauchbar machen.' },
    { step: '03', title: 'Aufbrechen', text: 'Mit besserem Gear in neue Biome, Höhlen und Ruinen weiterziehen.' },
  ];

  return (
    <section id="ueberblick" className="page-section section-muted">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="overview-layout">
          <SectionHeader eyebrow="Überblick" title="Worum es gerade geht" icon={<ListFilter className="h-4 w-4" />}>
            Adventura ist noch ein Prototyp, aber der Kern ist da: draußen sammeln, ein warmes Camp bauen und mit jedem Ausflug etwas weiter kommen.
          </SectionHeader>

          <div className="summary-panel">
            <h3 className="font-pixel">Kurz gesagt</h3>
            <p>
              Die Startseite bleibt bewusst leicht. Alles, was nach Tabellen, Codepfaden oder langen Listen klingt, findest du im Wiki.
            </p>
            <div className="tag-cloud">
              <span>Cozy Survival</span>
              <span>Crafting</span>
              <span>Camp Comfort</span>
              <span>Ruinen</span>
              <span>Lokaler Start</span>
            </div>
          </div>
        </div>

        <div className="card-grid three">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="info-card">
              <div className="info-icon">{pillar.icon}</div>
              <h3 className="font-pixel">{pillar.title}</h3>
              <p>{pillar.text}</p>
              <div className="mini-tag-list">
                {pillar.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="route-panel">
          <div className="route-panel-head">
            <h3 className="font-pixel">Aktueller Spielerpfad</h3>
            <a href={wikiHref('progression.html')}>
              Progression im Wiki <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="card-grid compact install-command-grid">
            {route.map((item) => (
              <article key={item.step} className="route-step">
                <span>{item.step}</span>
                <h4 className="font-pixel">{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DocsConsoleSection() {
  const categories = ['Alle', 'Gameplay', 'Content', 'Technik', 'Start'];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Alle');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return docsIndex.filter((entry) => {
      const matchesCategory = category === 'Alle' || entry.category === category;
      const haystack = `${entry.title} ${entry.category} ${entry.text}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <section id="docs-konsole" className="page-section">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="docs-console">
          <div className="docs-console-copy">
            <div className="section-eyebrow">
              <Search className="h-4 w-4" />
              Finden
            </div>
            <h2 className="font-pixel">Schneller zur passenden Stelle</h2>
            <p>
              Suche nach Systemen, Content, Commands oder Technik. Die Treffer führen direkt in die richtige Sektion oder ins Wiki.
            </p>

            <div className="search-shell">
              <Search className="h-5 w-5 text-emerald-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="campfire, blocks, server, controls..."
                aria-label="Website und Wiki durchsuchen"
              />
            </div>

            <div className="filter-row" aria-label="Dokumentationsfilter">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`filter-chip ${category === item ? 'filter-chip-active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="results-head">
              <span>{results.length} Treffer</span>
              <a href={wikiIndexHref}>
                Wiki öffnen <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="result-grid">
              {results.map((entry) => (
                <a key={`${entry.category}-${entry.title}`} href={entry.href} className="result-card">
                  <span className="result-category">{entry.category}</span>
                  <h3 className="font-pixel">{entry.title}</h3>
                  <p>{entry.text}</p>
                </a>
              ))}
              {results.length === 0 && (
                <div className="result-card result-empty">
                  <h3 className="font-pixel">Keine Treffer</h3>
                  <p>Versuch einen allgemeineren Begriff wie craft, block, server oder start.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GameplaySection() {
  const moments = [
    {
      icon: <Compass className="h-7 w-7 text-emerald-300" />,
      title: 'Der erste Abend',
      desc: 'Du sammelst Holz, Stein und Beeren, suchst einen guten Platz und machst aus wenig Zeug ein erstes Camp.',
    },
    {
      icon: <House className="h-7 w-7 text-amber-300" />,
      title: 'Das Camp wird zuhause',
      desc: 'Licht, Essen, Storage und Comfort geben der Base einen Zweck. Es soll nicht nur praktisch sein, sondern gemütlich.',
    },
    {
      icon: <Pickaxe className="h-7 w-7 text-sky-300" />,
      title: 'Der nächste Ausflug',
      desc: 'Mit besseren Tools wird die Welt größer: neue Ressourcen, andere Biome und Ruinen, die man nicht sofort knackt.',
    },
  ];

  const details = [
    'Hunger, Health und Stamina sind schon Teil des Loops.',
    'Campfire, Cooking Pot, Workbench und Forge geben echte Zwischenziele.',
    'Ruinen, Crates und seltene Items sollen Erkundung belohnen.',
  ];

  return (
    <section id="spielprinzip" className="page-section">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Spielgefühl" title="Ein kleiner Survival-Tag" icon={<Gamepad2 className="h-4 w-4" />}>
          Die Mainpage erzählt jetzt eher, wie sich Adventura spielen soll: ein bisschen vorsichtig, ein bisschen gemütlich, mit genug Fortschritt für den nächsten Ausflug.
        </SectionHeader>

        <div className="card-grid three">
          {moments.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ delay: index * 0.06, duration: 0.38 }}
              className="info-card"
            >
              <div className="info-icon">{item.icon}</div>
              <h3 className="font-pixel">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className="gameplay-note-panel">
          <div>
            <h3 className="font-pixel">Was davon schon wichtig ist</h3>
            <p>
              Nicht jedes System muss auf der Startseite stehen. Die kurze Version: Adventura hat bereits genug Survival-, Crafting- und Weltlogik, um sich wie ein kleiner spielbarer Prototyp anzufühlen.
            </p>
          </div>
          <div className="check-list">
            {details.map((detail) => (
              <span key={detail}>
                <CheckCircle2 className="h-4 w-4" />
                {detail}
              </span>
            ))}
          </div>
          <a href={wikiHref('gameplay.html')} className="inline-action">
            Mehr im Wiki <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LookAndFeelSection() {
  const styleNotes = [
    {
      icon: <House className="h-6 w-6 text-amber-300" />,
      title: 'Camp statt Konsole',
      desc: 'Wärmere Farben, kleine Hüttenformen und Feld-Details holen die Seite näher ans Spielgefühl.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-lime-300" />,
      title: 'Sanft bewegt',
      desc: 'Wolken, Rauch, Wasser und Fireflies bewegen sich langsam. Mehr Leben, aber kein Dauerfeuer.',
    },
    {
      icon: <Layers3 className="h-6 w-6 text-emerald-300" />,
      title: 'Pixelig, aber lesbar',
      desc: 'Die Überschriften dürfen wieder blockiger sein. Die längeren Texte bleiben sauber und gut zu scannen.',
    },
  ];

  return (
    <section id="look-feel" className="page-section section-muted">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Vibe" title="Wieder mehr Pixel-Camp" icon={<Shapes className="h-4 w-4" />}>
          Das Design lehnt sich wieder stärker an die vorherige Pixel-Art-Richtung an, nur mit weniger Lärm und klareren Flächen.
        </SectionHeader>

        <div className="asset-hero">
          <div className="asset-hero-copy">
            <span>Cozy Richtung</span>
            <h3 className="font-pixel">Ein kleines Camp als visuelle Leitidee</h3>
            <p>
              Adventura darf nach Abendlicht, Feld, Hütte und ruhigem Voxel-Abenteuer aussehen. Die Szene ist bewusst gebaut und nicht aus zufälligen Assets zusammengewürfelt.
            </p>
          </div>
          <CozyPixelScene compact />
        </div>

        <div className="card-grid three">
          {styleNotes.map((note) => (
            <article key={note.title} className="asset-card style-card">
              <div className="info-icon">{note.icon}</div>
              <h3 className="font-pixel">{note.title}</h3>
              <p>{note.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeSnapshotSection() {
  const blockGroups = [
    {
      title: 'Terrain & Rohstoffe',
      desc: 'Grundmaterialien, Ores und Tool-Level-Gates.',
      tags: ['stone', 'dirt', 'grass_block', 'water', 'sand', 'clay', 'gravel', 'snow', 'ice', 'coal_ore', 'iron_ore L2', 'copper_ore L1'],
    },
    {
      title: 'Pflanzen & Harvest',
      desc: 'Cutout-Blöcke mit Drops oder Rechtsklick-Interaktionen.',
      tags: ['wild_grass', 'sun_bloom', 'red_mushroom', 'berry_bush', 'herb_planter', 'reeds', 'twig_pile', 'tree_stump', 'clay_deposit', 'small_stone'],
    },
    {
      title: 'Stationen & Comfort',
      desc: 'Basen beeinflussen Hunger-Drain und Stamina-Regeneration.',
      tags: ['campfire', 'campfire_active', 'cooking_pot', 'workbench', 'forge', 'sleeping_mat', 'storage_crate', 'woven_rug', 'small_table', 'wooden_chair'],
    },
    {
      title: 'Licht & Ruinen',
      desc: 'Lichtquellen und seltene Ruinen-Items strukturieren Nacht, Höhlen und Exploration.',
      tags: ['torch:14', 'lantern:13', 'glow_crystal_node:10', 'campfire_active:14', 'ancient_lantern:15', 'ruin_key', 'ruin_seal'],
    },
  ];

  const systems = [
    { icon: <Heart className="h-6 w-6 text-red-300" />, title: 'Survival Status', desc: 'Health, Hunger, Stamina, Breath, Armor, Fall Damage, Starvation und Regeneration laufen serverseitig.' },
    { icon: <House className="h-6 w-6 text-lime-300" />, title: 'Comfort Rules', desc: 'Campfire, Sleeping Mat, Lantern, Rug, Table, Chair und Storage verbessern Hunger-/Stamina-Werte.' },
    { icon: <Hammer className="h-6 w-6 text-sky-300" />, title: 'Station Crafting', desc: 'Campfire, Cooking Pot, Workbench und Forge nutzen Nähe, Validierung, Zeit und Kategorien.' },
    { icon: <PackageOpen className="h-6 w-6 text-orange-300" />, title: 'Loot & Entities', desc: 'Crates, Item-Drops, Ambient Entities und Firefly Swarms geben der Welt Gründe zum Erkunden.' },
  ];

  const codeFiles = [
    { path: 'common/src/main/java/dev/voxelgame/common/block/Blocks.java', note: 'Block-Registry, Drops, Render-Layer, Tool-Typen und Lichtwerte.' },
    { path: 'common/src/main/java/dev/voxelgame/common/item/Items.java', note: 'Item-Registry mit Stackgrößen, Tool-Durability und Food-Werten.' },
    { path: 'common/src/main/java/dev/voxelgame/common/item/CraftingRecipes.java', note: 'Rezepte, Kategorien, Stationen und Adventure-Progression.' },
    { path: 'common/src/main/java/dev/voxelgame/common/world/Biomes.java', note: 'Biome mit Surface/Subsurface/Stone und Spawn-Dichten.' },
    { path: 'common/src/main/java/dev/voxelgame/common/world/structure/Structures.java', note: 'Campsite, Village, Ruins, House, Well und Watchtower als Templates.' },
    { path: 'common/src/main/java/dev/voxelgame/common/loot/LootTables.java', note: 'Loot Tables für Ruinen, Campsites und Village-Häuser.' },
    { path: 'common/src/main/java/dev/voxelgame/common/gameplay/ComfortRules.java', note: 'Comfort-Werte, Scan-Radius, Hunger-Drain und Stamina-Regeneration.' },
    { path: 'common/src/main/java/dev/voxelgame/common/entity/AmbientEntitySpawner.java', note: 'Biomeabhängige Ambient Entities plus feste Spawn-Anker.' },
    { path: 'server/src/main/java/dev/voxelgame/server/world/ServerWorld.java', note: 'Chunk-Generation, Block Updates, Drops, Comfort und aktive Campfires.' },
    { path: 'common/src/main/java/dev/voxelgame/common/net/PacketCodec.java', note: 'Handshake, Login, Chunks, Block Actions, Craft, Chat und Snapshots.' },
  ];

  const foods = ['apple 4/1', 'berries 3/0', 'wild_herbs 1/0', 'healing_snack 5/4', 'cooked_berries 5/1', 'roasted_mushroom 4/1', 'mushroom_stew 7/2', 'herb_soup 6/3', 'berry_jam 8/2', 'calming_tea 3/4', 'hearty_stew 10/3', 'honey 3/2'];
  const tools = ['stone_knife 72', 'stone_sword 96', 'stone_pickaxe 132', 'stone_shovel 132', 'stone_axe 156', 'copper_pickaxe 240', 'copper_axe 260', 'iron_pickaxe 410', 'iron_axe 420'];
  const stations = ['campfire radius 4', 'cooking_pot radius 4', 'workbench radius 4', 'forge radius 4', 'fuel: 18-180s', 'comfort cap 25 early'];

  return (
    <section id="code-infos" className="page-section">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Code-Stand" title="Registries ohne Sucharbeit" icon={<FileCode2 className="h-4 w-4" />}>
          Die wichtigsten Daten aus dem Game-Code stehen hier kompakt zusammen: Content-Zahlen, Gruppen, Werte und die Dateien, in denen sie gepflegt werden.
        </SectionHeader>

        <div className="metric-grid">
          {currentMetrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="split-layout code-layout">
          <div className="doc-panel">
            <h3 className="panel-title font-pixel">
              <Layers3 className="h-6 w-6 text-emerald-300" /> Block- und Content-Gruppen
            </h3>
            <div className="detail-grid">
              {blockGroups.map((group) => (
                <article key={group.title} className="code-info-card">
                  <h4 className="font-pixel">{group.title}</h4>
                  <p>{group.desc}</p>
                  <div className="tag-cloud">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="doc-panel">
            <h3 className="panel-title font-pixel">
              <PackageOpen className="h-6 w-6 text-amber-300" /> Items & Progression
            </h3>
            <div className="stack-list">
              <div className="code-info-card">
                <h4 className="font-pixel">Food-Werte</h4>
                <p>Format: Hunger / Regeneration.</p>
                <div className="tag-cloud">{foods.map((food) => <span key={food}>{food}</span>)}</div>
              </div>
              <div className="code-info-card">
                <h4 className="font-pixel">Tool-Durability</h4>
                <p>Stein-, Kupfer- und Eisenwerkzeuge aus Items.java.</p>
                <div className="tag-cloud">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </div>
              <div className="code-info-card">
                <h4 className="font-pixel">Stationen & Regeln</h4>
                <p>Station-Nähe, Fuel und Comfort aus den Gameplay-Regeln.</p>
                <div className="tag-cloud">{stations.map((station) => <span key={station}>{station}</span>)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="split-layout">
          <div className="card-grid two compact">
            {systems.map((system) => (
              <article key={system.title} className="info-card">
                <div className="info-icon">{system.icon}</div>
                <h3 className="font-pixel">{system.title}</h3>
                <p>{system.desc}</p>
              </article>
            ))}
          </div>

          <div className="doc-panel">
            <h3 className="panel-title font-pixel">
              <BookOpen className="h-6 w-6 text-sky-300" /> Code Map
            </h3>
            <div className="stack-list">
              {codeFiles.map((file) => (
                <a key={file.path} href={codeHref(file.path)} target="_blank" rel="noreferrer" className="code-map-row">
                  <code>{file.path}</code>
                  <span>{file.note}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const modules = [
    { name: 'common', desc: 'Registries, Blöcke, Items, Crafting, World-/Chunk-Daten, Packets, Worldgen, Lighting und Entity Snapshots.' },
    { name: 'server', desc: 'Autoritativer Tick Loop, Netty Transport, World Streaming, Inventory Validation und akzeptierte World Edits.' },
    { name: 'client', desc: 'LWJGL Window, Renderer, Camera, HUD, Inventory, Chat, Settings, Chunk Meshes und Entity Rendering.' },
    { name: 'launcher-electron', desc: 'React/Electron Launcher für Singleplayer, Server-Join, lokalen Server, Seed, Host, Port und Renderwerte.' },
    { name: 'tools', desc: 'Utility-Modul für Daten-, Asset- und Entwicklungsaufgaben.' },
  ];

  const architectureFacts = [
    { icon: <Server className="h-6 w-6 text-emerald-300" />, title: 'Server Authority', desc: 'Der Server besitzt Worldgen, Chunk Mutations, Entities, Inventar und Simulation Ticks. Clients senden Absichten.' },
    { icon: <Gauge className="h-6 w-6 text-amber-300" />, title: 'Tick Model', desc: 'Der Server läuft fix mit 20 TPS. Der Client rendert variabel und ist auf Snapshot-Interpolation vorbereitet.' },
    { icon: <Box className="h-6 w-6 text-sky-300" />, title: 'Chunk Model', desc: '16x16 Footprint, 16x16x16 Sections, Default Dimension von Y -64 bis 319, getrennte Sky-/Block-Light-Werte.' },
    { icon: <Shapes className="h-6 w-6 text-violet-300" />, title: 'Rendering', desc: 'Visible-face Chunk Meshing, Opaque/Transparent GPU Meshes, Frustum Culling, Fog, AO, Soft Shading und Water Pass.' },
  ];

  return (
    <section id="architektur" className="page-section section-muted">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Architektur" title="Getrennt, bevor es groß wird" icon={<Cpu className="h-4 w-4" />}>
          Adventura ist nicht als reiner Offline-Test aufgebaut. Geteilte Datenmodelle, Serverlogik, Rendering, Tools und Launcher sind bewusst getrennt.
        </SectionHeader>

        <div className="architecture-flow">
          <div className="flow-node">
            <Play className="h-6 w-6" />
            <strong>Launcher</strong>
            <small>Seed, Host, Port</small>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-node">
            <Server className="h-6 w-6" />
            <strong>Server</strong>
            <small>20 TPS, Authority</small>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-node">
            <TerminalSquare className="h-6 w-6" />
            <strong>Packets</strong>
            <small>Movement, Block, Craft</small>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-node">
            <Cpu className="h-6 w-6" />
            <strong>Client</strong>
            <small>LWJGL, HUD, Renderer</small>
          </div>
        </div>

        <div className="split-layout">
          <div className="doc-panel">
            <h3 className="panel-title font-pixel">
              <Shield className="h-6 w-6 text-emerald-300" /> Module
            </h3>
            <div className="stack-list">
              {modules.map((module) => (
                <div key={module.name} className="module-row">
                  <strong>{module.name}</strong>
                  <p>{module.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-grid two compact">
            {architectureFacts.map((fact) => (
              <article key={fact.title} className="info-card">
                <div className="info-icon">{fact.icon}</div>
                <h3 className="font-pixel">{fact.title}</h3>
                <p>{fact.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyCommandButton({ command }: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" onClick={copyCommand} className="copy-command-button" aria-label="Befehl kopieren">
      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
    </button>
  );
}

function InstallationSection() {
  const commandCards = [
    { icon: <PackageOpen className="h-6 w-6 text-lime-300" />, title: 'Einmal vorbereiten', desc: 'Launcher-Abhängigkeiten installieren.', command: './gradlew setupLauncher' },
    { icon: <Rocket className="h-6 w-6 text-amber-300" />, title: 'Mit Launcher starten', desc: 'Der bequemste Weg in den Prototyp.', command: './gradlew runLauncher' },
    { icon: <Play className="h-6 w-6 text-sky-300" />, title: 'Direkt ins Spiel', desc: 'Ohne Launcher eine lokale Welt öffnen.', command: './gradlew runSingleplayer' },
  ];

  return (
    <section id="installation" className="page-section">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Installation" title="Lokal starten" icon={<Rocket className="h-4 w-4" />}>
          Nur die wichtigsten Befehle bleiben auf der Startseite. Alles mit Ports, Seeds und Debug-Args liegt im Wiki.
        </SectionHeader>

        <div className="split-layout install-layout">
          <div className="card-grid three compact">
            {commandCards.map((card) => (
              <div key={card.title} className="command-card">
                <div className="command-head">
                  <div className="info-icon">{card.icon}</div>
                  <div>
                    <h3 className="font-pixel">{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
                <div className="command-snippet">
                  <code>{card.command}</code>
                  <CopyCommandButton command={card.command} />
                </div>
              </div>
            ))}
          </div>

          <div className="doc-panel">
            <h3 className="panel-title font-pixel">
              <TerminalSquare className="h-6 w-6 text-emerald-300" /> Kurz notiert
            </h3>
            <p>
              Du brauchst JDK 21. Für den Electron Launcher kommen Node und npm dazu. Wenn du Server, Seeds oder Render-Settings testen willst, steht der längere Ablauf im Wiki.
            </p>
            <div className="soft-callout">
              <h4 className="font-pixel">Mehr Details</h4>
              <p>
                Installation, Controls, Debug-Overlays und Client-Argumente sind bewusst aus der Mainpage rausgezogen.
              </p>
              <a href={wikiHref('installation.html')} className="inline-action">
                Installation im Wiki <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WikiSection() {
  const pages = [
    { icon: <Compass className="h-6 w-6 text-green-300" />, title: 'Progression', href: wikiHref('progression.html'), desc: 'Der konkrete Pfad vom ersten Camp bis zu Forge und Ruinen.' },
    { icon: <Layers3 className="h-6 w-6 text-lime-300" />, title: 'Content', href: wikiHref('content.html'), desc: 'Blöcke, Items, Rezepte, Biome und kleine Werte zum Nachschlagen.' },
    { icon: <Cpu className="h-6 w-6 text-cyan-300" />, title: 'Technik', href: wikiHref('architecture.html'), desc: 'Architektur, Engine, Netzwerk und Code Map für Dev-Arbeit.' },
    { icon: <Rocket className="h-6 w-6 text-amber-300" />, title: 'Starten', href: wikiHref('installation.html'), desc: 'Installation, Controls, Commands und Troubleshooting.' },
  ];

  return (
    <section id="wiki" className="page-section section-muted">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeader eyebrow="Wiki" title="Wenn du tiefer rein willst" icon={<ScrollText className="h-4 w-4" />}>
          Die Startseite bleibt bewusst leicht. Das Wiki sammelt die längeren Listen, Tabellen, Codepfade und Startdetails.
        </SectionHeader>

        <div className="card-grid four">
          {pages.map((page) => (
            <a key={page.href} href={page.href} className="wiki-card">
              <div className="info-icon">{page.icon}</div>
              <h3 className="font-pixel">{page.title}</h3>
              <p>{page.desc}</p>
              <span>
                Öffnen <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="footer-panel">
          <div>
            <h2 className="font-pixel">Adventura Docs</h2>
            <p>Startpunkt für Spielgefühl, lokale Installation und das Wiki des Voxel-Survival-Prototyps.</p>
          </div>
          <div className="footer-actions">
            <a href={wikiIndexHref} className="primary-action">
              <ScrollText className="h-4 w-4" /> Wiki öffnen
            </a>
            <a href={gameRepo} target="_blank" rel="noreferrer" className="secondary-action">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Adventura Prototype.</span>
          <div>
            <a href="#spielprinzip">Spielprinzip</a>
            <a href="#look-feel">Vibe</a>
            <a href="#installation">Installation</a>
            <a href="#wiki">Wiki</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const normalizedBase = siteBase.endsWith('/') ? siteBase : `${siteBase}/`;
    if (window.location.pathname === `${normalizedBase}wiki/` || window.location.pathname === '/wiki/') {
      window.location.replace(`${normalizedBase}wiki/index.html`);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-voxel-bg text-slate-200 selection:bg-emerald-500/30">
      <Navigation />
      <Hero />
      <OverviewSection />
      <GameplaySection />
      <LookAndFeelSection />
      <InstallationSection />
      <WikiSection />
      <Footer />
    </div>
  );
}

export default App;
