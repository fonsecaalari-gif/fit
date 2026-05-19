const $ = (id) => document.getElementById(id);

const exercises = {
  casa: {
    fullbody: ["Agachamento livre", "Flexão de braço adaptada ou tradicional", "Avanço alternado", "Prancha abdominal", "Elevação pélvica", "Polichinelo ou corrida parada"],
    pernas: ["Agachamento livre", "Afundo alternado", "Elevação pélvica", "Agachamento sumô", "Panturrilha em pé", "Prancha lateral"],
    superiores: ["Flexão de braço", "Remada com mochila", "Desenvolvimento com garrafas", "Tríceps no banco", "Rosca bíceps com mochila", "Prancha com toque no ombro"]
  },
  academia: {
    fullbody: ["Leg press", "Supino máquina ou halteres", "Puxada frontal", "Mesa flexora", "Desenvolvimento de ombros", "Abdominal na máquina ou prancha"],
    pernas: ["Agachamento ou leg press", "Cadeira extensora", "Mesa flexora", "Elevação pélvica", "Cadeira abdutora", "Panturrilha sentada"],
    superiores: ["Supino reto", "Puxada frontal", "Remada baixa", "Desenvolvimento de ombros", "Tríceps corda", "Rosca direta"]
  }
};

function fmt(num, digits = 1) {
  return Number(num).toFixed(digits).replace(".", ",");
}

function setEmpty(ids) {
  ids.forEach((id) => {
    const el = $(id);
    if (el) {
      el.textContent = "—";
      el.className = el.className.replace("result-value", "result-value result-empty");
    }
  });
}

function setResult(id, value) {
  const el = $(id);
  if (!el) return;
  el.textContent = value;
  el.className = "result-value";
}

function calculateIMC() {
  const peso = Number(String($("imcPeso").value).replace(",", "."));
  const altura = Number(String($("imcAltura").value).replace(",", ".")) / 100;

  if (!peso || !altura) {
    setEmpty(["imcValor", "imcFaixa"]);
    $("imcClasse").textContent = "Preencha peso e altura";
    return;
  }

  const imc = peso / (altura * altura);
  let classe = "";
  if (imc < 18.5) classe = "Abaixo do peso";
  else if (imc < 25) classe = "Peso adequado";
  else if (imc < 30) classe = "Sobrepeso";
  else if (imc < 35) classe = "Obesidade grau I";
  else if (imc < 40) classe = "Obesidade grau II";
  else classe = "Obesidade grau III";

  const min = 18.5 * altura * altura;
  const max = 24.9 * altura * altura;

  setResult("imcValor", fmt(imc));
  $("imcClasse").textContent = classe;
  setResult("imcFaixa", `${fmt(min)}–${fmt(max)} kg`);
}

function calculateBF() {
  const sexo = $("bfSexo").value;
  const altura = Number($("bfAltura").value);
  const cintura = Number($("bfCintura").value);
  const pescoco = Number($("bfPescoco").value);
  const quadril = Number($("bfQuadril").value);
  const peso = Number($("bfPeso").value);

  $("quadrilWrap").style.display = sexo === "feminino" ? "block" : "none";

  if (!altura || !cintura || !pescoco || !peso) {
    setEmpty(["bfValor", "bfMagra", "bfGordura"]);
    $("bfClasse").textContent = "Preencha os campos";
    return;
  }

  let bf = null;
  if (sexo === "masculino") {
    if (cintura <= pescoco) return;
    bf = 495 / (1.0324 - 0.19077 * Math.log10(cintura - pescoco) + 0.15456 * Math.log10(altura)) - 450;
  } else {
    if (cintura + quadril <= pescoco) return;
    bf = 495 / (1.29579 - 0.35004 * Math.log10(cintura + quadril - pescoco) + 0.221 * Math.log10(altura)) - 450;
  }

  const gordura = peso * (bf / 100);
  const magra = peso - gordura;
  const classe = bf < 18 ? "Baixo/moderado" : bf < 25 ? "Médio" : bf < 32 ? "Elevado" : "Muito elevado";

  setResult("bfValor", `${fmt(bf)}%`);
  $("bfClasse").textContent = classe;
  setResult("bfMagra", `${fmt(magra)} kg`);
  setResult("bfGordura", `${fmt(gordura)} kg`);
}

