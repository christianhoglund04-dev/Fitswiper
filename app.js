const money = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

const outfits = [
  {
    id: "garage-street",
    title: "Garage street",
    creator: "Test",
    handle: "@test.fit",
    city: "Upload",
    image: "assets/outfit-04.png",
    tags: ["streetwear", "monochrome", "cargo", "baggy fit"],
    items: [
      { name: "Oversized skinnjacka", brand: "Zara", price: 899, url: "https://www.zara.com/" },
      { name: "Printed crop top", brand: "Weekday", price: 249, url: "https://www.weekday.com/" },
      { name: "Wide cargo pants", brand: "H&M", price: 399, url: "https://www2.hm.com/" },
      { name: "Svart handväska", brand: "Mango", price: 599, url: "https://shop.mango.com/" },
    ],
  },
  {
    id: "stone-column",
    title: "Stone column",
    creator: "Test",
    handle: "@test.clean",
    city: "Upload",
    image: "assets/outfit-02.png",
    tags: ["clean girl", "quiet luxury", "minimal", "going out"],
    items: [
      { name: "Svart halterneck", brand: "COS", price: 590, url: "https://www.cos.com/" },
      { name: "Vita vida byxor", brand: "ARKET", price: 990, url: "https://www.arket.com/" },
      { name: "Smala solglasögon", brand: "Other Stories", price: 320, url: "https://www.stories.com/" },
      { name: "Svarta sandaler", brand: "Vagabond", price: 999, url: "https://www.vagabond.com/" },
    ],
  },
  {
    id: "city-tailoring",
    title: "City tailoring",
    creator: "Test",
    handle: "@test.tailored",
    city: "Upload",
    image: "assets/outfit-03.png",
    tags: ["office core", "tailored", "denim", "capsule"],
    items: [
      { name: "Svart kavaj", brand: "Filippa K", price: 3200, url: "https://www.filippa-k.com/" },
      { name: "Vit skjorta", brand: "Uniqlo", price: 399, url: "https://www.uniqlo.com/" },
      { name: "Straight jeans", brand: "Levi's", price: 1199, url: "https://www.levi.com/" },
      { name: "Vita pumps", brand: "Aeyde", price: 2400, url: "https://www.aeyde.com/" },
    ],
  },
  {
    id: "metro-denim",
    title: "Metro denim",
    creator: "Mira",
    handle: "@mira.wear",
    city: "Stockholm",
    image: "assets/outfit-01.png",
    tags: ["streetwear", "denim", "pop color", "everyday"],
    items: [
      { name: "Boxy jeansjacka", brand: "ARKET", price: 1290, url: "https://www.arket.com/" },
      { name: "Ribbad topp", brand: "COS", price: 590, url: "https://www.cos.com/" },
      { name: "Låga sneakers", brand: "Veja", price: 1499, url: "https://www.veja-store.com/" },
    ],
  },
  {
    id: "soft-cargo",
    title: "Soft cargo",
    creator: "Sam",
    handle: "@sam.layers",
    city: "Göteborg",
    image: "assets/outfit-02.png",
    tags: ["gorpcore", "utility", "weekend", "budget"],
    items: [
      { name: "Kort tech-jacka", brand: "Uniqlo", price: 799, url: "https://www.uniqlo.com/" },
      { name: "Cargo-byxa", brand: "Weekday", price: 699, url: "https://www.weekday.com/" },
      { name: "Mesh cap", brand: "No link", price: 249, url: "" },
    ],
  },
  {
    id: "gallery-night",
    title: "Gallery night",
    creator: "Noor",
    handle: "@noor.edit",
    city: "Malmö",
    image: "assets/outfit-03.png",
    tags: ["going out", "minimal", "satin", "elevated basic"],
    items: [
      { name: "Rak kavaj", brand: "Filippa K", price: 3200, url: "https://www.filippa-k.com/" },
      { name: "Satin kjol", brand: "A Day's March", price: 1400, url: "https://www.adaysmarch.com/" },
      { name: "Läderboots", brand: "Vagabond", price: 1599, url: "https://www.vagabond.com/" },
    ],
  },
];

const filterOptions = {
  all: { label: "Alla", test: () => true },
  budget: { label: "Budget", test: (outfit) => totalFor(outfit) <= 2500 || outfit.tags.includes("budget") },
  street: { label: "Street", test: (outfit) => outfit.tags.includes("streetwear") || outfit.tags.includes("utility") },
  evening: { label: "Going out", test: (outfit) => outfit.tags.includes("going out") || outfit.tags.includes("satin") },
  everyday: { label: "Everyday", test: (outfit) => outfit.tags.includes("everyday") || outfit.tags.includes("weekend") },
  clean: { label: "Clean", test: (outfit) => outfit.tags.includes("clean girl") || outfit.tags.includes("quiet luxury") },
  tailored: { label: "Tailored", test: (outfit) => outfit.tags.includes("office core") || outfit.tags.includes("tailored") },
};

const categoryOptions = {
  everyday: { label: "Everyday", tag: "everyday" },
  street: { label: "Street", tag: "streetwear" },
  evening: { label: "Going out", tag: "going out" },
  minimal: { label: "Minimal", tag: "minimal" },
  utility: { label: "Utility", tag: "utility" },
  clean: { label: "Clean", tag: "clean girl" },
  tailored: { label: "Tailored", tag: "tailored" },
};

const styleProfiles = {
  clean: {
    label: "Clean & polished",
    tags: ["clean girl", "quiet luxury", "capsule"],
  },
  street: {
    label: "Streetwear",
    tags: ["streetwear", "baggy fit", "pop color"],
  },
  tailored: {
    label: "Tailored city",
    tags: ["office core", "tailored", "denim"],
  },
  expressive: {
    label: "Expressive",
    tags: ["going out", "pop color", "satin"],
  },
  utility: {
    label: "Utility",
    tags: ["gorpcore", "utility", "weekend"],
  },
};

