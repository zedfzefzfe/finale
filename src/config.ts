// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Alaa Parfums de Luxe | Extrait de Parfum",
  description: "Découvrez l'art du parfum de luxe. Alaa Parfums de Luxe crée des extraits de parfum exquis en utilisant les meilleures ingrédients du monde. Expérimentez des scents qui définissent l'élégance et la sophistication.",
  language: "fr",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  logoImage: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Alaa Parfums de Luxe",
  logoImage: "/images/logo.png",
  menuLinks: [
    { label: "Parfums Féminins", href: "#products" },
    { label: "Parfums Masculins", href: "#packs" },
    { label: "Notre Histoire", href: "#notre-histoire" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Rechercher des parfums...",
  cartEmptyText: "Votre panier est vide",
  cartCheckoutText: "Procéder au paiement",
  continueShoppingText: "Continuer les achats",
  menuBackgroundImage: "/bottle-frames/frame_001.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "EXTRAIT DE PARFUM",
  title: "L'Art du\nParfum de Luxe",
  ctaPrimaryText: "Explorer la Collection",
  ctaPrimaryTarget: "#products",
  ctaSecondaryText: "Notre Histoire",
  ctaSecondaryTarget: "#notre-histoire",
  backgroundImage: "/images/hero.png",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "NOTRE PHILOSOPHIE",
  heading: "Créé avec Passion,\nPorté avec Distinction",
  bodyParagraphs: [
    "Chez Alaa Parfums de Luxe, nous croyons que le parfum est plus qu'une senteur - c'est une expression de l'identité, une signature qui persiste dans la mémoire longtemps après votre départ.",
    "Chacun de nos extraits de parfum est minutieusement créé en utilisant les ingrédients les plus précieux du monde, provenant des coins les plus éloignés du globe. Des oud les plus rares d'Asie du Sud-Est aux plus belles roses de Grasse, chaque élément est choisi selon les normes les plus exigeantes.",
    "Nos maîtres parfumeurs passent des années à perfectionner chaque composition, s'assurant que chaque goutte raconte une histoire d'élégance, de sophistication et de luxe intemporel."
  ],
  linkText: "Découvrir Notre Savoir-Faire",
  linkTarget: "#notre-histoire",
  image1: "/images/subhero-1.jpg",
  image2: "/images/subhero-2.jpg",
  stats: [
    { value: 25, suffix: "+", label: "Ans d'Excellence" },
    { value: 100, suffix: "%", label: "Ingrédients Naturels" },
    { value: 12, suffix: "", label: "Maîtres Parfumeurs" },
  ],
};



// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "LA COLLECTION",
  heading: "L'Art d'Être Femme",
  description: "Chaque flacon renferme une histoire — celle d'une femme libre, élégante et inoubliable. Des senteurs qui ne s'oublient pas.",
  viewAllText: "Explorer la Collection Féminine",
  addToCartText: "Ajouter au Panier",
  addedToCartText: "Ajouté au Panier",
  categories: ["Tous", "Oriental", "Floral", "Boisé", "Frais"],
  products: [
    {
      id: 1,
      name: "Kayali Marshmallow 16",
      price: 49,
      category: "Oriental",
      image: "/images/perfume_bottle_logo_sunlight.jpg.png",
      description: "Un nuage gourmand et enveloppant de marshmallow crémeux, de caramel doré et de vanille chaude. Doux, addictif et terriblement réconfortant — comme une étreinte sucrée sur la peau.",
      topNotes: ["Marshmallow", "Vanilla", "Caramel"],
      heartNotes: ["Musk"],
      baseNotes: [],
    },
    {
      id: 2,
      name: "Good Girl",
      price: 49,
      category: "Floral",
      image: "/images/perfume_bottle_with_logo_silk.jpg.png",
      description: "La dualité fascinante de la femme moderne. Des fleurs lumineuses de jasmin et de tubéreuse en surface, et un fond sombre de cacao et de café en dessous. Pour celle qui joue selon ses propres règles.",
      topNotes: ["Jasmine", "Tuberose", "Cocoa"],
      heartNotes: ["Coffee"],
      baseNotes: [],
    },
    {
      id: 3,
      name: "Baccarat Rouge 540",
      price: 49,
      category: "Oriental",
      image: "/images/perfume_bottle_with_logo_clean.jpg.png",
      description: "Le parfum le plus convoité au monde. Un sillage lumineux et aérien de safran et jasmin posé sur un fond de résine ambrée et de cèdre. Radieux comme de l'or filé sur la peau — l'élégance absolue.",
      topNotes: ["Saffron", "Jasmine", "Ambergris"],
      heartNotes: ["Cedar"],
      baseNotes: [],
    },
    {
      id: 4,
      name: "Escada Taj Sunset",
      price: 49,
      category: "Floral",
      image: "/images/perfume_bottle_with_logo_window.jpg.png",
      description: "Un voyage sensoriel au cœur des jardins indiens au coucher du soleil. Fruits tropicaux juteux, jasmin en fleur et rose, sur un fond chaud de santal et d'ambre. Exotique, vibrant et inoubliable.",
      topNotes: ["Peach", "Mango", "Jasmine"],
      heartNotes: ["Sandalwood"],
      baseNotes: [],
    },
    {
      id: 5,
      name: "Bombshell — Victoria's Secret",
      price: 49,
      category: "Frais",
      image: "/images/perfume_bottle_logo_replacement.jpg (1).png",
      description: "Pétillant, féminin et irrésistible. De la passion fruit violette sur un cœur de pivoine luxuriante et une base de vanille orchidée. La féminité confiante capturée en flacon.",
      topNotes: ["Passion Fruit", "Peony", "Vanilla Orchid"],
      heartNotes: [],
      baseNotes: [],
    },
    {
      id: 6,
      name: "Burberry Her + Musk",
      price: 49,
      category: "Frais",
      image: "/images/perfume_bottle_logo_replacement.jpg.png",
      description: "Le chic londonien sublimé. Le cassis et le jasmin signature de Burberry Her, amplifié par un musc sensuel qui colle à la peau comme un secret murmuré. Élégant, intime et distinctif.",
      topNotes: ["Blackcurrant", "Jasmine", "Musk"],
      heartNotes: ["Ambrette"],
      baseNotes: [],
    },
  ],
};


// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "LA COLLECTION",
  heading: "Là où la Tradition\nRencontre l'Innovation",
  bodyParagraphs: [
    "Notre collection représente l'apogée de l'art de la parfumerie. Chaque parfum est un extrait de parfum - la forme la plus concentrée et luxueuse de parfum, contenant jusqu'à 40% d'huiles de parfum pures.",
    "Cette concentration exceptionnelle garantit que nos senteurs évoluent magnifiquement tout au long de la journée, révélant de nouvelles couches de complexité à chaque heure qui passe. De la première pulvérisation au dernier murmure, vivez un voyage d'excellence olfactive."
  ],
  ctaText: "Voir Tous les Parfums",
  ctaTarget: "#products",
  backgroundImage: "/images/about-1.jpg",
};



// ─── Packs ───────────────────────────────────────────────────────────────────

export interface Pack {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  description?: string;
  includes: string[];
}

export interface PacksConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  packs: Pack[];
}

export const packsConfig: PacksConfig = {
  tag: "NOS COFFRETS",
  heading: "Le Prestige Masculin",
  description: "Des coffrets pensés pour l'homme de goût — offrez ce qu'il y a de plus rare, ce qu'il n'oubliera jamais.",
  viewAllText: "Découvrir les Parfums Masculins",
  addToCartText: "Ajouter au Panier",
  addedToCartText: "Ajouté au Panier",
  categories: ["Tous", "Oriental", "Frais"],
  packs: [
    {
      id: 101,
      name: "Ultra Male",
      price: 49,
      originalPrice: 69,
      category: "Oriental",
      image: "/images/Bottle Swap.png",
      description: "Une masculinité gourmande et sauvage à la fois. Une poire juteuse et une lavande fraîche en ouverture, suivies d'une vanille intense et d'un ambre chaud. Séduisant, audacieux et irrésistiblement doux — pour l'homme qui assume tout.",
      includes: ["Pear", "Lavender", "Vanilla", "Amber", "Patchouli"],
    },
    {
      id: 102,
      name: "One Million Elixir",
      price: 49,
      originalPrice: 69,
      category: "Oriental",
      image: "/images/par.png",
      description: "L'or liquide en version ultime. Une mandarine sanguine éclatante sur un cœur de cannelle et de cuir, posé sur un fond de tabac et d'ambre opulent. Pour l'homme qui n'a besoin d'aucune introduction.",
      includes: ["Blood Mandarin", "Cinnamon", "Tobacco", "Leather", "Amber"],
    },
    {
      id: 103,
      name: "Khamra Qahwa",
      price: 49,
      originalPrice: 69,
      category: "Oriental",
      image: "/images/perfume_bottle_logo_applied.jpg.png",
      description: "Un rituel olfactif inspiré du café arabe au bois d'oud. La cardamome épicée et la rose orientale se mêlent à un fond de santal profond et de café intense. Mystérieux, raffiné et infiniment masculin.",
      includes: ["Oud", "Coffee", "Cardamom", "Rose", "Sandalwood"],
    },
    {
      id: 104,
      name: "Imagination",
      price: 49,
      originalPrice: 69,
      category: "Frais",
      image: "/images/bottle_3_logo.jpg.png",
      description: "La liberté d'esprit capturée en parfum. Un pamplemousse vif et une sauge aromatique en tête, sur un cœur de vétiver terreux et un fond de cèdre musqué. Frais, propre et élégant — pour l'homme qui ose penser différemment.",
      includes: ["Grapefruit", "Sage", "Vetiver", "Musk", "Cedar"],
    },
    {
      id: 105,
      name: "Noir Absolu",
      price: 49,
      originalPrice: 69,
      category: "Oriental",
      image: "/images/Bottle Swap (2).png",
      description: "Un oriental ténébreux et magnétique. Des épices chaudes et un oud fumé s'entremêlent à un musc profond et à l'ambre. Rare, envoûtant et taillé pour les esprits libres qui cherchent l'extraordinaire.",
      includes: ["Oud", "Ambre", "Musc", "Encens"],
    },
    {
      id: 106,
      name: "Velvet Storm",
      price: 49,
      originalPrice: 69,
      category: "Frais",
      image: "/images/perfume_bottle_1_with_logo.jpg.png",
      description: "Une tempête de fraîcheur disciplinée par des bois nobles. La bergamote vive s'ouvre sur un cœur de vétiver fumé, ancré dans un fond de cèdre et de musc soyeux. Pour l'homme élégant qui laisse une impression durable.",
      includes: ["Bergamote", "Vétiver", "Cèdre", "Musc"],
    },
  ],
};

