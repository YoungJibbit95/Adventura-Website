const wikiEntries = [
  { title: 'Wiki Start', href: './index.html', text: 'Übersicht, Kennzahlen, Spielprinzip, Content, Systeme, Code Map, Installation und Controls.' },
  { title: 'Spielprinzip', href: './gameplay.html', text: 'Core Loop, Explore Gather Craft Survive, Survival HUD, Biome, Strukturen und Game Style.' },
  { title: 'Content-Katalog', href: './content.html', text: '42 Blocks, 69 Items, 31 Recipes, 12 Biomes, Food-Werte, Tools, Lichtquellen und Decor.' },
  { title: 'Game-Systeme', href: './systems.html', text: 'Survival Status, Inventory, Hotbar, Crafting, Campfire Flow, Rendering und Server Authority.' },
  { title: 'Code Map', href: './code-map.html', text: 'Module, wichtige Java-Dateien, Packet-Liste, Server-validierter Gameplay-Fluss.' },
  { title: 'Architektur', href: './architecture.html', text: 'Client Server, Module, Runtime Shape, Tick Model, Chunk Model, Rendering und Intent Flow.' },
  { title: 'Installation', href: './installation.html', text: 'JDK 21, Gradle, buildGame, runLauncher, runSingleplayer, runServer, joinLocal und Client Args.' },
  { title: 'Controls', href: './controls.html', text: 'WASD, E, O, F1, F3, F4, Chat Commands, Settings, Quality Toggles und Debug.' },
];

const searchInput = document.querySelector('[data-wiki-search]');
const searchResults = document.querySelector('[data-wiki-results]');

function renderResults(query) {
  if (!searchInput || !searchResults) {
    return;
  }

  const normalized = query.trim().toLowerCase();
  searchResults.replaceChildren();

  if (!normalized) {
    searchResults.hidden = true;
    return;
  }

  const matches = wikiEntries
    .filter((entry) => `${entry.title} ${entry.text}`.toLowerCase().includes(normalized))
    .slice(0, 6);

  if (matches.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'wiki-search-empty';
    empty.textContent = 'Keine Treffer. Versuch z.B. blocks, campfire, start oder server.';
    searchResults.append(empty);
    searchResults.hidden = false;
    return;
  }

  for (const match of matches) {
    const link = document.createElement('a');
    link.href = match.href;

    const title = document.createElement('strong');
    title.textContent = match.title;

    const text = document.createElement('span');
    text.textContent = match.text;

    link.append(title, text);
    searchResults.append(link);
  }

  searchResults.hidden = false;
}

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (event) => {
    renderResults(event.target.value);
  });

  searchInput.addEventListener('focus', () => {
    renderResults(searchInput.value);
  });

  document.addEventListener('keydown', (event) => {
    const active = document.activeElement;
    const typing = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;

    if (event.key === '/' && !typing) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.key === 'Escape') {
      searchResults.hidden = true;
      searchInput.blur();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && !event.target.closest('.wiki-search')) {
      searchResults.hidden = true;
    }
  });
}