const state = {
  index: 0,
  filter: "all",
  activeView: "feed",
  liked: [],
  dismissed: [],
  history: [],
  activeSheetId: null,
  toastTimer: null,
  swipeLocked: false,
  suppressDetailClick: false,
  uploadItemCount: 0,
  uploadStep: 0,
  isAuthenticated: false,
  authProvider: "",
  profileName: "Din fit",
  profileCity: "Stockholm",
  profilePhoto: "",
  styleProfile: "clean",
  likedExpanded: false,
  shopListExpanded: false,
  shoppingItems: [],
  expandedShopGroups: {},
  collections: [
    { id: "all", name: "Alla" },
    { id: "wishlist", name: "Wishlist" },
    { id: "budget", name: "Budget" },
  ],
  activeCollection: "all",
  itemCollections: {},
};

const deck = document.querySelector("#deck");
const onboardingView = document.querySelector("#onboardingView");
const continueWithApple = document.querySelector("#continueWithApple");
const continueWithGoogle = document.querySelector("#continueWithGoogle");
const continueAsGuest = document.querySelector("#continueAsGuest");
const feedLabel = document.querySelector("#feedLabel");
const tasteHeadline = document.querySelector("#tasteHeadline");
const tasteBudget = document.querySelector("#tasteBudget");
const likedList = document.querySelector("#likedList");
const likedCount = document.querySelector("#likedCount");
const likedTabBadge = document.querySelector("#likedTabBadge");
const shopList = document.querySelector("#shopList");
const shopTotal = document.querySelector("#shopTotal");
const shopTabBadge = document.querySelector("#shopTabBadge");
const collectionPanel = document.querySelector("#collectionPanel");
const collectionForm = document.querySelector("#collectionForm");
const detailSheet = document.querySelector("#detailSheet");
const sheetTitle = document.querySelector("#sheetTitle");
const sheetCreator = document.querySelector("#sheetCreator");
const sheetImage = document.querySelector("#sheetImage");
const sheetTotal = document.querySelector("#sheetTotal");
const sheetItems = document.querySelector("#sheetItems");
const uploadForm = document.querySelector("#uploadForm");
const outfitImageInput = document.querySelector("#outfitImageInput");
const uploadImagePreview = document.querySelector("#uploadImagePreview");
const imagePickerText = document.querySelector("#imagePickerText");
const uploadItems = document.querySelector("#uploadItems");
const addItemButton = document.querySelector("#addItemButton");
const uploadBackButton = document.querySelector("#uploadBackButton");
const uploadNextButton = document.querySelector("#uploadNextButton");
const uploadSubmitButton = document.querySelector("#uploadSubmitButton");
const profileForm = document.querySelector("#profileForm");
const profileAvatar = document.querySelector("#profileAvatar");
const profileCityLabel = document.querySelector("#profileCityLabel");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileNameInput = document.querySelector("#profileNameInput");
const profileCityInput = document.querySelector("#profileCityInput");
const profilePhotoInput = document.querySelector("#profilePhotoInput");
const profilePhotoPreview = document.querySelector("#profilePhotoPreview");
const profilePhotoText = document.querySelector("#profilePhotoText");
const profileTaste = document.querySelector("#profileTaste");
const profileSaved = document.querySelector("#profileSaved");
const profileLooks = document.querySelector("#profileLooks");
const profileSpend = document.querySelector("#profileSpend");
const profileBadges = document.querySelector("#profileBadges");
const profileLookGrid = document.querySelector("#profileLookGrid");
const logoutButton = document.querySelector("#logoutButton");
const toast = document.querySelector("#toast");

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function totalFor(outfit) {
  return outfit.items.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

function shopItemKey(outfitId, itemIndex) {
  return `${outfitId}::${itemIndex}`;
}

function avatarFor(name) {
  return name.trim().slice(0, 1).toUpperCase();
}

function handleFor(name) {
  const handle = name
    .trim()
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");

  return `@${handle || "din.fit"}`;
}

function avatarMarkup(name, className = "avatar", image = "") {
  if (image) {
    return `<span class="${className} image-avatar"><img src="${image}" alt="" /></span>`;
  }

  return `<span class="${className}">${avatarFor(name)}</span>`;
}

function byId(id) {
  return outfits.find((outfit) => outfit.id === id);
}

function likedOutfits() {
  return state.liked.map((id) => byId(id)).filter(Boolean);
}

function currentStyleProfile() {
  return styleProfiles[state.styleProfile] || styleProfiles.clean;
}

function topTagsFor(list, fallbackTags = currentStyleProfile().tags) {
  const tagCounts = list
    .flatMap((outfit) => outfit.tags)
    .reduce((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  return topTags.length ? topTags : fallbackTags;
}

function collectionName(id) {
  return state.collections.find((collection) => collection.id === id)?.name || "Wishlist";
}

function collectionFor(id) {
  return state.itemCollections[id] || "wishlist";
}

function shoppingEntries() {
  return state.shoppingItems
    .map((key) => {
      const [outfitId, itemIndexValue] = key.split("::");
      const outfit = byId(outfitId);
      const itemIndex = Number(itemIndexValue);
      const item = outfit?.items[itemIndex];

      if (!outfit || !item) return null;

      return { key, outfit, item, itemIndex };
    })
    .filter(Boolean);
}

function isShoppingItem(key) {
  return state.shoppingItems.includes(key);
}

function slugFor(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function activeFilter() {
  return filterOptions[state.filter] ? state.filter : "all";
}

function filteredOutfits() {
  const filter = filterOptions[activeFilter()];
  return outfits.filter(filter.test);
}

function currentOutfit() {
  const list = filteredOutfits();
  return list[state.index % list.length];
}

function linkedItemsFor(outfit) {
  return outfit.items.filter((item) => Boolean(item.url)).length;
}

function emptyState(title, text) {
  return `
    <div class="empty-state">
      <div class="empty-state-visual" aria-hidden="true">
        <svg><use href="#icon-spark"></use></svg>
      </div>
      <strong>${title}</strong>
      <span>${text}</span>
    </div>
  `;
}

function cardTemplate(outfit, position) {
  const isTop = position === 0;
  const linkedCount = linkedItemsFor(outfit);
  const linkLabel = linkedCount ? `${linkedCount} ${linkedCount === 1 ? "länk" : "länkar"}` : "inga länkar";

  return `
    <article class="outfit-card ${isTop ? "top" : ""}" data-id="${outfit.id}" data-detail="${outfit.id}" role="button" tabindex="${isTop ? "0" : "-1"}" aria-label="Visa plagg för ${outfit.title}" style="z-index: ${10 - position}">
      <div class="vote-badge pass">DISS</div>
      <div class="vote-badge like">HISS</div>
      <div class="outfit-media">
        <img src="${outfit.image}" alt="${outfit.title}" draggable="false" />
        <div class="creator-pill">
          ${avatarMarkup(outfit.creator, "avatar", outfit.avatar || "")}
          <span>${outfit.handle}</span>
        </div>
        <div class="tap-pill">Plagg</div>
      </div>
      <div class="outfit-info">
        <div>
          <p class="eyebrow">${outfit.creator} · ${outfit.city}</p>
          <h2>${outfit.title}</h2>
        </div>
      </div>
      <div class="meta-row" aria-label="Outfitdata">
        <span>${outfit.items.length} plagg</span>
        <span>${outfit.tags[0]}</span>
        <span>${linkLabel}</span>
      </div>
    </article>
  `;
}

function renderDeck() {
  const list = filteredOutfits();

  if (!list.length) {
    deck.innerHTML = emptyState("Inga outfits här", "Testa ett annat filter.");
    return;
  }

  const visible = [0, 1, 2].map((offset) => list[(state.index + offset) % list.length]);
  deck.innerHTML = visible.map(cardTemplate).join("");
  feedLabel.textContent = `${filterOptions[activeFilter()].label} · ${(state.index % list.length) + 1} av ${list.length}`;
  wireCardGestures();
}

function renderSwipeCounters() {
  const shopItems = shoppingEntries();
  const total = shopItems.reduce((sum, entry) => sum + Number(entry.item.price || 0), 0);

  likedCount.textContent = state.liked.length;
  likedTabBadge.textContent = state.liked.length;
  likedTabBadge.hidden = state.liked.length === 0;
  shopTotal.textContent = money.format(total);
  shopTabBadge.textContent = shopItems.length;
  shopTabBadge.hidden = shopItems.length === 0;
}

function removeSavedOutfit(id) {
  const outfit = byId(id);
  if (!outfit || !state.liked.includes(id)) return;

  state.liked = state.liked.filter((outfitId) => outfitId !== id);

  renderSwipeCounters();
  renderTaste();
  renderLiked();
  renderProfile();
  showToast("Tog bort från sparade");
}

function toggleShoppingItem(key) {
  const entry = shoppingEntries().find((item) => item.key === key);
  const [outfitId, itemIndexValue] = key.split("::");
  const outfit = entry?.outfit || byId(outfitId);
  const item = entry?.item || outfit?.items[Number(itemIndexValue)];

  if (!outfit || !item) return;

  if (isShoppingItem(key)) {
    state.shoppingItems = state.shoppingItems.filter((itemKey) => itemKey !== key);
    delete state.itemCollections[key];
    showToast("Tog bort plagg från köp");
  } else {
    state.shoppingItems.unshift(key);
    state.itemCollections[key] = state.itemCollections[key] || "wishlist";
    showToast("Plagg lagt i köp");
  }

  renderSwipeCounters();
  renderShop();
  renderProfile();

  if (state.activeSheetId) {
    openSheet(state.activeSheetId);
  }
}

function removeShoppingItem(key) {
  if (!isShoppingItem(key)) return;

  state.shoppingItems = state.shoppingItems.filter((itemKey) => itemKey !== key);
  delete state.itemCollections[key];
  renderSwipeCounters();
  renderShop();
  renderProfile();

  if (state.activeSheetId) {
    openSheet(state.activeSheetId);
  }

  showToast("Tog bort från köp");
}

function cleanupExitedCard(card) {
  let didCleanup = false;
  const cleanup = () => {
    if (didCleanup) return;
    didCleanup = true;
    card.removeEventListener("transitionend", onTransitionEnd);
    card.remove();
  };
  const onTransitionEnd = (event) => {
    if (event.propertyName !== "transform") return;
    window.clearTimeout(cleanupTimer);
    cleanup();
  };
  const cleanupTimer = window.setTimeout(cleanup, 340);

  card.addEventListener("transitionend", onTransitionEnd);
}

function promoteDeckAfterSwipe(exitingCard) {
  const list = filteredOutfits();

  if (!list.length) {
    renderDeck();
    return;
  }

  if (exitingCard?.isConnected) {
    exitingCard.classList.remove("top");
    exitingCard.tabIndex = -1;
    exitingCard.style.zIndex = 30;
  }

  let cards = [...deck.querySelectorAll(".outfit-card")];
  cards = cards.filter((card) => !card.classList.contains("is-exiting"));

  const neededCards = Math.min(3, Math.max(list.length, cards.length));
  const existingIds = new Set(cards.map((card) => card.dataset.id));

  for (let position = cards.length; position < neededCards && position < list.length; position += 1) {
    const outfit = list[(state.index + position) % list.length];
    if (!outfit || existingIds.has(outfit.id)) continue;
    deck.insertAdjacentHTML("beforeend", cardTemplate(outfit, position));
    existingIds.add(outfit.id);
  }

  if (exitingCard?.isConnected) {
    deck.appendChild(exitingCard);
    cleanupExitedCard(exitingCard);
  }

  cards = [...deck.querySelectorAll(".outfit-card")].filter((card) => !card.classList.contains("is-exiting"));
  cards.forEach((card, position) => {
    card.classList.remove("dragging", "is-exiting", "fly-right", "fly-left");
    card.classList.toggle("top", position === 0);
    card.tabIndex = position === 0 ? 0 : -1;
    card.style.zIndex = 10 - position;
    card.style.transition = "";
    card.style.transform = "";
    card.style.opacity = "";
  });

  feedLabel.textContent = `${filterOptions[activeFilter()].label} · ${(state.index % list.length) + 1} av ${list.length}`;
  wireCardGestures();
}

function renderTaste() {
  const liked = likedOutfits();
  const style = currentStyleProfile();

  if (!liked.length) {
    tasteHeadline.textContent = style.label;
    tasteBudget.textContent = "Snitt 0 kr";
    return;
  }

  const topTags = topTagsFor(liked).slice(0, 2);
  const average = liked.reduce((sum, outfit) => sum + totalFor(outfit), 0) / liked.length;

  tasteHeadline.textContent = `Du hissar ${topTags.join(" + ")}`;
  tasteBudget.textContent = `Snitt ${money.format(average)}`;
}

function renderFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter());
  });
}

