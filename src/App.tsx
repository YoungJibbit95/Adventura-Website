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
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Spielprinzip', href: '#spielprinzip' },
  { label: 'Architektur', href: '#architektur' },
  { label: 'Installation', href: '#installation' },
  { label: 'Wiki', href: '#wiki' },
];

const gameAssetBase = 'https://raw.githubusercontent.com/YoungJibbit95/AdventureCraft/main/client/src/main/resources/assets/game';
const siteBase = import.meta.env.BASE_URL;
const wikiIndexHref = `${siteBase}wiki/index.html`;
const wikiHref = (page: string) => `${siteBase}wiki/${page}`;

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-voxel-bg/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-4'}`}>
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
            <a key={item.href} href={item.href} className="hover:text-emerald-400 transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/YoungJibbit95/AdventureCraft" target="_blank" rel="noreferrer" className="hidden sm:block text-slate-400 hover:text-white transition-colors" aria-label="Adventura auf GitHub">
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
    { label: 'Runtime', value: 'Java 21 + LWJGL' },
    { label: 'Server', value: 'Authoritative 20 TPS' },
    { label: 'World', value: 'Seed-based Overworld' },
    { label: 'Modes', value: 'Survival / Creative / Spectator' },
  ];

  const commands = [
    './gradlew buildGame',
    './gradlew runLauncher',
    './gradlew runSingleplayer',
    './gradlew runServer && ./gradlew joinLocal',
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

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <img src={`${gameAssetBase}/generated_blocks_sheet.png`} alt="Adventura block and item art preview" className="pixel-art h-40 w-full object-cover opacity-80" />
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
            <span className="relative z-10 uppercase">Game Info / Architecture / Installation</span>
          </div>

          <h1 className="font-pixel text-5xl md:text-7xl leading-[1.05] mb-8">
            <span className="block text-white glow-text-emerald mix-blend-screen opacity-95 pb-2">ADVENTURA</span>
            <span className="relative inline-block">
              <span className="absolute -inset-4 bg-emerald-500/15 blur-2xl rounded-lg"></span>
              <span className="relative text-emerald-400">SURVIVAL WIKI</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-sans font-light border-l-2 border-white/10 pl-6">
            Zentrale Website für das Voxel-Survival-Projekt: was man im Spiel macht, wie die Client/Server-Architektur aufgebaut ist und wie man den aktuellen Prototyp lokal startet.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-20">
            <a href="#spielprinzip" className="w-full sm:w-auto relative group overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="relative px-8 py-5 flex items-center justify-center gap-4 text-white font-pixel text-sm uppercase drop-shadow-md">
                <Gamepad2 className="w-5 h-5" />
                Spielprinzip
              </div>
            </a>
            <a href="#installation" className="w-full sm:w-auto px-8 py-5 rounded-lg glass-panel hover:bg-white/5 transition-colors text-white font-pixel text-sm uppercase flex items-center justify-center gap-3">
              <Rocket className="w-4 h-4 text-emerald-400" />
              Installation
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
      desc: 'Crafting, Hotbar, Item-Sprites und Tool-Durability sind vorbereitet, damit aus Ressourcen Werkzeuge und kleine Basen werden.',
    },
    {
      icon: <Heart className="w-7 h-7 text-red-300" />,
      title: 'Überleben',
      desc: 'Health, Hunger, Stamina, Armor, Breath, Fall Damage, Wasserbewegung und Regeneration bilden die Grundlage für Survival-Regeln.',
    },
  ];

  const worldItems = [
    { icon: <TreePine className="w-5 h-5 text-emerald-300" />, label: 'Biome', value: 'Meadows, Flower Fields, Pine Forests, Mushroom Groves, Dunes, Highlands, Frost Peaks, Mires' },
    { icon: <House className="w-5 h-5 text-lime-300" />, label: 'Strukturen', value: 'Campsites, Watchtowers, Häuser, Desert Wells, alte Ruinen, kompakte Dörfer mit Marktstand' },
    { icon: <Pickaxe className="w-5 h-5 text-orange-300" />, label: 'Ressourcen', value: 'Stone, Dirt, Wood, Coal, Iron, Copper, Berries, Mushrooms, Herbs und weitere Cozy-Props' },
    { icon: <Sparkles className="w-5 h-5 text-sky-300" />, label: 'Rendering', value: 'Transparentes Wasser, Fog, Vertex AO, Soft Directional Shading, animierte Wasserflächen' },
  ];

  const controlItems = [
    { icon: <Keyboard className="w-5 h-5 text-emerald-300" />, keys: 'WASD / Space / Shift', label: 'Bewegen, springen, sprinten' },
    { icon: <MousePointer2 className="w-5 h-5 text-amber-300" />, keys: 'Mouse / Left / Right', label: 'Umschauen, abbauen, platzieren' },
    { icon: <Backpack className="w-5 h-5 text-sky-300" />, keys: 'E / 1-9 / O', label: 'Inventar, Hotbar, Settings' },
    { icon: <MessageCircle className="w-5 h-5 text-violet-300" />, keys: 'T / / / F3 / F4', label: 'Chat, Commands, Debug, Gamemode' },
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

function ArchitectureSection() {
  const modules = [
    { name: 'common', desc: 'Registries, Blöcke, Items, Crafting, World-/Chunk-Daten, Packets, Worldgen, Lighting und Entity Snapshots.' },
    { name: 'server', desc: 'Autoritativer Tick Loop, Netty Transport, Auth Hook, World Streaming, Inventory Validation und akzeptierte World Edits.' },
    { name: 'client', desc: 'LWJGL Window, Renderer, Camera, HUD, Inventory, Chat, Settings, Chunk Meshes, Entity Rendering und Sprite-Pass.' },
    { name: 'launcher', desc: 'Swing Entry Point für Singleplayer, lokalen Server und Multiplayer-Join mit Seed, Host, Port und Renderwerten.' },
    { name: 'tools', desc: 'Utility-Modul für Daten- und Asset-Pack-Aufgaben.' },
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
          Die Codebasis ist kein reiner Singleplayer-Prototyp. Sie trennt geteilte Datenmodelle, autoritative Serverlogik, Client-Rendering, Launcher und Tools in eigene Gradle-Module.
        </SectionHeader>

        <div className="doc-panel rounded-lg p-6 mb-8">
          <div className="architecture-flow">
            <div className="flow-node">
              <span className="flow-icon"><Play className="w-6 h-6" /></span>
              <strong>Launcher</strong>
              <small>Seed, Host, Port, Username</small>
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

function InstallationSection() {
  const commandCards = [
    {
      icon: <Hammer className="w-6 h-6 text-emerald-300" />,
      title: 'Build',
      desc: 'Kompiliert alle Module und prüft den aktuellen Stand.',
      command: './gradlew buildGame',
    },
    {
      icon: <Rocket className="w-6 h-6 text-amber-300" />,
      title: 'Launcher',
      desc: 'Startet die Swing-Oberfläche mit Seed, Render Distance, Preview Radius, Host, Port und Username.',
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
    { flag: '--connect HOST --port PORT', desc: 'Serverziel für Join Server.' },
    { flag: '--auto-singleplayer', desc: 'Main Menu überspringen und direkt offline starten.' },
    { flag: '--auto-join', desc: 'Main Menu überspringen und direkt zum konfigurierten Server verbinden.' },
  ];

  return (
    <section id="installation" className="py-32 relative overflow-hidden cosmic-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Installation" title="Lokal starten" icon={<Rocket className="w-4 h-4" />}>
          Für den aktuellen Prototyp brauchst du JDK 21 und den Gradle Wrapper im `Game`-Projekt. Die Website dokumentiert die wichtigsten Startwege, das Wiki sammelt die längeren Details.
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
                <code className="code-chip block rounded-lg px-4 py-3 text-sm text-emerald-200 whitespace-pre-wrap overflow-x-auto">{card.command}</code>
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
    { icon: <Cpu className="w-6 h-6 text-sky-300" />, title: 'Architektur', href: wikiHref('architecture.html'), desc: 'Module, Runtime Shape, Tick Model, Networking, Rendering und Streaming.' },
    { icon: <Rocket className="w-6 h-6 text-amber-300" />, title: 'Installation', href: wikiHref('installation.html'), desc: 'Voraussetzungen, Gradle-Kommandos, Client Args und Troubleshooting.' },
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
            <a href="https://github.com/YoungJibbit95/AdventureCraft" target="_blank" rel="noreferrer" className="px-6 py-4 rounded-lg border border-white/10 text-white font-pixel text-sm uppercase inline-flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-pixel text-slate-400 uppercase pt-8 mt-10 border-t border-white/5">
          <div className="flex items-center gap-3">
            <VoxelBlock color="bg-slate-600" className="scale-[0.5]" />
            &copy; {new Date().getFullYear()} Adventura Prototype.
          </div>
          <div className="flex gap-8">
            <a href="#spielprinzip" className="hover:text-emerald-400 transition-colors">Spielprinzip</a>
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
      <GameplaySection />
      <ArchitectureSection />
      <InstallationSection />
      <WikiSection />
      <Footer />
    </div>
  );
}

export default App;
