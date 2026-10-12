# Egzamen nan Teknoloji

## An Kreyòl

Aplikasyon sa a se yon egzamen entèaktif pou mezire sa w ap aprann nan sipò enfòmatik. Li gen 50 kesyon nan twa domèn: fondamantal asistans teknik, livrezon imèl ak DNS, epi senaryo travay ak kliyan.

### Kijan pou lanse aplikasyon an

Ou bezwen Python 3 pou lanse yon sèvè lokal. Nan tèminal la, egzekite:

```bash
python3 -m http.server 4173
```

Apre sa, louvri <http://localhost:4173> nan navigatè w la. Pa gen okenn depandans pou enstale ni etap konpilasyon.

### Deplwaye gratis ak GitHub Pages

1. Pouse fichye pwojè yo sou branch prensipal depo GitHub la.
2. Nan depo a, ale nan **Settings → Pages**.
3. Anba **Build and deployment**, chwazi **Deploy from a branch**, branch `main`, epi katab `/(root)`. Klike **Save**.
4. Lè deplwaman an fini, ouvri adrès GitHub montre a. Anjeneral li gen fòm `https://non-itilizate-ou.github.io/non-depo-a/`.

Si branch prensipal depo a pa rele `main`, chwazi branch sa a pito. Lyen pataj pwogrè yo se imaj pwogrè nan moman an; nenpòt moun ki gen lyen an ka wè repons yo. Lyen an pa mete ajou otomatikman epi li pa verifye idantite ni nòt la.

Nòt pou pase a se 35 sou 50 (70%). Pwogrè ou sove otomatikman nan navigatè sa a.

### Estrikti pwojè a

- `index.html` — estrikti paj la
- `styles.css` — aparans ak layout ki adapte ak telefòn ak òdinatè
- `app.js` — lojik egzamen an, nòt, rezilta, ak sove pwogrè
- `questions.js` — kesyon, chwa repons, bon repons, ak eksplikasyon yo

Pou modifye kesyon yo, chanje done ki nan `questions.js`.

## In English

This is an interactive quiz for assessing what you are learning in IT support. It contains 50 questions across three areas: help desk fundamentals, email deliverability and DNS, and client-work scenarios.

### Run the app

Python 3 is required to start a local server. Run this command from the project directory:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173> in your browser. No dependencies or build step are required.

### Deploy free with GitHub Pages

1. Push the project files to the repository's default GitHub branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/(root)`, then click **Save**.
4. After deployment completes, open the URL GitHub displays. It usually looks like `https://your-username.github.io/your-repository/`.

If your default branch is not named `main`, select that branch instead. Progress links are snapshots: anyone with a link can view its answers, it does not update automatically, and it does not verify identity or scores.

The passing score is 35 out of 50 (70%). Progress is saved automatically in the current browser.

### Project files

- `index.html` — page structure
- `styles.css` — responsive styling and layout
- `app.js` — quiz flow, scoring, results, and progress saving
- `questions.js` — questions, answer choices, correct answers, and explanations

Edit `questions.js` to update the quiz content.