function renderLiked() {
  likedCount.textContent = state.liked.length;
  likedTabBadge.textContent = state.liked.length;
  likedTabBadge.hidden = state.liked.length === 0;

  if (!state.liked.length) {
    likedList.innerHTML = emptyState("Inga hissade fits än", "Swipea fram looks du vill spara.");
    return;
  }

  const liked = likedOutfits();
  const visible = state.likedExpanded ? liked : liked.slice(0, 4);
  const hiddenCount = liked.length - visible.length;

  likedList.innerHTML = `
    <div class="list-insight">
      <div>
        <p class="eyebrow">Din sparade moodboard</p>
        <strong>${topTagsFor(liked).slice(0, 2).join(" + ")}</strong>
      </div>
      <span>${liked.length} fits</span>
    </div>
    ${visible
      .map(
        (outfit) => `
          <article class="liked-card compact-card">
            <img src="${outfit.image}" alt="${outfit.title}" data-detail="${outfit.id}" role="button" tabindex="0" />
            <div data-detail="${outfit.id}" role="button" tabindex="0" aria-label="Visa plagg för ${outfit.title}">
              <h3>${outfit.title}</h3>
              <p>${outfit.items.length} plagg · ${outfit.creator}</p>
              <div class="mini-tags">
                ${outfit.tags.slice(0, 2).map((tag) => `<span>${tag}</span>`).join("")}
              </div>
            </div>
            <div class="card-actions">
              <span class="tap-note">Mer</span>
              <button class="remove-chip" type="button" data-remove-saved="${outfit.id}" aria-label="Ta bort ${outfit.title} från sparade" title="Ta bort">
                <svg><use href="#icon-x"></use></svg>
              </button>
            </div>
          </article>
        `,
      )
      .join("")}
    ${
      hiddenCount > 0 || state.likedExpanded
        ? `<button class="show-more-button" type="button" data-expand-liked>
            ${state.likedExpanded ? "Visa mindre" : `Visa ${hiddenCount} till`}
          </button>`
        : ""
    }
  `;
}

