function getPostSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function renderPost() {
  const slug = getPostSlug();
  const posts = window.FITCALC_POSTS || [];
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    document.title = "Artigo não encontrado — FitCalc";
    document.getElementById("postTitle").textContent = "Artigo não encontrado";
    document.getElementById("postExcerpt").textContent = "Volte para o blog e escolha uma postagem existente.";
    document.getElementById("postContent").innerHTML = `
      <p>Não encontramos uma postagem com esse endereço.</p>
      <p><a href="./index.html#blog">Voltar para o blog</a></p>
    `;
    return;
  }

  document.title = `${post.title} — FitCalc`;
  document.getElementById("postEmoji").textContent = post.coverEmoji || "📰";
  document.getElementById("postMeta").textContent = `${post.category} • ${post.read}`;
  document.getElementById("postTitle").textContent = post.title;
  document.getElementById("postExcerpt").textContent = post.excerpt;
  document.getElementById("postContent").innerHTML = post.content;
}

document.addEventListener("DOMContentLoaded", renderPost);