// ─── Brand Story ─────────────────────────────────────────────────────────────

export interface BrandStoryConfig {
  tag: string;
  heading: string;
  subheading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  videoSrc: string;
  videoPoster: string;
}

export const brandStoryConfig: BrandStoryConfig = {
  tag: "NOTRE HISTOIRE",
  heading: "L'Âme d'une\nMaison de Luxe",
  subheading: "Depuis 25 ans, nous transcendons l'art du parfum.",
  bodyParagraphs: [
    "Née de la passion d'un maître parfumeur visionnaire, Alaa Parfums de Luxe est bien plus qu'une maison de parfumerie — c'est un héritage vivant, tissé de savoir-faire ancestral et d'audace créatrice.",
    "Chaque flacon est une œuvre d'art. Chaque fragrance, une histoire. Du choix minutieux des matières premières à la mise en flacon, chaque étape est guidée par une seule exigence : l'excellence absolue.",
  ],
  ctaText: "Découvrir Notre Maison",
  ctaTarget: "#contact",
  videoSrc: "/images/section.mp4",
  videoPoster: "/images/about-1.jpg",
};

// ─── Creams ──────────────────────────────────────────────────────────────────

export interface Cream {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  keyIngredients?: string[];
  skinType?: string[];
  benefits?: string[];
}