function renderShop() {
  const entries = shoppingEntries();
  const total = entries.reduce((sum, entry) => sum + Number(entry.item.price || 0), 0);
  shopTotal.textContent = money.format(total);
  shopTabBadge.textContent = entries.length;
  shopTabBadge.hidden = entries.length === 0;

  if (!entries.length) {
    if (collectionPanel) collectionPanel.innerHTML = "";
    shopList.innerHTML = emptyState("Köplistan väntar", "Öppna en outfit och lägg till plaggen du vill köpa.");
    return;
  }

  if (!state.collections.some((collection) => collection.id === state.activeCollection)) {
    state.activeCollection = "all";
  }

  if (collectionPanel) {
    collectionPanel.innerHTML = `
      <div class="collection-strip" aria-label="Samlingar">
        ${state.collections
          .map(
            (collection) => `
              <button class="collection-chip ${collection.id === state.activeCollection ? "is-active" : ""}" type="button" data-collection-filter="${collection.id}">
                ${collection.name}
              </button>
            `,
          )
          .join("")}
      </div>
      <form class="collection-form" id="collectionForm">
        <input name="collectionName" type="text" maxlength="22" placeholder="Ny samling" aria-label="Ny samling" />
        <button class="small-button" type="submit">Skapa</button>
      </form>
    `;
  }

  const collectionFiltered =
    state.activeCollection === "all" ? entries : entries.filter((entry) => collectionFor(entry.key) === state.activeCollection);

  if (!collectionFiltered.length) {
    shopList.innerHTML = emptyState("Tom samling", "Byt samling på ett plagg så hamnar det här.");
    return;
  }

  const visibleItems = state.shopListExpanded ? collectionFiltered : collectionFiltered.slice(0, 5);
  const hiddenItems = collectionFiltered.length - visibleItems.length;
  const collectionOptions = state.collections.filter((collection) => collection.id !== "all");

  shopList.innerHTML = `
    <div class="list-insight">
      <div>
        <p class="eyebrow">Aktiv köplista</p>
        <strong>${entries.length} plagg</strong>
      </div>
      <span>${money.format(total)}</span>
    </div>
    ${visibleItems
      .map((entry) => {
        const link = entry.item.url
          ? `<a class="shop-link-button" href="${entry.item.url}" target="_blank" rel="noreferrer" title="Öppna länk" aria-label="Öppna länk">↗</a>`
          : `<span class="shop-link-button link-off" title="Ingen länk" aria-label="Ingen länk">−</span>`;

        return `
          <article class="shop-group shop-entry">
            <div class="shop-group-head">
              <img src="${entry.outfit.image}" alt="${entry.outfit.title}" data-detail="${entry.outfit.id}" role="button" tabindex="0" />
              <div data-detail="${entry.outfit.id}" role="button" tabindex="0">
                <h3>${entry.item.name}</h3>
                <p>${entry.outfit.title} · ${entry.item.brand}</p>
              </div>
              <div class="shop-group-actions">
                <strong>${money.format(Number(entry.item.price || 0))}</strong>
                <button class="remove-chip" type="button" data-remove-shop="${entry.key}" aria-label="Ta bort ${entry.item.name} från köp" title="Ta bort från köp">
                  <svg><use href="#icon-x"></use></svg>
                </button>
              </div>
            </div>
            <div class="shop-save-row">
              <span>Samling</span>
              <select class="collection-select" data-collection-select="${entry.key}" aria-label="Välj samling för ${entry.item.name}">
                ${collectionOptions
                  .map(
                    (collection) => `
                      <option value="${collection.id}" ${collectionFor(entry.key) === collection.id ? "selected" : ""}>${collection.name}</option>
                    `,
                  )
                  .join("")}
              </select>
              ${link}
            </div>
          </article>
        `;
      })
      .join("")}
    ${
      hiddenItems > 0 || state.shopListExpanded
        ? `<button class="show-more-button" type="button" data-expand-shop-list>
            ${state.shopListExpanded ? "Visa färre plagg" : `Visa ${hiddenItems} plagg till`}
          </button>`
        : ""
    }
  `;
}