function calculateMacros() {
  const sexo = $("macroSexo").value;
  const idade = Number($("macroIdade").value);
  const peso = Number($("macroPeso").value);
  const altura = Number($("macroAltura").value);
  const atividade = Number($("macroAtividade").value);
  const objetivo = $("macroObjetivo").value;

  if (!idade || !peso || !altura || !atividade) {
    setEmpty(["macroCalorias", "macroProteina", "macroCarbo", "macroGordura", "macroAgua", "macroTmb"]);
    return;
  }

  const bmr = sexo === "masculino"
    ? 10 * peso + 6.25 * altura - 5 * idade + 5
    : 10 * peso + 6.25 * altura - 5 * idade - 161;

  let calories = bmr * atividade;
  if (objetivo === "emagrecer") calories -= 400;
  if (objetivo === "ganhar") calories += 300;
  calories = Math.max(1200, calories);

  const protein = peso * (objetivo === "ganhar" ? 2 : 1.8);
  const fat = peso * 0.8;
  const carbs = (calories - protein * 4 - fat * 9) / 4;
  const water = peso * 35;

  setResult("macroCalorias", `${Math.round(calories)} kcal`);
  setResult("macroProteina", `${Math.round(protein)} g`);
  setResult("macroCarbo", `${Math.round(carbs)} g`);
  setResult("macroGordura", `${Math.round(fat)} g`);
  setResult("macroAgua", `${(water / 1000).toFixed(1).replace(".", ",")} L`);
  setResult("macroTmb", `${Math.round(bmr)} kcal`);
}

function generateWorkout() {
  const local = $("treinoLocal").value;
  const nivel = $("treinoNivel").value;
  const objetivo = $("treinoObjetivo").value;
  const dias = Number($("treinoDias").value);
  const foco = $("treinoFoco").value;

  const base = exercises[local][foco] || exercises[local].fullbody;
  const series = nivel === "iniciante" ? "3 séries" : nivel === "intermediario" ? "3–4 séries" : "4 séries";
  const reps = objetivo === "forca" ? "6–8 reps" : objetivo === "emagrecimento" ? "12–15 reps" : "8–12 reps";
  const descanso = objetivo === "forca" ? "90–120s" : objetivo === "emagrecimento" ? "30–60s" : "60–90s";
  const divisao = dias <= 3 ? "Full body" : dias === 4 ? "AB" : "ABC";

  $("treinoDivisao").textContent = `Divisão: ${divisao}`;
  $("treinoDescanso").textContent = `Descanso: ${descanso}`;
  $("treinoSeries").textContent = `${series} de ${reps}`;

  $("treinoLista").innerHTML = base.map((ex, i) => `
    <div class="exercise-item">
      <div class="exercise-number">${i + 1}</div>
      <div>
        <p class="exercise-title">${ex}</p>
        <p class="exercise-subtitle">${series} • ${reps}</p>
      </div>
    </div>
  `).join("");
}

let timer = {
  running: false,
  phase: "work",
  round: 1,
  seconds: 40,
  interval: null
};

function timerValues() {
  return {
    work: Number($("timerWork").value) || 0,
    rest: Number($("timerRest").value) || 0,
    rounds: Number($("timerRounds").value) || 1
  };
}

function updateTimerView() {
  const values = timerValues();
  const min = String(Math.floor(timer.seconds / 60)).padStart(2, "0");
  const sec = String(timer.seconds % 60).padStart(2, "0");

  $("timerNumber").textContent = `${min}:${sec}`;
  $("timerRound").textContent = `Round ${timer.round} de ${values.rounds}`;
  $("timerPhase").textContent = timer.phase === "work" ? "Exercício" : "Descanso";
  $("timerPhase").className = `phase-pill ${timer.phase === "work" ? "work" : "rest"}`;
  $("timerStart").textContent = timer.running ? "⏸ Pausar" : "▶ Iniciar";

  const total = (values.work + values.rest) * values.rounds - values.rest;
  $("timerTotal").textContent = total > 0
    ? `Tempo total: ${Math.floor(total / 60)}min ${total % 60}s`
    : "Tempo total: —";
}

