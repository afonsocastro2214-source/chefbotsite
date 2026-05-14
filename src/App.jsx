import { useState, useEffect } from "react";

const APP_URL = "https://receitabot.com.br";

const MASCOT_URL =
  "https://vgildylrvnudmgiecrjp.supabase.co/storage/v1/object/public/fotos-galeria/1778521576562.png";

const RECIPES = {
  pt: [
    {
      id: 1,
      title: "Frango Grelhado ao Limão",
      cat: "Low Carb",
      time: 25,
      srv: 2,
      diff: "Fácil",
      desc: "Frango suculento marinado com limão siciliano e ervas.",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Bowl Vegano",
      cat: "Vegano",
      time: 20,
      srv: 2,
      diff: "Fácil",
      desc: "Bowl saudável com legumes e quinoa.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Smoothie Energético",
      cat: "Energia",
      time: 5,
      srv: 1,
      diff: "Fácil",
      desc: "Smoothie natural de banana e aveia.",
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  en: [
    {
      id: 1,
      title: "Lemon Grilled Chicken",
      cat: "Low Carb",
      time: 25,
      srv: 2,
      diff: "Easy",
      desc: "Juicy grilled chicken with lemon and herbs.",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Vegan Bowl",
      cat: "Vegan",
      time: 20,
      srv: 2,
      diff: "Easy",
      desc: "Healthy quinoa and veggie bowl.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Energy Smoothie",
      cat: "Energy",
      time: 5,
      srv: 1,
      diff: "Easy",
      desc: "Natural banana and oats smoothie.",
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

const CATEGORIES = {
  pt: ["Todos", "Low Carb", "Vegano", "Energia"],
  en: ["All", "Low Carb", "Vegan", "Energy"],
};

const TEXT = {
  pt: {
    title: "ChefBot IA",
    subtitle:
      "Descubra receitas incríveis criadas por inteligência artificial.",
    search: "Buscar receita...",
    searchBtn: "Buscar",
    appBtn: "Abrir ReceitaBot →",
    noResult: "Não encontrou a receita?",
    noResultSub: "Peça para a IA criar no ReceitaBot.",
    ctaTitle: "Crie receitas personalizadas",
    ctaDesc:
      "Digite os ingredientes que você possui e o ReceitaBot cria receitas únicas.",
  },

  en: {
    title: "ChefBot AI",
    subtitle: "Discover amazing AI-powered recipes.",
    search: "Search recipe...",
    searchBtn: "Search",
    appBtn: "Open ReceitaBot →",
    noResult: "Didn't find the recipe?",
    noResultSub: "Ask AI to create it on ReceitaBot.",
    ctaTitle: "Create personalized recipes",
    ctaDesc:
      "Tell ReceitaBot your ingredients and generate unique recipes.",
  },
};

function Mascot({ size = 70 }) {
  return (
    <img
      src={MASCOT_URL}
      alt="ChefBot Mascot"
      loading="lazy"
      decoding="async"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: "drop-shadow(0 4px 16px rgba(255,102,0,0.4))",
      }}
    />
  );
}

function RecipeCard({ recipe, t }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "0.3s",
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          aspectRatio: "16/9",
        }}
      />

      <div style={{ padding: "1.2rem" }}>
        <div
          style={{
            color: "#FF6600",
            fontSize: "0.75rem",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          {recipe.cat}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            marginBottom: "0.7rem",
            fontWeight: 700,
          }}
        >
          {recipe.title}
        </h3>

        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          {recipe.desc}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.8rem",
            marginBottom: "1rem",
          }}
        >
          <span>⏱️ {recipe.time} min</span>
          <span>👤 {recipe.srv}</span>
          <span>📊 {recipe.diff}</span>
        </div>

        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "linear-gradient(135deg,#FF6600,#cc3300)",
            color: "white",
            textDecoration: "none",
            padding: "0.9rem",
            borderRadius: "14px",
            fontWeight: 700,
          }}
        >
          {t.appBtn}
        </a>
      </div>
    </div>
  );
}