function renderProfile() {
  const liked = likedOutfits();
  const total = shoppingEntries().reduce((sum, entry) => sum + Number(entry.item.price || 0), 0);
  const ownLooks = outfits.filter((outfit) => outfit.isOwn).length;
  const style = currentStyleProfile();
  const topTags = topTagsFor(liked, style.tags);
  const previewLooks = (liked.length ? liked : outfits).slice(0, 4);

  profileAvatar.textContent = avatarFor(state.profileName);
  profileAvatar.innerHTML = state.profilePhoto ? `<img src="${state.profilePhoto}" alt="" />` : avatarFor(state.profileName);
  profileAvatar.classList.toggle("image-avatar", Boolean(state.profilePhoto));
  profileCityLabel.textContent = state.profileCity;
  profileDisplayName.textContent = state.profileName;
  profileNameInput.value = state.profileName;
  profileCityInput.value = state.profileCity;
  document.querySelectorAll('input[name="styleProfile"]').forEach((input) => {
    input.checked = input.value === state.styleProfile;
  });
  profilePhotoPreview.innerHTML = state.profilePhoto ? `<img src="${state.profilePhoto}" alt="" />` : avatarFor(state.profileName);
  profilePhotoPreview.classList.toggle("image-avatar", Boolean(state.profilePhoto));
  profilePhotoText.textContent = state.profilePhoto ? "Byt profilbild" : "Välj profilbild";
  profileSaved.textContent = state.liked.length;
  profileLooks.textContent = ownLooks;
  profileSpend.textContent = money.format(total);
  profileBadges.innerHTML = topTags
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  profileLookGrid.innerHTML = previewLooks
    .map(
      (outfit) => `
        <button class="profile-look" type="button" data-detail="${outfit.id}" aria-label="Visa plagg för ${outfit.title}">
          <img src="${outfit.image}" alt="${outfit.title}" />
        </button>
      `,
    )
    .join("");

  profileTaste.textContent = liked.length ? topTags.slice(0, 2).join(" + ") : style.label;
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === state.activeView);
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === state.activeView);
  });
}

function renderHeader() {
  if (state.activeView === "feed") {
    feedLabel.hidden = true;
    feedLabel.textContent = "";
    return;
  }

  const labels = {
    liked: "Sparat",
    shop: "Köplista",
    profile: "Profil",
    upload: "Publicera",
  };

  feedLabel.hidden = false;
  feedLabel.textContent = labels[state.activeView] || "FitSwiper";
}

function renderAuthGates() {
  const shouldGate = !state.isAuthenticated;

  document.querySelectorAll("[data-auth-gate]").forEach((gate) => {
    gate.hidden = !shouldGate;
  });

  document.querySelectorAll("[data-auth-content]").forEach((content) => {
    content.hidden = shouldGate;
  });
}

function renderUploadStep() {
  const step = Math.max(0, Math.min(2, state.uploadStep));
  state.uploadStep = step;

  document.querySelectorAll("[data-upload-step-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", Number(panel.dataset.uploadStepPanel) === step);
  });

  document.querySelectorAll("[data-upload-step]").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.uploadStep) === step);
    button.classList.toggle("is-complete", Number(button.dataset.uploadStep) < step);
  });

  if (uploadBackButton) uploadBackButton.disabled = step === 0;
  if (uploadNextButton) uploadNextButton.hidden = step === 2;
  if (uploadSubmitButton) uploadSubmitButton.hidden = step !== 2;
}

function render() {
  renderTabs();
  renderFilters();
  renderTaste();
  renderDeck();
  renderLiked();
  renderShop();
  renderProfile();
  renderHeader();
  renderAuthGates();
  renderUploadStep();
}

function setView(view) {
  state.activeView = view;
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function signIn(provider = "Apple") {
  state.isAuthenticated = true;
  state.authProvider = provider;
  render();
  showToast(`Inloggad med ${provider}`);
}

function signOut() {
  state.isAuthenticated = false;
  state.authProvider = "";
  state.activeView = "feed";
  closeSheet();
  render();
  showToast("Du är utloggad");
}

function closeOnboarding(provider = "") {
  if (provider) {
    state.isAuthenticated = true;
    state.authProvider = provider;
  }

  renderAuthGates();
  onboardingView.classList.add("is-closing");
  onboardingView.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    onboardingView.hidden = true;
  }, 320);
}

function advanceDeck() {
  const list = filteredOutfits();
  state.index = list.length ? (state.index + 1) % list.length : 0;
}

const SWIPE_THRESHOLD = 74;
const SWIPE_FLICK_DISTANCE = 28;
const SWIPE_FLICK_VELOCITY = 0.42;

function cardDragFrame(dx, dy) {
  const easedY = dy * 0.42;
  const rotation = Math.max(-18, Math.min(18, dx / 13));
  const confidence = Math.min(1, Math.abs(dx) / 118);
  const scale = 1 + Math.min(0.018, Math.abs(dx) / 9000);

  return {
    confidence,
    transform: `translate3d(${dx}px, ${easedY}px, 0) rotate(${rotation}deg) scale(${scale})`,
  };
}

function animateCardExit(topCard, direction, release = {}) {
  const dx = Number(release.dx || 0);
  const dy = Number(release.dy || 0);
  const travel = Math.max(window.innerWidth * 1.28, topCard.offsetWidth * 1.5, 480);
  const exitX = direction === "like" ? travel : -travel;
  const exitY = Math.max(-96, Math.min(42, dy * 0.28 - 18));
  const exitRotation = direction === "like" ? 22 : -22;

  topCard.classList.remove("dragging");
  topCard.classList.add("is-exiting", direction === "like" ? "fly-right" : "fly-left");

  if (release.fromGesture) {
    topCard.style.transition = "none";
    topCard.style.transform = cardDragFrame(dx, dy).transform;
    topCard.getBoundingClientRect();
  }

  topCard.style.transition = "transform 260ms cubic-bezier(0.2, 0.85, 0.2, 1), opacity 170ms ease";
  topCard.style.transform = `translate3d(${exitX}px, ${exitY}px, 0) rotate(${exitRotation}deg) scale(0.98)`;
  topCard.style.opacity = "0";
}