export interface CreamsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  creams: Cream[];
}

export const creamsConfig: CreamsConfig = {
  tag: "SOINS DE LUXE",
  heading: "Crèmes & Soins",
  description: "Des soins d'exception formulés avec les mêmes ingrédients précieux que nos parfums, pour sublimer votre peau chaque jour.",
  viewAllText: "Voir Tous les Soins",
  addToCartText: "Ajouter au Panier",
  addedToCartText: "Ajouté au Panier",
  categories: ["Tous", "Corps", "Visage", "Mains"],
  creams: [
    {
      id: 201,
      name: "Velours d'Or",
      price: 49,
      category: "Corps",
      image: "/images/perfume-1.jpg",
      description: "Une crème corps somptueuse infusée d'huile d'argan dorée et de vanille de Madagascar. La peau est nourrie, veloutée et délicatement parfumée.",
      keyIngredients: ["Huile d'Argan", "Beurre de Karité", "Vanille de Madagascar"],
      skinType: ["Tous types", "Peau sèche"],
      benefits: ["Nourrissant", "Hydratant", "Parfumant"],
    },
    {
      id: 202,
      name: "Rose Précieuse",
      price: 49,
      category: "Visage",
      image: "/images/perfume-2.jpg",
      description: "Un soin visage d'exception à la rose de Damas et au rétinol naturel. Redensifie, éclaire et repulpe la peau pour un teint rayonnant.",
      keyIngredients: ["Eau de Rose de Damas", "Rétinol Naturel", "Acide Hyaluronique"],
      skinType: ["Peau mature", "Peau terne"],
      benefits: ["Anti-âge", "Éclat", "Repulpant"],
    },
    {
      id: 203,
      name: "Lumière Satinée",
      price: 49,
      category: "Corps",
      image: "/images/perfume-3.jpg",
      description: "Un lait corps léger et pénétrant aux agrumes et fleurs blanches. Laisse la peau satinée, lumineuse et subtilement parfumée toute la journée.",
      keyIngredients: ["Huile de Néroli", "Beurre de Mangue", "Extrait de Fleur d'Oranger"],
      skinType: ["Tous types", "Peau normale à mixte"],
      benefits: ["Légèreté", "Éclat", "Longue durée"],
    },
    {
      id: 204,
      name: "Sérum Oud Intense",
      price: 49,
      category: "Visage",
      image: "/images/perfume-4.jpg",
      description: "Un sérum concentré à l'huile de bois d'oud et au squalane végétal. Répare, fortifie et donne un éclat profond à la peau la plus exigeante.",
      keyIngredients: ["Huile de Bois d'Oud", "Squalane Végétal", "Peptides de Soie"],
      skinType: ["Peau sèche", "Peau sensible"],
      benefits: ["Réparateur", "Fortifiant", "Éclat profond"],
    },
    {
      id: 205,
      name: "Mains Impériales",
      price: 49,
      category: "Mains",
      image: "/images/perfume-5.jpg",
      description: "Une crème mains ultra-riche à l'iris et au miel d'acacia. Répare les mains les plus abîmées et dépose un voile parfumé délicat.",
      keyIngredients: ["Beurre d'Iris", "Miel d'Acacia", "Huile de Jojoba"],
      skinType: ["Tous types"],
      benefits: ["Ultra-nourrissant", "Réparateur", "Parfumant"],
    },
    {
      id: 206,
      name: "Huile Sublime",
      price: 49,
      category: "Corps",
      image: "/images/perfume-6.jpg",
      description: "Une huile sèche luxueuse aux patchouli et encens, inspirée de nos fragrances iconiques. Nourrit en profondeur et laisse un voile soyeux irrésistible.",
      keyIngredients: ["Huile de Patchouli", "Extrait d'Encens", "Huile d'Amande Douce"],
      skinType: ["Tous types", "Peau sèche à très sèche"],
      benefits: ["Nourrissant", "Soyeux", "Sensoriel"],
    },
  ],
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart" | "Sparkles" | "Gift";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "Leaf",
      title: "Ingrédients Purs",
      description: "100% d'ingrédients naturels et durables provenant du monde entier.",
    },
    {
      icon: "Sparkles",
      title: "Concentration d'Extrait",
      description: "Jusqu'à 40% d'huiles de parfum pures pour une tenue et une diffusion exceptionnelles.",
    },
    {
      icon: "Truck",
      title: "Livraison Gratuite",
      description: "Livraison gratuite dans le monde entier pour toutes les commandes supérieures à 300€.",
    },
    {
      icon: "Gift",
      title: "Cadeaux de Luxe",
      description: "Emballage élégant avec gravure personnalisée disponible.",
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "JOURNAL",
  heading: "L'Art du Parfum",
  viewAllText: "Voir Tous les Articles",
  readMoreText: "Lire la Suite",
  posts: [
    {
      id: 1,
      title: "L'Art de Superposer les Parfums",
      date: "15 décembre 2024",
      image: "/images/blog-1.jpg",
      excerpt: "Découvrez les secrets de la création de votre signature olfactive unique en combinant magistralement différents parfums.",
    },
    {
      id: 2,
      title: "Comprendre l'Oud : L'Or Liquide",
      date: "8 décembre 2024",
      image: "/images/blog-2.jpg",
      excerpt: "Explorez le monde fascinant de l'oud, l'un des ingrédients les plus précieux et les plus convoités en parfumerie.",
    },
    {
      id: 3,
      title: "Le Cadeau Parfait : Un Guide",
      date: "28 novembre 2024",
      image: "/images/blog-3.jpg",
      excerpt: "Comment choisir le parfum idéal à offrir à vos proches, de la sélection à la présentation.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "SUPPORT",
  heading: "Questions Fréquemment Posées",
  ctaText: "Contacter Notre Concierge",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "Qu'est-ce qu'un Extrait de Parfum ?",
      answer: "Un Extrait de Parfum est la forme la plus concentrée de parfum, contenant entre 20-40% d'huiles de parfum pures. Cette concentration élevée assure une tenue exceptionnelle, de 8 à 12 heures ou plus sur la peau, et crée une expérience olfactive plus intime et luxueuse.",
    },
    {
      id: 2,
      question: "Comment devrais-je conserver mon parfum ?",
      answer: "Pour préserver l'intégrité de votre parfum, conservez-le dans un endroit frais et sombre, à l'abri de la lumière directe du soleil et des fluctuations de température. Évitez de stocker dans des salles de bain en raison de l'humidité. Correctement conservé, votre extrait de parfum conservera sa qualité pendant de nombreuses années.",
    },
    {
      id: 3,
      question: "Proposez-vous des formats échantillon ?",
      answer: "Oui, nous proposons des échantillons de découverte de 5ml de toute notre collection. Des ensembles d'échantillons sont également disponibles, sélectionnés par nos parfumeurs pour vous aider à explorer différentes familles olfactives et trouver votre parfum parfait.",
    },
    {
      id: 4,
      question: "Quelle est votre politique de retour ?",
      answer: "Nous offrons une garantie de satisfaction de 30 jours sur tous les produits non ouverts. Pour les parfums ouverts, nous proposons des échanges dans les 14 jours si la senteur ne vous convient pas. Veuillez contacter notre concierge client pour l'assistance avec les retours.",
    },
    {
      id: 5,
      question: "Proposez-vous une gravure personnalisée ?",
      answer: "Oui, nous offrons une gravure gratuite sur tous les flacons de 100ml. Vous pouvez personnaliser votre parfum avec jusqu'à 15 caractères, ce qui en fait le cadeau parfait pour les occasions spéciales. La gravure est disponible à la caisse.",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "HÉRITAGE",
      heading: "Un Héritage d'Excellence",
      paragraphs: [
        "Fondée en 1999, Alaa Parfums de Luxe a commencé avec une vision unique : créer des parfums qui transcendent le temps et les tendances. Notre voyage a commencé au cœur de Grasse, en France - la capitale mondiale du parfum - où notre fondatrice s'est formée auprès de maîtres parfumeurs qui avaient perfectionné leur art au fil des générations.",
        "Aujourd'hui, nous continuons cette tradition d'excellence, combinant les techniques intemporelles avec des approches innovantes pour créer des senteurs qui sont à la fois classiques et contemporaines."
      ],
      quote: "",
      attribution: "",
      image: "/images/about-1.jpg",
      backgroundColor: "#111111",
      textColor: "#FFFFFF",
    },
    {
      tag: "SAVOIR-FAIRE",
      heading: "La Touche du Maître Parfumeur",
      paragraphs: [],
      quote: "Un parfum devrait raconter une histoire - des lieux visités, des souvenirs chéris et des rêves à réaliser. Chaque bouteille que nous créons est un chapitre de cette histoire.",
      attribution: "— Jean-Pierre Alaa, Fondateur",
      image: "/images/about-2.jpg",
      backgroundColor: "#0a0a0a",
      textColor: "#FFFFFF",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Contactez-Nous",
  description: "Notre concierge parfumerie est disponible pour vous aider avec des recommandations personnalisées, des services cadeaux et toute question concernant notre collection.",
  locationLabel: "Boutique",
  location: "Casablanca, Maroc",
  emailLabel: "Email",
  email: "concierge@alaaparfumes.com",
  phoneLabel: "Téléphone",
  phone: "+212 700 099 462",
  formFields: {
    nameLabel: "Nom",
    namePlaceholder: "Votre nom complet",
    emailLabel: "Email",
    emailPlaceholder: "votre@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Comment pouvons-nous vous aider ?",
  },
  submitText: "Envoyer le Message",
  submittingText: "Envoi...",
  submittedText: "Envoyé",
  successMessage: "Merci de nous avoir contactés. Notre concierge répondra dans les 24 heures.",
  backgroundImage: "/images/contact-bg.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  logoImage: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "Alaa Parfums de Luxe",
  logoImage: "/images/logo.png",
  brandDescription: "Des extraits de parfum exquis, créés avec passion et portés avec distinction. Expérimentez l'art du parfum de luxe.",
  newsletterHeading: "Rejoignez le Cercle Intérieur",
  newsletterDescription: "Abonnez-vous pour accéder exclusivement aux nouvelles sorties, aux événements privés et aux conseils parfumerie.",
  newsletterPlaceholder: "Entrez votre email",
  newsletterButtonText: "S'abonner",
  newsletterSuccessText: "Bienvenue au cercle intérieur d'Alaa.",
  linkGroups: [
    {
      title: "Collections",
      links: [
        { label: "Oriental", href: "#products" },
        { label: "Floral", href: "#products" },
        { label: "Boisé", href: "#products" },
        { label: "Frais", href: "#products" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Parfums sur Mesure", href: "#contact" },
        { label: "Concierge Cadeaux", href: "#contact" },
        { label: "Gravure", href: "#contact" },
        { label: "Cadeaux Entreprise", href: "#contact" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "Notre Histoire", href: "#notre-histoire" },
        { label: "Carrières", href: "#contact" },
        { label: "Presse", href: "#contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Politique de Confidentialité", href: "#" },
    { label: "Conditions d'Utilisation", href: "#" },
    { label: "Livraison & Retours", href: "#" },
  ],
  copyrightText: "© 2024 Alaa Parfums de Luxe. Tous droits réservés.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};
