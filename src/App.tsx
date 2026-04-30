import { motion, AnimatePresence } from 'motion/react';
import {
  Pickaxe,
  Box,
  Cpu,
  Shapes,
  Play,
  Github,
  TerminalSquare,
  Rocket,
  Menu,
  X,
  ArrowRight,
  TreePine,
  Shield,
  Heart,
  Backpack,
  Hammer,
  Server,
  Compass,
  Map,
  House,
  Gamepad2,
  Gauge,
  MessageCircle,
  Crosshair,
  PackageOpen,
  Sparkles,
  ScrollText,
  Keyboard,
  MousePointer2,
  FileCode2,
  Layers3,
  BookOpen,
  Search,
  ListFilter,
  Clipboard,
  CheckCircle2,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Überblick', href: '#ueberblick' },
  { label: 'Spiel', href: '#spielprinzip' },
  { label: 'Assets', href: '#game-assets' },
  { label: 'Game-Code', href: '#code-infos' },
  { label: 'Architektur', href: '#architektur' },
  { label: 'Installation', href: '#installation' },
  { label: 'Wiki', href: '#wiki' },
];

const siteBase = import.meta.env.BASE_URL;
const gameRepo = 'https://github.com/YoungJibbit95/Adventura';
const gameAssetBase = 'https://raw.githubusercontent.com/YoungJibbit95/Adventura/main/client/src/main/resources/assets/game';
const gameAssetHref = (file: string) => `${gameAssetBase}/${file}`;
const codeHref = (path: string) => `${gameRepo}/blob/main/${path}`;
const wikiIndexHref = `${siteBase}wiki/index.html`;
const wikiHref = (page: string) => `${siteBase}wiki/${page}`;

const currentMetrics = [
  { value: '49', label: 'Block IDs', detail: 'Terrain, Pflanzen, Stationen, Licht, Ores, Campfire-States und Forge' },
  { value: '94', label: 'Item Types', detail: 'Block-Items, Food, Tools, Materialien, Ruin-Items und Decor' },
  { value: '50', label: 'Rezepte', detail: 'Inventory, Campfire, Cooking Pot, Workbench und Forge' },
  { value: '12', label: 'Biome', detail: 'Meadow, Forests, Dunes, Peaks, Mire, Lakeside, Old Ruins und mehr' },
  { value: '6', label: 'Structures', detail: 'Campsite, Watchtower, House, Desert Well, Ruin und Compact Village' },
  { value: '4', label: 'Loot Tables', detail: 'Ruin-, Rare-Ruin-, Campsite- und Village-Crates' },
];

const docsIndex = [
  { title: 'Orientierung', category: 'Start', href: '#ueberblick', text: 'Kurzer Überblick über Spiel-Loop, Progression, Technik, Assets und Schnellstart.' },
  { title: 'Core Loop', category: 'Gameplay', href: '#spielprinzip', text: 'Explore Gather Craft Survive mit Health, Hunger, Stamina, Breath und Comfort.' },
  { title: 'Progression Guide', category: 'Gameplay', href: wikiHref('progression.html'), text: 'Startpfad, Campfire, Cooking Pot, Workbench, Forge, Food, Tools und Ruinen.' },
  { title: 'Game Assets', category: 'Content', href: '#game-assets', text: 'Sprite-Sheets aus dem Game-Ordner: Blocks, Tools, Food, Ores, HUD und Kreaturen.' },
  { title: 'Block Registry', category: 'Content', href: '#code-infos', text: '49 Block IDs: Terrain, Harvest, Stations, Decor, Light, Ores und Campfire States.' },
  { title: 'Items & Food', category: 'Content', href: wikiHref('content.html'), text: '94 Item Types, Food-Werte, Tool-Durability, Ruin-Items, Materialien und Decor.' },
  { title: 'Crafting Recipes', category: 'Content', href: wikiHref('content.html'), text: '50 Rezepte in Basic, Tools, Food, Decor, Building und Adventure.' },
  { title: 'Server Authority', category: 'Technik', href: '#architektur', text: '20 TPS Server validiert Block Actions, Interact, Craft Requests, Inventory und World Edits.' },
  { title: 'Engine Deep Dive', category: 'Technik', href: wikiHref('engine.html'), text: 'Worldgen, Ambient Entities, Chunk Meshing, Lighting, Rendering, Performance und Server Flow.' },
  { title: 'Packet Flow', category: 'Technik', href: wikiHref('code-map.html'), text: 'Handshake, Login, ChunkData, BlockUpdate, EntitySnapshots, InventorySnapshot und Chat.' },
  { title: 'Local Start', category: 'Start', href: '#installation', text: './gradlew setupLauncher, runLauncher, runSingleplayer, runServer und joinLocal.' },
  { title: 'Controls & Commands', category: 'Start', href: wikiHref('controls.html'), text: 'WASD, E, O, F1, F3, F4, Chat, Slash Commands und Settings Toggles.' },
];