function decide(direction, release = null) {
  if (state.swipeLocked) return;

  const outfit = currentOutfit();
  const topCard = deck.querySelector(".outfit-card.top");

  if (!outfit) return;

  state.history.push({ index: state.index, filter: state.filter, outfitId: outfit.id, direction });

  if (direction === "like" && !state.liked.includes(outfit.id)) {
    state.liked.unshift(outfit.id);
    showToast("Sparad till Gillade");
  }

  if (direction === "pass" && !state.dismissed.includes(outfit.id)) {
    state.dismissed.unshift(outfit.id);
  }

  if (topCard) {
    state.swipeLocked = true;
    renderSwipeCounters();
    renderTaste();
    animateCardExit(topCard, direction, release || {});
    advanceDeck();
    promoteDeckAfterSwipe(topCard);
    window.setTimeout(() => {
      state.swipeLocked = false;
    }, 90);
    return;
  }

  advanceDeck();
  renderDeck();
  renderSwipeCounters();
  renderTaste();
}

function undo() {
  const last = state.history.pop();
  if (!last) return;

  state.index = last.index;
  state.filter = last.filter;
  state.liked = state.liked.filter((id) => id !== last.outfitId);
  state.dismissed = state.dismissed.filter((id) => id !== last.outfitId);
  render();
}

function openSheet(id = currentOutfit()?.id) {
  const outfit = byId(id);
  if (!outfit) return;

  state.activeSheetId = id;
  sheetTitle.textContent = outfit.title;
  sheetCreator.textContent = `${outfit.creator} · ${outfit.city}`;
  sheetImage.src = outfit.image;
  sheetImage.alt = outfit.title;
  sheetTotal.textContent = money.format(totalFor(outfit));
  sheetItems.innerHTML = outfit.items
    .map((item, index) => {
      const key = shopItemKey(outfit.id, index);
      const inShop = isShoppingItem(key);
      const link = item.url
        ? `<a href="${item.url}" target="_blank" rel="noreferrer" title="Öppna länk" aria-label="Öppna länk">↗</a>`
        : `<span class="link-off" title="Ingen länk" aria-label="Ingen länk">−</span>`;

      return `
        <article class="item-row">
          <div>
            <strong>${item.name}</strong>
            <p>${item.brand}</p>
          </div>
          <span class="item-price">${money.format(Number(item.price || 0))}</span>
          <button class="shop-add-button ${inShop ? "is-added" : ""}" type="button" data-shop-item="${key}" aria-label="${inShop ? "Ta bort" : "Lägg till"} ${item.name} i köp">
            ${inShop ? "I köp" : "Lägg till"}
          </button>
          ${link}
        </article>
      `;
    })
    .join("");

  detailSheet.classList.add("is-open");
  detailSheet.setAttribute("aria-hidden", "false");
}

function closeSheet() {
  detailSheet.classList.remove("is-open");
  detailSheet.setAttribute("aria-hidden", "true");
  state.activeSheetId = null;
}

function wireCardGestures() {
  const topCard = deck.querySelector(".outfit-card.top");
  if (!topCard) return;
  const likeBadge = topCard.querySelector(".vote-badge.like");
  const passBadge = topCard.querySelector(".vote-badge.pass");

  const drag = {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    latestX: 0,
    latestY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
    raf: 0,
    moved: false,
  };

  const applyDrag = () => {
    drag.raf = 0;

    const dx = drag.latestX;
    const dy = drag.latestY;
    const frame = cardDragFrame(dx, dy);

    topCard.style.transform = frame.transform;
    likeBadge.style.opacity = dx > 0 ? frame.confidence : 0;
    passBadge.style.opacity = dx < 0 ? frame.confidence : 0;
  };

  const scheduleDrag = () => {
    if (!drag.raf) drag.raf = window.requestAnimationFrame(applyDrag);
  };

  const resetBadges = () => {
    likeBadge.style.opacity = 0;
    passBadge.style.opacity = 0;
  };

  topCard.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.latestX = 0;
    drag.latestY = 0;
    drag.lastX = 0;
    drag.lastTime = event.timeStamp || performance.now();
    drag.velocityX = 0;
    drag.moved = false;
    topCard.style.transition = "";
    topCard.style.opacity = "";
    topCard.setPointerCapture(event.pointerId);
    topCard.classList.add("dragging");
    resetBadges();
  });

  topCard.addEventListener("pointermove", (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    event.preventDefault();

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const now = event.timeStamp || performance.now();
    const dt = Math.max(1, now - drag.lastTime);

    drag.velocityX = (dx - drag.lastX) / dt;
    drag.latestX = dx;
    drag.latestY = dy;
    drag.lastX = dx;
    drag.lastTime = now;

    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      drag.moved = true;
    }

    scheduleDrag();
  });

  const finishDrag = () => {
    const dx = drag.latestX;
    const dy = drag.latestY;
    const moved = drag.moved;

    try {
      if (topCard.hasPointerCapture?.(drag.pointerId)) {
        topCard.releasePointerCapture(drag.pointerId);
      }
    } catch (error) {
      // Pointer capture can already be released by the browser on some touch endings.
    }

    drag.active = false;

    if (drag.raf) {
      window.cancelAnimationFrame(drag.raf);
      drag.raf = 0;
      applyDrag();
    }

    if (moved) {
      state.suppressDetailClick = true;
      window.setTimeout(() => {
        state.suppressDetailClick = false;
      }, 0);
    }

    const isLike = dx > SWIPE_THRESHOLD || (dx > SWIPE_FLICK_DISTANCE && drag.velocityX > SWIPE_FLICK_VELOCITY);
    const isPass = dx < -SWIPE_THRESHOLD || (dx < -SWIPE_FLICK_DISTANCE && drag.velocityX < -SWIPE_FLICK_VELOCITY);

    if (isLike) {
      likeBadge.style.opacity = 1;
      passBadge.style.opacity = 0;
      decide("like", { dx, dy, fromGesture: true });
      return;
    }

    if (isPass) {
      likeBadge.style.opacity = 0;
      passBadge.style.opacity = 1;
      decide("pass", { dx, dy, fromGesture: true });
      return;
    }

    topCard.classList.remove("dragging");
    topCard.style.transform = "";
    resetBadges();
  };

  topCard.addEventListener("pointerup", (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    finishDrag();
  });

  topCard.addEventListener("pointercancel", (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    finishDrag();
  });
}

