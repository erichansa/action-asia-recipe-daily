# Asia Cooking & Recipe of the Day (GitHub Action)

> Automatically update your GitHub Profile README with authentic Asian recipes, wok techniques, and ingredient guides. Powered by [Asiakochen.de](https://asiakochen.de).

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Asia%20Cooking-green.svg?colorA=24292e&colorB=22c55e&style=flat&logo=github)](https://github.com/marketplace/actions/asia-cooking-recipe-of-the-day)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Powered By](https://img.shields.io/badge/Rezepte-Asiakochen.de-green.svg)](https://asiakochen.de)

---

## ⚡ Live Preview in your README

```markdown
### 🥢 Asiatische Rezeptidee des Tages: Kung Pao Hähnchen (Szechuan, China)

> Knackige Erdnüsse, zartes Hähnchenfleisch und aromatische Szechuan-Chilis in einer perfekt ausbalancierten süß-sauren Sauce.

* 💡 Meister-Tipp: Echter Chinkiang-Reisessig und fermentierte Bohnensauce machen den Unterschied.
* 📖 Vollständiges Rezept & Kochanleitung: [Rezept auf Asiakochen.de ansehen](https://asiakochen.de) · Data provided by Asiakochen.de
```

---

## 🚀 How to Use

### 1. Add Placeholders to your `README.md`

```markdown
<!-- ASIA-RECIPE:START -->
<!-- ASIA-RECIPE:END -->
```

### 2. Create Workflow `.github/workflows/daily-recipe.yml`

```yaml
name: Update Daily Asian Recipe

on:
  schedule:
    - cron: '0 7 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Inject Recipe
        uses: erichansa/action-asia-recipe-daily@v1

      - name: Commit changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add README.md
          git diff --quiet && git diff --staged --quiet || git commit -m "docs: update daily asian recipe"
          git push
```

---

## 🍜 About Asiakochen.de

[Asiakochen.de](https://asiakochen.de) ist dein Guide für authentische asiatische Rezepte, Wok-Techniken und Saucen-Guides.

- 🌐 [Asiakochen.de Hauptseite](https://asiakochen.de)

---

## 📄 License

MIT © [Asiakochen.de](https://asiakochen.de)