const VoxelBlock = ({ color = 'bg-emerald-500', className = '' }) => (
  <div className={`mc-cube-wrapper inline-block ${className}`}>
    <div className="mc-cube">
      <div className={`mc-cube-face mc-cube-top ${color} brightness-125`}></div>
      <div className={`mc-cube-face mc-cube-front ${color}`}></div>
      <div className={`mc-cube-face mc-cube-right ${color} brightness-75`}></div>
    </div>
  </div>
);

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('#top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrolled(window.scrollY > 50);
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)));

      const visible = navItems
        .map((item) => ({ href: item.href, element: document.querySelector(item.href) }))
        .filter((item): item is { href: string; element: Element } => Boolean(item.element))
        .reverse()
        .find((item) => item.element.getBoundingClientRect().top <= 160);

      setActiveSection(visible?.href ?? '#top');
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-voxel-bg/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-4'}`}>
      <div className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-300 to-amber-300 transition-[width] duration-150" style={{ width: `${scrollProgress}%` }}></div>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-4 relative group">
          <div className="absolute -inset-2 bg-emerald-500/15 rounded-lg blur-xl group-hover:bg-emerald-500/25 transition-all duration-500"></div>
          <div className="relative w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <VoxelBlock color="bg-emerald-500" className="scale-75 translate-y-1" />
          </div>
          <span className="font-pixel text-lg text-white">
            ADVENT<span className="text-emerald-400">URA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-pixel text-slate-400 uppercase">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`hover:text-emerald-400 transition-colors relative group ${activeSection === item.href ? 'text-emerald-300' : ''}`}>
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-px bg-emerald-400 transition-all duration-300 ${activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href={gameRepo} target="_blank" rel="noreferrer" className="hidden sm:block text-slate-400 hover:text-white transition-colors" aria-label="Adventura auf GitHub">
            <Github className="w-5 h-5 drop-shadow glow-blue" />
          </a>
          <a href={wikiIndexHref} className="hidden md:flex relative group px-6 py-2.5 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-amber-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-[1px] bg-voxel-bg rounded-lg z-10 transition-colors group-hover:bg-transparent"></div>
            <span className="relative z-20 font-pixel text-sm uppercase text-emerald-300 group-hover:text-white transition-colors flex items-center gap-2">
              Wiki öffnen <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Navigation öffnen">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-white/10 overflow-hidden absolute top-full left-0 right-0 bg-voxel-bg/95 backdrop-blur-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6 font-pixel text-sm uppercase">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-emerald-400 py-2 border-b border-white/5">
                  {item.label}
                </a>
              ))}
              <a href={wikiIndexHref} className="mt-4 px-6 py-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg w-full glow-emerald text-center">
                Wiki öffnen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroPanel() {
  const statusItems = [
    { label: 'Blocks', value: '49 registered' },
    { label: 'Items', value: '94 types' },
    { label: 'Recipes', value: '50 current' },
    { label: 'Biomes', value: '12 overworld' },
  ];

  const commands = [
    './gradlew setupLauncher',
    './gradlew buildGame',
    './gradlew runLauncher',
    './gradlew runSingleplayer --args="--seed 4242"',
  ];

  return (
    <div className="doc-terminal rounded-lg overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <TerminalSquare className="w-5 h-5 text-emerald-300" />
          <span className="font-pixel text-sm uppercase text-white">Project Console</span>
        </div>
        <span className="font-pixel text-xs uppercase text-emerald-300">Preview Docs</span>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid sm:grid-cols-2 gap-3">
          {statusItems.map((item) => (
            <div key={item.label} className="doc-stat rounded-lg p-4">
              <span className="font-pixel text-xs uppercase text-slate-500">{item.label}</span>
              <p className="font-pixel text-sm uppercase text-slate-100 mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {commands.map((command) => (
            <code key={command} className="code-chip block rounded-lg px-4 py-3 text-sm text-emerald-200 overflow-x-auto">{command}</code>
          ))}
        </div>

        <div className="hero-art-frame rounded-lg overflow-hidden">
          <img src={gameAssetHref('blocks_tiles_sheet.png')} alt="Adventura block texture sheet preview" className="pixel-art h-44 w-full object-cover opacity-90" />
          <div className="hero-art-caption">
            <span className="font-pixel text-xs uppercase text-emerald-200">Game Assets</span>
            <span className="text-slate-300">Fallback-Sheets aus dem Java-Client</span>
          </div>
        </div>

        <div className="minigame-hud rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="hud-pill font-pixel text-xs uppercase text-red-200"><Heart className="w-4 h-4" /> Health 20</span>
            <span className="hud-pill font-pixel text-xs uppercase text-amber-200"><Sparkles className="w-4 h-4" /> Hunger 20</span>
            <span className="hud-pill font-pixel text-xs uppercase text-sky-200"><Gauge className="w-4 h-4" /> Stamina</span>
            <span className="hud-pill font-pixel text-xs uppercase text-lime-200"><House className="w-4 h-4" /> Comfort</span>
          </div>
          <div className="grid grid-cols-9 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((slot, index) => (
              <div key={slot} className={`hotbar-slot ${index === 1 ? 'hotbar-slot-active' : ''}`}>
                <span className="hotbar-number">{slot}</span>
                <span className="hotbar-icon">
                  <VoxelBlock color={index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-amber-500' : 'bg-sky-500'} className="scale-[0.55]" />
                </span>
                {index > 2 && <span className="hotbar-count">{index + 2}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden cosmic-section">
      <div className="absolute inset-0 bg-grid-pattern -z-10 opacity-60"></div>
      <div className="tech-line top-[24%]"></div>
      <div className="tech-line top-[74%]" style={{ animationDelay: '2s', opacity: 0.25 }}></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl relative"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg glass-panel border border-emerald-500/30 text-sm font-pixel text-emerald-300 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-emerald block"></span>
            <span className="relative z-10 uppercase">Aktueller Stand aus dem Game-Ordner</span>
          </div>

          <h1 className="font-pixel text-5xl md:text-7xl leading-[1.05] mb-8">
            <span className="block text-white glow-text-emerald mix-blend-screen opacity-95 pb-2">ADVENTURA</span>
            <span className="relative inline-block">
              <span className="absolute -inset-4 bg-emerald-500/15 blur-2xl rounded-lg"></span>
              <span className="relative text-emerald-400">GAME GUIDE</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-sans font-light border-l-2 border-white/10 pl-6">
            Die Startseite bündelt jetzt den echten Prototyp-Stand: 49 Blocks, 94 Items, 50 Recipes, Survival-Werte, Comfort, Stationen, Ruinen-Progression, Assets und den schnellsten Weg ins Spiel.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-20">
            <a href="#ueberblick" className="w-full sm:w-auto relative group overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="relative px-8 py-5 flex items-center justify-center gap-4 text-white font-pixel text-sm uppercase drop-shadow-md">
                <Gamepad2 className="w-5 h-5" />
                Überblick
              </div>
            </a>
            <a href="#code-infos" className="w-full sm:w-auto px-8 py-5 rounded-lg glass-panel hover:bg-white/5 transition-colors text-white font-pixel text-sm uppercase flex items-center justify-center gap-3">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              Game-Code
            </a>
            <a href={wikiIndexHref} className="w-full sm:w-auto px-8 py-5 rounded-lg glass-panel hover:bg-white/5 transition-colors text-white font-pixel text-sm uppercase flex items-center justify-center gap-3">
              <ScrollText className="w-4 h-4 text-amber-300" />
              Wiki
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}

function OverviewSection() {
  const pillars = [
    {
      icon: <Compass className="w-7 h-7 text-emerald-300" />,
      title: 'Spielen',
      text: 'Erkunden, sammeln, craften, kochen, bauen und über Nacht einen warmen sicheren Spot halten.',
      tags: ['Health', 'Hunger', 'Stamina', 'Breath', 'Comfort'],
    },
    {
      icon: <Hammer className="w-7 h-7 text-amber-300" />,
      title: 'Progression',
      text: 'Der Pfad läuft über Campfire, Cooking Pot, Workbench und Forge bis zu Iron Tools, Ruin Key und Ruin Seal.',
      tags: ['Campfire', 'Cooking Pot', 'Workbench', 'Forge'],
    },
    {
      icon: <Map className="w-7 h-7 text-sky-300" />,
      title: 'Welt',
      text: '12 Biome, 6 Structure-Typen, Loot-Crates und Ambient Entities machen die Overworld lesbarer.',
      tags: ['Campsite', 'Village', 'Ruins', 'Fireflies'],
    },
    {
      icon: <Cpu className="w-7 h-7 text-lime-300" />,
      title: 'Technik',
      text: 'Java 21, LWJGL-Client, Netty-Server, Electron Launcher und ein serverautoritativer 20-TPS-Loop.',
      tags: ['LWJGL', 'Netty', 'Electron', '20 TPS'],
    },
  ];

  const route = [
    { step: '01', title: 'Spawn & Supplies', text: 'Campsite, Starter-Ressourcen, erste Drops und klare Interaction-Hints.' },
    { step: '02', title: 'Tools & Licht', text: 'Stone Knife, Pickaxe, Axe, Torches, Resin Torches und Lanterns.' },
    { step: '03', title: 'Food & Comfort', text: 'Campfire-Food, Cooking Pot, Sleeping Mat, Rugs und aktive Comfort-Regeln.' },
    { step: '04', title: 'Ruins & Forge', text: 'Iron Tools, Ancient Lantern, Ruin Key, Ruin Seal und seltene Loot-Crates.' },
  ];

  return (
    <section id="ueberblick" className="py-24 relative bg-voxel-bg border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 arcade-grid opacity-55"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <SectionHeader eyebrow="Überblick" title="Schneller reinfinden" icon={<ListFilter className="w-4 h-4" />}>
            Die Seite ist jetzt in klare Wege aufgeteilt: erst verstehen, was man spielt, dann Content und Assets ansehen, danach Architektur oder Installation öffnen.
          </SectionHeader>

          <div className="overview-note rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white mb-4">Aus `../Game` ergänzt</h3>
            <p className="text-slate-300 leading-relaxed mb-5">
              Die alten Website-Zahlen wurden gegen die aktuellen Registries abgeglichen. Neu sichtbar sind unter anderem Workbench, Forge, Cooking Pot, Comfort, Loot Tables, Ambient Entities und die echten Client-Sprite-Sheets.
            </p>
            <div className="tag-cloud">
              <span>49 Blocks</span>
              <span>94 Items</span>
              <span>50 Recipes</span>
              <span>6 Structures</span>
              <span>5 Game Sheets</span>
              <span>Electron Launcher</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="overview-card rounded-lg p-6">
              <div className="info-icon mb-5">{pillar.icon}</div>
              <h3 className="font-pixel text-xl uppercase text-white mb-4">{pillar.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-5">{pillar.text}</p>
              <div className="mini-tag-list">
                {pillar.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="progress-route rounded-lg p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="font-pixel text-2xl uppercase text-white">Aktueller Spielerpfad</h3>
            <a href={wikiHref('progression.html')} className="font-pixel text-sm uppercase text-emerald-300 inline-flex items-center gap-2 hover:text-white transition-colors">
              Progression im Wiki <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {route.map((item) => (
              <article key={item.step} className="route-step rounded-lg p-5">
                <span className="route-step-number">{item.step}</span>
                <h4 className="font-pixel text-lg uppercase text-white mt-5 mb-3">{item.title}</h4>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
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

  const normalizedQuery = query.trim().toLowerCase();
  const results = docsIndex.filter((entry) => {
    const matchesCategory = category === 'Alle' || entry.category === category;
    const haystack = `${entry.title} ${entry.category} ${entry.text}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <section id="docs-konsole" className="py-24 relative bg-voxel-bg border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 arcade-grid opacity-50"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="docs-console rounded-lg p-5 md:p-7">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-300/25 bg-sky-300/10 text-sm font-pixel text-sky-200 uppercase mb-6">
                <Search className="w-4 h-4" /> Docs-Konsole
              </div>
              <h2 className="font-pixel text-3xl md:text-4xl uppercase text-white leading-tight mb-5">
                Schnell finden, was gerade wichtig ist
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Suche direkt nach Game-Systemen, Content, Commands oder Technik. Die Treffer springen in die passende Sektion oder in die richtige Wiki-Seite.
              </p>

              <div className="search-shell rounded-lg p-2">
                <Search className="w-5 h-5 text-emerald-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="z.B. campfire, blocks, server, controls..."
                  aria-label="Website und Wiki durchsuchen"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-4" aria-label="Dokumentationsfilter">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`filter-chip ${category === item ? 'filter-chip-active' : ''}`}
                  >
                    <ListFilter className="w-3.5 h-3.5" /> {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-pixel text-sm uppercase text-slate-400">{results.length} Treffer</span>
                <a href={wikiIndexHref} className="font-pixel text-sm uppercase text-emerald-300 inline-flex items-center gap-2 hover:text-white transition-colors">
                  Wiki öffnen <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {results.map((entry) => (
                  <a key={`${entry.category}-${entry.title}`} href={entry.href} className="result-card rounded-lg p-4">
                    <span className="result-category">{entry.category}</span>
                    <h3 className="font-pixel text-lg uppercase text-white mt-3 mb-3">{entry.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{entry.text}</p>
                  </a>
                ))}
                {results.length === 0 && (
                  <div className="result-card rounded-lg p-5 sm:col-span-2">
                    <h3 className="font-pixel text-lg uppercase text-white mb-3">Keine Treffer</h3>
                    <p className="text-slate-300">Versuch einen allgemeineren Begriff wie `craft`, `block`, `server` oder `start`.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, children, icon }) {
  return (
    <div className="mb-14 max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm font-pixel text-emerald-300 uppercase">
        {icon}
        {eyebrow}
      </div>
      <h2 className="font-pixel text-4xl md:text-5xl uppercase text-white leading-tight mt-8 mb-6">{title}</h2>
      <p className="text-slate-300 text-lg md:text-xl font-sans font-light leading-relaxed">{children}</p>
    </div>
  );
}

function GameplaySection() {
  const loop = [
    {
      icon: <Compass className="w-7 h-7 text-emerald-300" />,
      title: 'Erkunden',
      desc: 'Die Overworld entsteht deterministisch aus einem Seed. Biome, Flüsse, Höhlen, Strukturen und Ressourcen geben jeder Route eine Richtung.',
    },
    {
      icon: <PackageOpen className="w-7 h-7 text-amber-300" />,
      title: 'Sammeln',
      desc: 'Blöcke, Nahrung, Pflanzen, Erze und Dekor landen als Inventar-Stacks. Drops und Platzierung hängen am Survival-Loop.',
    },
    {
      icon: <Hammer className="w-7 h-7 text-sky-300" />,
      title: 'Craften & Bauen',
      desc: 'Inventory-Crafting und Stationen führen von ersten Werkzeugen über Cooking Pot und Workbench bis zu Forge und Ruinen-Items.',
    },
    {
      icon: <Heart className="w-7 h-7 text-red-300" />,
      title: 'Überleben',
      desc: 'Health, Hunger, Stamina, Armor, Breath, Fall Damage, Wasserbewegung, Regeneration und Comfort bilden die Survival-Regeln.',
    },
  ];

  const worldItems = [
    { icon: <TreePine className="w-5 h-5 text-emerald-300" />, label: 'Biome', value: 'Meadow, Skyroot Forest, Cozy Meadow, Flower Fields, Pine Forest, Mushroom Grove, Lakeside, Old Ruins, Sun Dunes, Highlands, Frost Peaks und Mire' },
    { icon: <House className="w-5 h-5 text-lime-300" />, label: 'Strukturen', value: 'Campsite, Watchtower, Simple House, Desert Well, Small Ruin und Compact Village mit Market Stall' },
    { icon: <Pickaxe className="w-5 h-5 text-orange-300" />, label: 'Ressourcen', value: 'Coal, Copper, Iron, Clay, Resin, Bark, Reeds, Glow Crystal, Ancient Fragments und klassische Starter-Drops' },
    { icon: <Sparkles className="w-5 h-5 text-sky-300" />, label: 'Lebendige Welt', value: 'Ambient Entities, Item Drops, Firefly Swarms, Loot Crates und Spawn-Anker ergänzen die reine Blockwelt' },
  ];

  const controlItems = [
    { icon: <Keyboard className="w-5 h-5 text-emerald-300" />, keys: 'WASD / Space / Shift', label: 'Bewegen, springen, sprinten' },
    { icon: <MousePointer2 className="w-5 h-5 text-amber-300" />, keys: 'Mouse / Left / Right', label: 'Umschauen, abbauen, platzieren' },
    { icon: <Backpack className="w-5 h-5 text-sky-300" />, keys: 'E / 1-9 / O', label: 'Inventar, Hotbar, Settings' },
    { icon: <MessageCircle className="w-5 h-5 text-violet-300" />, keys: 'T / / / F1 / F3 / F4', label: 'Chat, Commands, HUD, Debug, Gamemode' },
  ];

  return (
    <section id="spielprinzip" className="py-32 relative overflow-hidden cosmic-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Spielprinzip" title="Der aktuelle Spiel-Loop" icon={<Gamepad2 className="w-4 h-4" />}>
          Adventura ist ein gemütliches Voxel-Survival-Adventure: Die Spieler erkunden eine generierte Welt, sammeln Ressourcen, bauen Werkzeuge und Basen und testen dabei die Systeme, die später mehr Progression tragen sollen.
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {loop.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="info-card rounded-lg p-6"
            >
              <div className="info-icon mb-5">{item.icon}</div>
              <h3 className="font-pixel text-xl text-white uppercase mb-4">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-6">
          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <Map className="w-7 h-7 text-emerald-300" /> Aktueller Inhalt
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {worldItems.map((item) => (
                <div key={item.label} className="detail-row rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="detail-icon">{item.icon}</div>
                    <span className="font-pixel text-base text-white uppercase">{item.label}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <Crosshair className="w-7 h-7 text-amber-300" /> Steuerung
            </h3>
            <div className="space-y-3">
              {controlItems.map((control) => (
                <div key={control.keys} className="control-row rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="control-icon">{control.icon}</div>
                    <div>
                      <span className="control-key">{control.keys}</span>
                      <p className="text-slate-300 mt-2">{control.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GameAssetsSection() {
  const sheets = [
    {
      title: 'Blocks & Terrain',
      file: 'blocks_tiles_sheet.png',
      desc: 'Fallback-Atlas für Terrain, Holz, Pfade, Stationen und Block-Items.',
    },
    {
      title: 'Nature & Food',
      file: 'nature_food_sheet.png',
      desc: 'Pflanzen, Beeren, Kräuter, Pilze, Fuel und Food-Progression.',
    },
    {
      title: 'Tools & Weapons',
      file: 'tools_weapons_sheet.png',
      desc: 'Stone-, Copper- und Iron-Werkzeuge plus Held-Item-Icons.',
    },
    {
      title: 'Ores & Materials',
      file: 'ores_materials_sheet.png',
      desc: 'Raw Copper, Raw Iron, Ingots, Glow Crystal und Ruin-Materialien.',
    },
    {
      title: 'HUD & UI',
      file: 'ui_hud_sheet.png',
      desc: 'Hearts, Hunger, Menüflächen, HUD-Flair und ausgewählte Decor-Icons.',
    },
  ];

  return (
    <section id="game-assets" className="py-32 relative overflow-hidden cosmic-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Game-Assets" title="Mehr Bildsprache aus dem Spiel" icon={<Shapes className="w-4 h-4" />}>
          Die Website nutzt jetzt lokale Assets aus dem Game-Ordner. Dadurch wirkt sie weniger abstrakt und zeigt schneller, wie Adventura als cozy Voxel-Prototyp aussieht.
        </SectionHeader>

        <div className="asset-hero rounded-lg overflow-hidden mb-6">
          <div className="asset-hero-copy">
            <span className="font-pixel text-sm uppercase text-emerald-200">Sprite-Sheets</span>
            <h3 className="font-pixel text-3xl uppercase text-white mt-3 mb-4">Renderer-Fallbacks, HUD und Item-Icons</h3>
            <p className="text-slate-300 leading-relaxed">
              Der Java-Client kann einzelne PNGs laden, nutzt diese Sheets aber als robuste Fallbacks für Chunk-Shader, HUD, Inventory und Held-Items.
            </p>
          </div>
          <img src={gameAssetHref('nature_food_sheet.png')} alt="Adventura nature and food sprite sheet" className="pixel-art" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sheets.map((sheet) => (
            <article key={sheet.file} className="asset-card rounded-lg overflow-hidden">
              <div className="asset-image-wrap">
                <img src={gameAssetHref(sheet.file)} alt={`${sheet.title} sprite sheet`} className="pixel-art" />
              </div>
              <div className="p-5">
                <h3 className="font-pixel text-lg uppercase text-white mb-3">{sheet.title}</h3>
                <p className="text-slate-300 leading-relaxed">{sheet.desc}</p>
              </div>
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
      desc: 'Die Weltbasis besteht aus klassischen Voxel-Materialien, Ores und Tool-Level-Gates.',
      tags: ['stone', 'dirt', 'grass_block', 'water', 'sand', 'clay', 'gravel', 'snow', 'ice', 'coal_ore', 'iron_ore L2', 'copper_ore L1'],
    },
    {
      title: 'Pflanzen & Harvest',
      desc: 'Viele Cutout-Blöcke droppen Ressourcen oder haben eigene Rechtsklick-Interaktionen.',
      tags: ['wild_grass', 'sun_bloom', 'red_mushroom', 'berry_bush', 'herb_planter', 'reeds', 'twig_pile', 'tree_stump', 'clay_deposit', 'small_stone'],
    },
    {
      title: 'Stationen & Comfort',
      desc: 'Basen sind nicht nur Deko: Comfort beeinflusst Hunger-Drain und Stamina-Regeneration.',
      tags: ['campfire', 'campfire_active', 'cooking_pot', 'workbench', 'forge', 'sleeping_mat', 'storage_crate', 'woven_rug', 'small_table', 'wooden_chair'],
    },
    {
      title: 'Licht & Ruinen',
      desc: 'Lichtquellen und seltene Ruinen-Items machen Nacht, Höhlen und Erkundung lesbarer.',
      tags: ['torch:14', 'lantern:13', 'glow_crystal_node:10', 'campfire_active:14', 'ancient_lantern:15', 'ruin_key', 'ruin_seal'],
    },
  ];

  const systems = [
    {
      icon: <Heart className="w-6 h-6 text-red-300" />,
      title: 'Survival Status',
      desc: 'Health, Hunger, Stamina, Breath, Armor, Fall Damage, Starvation, Regeneration und Wasser-Breath laufen serverseitig.',
    },
    {
      icon: <House className="w-6 h-6 text-lime-300" />,
      title: 'Comfort Rules',
      desc: 'Campfire, Sleeping Mat, Lantern, Rug, Table, Chair und Storage erhöhen Comfort und verbessern Hunger-/Stamina-Werte.',
    },
    {
      icon: <Hammer className="w-6 h-6 text-sky-300" />,
      title: 'Station Crafting',
      desc: 'Campfire, Cooking Pot, Workbench und Forge sind echte Stationen mit Nähe, Validierung, Crafting-Zeit und Kategorien.',
    },
    {
      icon: <PackageOpen className="w-6 h-6 text-orange-300" />,
      title: 'Loot & Entities',
      desc: 'Ruin-, Campsite- und Village-Crates, Item-Drops, Ambient Entities und Firefly Swarms geben der Welt mehr Anlass zum Erkunden.',
    },
  ];

  const codeFiles = [
    { path: 'common/src/main/java/dev/voxelgame/common/block/Blocks.java', note: 'Block-Registry, Drops, Render-Layer, Tool-Typen und Lichtwerte.' },
    { path: 'common/src/main/java/dev/voxelgame/common/item/Items.java', note: 'Item-Registry mit Stackgroessen, Tool-Durability und Food-Werten.' },
    { path: 'common/src/main/java/dev/voxelgame/common/item/CraftingRecipes.java', note: '50 Rezepte, Kategorien, Stationen und Adventure-Progression.' },
    { path: 'common/src/main/java/dev/voxelgame/common/world/Biomes.java', note: '12 Biome mit Surface/Subsurface/Stone und Spawn-Dichten.' },
    { path: 'common/src/main/java/dev/voxelgame/common/world/structure/Structures.java', note: 'Campsite, Village, Ruins, House, Well und Watchtower als Templates.' },
    { path: 'common/src/main/java/dev/voxelgame/common/loot/LootTables.java', note: 'Vier Loot Tables für Ruinen, Campsites und Village-Häuser.' },
    { path: 'common/src/main/java/dev/voxelgame/common/gameplay/ComfortRules.java', note: 'Comfort-Werte, Scan-Radius, Hunger-Drain und Stamina-Regeneration.' },
    { path: 'common/src/main/java/dev/voxelgame/common/entity/AmbientEntitySpawner.java', note: 'Biomeabhängige Ambient Entities plus feste Spawn-Anker.' },
    { path: 'server/src/main/java/dev/voxelgame/server/world/ServerWorld.java', note: 'Chunk-Generation, Block Updates, Drops, Comfort und aktive Campfires auf Server-Seite.' },
    { path: 'common/src/main/java/dev/voxelgame/common/net/PacketCodec.java', note: 'Handshake, Login, Chunk Data, Block Actions, Interact, Craft, Chat und Snapshots.' },
  ];

  const foods = ['apple 4/1', 'berries 3/0', 'wild_herbs 1/0', 'healing_snack 5/4', 'cooked_berries 5/1', 'roasted_mushroom 4/1', 'mushroom_stew 7/2', 'herb_soup 6/3', 'berry_jam 8/2', 'calming_tea 3/4', 'hearty_stew 10/3', 'honey 3/2'];
  const tools = ['stone_knife 72', 'stone_sword 96', 'stone_pickaxe 132', 'stone_shovel 132', 'stone_axe 156', 'copper_pickaxe 240', 'copper_axe 260', 'iron_pickaxe 410', 'iron_axe 420'];
  const stations = ['campfire radius 4', 'cooking_pot radius 4', 'workbench radius 4', 'forge radius 4', 'fuel: 18-180s', 'comfort cap 25 early'];

  return (
    <section id="code-infos" className="py-32 relative bg-voxel-bg border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 arcade-grid opacity-70"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Code-Infos" title="Aktueller Stand aus dem Game-Code" icon={<FileCode2 className="w-4 h-4" />}>
          Diese Website spiegelt jetzt die wichtigsten Registries und Systeme aus `../Game`: Blöcke, Items, Rezepte, Biome, Structures, Loot, Comfort, Ambient Entities, Server-Authority und die Dateien, in denen der aktuelle Stand gepflegt wird.
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {currentMetrics.map((metric) => (
            <div key={metric.label} className="metric-card rounded-lg p-5">
              <div className="flex items-end gap-3 mb-3">
                <strong className="font-pixel text-4xl text-emerald-300 leading-none">{metric.value}</strong>
                <span className="font-pixel text-sm uppercase text-white pb-1">{metric.label}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 mb-6">
          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <Layers3 className="w-7 h-7 text-emerald-300" /> Block- und Content-Gruppen
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {blockGroups.map((group) => (
                <article key={group.title} className="code-info-card rounded-lg p-5">
                  <h4 className="font-pixel text-lg uppercase text-white mb-3">{group.title}</h4>
                  <p className="text-slate-300 leading-relaxed mb-4">{group.desc}</p>
                  <div className="tag-cloud">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <PackageOpen className="w-7 h-7 text-amber-300" /> Items & Progression
            </h3>
            <div className="space-y-4">
              <div className="code-info-card rounded-lg p-5">
                <h4 className="font-pixel text-lg uppercase text-white mb-3">Food-Werte</h4>
                <p className="text-slate-400 mb-4">Format: Hunger / Regeneration</p>
                <div className="tag-cloud">
                  {foods.map((food) => <span key={food}>{food}</span>)}
                </div>
              </div>
              <div className="code-info-card rounded-lg p-5">
                <h4 className="font-pixel text-lg uppercase text-white mb-3">Tool-Durability</h4>
                <p className="text-slate-400 mb-4">Stein-, Kupfer- und Eisenwerkzeuge aus `Items.java`.</p>
                <div className="tag-cloud">
                  {tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </div>
              <div className="code-info-card rounded-lg p-5">
                <h4 className="font-pixel text-lg uppercase text-white mb-3">Stationen & Regeln</h4>
                <p className="text-slate-400 mb-4">Station-Nähe, Fuel und Comfort aus den Gameplay-Rules.</p>
                <div className="tag-cloud">
                  {stations.map((station) => <span key={station}>{station}</span>)}
                </div>
              </div>
              <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
                <h4 className="font-pixel text-base uppercase text-amber-200 mb-3">Game Style</h4>
                <p className="text-slate-300 leading-relaxed">
                  Cozy Survival statt reines Tech-Demo-Gefühl: Sammeln, kleine Camps, Lichtquellen, Pilze, Kräuter, Beeren, Teppiche, Tische, Stühle, Pfade, Cooking und Ruinen-Progression sind als spielbarer Stil angelegt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {systems.map((system) => (
              <article key={system.title} className="info-card rounded-lg p-6">
                <div className="info-icon mb-5">{system.icon}</div>
                <h3 className="font-pixel text-lg text-white uppercase mb-4">{system.title}</h3>
                <p className="text-slate-300 leading-relaxed">{system.desc}</p>
              </article>
            ))}
          </div>

          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <BookOpen className="w-7 h-7 text-sky-300" /> Code Map
            </h3>
            <div className="space-y-3">
              {codeFiles.map((file) => (
                <a key={file.path} href={codeHref(file.path)} target="_blank" rel="noreferrer" className="code-map-row rounded-lg p-4">
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
    { name: 'server', desc: 'Autoritativer Tick Loop, Netty Transport, Auth Hook, World Streaming, Inventory Validation und akzeptierte World Edits.' },
    { name: 'client', desc: 'LWJGL Window, Renderer, Camera, HUD, Inventory, Chat, Settings, Chunk Meshes, Entity Rendering und Sprite-Pass.' },
    { name: 'launcher-electron', desc: 'React/Electron Launcher für Singleplayer, Server-Join, lokalen Server, Seed, Host, Port und Renderwerte.' },
    { name: 'tools', desc: 'Utility-Modul für Daten-, Asset- und Entwicklungsaufgaben.' },
  ];

  const architectureFacts = [
    { icon: <Server className="w-6 h-6 text-emerald-300" />, title: 'Server Authority', desc: 'Der Server besitzt Worldgen, Chunk Mutations, Entities, Inventar und Simulation Ticks. Clients senden Intents.' },
    { icon: <Gauge className="w-6 h-6 text-amber-300" />, title: 'Tick Model', desc: 'Server läuft fix mit 20 TPS. Client rendert variabel und ist auf spätere Snapshot-Interpolation vorbereitet.' },
    { icon: <Box className="w-6 h-6 text-sky-300" />, title: 'Chunk Model', desc: '16x16 Footprint, 16x16x16 Sections, Default Dimension von Y -64 bis 319, getrennte Sky-/Block-Light-Werte.' },
    { icon: <Shapes className="w-6 h-6 text-violet-300" />, title: 'Rendering', desc: 'Visible-face Chunk Meshing, Opaque/Transparent GPU Meshes, Frustum Culling, Fog, AO, Soft Shading und Water Pass.' },
  ];

  return (
    <section id="architektur" className="py-32 relative bg-voxel-bg border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 arcade-grid opacity-70"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Architektur" title="Client/Server von Anfang an" icon={<Cpu className="w-4 h-4" />}>
          Die Codebasis ist kein reiner Singleplayer-Prototyp. Sie trennt geteilte Datenmodelle, autoritative Serverlogik, Client-Rendering, Tools und den Electron Launcher in klare Bereiche.
        </SectionHeader>

        <div className="doc-panel rounded-lg p-6 mb-8">
          <div className="architecture-flow">
            <div className="flow-node">
              <span className="flow-icon"><Play className="w-6 h-6" /></span>
              <strong>Launcher</strong>
              <small>Electron, Seed, Host, Port</small>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="flow-node">
              <span className="flow-icon"><Server className="w-6 h-6" /></span>
              <strong>Server</strong>
              <small>20 TPS, World Authority</small>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="flow-node">
              <span className="flow-icon"><TerminalSquare className="w-6 h-6" /></span>
              <strong>Packets</strong>
              <small>Movement, Block, Craft, Chat</small>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="flow-node">
              <span className="flow-icon"><Cpu className="w-6 h-6" /></span>
              <strong>Client</strong>
              <small>LWJGL, UI, Renderer</small>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <Shield className="w-7 h-7 text-emerald-300" /> Modulübersicht
            </h3>
            <div className="space-y-3">
              {modules.map((module) => (
                <div key={module.name} className="module-row rounded-lg p-4">
                  <span className="font-pixel text-emerald-300 uppercase">{module.name}</span>
                  <p className="text-slate-300 mt-2 leading-relaxed">{module.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {architectureFacts.map((fact) => (
              <div key={fact.title} className="info-card rounded-lg p-6">
                <div className="info-icon mb-5">{fact.icon}</div>
                <h3 className="font-pixel text-lg text-white uppercase mb-4">{fact.title}</h3>
                <p className="text-slate-300 leading-relaxed">{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyCommandButton({ command }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" onClick={copyCommand} className="copy-command-button" aria-label="Befehl kopieren">
      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
      <span>{copied ? 'Kopiert' : 'Copy'}</span>
    </button>
  );
}

function InstallationSection() {
  const commandCards = [
    {
      icon: <PackageOpen className="w-6 h-6 text-lime-300" />,
      title: 'Launcher Setup',
      desc: 'Installiert die npm-Abhängigkeiten des React/Electron Launchers.',
      command: './gradlew setupLauncher',
    },
    {
      icon: <Hammer className="w-6 h-6 text-emerald-300" />,
      title: 'Build',
      desc: 'Kompiliert alle Module und prüft den aktuellen Stand.',
      command: './gradlew buildGame',
    },
    {
      icon: <Rocket className="w-6 h-6 text-amber-300" />,
      title: 'Launcher',
      desc: 'Startet den Electron Launcher mit Seed, Render Distance, Preview Radius, Host, Port und Username.',
      command: './gradlew runLauncher',
    },
    {
      icon: <Play className="w-6 h-6 text-sky-300" />,
      title: 'Singleplayer',
      desc: 'Startet direkt eine offline generierte Welt.',
      command: './gradlew runSingleplayer',
    },
    {
      icon: <Server className="w-6 h-6 text-violet-300" />,
      title: 'Local Multiplayer',
      desc: 'Server und lokalen Client getrennt starten, um Netzwerk-Streaming und Server-Authority zu testen.',
      command: './gradlew runServer\n./gradlew joinLocal',
    },
  ];

  const args = [
    { flag: '--seed N', desc: 'Deterministische Welt für Offline-Generation.' },
    { flag: '--preview-radius N', desc: 'Offline-Chunk-Generierungsradius um die Kamera.' },
    { flag: '--render-distance N', desc: 'Client-seitige Sicht-/Culling-Distanz in Chunks.' },
    { flag: '--username NAME', desc: 'Spielername für lokalen oder entfernten Join.' },
    { flag: '--connect HOST --port PORT', desc: 'Serverziel für Join Server.' },
    { flag: '--auto-singleplayer', desc: 'Main Menu überspringen und direkt offline starten.' },
    { flag: '--auto-join', desc: 'Main Menu überspringen und direkt zum konfigurierten Server verbinden.' },
  ];

  return (
    <section id="installation" className="py-32 relative overflow-hidden cosmic-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Installation" title="Lokal starten" icon={<Rocket className="w-4 h-4" />}>
          Für den aktuellen Prototyp brauchst du JDK 21 und den Gradle Wrapper im `Game`-Projekt. Für den Electron Launcher kommen Node/npm dazu; die wichtigsten Startwege sind hier direkt kopierbar.
        </SectionHeader>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {commandCards.map((card) => (
              <div key={card.title} className="command-card rounded-lg p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="info-icon">{card.icon}</div>
                  <div>
                    <h3 className="font-pixel text-xl uppercase text-white">{card.title}</h3>
                    <p className="text-slate-300 mt-2 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="command-snippet">
                  <code className="code-chip block rounded-lg px-4 py-3 pr-24 text-sm text-emerald-200 whitespace-pre-wrap overflow-x-auto">{card.command}</code>
                  <CopyCommandButton command={card.command} />
                </div>
              </div>
            ))}
          </div>

          <div className="doc-panel rounded-lg p-6">
            <h3 className="font-pixel text-2xl uppercase text-white flex items-center gap-3 mb-6">
              <TerminalSquare className="w-7 h-7 text-emerald-300" /> Client Args
            </h3>
            <div className="space-y-3 mb-8">
              {args.map((arg) => (
                <div key={arg.flag} className="arg-row rounded-lg p-4">
                  <code className="text-amber-200 font-mono text-sm">{arg.flag}</code>
                  <p className="text-slate-300 mt-2">{arg.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
              <h4 className="font-pixel text-base uppercase text-amber-200 mb-3">Performance Hinweis</h4>
              <p className="text-slate-300 leading-relaxed">
                Wenn Chunk-Loading ruckelt, senke Mesh Budget, Render Distance oder World Preview. Fog, Ambient AO, Soft Shadows und transparentes Wasser können in den Settings deaktiviert werden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WikiSection() {
  const pages = [
    { icon: <Gamepad2 className="w-6 h-6 text-emerald-300" />, title: 'Spielprinzip', href: wikiHref('gameplay.html'), desc: 'Core Loop, Weltinhalt, Survival-Systeme und aktueller Feature-Stand.' },
    { icon: <Compass className="w-6 h-6 text-green-300" />, title: 'Progression', href: wikiHref('progression.html'), desc: 'Startpfad, frühe Ziele, Stationen, Forge, Ruinen und erste Cozy Base.' },
    { icon: <Layers3 className="w-6 h-6 text-lime-300" />, title: 'Content', href: wikiHref('content.html'), desc: '49 Blocks, 94 Items, 50 Recipes, 12 Biome, Food, Tools und Lichtquellen.' },
    { icon: <BookOpen className="w-6 h-6 text-amber-300" />, title: 'Systeme', href: wikiHref('systems.html'), desc: 'Survival-Werte, Comfort, Stationen, Interaktionen, Rendering und Online-Validierung.' },
    { icon: <Cpu className="w-6 h-6 text-cyan-300" />, title: 'Engine', href: wikiHref('engine.html'), desc: 'Worldgen, Chunk Meshing, Lighting, Entities, Assets, Performance und Server Flow.' },
    { icon: <FileCode2 className="w-6 h-6 text-cyan-300" />, title: 'Code Map', href: wikiHref('code-map.html'), desc: 'Die wichtigsten Java-Dateien, Module und Datenflüsse als technische Orientierung.' },
    { icon: <Cpu className="w-6 h-6 text-sky-300" />, title: 'Architektur', href: wikiHref('architecture.html'), desc: 'Module, Runtime Shape, Tick Model, Networking, Rendering und Streaming.' },
    { icon: <Rocket className="w-6 h-6 text-amber-300" />, title: 'Installation', href: wikiHref('installation.html'), desc: 'JDK, Gradle, Electron Launcher, Kommandos, Client Args und Troubleshooting.' },
    { icon: <Keyboard className="w-6 h-6 text-violet-300" />, title: 'Controls & Commands', href: wikiHref('controls.html'), desc: 'Tasten, Chat-Kommandos, Debug-Overlays und Settings.' },
  ];

  return (
    <section id="wiki" className="py-32 relative bg-voxel-bg border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 arcade-grid opacity-60"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Wiki" title="Separates Spiel-Wiki" icon={<ScrollText className="w-4 h-4" />}>
          Das Wiki ist als eigene statische Unterseite angelegt. Es kann später unabhängig von der Landingpage wachsen und detaillierte Guides, Changelogs, Blöcke, Items, Rezepte und Server-Dokumentation aufnehmen.
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pages.map((page) => (
            <a key={page.href} href={page.href} className="wiki-card rounded-lg p-6 group">
              <div className="info-icon mb-5">{page.icon}</div>
              <h3 className="font-pixel text-xl uppercase text-white mb-4 group-hover:text-emerald-300 transition-colors">{page.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{page.desc}</p>
              <span className="font-pixel text-sm uppercase text-emerald-300 inline-flex items-center gap-2">
                Seite öffnen <ArrowRight className="w-4 h-4" />
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
    <footer className="relative overflow-hidden pt-24 pb-12">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[420px] footer-terrain -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 glass-panel rounded-lg p-8">
          <div>
            <h2 className="font-pixel text-3xl uppercase text-white mb-3">Adventura Docs</h2>
            <p className="text-slate-300 max-w-2xl">
              Startseite für Spielprinzip, Architektur, Installation und das wachsende Wiki des Voxel-Survival-Prototyps.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={wikiIndexHref} className="px-6 py-4 rounded-lg bg-emerald-500 text-white font-pixel text-sm uppercase inline-flex items-center justify-center gap-3">
              <ScrollText className="w-4 h-4" /> Wiki öffnen
            </a>
            <a href={gameRepo} target="_blank" rel="noreferrer" className="px-6 py-4 rounded-lg border border-white/10 text-white font-pixel text-sm uppercase inline-flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-pixel text-slate-400 uppercase pt-8 mt-10 border-t border-white/5">
          <div className="flex items-center gap-3">
            <VoxelBlock color="bg-slate-600" className="scale-[0.5]" />
            &copy; {new Date().getFullYear()} Adventura Prototype.
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#spielprinzip" className="hover:text-emerald-400 transition-colors">Spielprinzip</a>
            <a href="#code-infos" className="hover:text-emerald-400 transition-colors">Code</a>
            <a href="#architektur" className="hover:text-emerald-400 transition-colors">Architektur</a>
            <a href="#installation" className="hover:text-emerald-400 transition-colors">Installation</a>
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
    <div className="min-h-screen bg-voxel-bg text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden">
      <Navigation />
      <Hero />
      <OverviewSection />
      <DocsConsoleSection />
      <GameplaySection />
      <GameAssetsSection />
      <CodeSnapshotSection />
      <ArchitectureSection />
      <InstallationSection />
      <WikiSection />
      <Footer />
    </div>
  );
}

export default App;