function uploadItemTemplate(number) {
  const removable = number > 1;

  return `
    <fieldset class="upload-item" data-upload-row>
      <div class="upload-item-head">
        <strong>Plagg ${number}</strong>
        ${
          removable
            ? `<button class="remove-item-button" type="button" data-remove-item title="Ta bort plagg" aria-label="Ta bort plagg">×</button>`
            : ""
        }
      </div>
      <label>
        Namn på plagg
        <input name="itemName" type="text" placeholder="Ex. Boxy jacka" maxlength="42" required />
      </label>
      <label>
        Pris för plagget
        <input name="itemPrice" type="number" min="0" step="10" placeholder="899" required />
      </label>
      <label>
        Länk till plagget
        <input name="itemUrl" type="url" placeholder="https://..." />
      </label>
    </fieldset>
  `;
}

function addUploadItem() {
  state.uploadItemCount += 1;
  uploadItems.insertAdjacentHTML("beforeend", uploadItemTemplate(state.uploadItemCount));
}

function resetUploadItems() {
  uploadItems.innerHTML = "";
  state.uploadItemCount = 0;
  addUploadItem();
}

function resetUploadImage() {
  uploadImagePreview.hidden = true;
  uploadImagePreview.src = "assets/outfit-04.png";
  imagePickerText.textContent = "Välj outfitbild";
}

function validateUploadStep(step = state.uploadStep) {
  const form = new FormData(uploadForm);

  if (step === 0) {
    const title = String(form.get("title") || "").trim();
    const category = String(form.get("category") || "");

    if (!title) {
      showToast("Ge outfiten ett namn");
      uploadForm.elements.title?.focus();
      return false;
    }

    if (!category) {
      showToast("Välj en kategori");
      return false;
    }
  }

  if (step === 1) {
    const [imageFile] = outfitImageInput.files || [];

    if (!imageFile) {
      showToast("Lägg till en bild");
      return false;
    }
  }

  return true;
}

function renumberUploadRows() {
  const rows = [...uploadItems.querySelectorAll("[data-upload-row]")];

  rows.forEach((row, index) => {
    row.querySelector(".upload-item-head strong").textContent = `Plagg ${index + 1}`;
    const removeButton = row.querySelector("[data-remove-item]");

    if (index === 0 && removeButton) {
      removeButton.remove();
    }
  });
}

function collectUploadItems(form) {
  const names = form.getAll("itemName").map((value) => String(value || "").trim());
  const prices = form.getAll("itemPrice").map((value) => Number(value || 0));
  const urls = form.getAll("itemUrl").map((value) => String(value || "").trim());

  return names
    .map((name, index) => ({
      name,
      brand: "Eget val",
      price: prices[index],
      url: urls[index] || "",
    }))
    .filter((item) => item.name && Number.isFinite(item.price));
}

document.querySelector("#passButton").addEventListener("click", () => decide("pass"));
document.querySelector("#likeButton").addEventListener("click", () => decide("like"));
document.querySelector("#undoButton").addEventListener("click", undo);
document.querySelector("#closeSheet").addEventListener("click", closeSheet);
document.querySelector("#sheetBackdrop").addEventListener("click", closeSheet);
addItemButton.addEventListener("click", addUploadItem);
uploadBackButton?.addEventListener("click", () => {
  state.uploadStep = Math.max(0, state.uploadStep - 1);
  renderUploadStep();
});
uploadNextButton?.addEventListener("click", () => {
  if (!validateUploadStep()) return;
  state.uploadStep = Math.min(2, state.uploadStep + 1);
  renderUploadStep();
});
logoutButton?.addEventListener("click", signOut);
continueWithApple.addEventListener("click", () => closeOnboarding("Apple"));
continueWithGoogle.addEventListener("click", () => closeOnboarding("Google"));
continueAsGuest.addEventListener("click", () => closeOnboarding());

profilePhotoInput.addEventListener("change", async () => {
  const [file] = profilePhotoInput.files || [];

  if (!file) return;

  try {
    state.profilePhoto = await fileToDataUrl(file);
    renderProfile();
    showToast("Profilbild vald");
  } catch {
    showToast("Kunde inte läsa profilbilden");
  }
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(profileForm);
  const name = String(form.get("profileName") || "").trim();
  const city = String(form.get("profileCity") || "").trim();
  const styleProfile = String(form.get("styleProfile") || state.styleProfile);

  if (!name || !city) {
    showToast("Fyll i namn och stad");
    return;
  }

  state.profileName = name;
  state.profileCity = city;
  state.styleProfile = styleProfiles[styleProfile] ? styleProfile : state.styleProfile;
  outfits
    .filter((outfit) => outfit.isOwn)
    .forEach((outfit) => {
      outfit.creator = state.profileName;
      outfit.handle = handleFor(state.profileName);
      outfit.city = state.profileCity;
      outfit.avatar = state.profilePhoto;
    });

  render();
  showToast("Profil sparad");
});