function resetTimer() {
  const values = timerValues();
  clearInterval(timer.interval);
  timer.running = false;
  timer.phase = "work";
  timer.round = 1;
  timer.seconds = values.work;
  updateTimerView();
}

function tickTimer() {
  const values = timerValues();

  if (timer.seconds > 1) {
    timer.seconds--;
    updateTimerView();
    return;
  }

  if (timer.phase === "work") {
    timer.phase = "rest";
    timer.seconds = values.rest;
    updateTimerView();
    return;
  }

  if (timer.round < values.rounds) {
    timer.round++;
    timer.phase = "work";
    timer.seconds = values.work;
    updateTimerView();
    return;
  }

  clearInterval(timer.interval);
  timer.running = false;
  timer.seconds = 0;
  updateTimerView();
}

function toggleTimer() {
  timer.running = !timer.running;
  if (timer.running) {
    timer.interval = setInterval(tickTimer, 1000);
  } else {
    clearInterval(timer.interval);
  }
  updateTimerView();
}

function bindInputs(ids, callback) {
  ids.forEach((id) => {
    const el = $(id);
    if (el) {
      el.addEventListener("input", callback);
      el.addEventListener("change", callback);
    }
  });
}

function renderBlogCards() {
  const grid = $("blogGrid");
  if (!grid || !window.FITCALC_POSTS) return;

  grid.innerHTML = window.FITCALC_POSTS.map((post) => `
    <a class="card blog-card clickable-card" href="./post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="blog-cover">${post.coverEmoji || "📰"}</div>
      <div class="blog-top">
        <span class="blog-category">${post.category}</span>
        <span class="blog-read">${post.read}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <span class="link-button">Ler artigo ›</span>
    </a>
  `).join("");
}

function bindToolLinks() {
  document.querySelectorAll(".tool-link").forEach((card) => {
    card.addEventListener("click", (event) => {
      const href = card.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = $("menuBtn");
  const mobileNav = $("mobileNav");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", false);
    });
  });

  bindInputs(["imcPeso", "imcAltura"], calculateIMC);
  bindInputs(["bfSexo", "bfPeso", "bfAltura", "bfCintura", "bfPescoco", "bfQuadril"], calculateBF);
  bindInputs(["macroSexo", "macroIdade", "macroPeso", "macroAltura", "macroAtividade", "macroObjetivo"], calculateMacros);
  bindInputs(["treinoLocal", "treinoNivel", "treinoObjetivo", "treinoDias", "treinoFoco"], generateWorkout);
  bindInputs(["timerWork", "timerRest", "timerRounds"], resetTimer);

  $("timerStart").addEventListener("click", toggleTimer);
  $("timerReset").addEventListener("click", resetTimer);

  $("copyPolicy").addEventListener("click", async () => {
    const text = $("policyText").textContent;
    await navigator.clipboard?.writeText(text);
    $("copyPolicy").textContent = "✅ Copiado";
    setTimeout(() => ($("copyPolicy").textContent = "📋 Copiar aviso"), 1500);
  });

  bindToolLinks();
  renderBlogCards();

  /* Calculadoras iniciam em estado vazio — usuário preenche os dados */
  setEmpty(["imcValor", "imcFaixa"]);
  $("imcClasse").textContent = "Preencha peso e altura";
  setEmpty(["bfValor", "bfMagra", "bfGordura"]);
  $("bfClasse").textContent = "Preencha os campos";
  setEmpty(["macroCalorias", "macroProteina", "macroCarbo", "macroGordura", "macroAgua", "macroTmb"]);

  /* Treino e timer iniciam com valores padrão por serem seletores */
  generateWorkout();
  resetTimer();
});
