import fs from 'fs';
import path from 'path';

const RECIPES = [
  {
    title: "Kung Pao Hähnchen (Gong Bao Ji Ding)",
    region: "Szechuan, China",
    summary: "Knackige Erdnüsse, zartes Hähnchenfleisch und aromatische Szechuan-Chilis in einer perfekt ausbalancierten süß-sauren Sauce.",
    tip: "Echter Chinkiang-Reisessig und fermentierte süße Bohnensauce machen den Unterschied.",
    url: "https://asiakochen.de"
  },
  {
    title: "Authentisches Mapo Tofu (麻婆豆腐)",
    region: "Szechuan, China",
    summary: "Seidentofu in einer feurig-würzigen Sauce mit Rinderhack, Pixian Doubanjiang und dem prickelnden Aroma von frisch gemahlenem Szechuanpfeffer.",
    tip: "Den Tofu vor dem Braten kurz in Salzwasser blanchieren, damit er im Wok nicht zerfällt.",
    url: "https://asiakochen.de"
  },
  {
    title: "Klassisches Beef & Broccoli Wokgericht",
    region: "Kantonesische Küche",
    summary: "Zart mariniertes Rindfleisch und knackig blanchierter Brokkoli, geschwenkt in einer reichhaltigen Austern-Knoblauch-Sauce mit echtem Wok Hei Aroma.",
    tip: "Velveting-Methode anwenden: Fleisch mit Stärke, Sojasauce und Eiweiß für butterweiche Textur einlegen.",
    url: "https://asiakochen.de"
  },
  {
    title: "Koreanisches Bibimbap mit Gochujang",
    region: "Korea",
    summary: "Bunte Gemüseschalen, Spiegelei und zartes Rindfleisch auf gedämpftem Reis, serviert mit einer reichhaltigen, fermentierten Gochujang-Sauce.",
    tip: "Gochujang mit etwas geröstetem Sesamöl, Knoblauch und Honig verrühren.",
    url: "https://asiakochen.de"
  }
];

async function run() {
  try {
    const readmePath = process.env['INPUT_README-PATH'] || 'README.md';
    const tagStart = process.env['INPUT_TAG-START'] || '<!-- ASIA-RECIPE:START -->';
    const tagEnd = process.env['INPUT_TAG-END'] || '<!-- ASIA-RECIPE:END -->';

    const pick = RECIPES[Math.floor(Math.random() * RECIPES.length)];

    const block = `
### 🥢 Asiatische Rezeptidee des Tages: ${pick.title} (${pick.region})

> ${pick.summary}

* **💡 Meister-Tipp:** ${pick.tip}
* 📖 **Vollständiges Rezept & Kochanleitung:** [Rezept auf Asiakochen.de ansehen](${pick.url}?utm_source=github_action&utm_medium=readme&utm_campaign=asia_recipe_daily) · *Bereitgestellt von [Asiakochen.de](https://asiakochen.de)*
`;

    const fullPath = path.resolve(process.cwd(), readmePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, `${tagStart}\n${block}\n${tagEnd}\n`, 'utf-8');
      console.log('Created README with recipe block.');
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const regex = new RegExp(`${tagStart}[\\s\\S]*?${tagEnd}`, 'm');

    if (!regex.test(content)) {
      fs.writeFileSync(fullPath, `${content}\n\n${tagStart}\n${block}\n${tagEnd}\n`, 'utf-8');
    } else {
      fs.writeFileSync(fullPath, content.replace(regex, `${tagStart}\n${block}\n${tagEnd}`), 'utf-8');
    }

    console.log('Successfully updated README with daily Asian recipe!');
  } catch (error) {
    console.error('Action failed:', error.message);
    process.exit(1);
  }
}

run();