outfitImageInput.addEventListener("change", () => {
  const [file] = outfitImageInput.files || [];

  if (!file) {
    resetUploadImage();
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  uploadImagePreview.src = previewUrl;
  uploadImagePreview.hidden = false;
  imagePickerText.textContent = file.name;
  uploadImagePreview.addEventListener(
    "load",
    () => {
      URL.revokeObjectURL(previewUrl);
    },
    { once: true },
  );
});

document.addEventListener("click", (event) => {
  const detailTrigger = event.target.closest("[data-detail]");
  const tabTrigger = event.target.closest("[data-tab]");
  const filterTrigger = event.target.closest("[data-filter]");
  const removeItemTrigger = event.target.closest("[data-remove-item]");
  const loginTrigger = event.target.closest("[data-login-action]");
  const uploadStepTrigger = event.target.closest("[data-upload-step]");
  const expandLikedTrigger = event.target.closest("[data-expand-liked]");
  const removeSavedTrigger = event.target.closest("[data-remove-saved]");
  const removeShopTrigger = event.target.closest("[data-remove-shop]");
  const shopItemTrigger = event.target.closest("[data-shop-item]");
  const collectionFilterTrigger = event.target.closest("[data-collection-filter]");
  const toggleShopGroupTrigger = event.target.closest("[data-toggle-shop-group]");
  const expandShopListTrigger = event.target.closest("[data-expand-shop-list]");

  if (loginTrigger) {
    signIn(loginTrigger.dataset.provider || "Apple");
    return;
  }

  if (uploadStepTrigger) {
    const requestedStep = Number(uploadStepTrigger.dataset.uploadStep);
    const nextStep = requestedStep > state.uploadStep ? Math.min(requestedStep, state.uploadStep + 1) : requestedStep;

    if (nextStep > state.uploadStep && !validateUploadStep()) return;

    state.uploadStep = nextStep;
    renderUploadStep();
    return;
  }

  if (expandLikedTrigger) {
    state.likedExpanded = !state.likedExpanded;
    renderLiked();
    return;
  }

  if (removeSavedTrigger) {
    removeSavedOutfit(removeSavedTrigger.dataset.removeSaved);
    return;
  }

  if (removeShopTrigger) {
    removeShoppingItem(removeShopTrigger.dataset.removeShop);
    return;
  }

  if (shopItemTrigger) {
    toggleShoppingItem(shopItemTrigger.dataset.shopItem);
    return;
  }

  if (collectionFilterTrigger) {
    state.activeCollection = collectionFilterTrigger.dataset.collectionFilter;
    state.shopListExpanded = false;
    renderShop();
    return;
  }

  if (toggleShopGroupTrigger) {
    const id = toggleShopGroupTrigger.dataset.toggleShopGroup;
    state.expandedShopGroups[id] = !state.expandedShopGroups[id];
    renderShop();
    return;
  }

  if (expandShopListTrigger) {
    state.shopListExpanded = !state.shopListExpanded;
    renderShop();
    return;
  }

  if (removeItemTrigger) {
    removeItemTrigger.closest("[data-upload-row]")?.remove();
    if (!uploadItems.querySelector("[data-upload-row]")) addUploadItem();
    renumberUploadRows();
    return;
  }

  if (filterTrigger) {
    state.filter = filterTrigger.dataset.filter;
    state.index = 0;
    render();
    return;
  }

  if (detailTrigger) {
    if (state.suppressDetailClick) {
      state.suppressDetailClick = false;
      return;
    }

    openSheet(detailTrigger.dataset.detail);
  }

  if (tabTrigger) {
    setView(tabTrigger.dataset.tab);
  }
});

document.addEventListener("change", (event) => {
  const collectionSelect = event.target.closest("[data-collection-select]");
  const styleInput = event.target.closest('input[name="styleProfile"]');

  if (collectionSelect) {
    state.itemCollections[collectionSelect.dataset.collectionSelect] = collectionSelect.value;
    renderShop();
    showToast(`Sparad i ${collectionName(collectionSelect.value)}`);
    return;
  }

  if (styleInput && styleProfiles[styleInput.value]) {
    state.styleProfile = styleInput.value;
    renderTaste();
    renderProfile();
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("#collectionForm");

  if (!form) return;

  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("collectionName") || "").trim();

  if (!name) {
    showToast("Skriv ett samlingsnamn");
    return;
  }

  const baseId = slugFor(name) || "samling";
  let id = baseId;
  let suffix = 2;

  while (state.collections.some((collection) => collection.id === id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  state.collections.push({ id, name });
  state.activeCollection = id;
  state.shopListExpanded = true;
  renderShop();
  showToast("Samling skapad");
});

document.addEventListener("keydown", (event) => {
  const detailTrigger = event.target.closest?.("[data-detail]");

  if (detailTrigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openSheet(detailTrigger.dataset.detail);
    return;
  }

  if (event.key === "ArrowLeft") decide("pass");
  if (event.key === "ArrowRight") decide("like");
  if (event.key === "Escape") closeSheet();
});

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!state.isAuthenticated) {
    showToast("Logga in för att lägga upp");
    setView("upload");
    return;
  }

  if (!validateUploadStep(0) || !validateUploadStep(1)) {
    return;
  }

  if (!uploadForm.reportValidity()) {
    return;
  }

  const form = new FormData(uploadForm);
  const title = String(form.get("title") || "").trim();
  const category = categoryOptions[String(form.get("category") || "")];
  const items = collectUploadItems(form);
  const hasLinks = items.some((item) => item.url);
  const [imageFile] = outfitImageInput.files || [];

  if (!items.length) {
    showToast("Lägg till minst ett plagg");
    return;
  }

  if (!imageFile) {
    showToast("Lägg till en bild");
    return;
  }

  if (!category) {
    showToast("Välj kategori");
    return;
  }

  let image;

  try {
    image = await fileToDataUrl(imageFile);
  } catch {
    showToast("Kunde inte läsa bilden");
    return;
  }

  const customOutfit = {
    id: `custom-${Date.now()}`,
    title,
    creator: state.profileName,
    handle: handleFor(state.profileName),
    city: state.profileCity,
    image,
    avatar: state.profilePhoto,
    isOwn: true,
    tags: [
      category.tag,
      "ny",
      "egen",
      hasLinks ? "länkad" : "utan länk",
      totalFor({ items }) <= 2500 ? "budget" : "premium",
    ],
    items,
  };

  outfits.unshift(customOutfit);
  state.index = 0;
  state.filter = "all";
  uploadForm.reset();
  resetUploadImage();
  resetUploadItems();
  state.uploadStep = 0;
  showToast("Publicerad i flödet");
  setView("feed");
});

resetUploadItems();
render();