export default function ChefBotSite() {
  const [lang, setLang] = useState("pt");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (!browserLang.includes("pt")) {
      setLang("en");
    }
  }, []);

  const t = TEXT[lang];
  const recipes = RECIPES[lang];
  const categories = CATEGORIES[lang];

  const filtered = recipes.filter((r) => {
    const categoryOk =
      category === 0 || r.cat === categories[category];

    const searchOk =
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.desc.toLowerCase().includes(query.toLowerCase());

    return categoryOk && searchOk;
  });

  const noResults = query.length > 0 && filtered.length === 0;

  return (
    <div
      style={{
        background: "#080808",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          backdropFilter: "blur(18px)",
          background: "rgba(0,0,0,0.7)",
          zIndex: 99,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Mascot size={45} />

          <div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Chef
              <span style={{ color: "#FF6600" }}>
                Bot
              </span>
            </div>

            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              AI Recipes
            </div>
          </div>
        </div>

        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(135deg,#FF6600,#cc3300)",
            color: "white",
            padding: "0.8rem 1.4rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ReceitaBot →
        </a>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <Mascot size={110} />
        </div>

        <h1
          style={{
            fontSize: "clamp(2.4rem,7vw,4.5rem)",
            marginBottom: "1rem",
            fontWeight: 800,
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          {t.subtitle}
        </p>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(search);
              }
            }}
            placeholder={t.search}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              padding: "1rem",
              borderRadius: "50px",
              outline: "none",
            }}
          />

          <button
            onClick={() => setQuery(search)}
            style={{
              background: "#FF6600",
              border: "none",
              color: "white",
              padding: "1rem 1.5rem",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {t.searchBtn}
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <div
        style={{
          display: "flex",
          gap: "0.8rem",
          overflowX: "auto",
          padding: "0 1.5rem 2rem",
        }}
      >
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => setCategory(index)}
            style={{
              background:
                category === index
                  ? "linear-gradient(135deg,#FF6600,#cc3300)"
                  : "rgba(255,255,255,0.06)",
              color: "white",
              border: "none",
              padding: "0.8rem 1.2rem",
              borderRadius: "50px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RECIPES */}
      <main style={{ padding: "0 1.5rem 4rem" }}>
        {noResults ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              borderRadius: "30px",
              background: "rgba(255,102,0,0.06)",
              border: "1px solid rgba(255,102,0,0.2)",
            }}
          >
            <Mascot size={120} />

            <h2
              style={{
                marginTop: "1.5rem",
                marginBottom: "0.8rem",
              }}
            >
              {t.noResult}
            </h2>

            <p
              style={{
                color: "#FF7733",
                marginBottom: "2rem",
              }}
            >
              {t.noResultSub}
            </p>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                background:
                  "linear-gradient(135deg,#FF6600,#cc3300)",
                color: "white",
                textDecoration: "none",
                padding: "1rem 2rem",
                borderRadius: "50px",
                fontWeight: 700,
              }}
            >
              {t.appBtn}
            </a>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(300px,1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                t={t}
              />
            ))}
          </div>
        )}

        {/* CTA FINAL */}
        <div
          style={{
            marginTop: "5rem",
            padding: "4rem 2rem",
            textAlign: "center",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg,rgba(255,102,0,0.12),rgba(120,20,0,0.05))",
            border: "1px solid rgba(255,102,0,0.2)",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <Mascot size={130} />
          </div>

          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            {t.ctaTitle}
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              maxWidth: "700px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            {t.ctaDesc}
          </p>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              background:
                "linear-gradient(135deg,#FF6600,#cc3300)",
              color: "white",
              textDecoration: "none",
              padding: "1rem 2.4rem",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            {t.appBtn}
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        © 2026 ChefBot.ia.br
      </footer>
    </div>
  );
}
