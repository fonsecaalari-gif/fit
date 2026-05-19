# FitCalc — versão para Live Server

Esta versão abre diretamente pelo Live Server, sem Vite e sem React.

## Como abrir

1. Extraia o ZIP.
2. Abra a pasta `fitcalc-live-server` no VS Code.
3. Clique com o botão direito no `index.html`.
4. Escolha `Open with Live Server`.

## Como adicionar novas postagens

Abra o arquivo:

```txt
data/posts.js
```

Copie um bloco de postagem e cole logo abaixo, mudando:

- `slug`: endereço da postagem, sem espaços e sem acentos
- `title`: título do post
- `category`: categoria
- `read`: tempo de leitura
- `excerpt`: resumo que aparece no card
- `coverEmoji`: emoji de capa
- `content`: texto completo do artigo em HTML

Exemplo:

```js
{
  slug: "meu-novo-post",
  title: "Meu novo post",
  category: "Treinos",
  read: "4 min",
  excerpt: "Resumo curto do post.",
  coverEmoji: "🏋️",
  content: `
    <p>Texto inicial do artigo.</p>
    <h2>Subtítulo</h2>
    <p>Mais conteúdo.</p>
  `
}
```

Importante: se adicionar mais um post, coloque vírgula entre os blocos.

## Arquivos principais

- `index.html`: página inicial
- `post.html`: página de leitura dos posts
- `data/posts.js`: lista de postagens
- `style.css`: visual do site
- `script.js`: calculadoras, timer e cards do blog
- `post.js`: abre o post correto pelo endereço
- `manifest.webmanifest`: manifesto PWA básico

## Observação

As calculadoras são estimativas educativas e não substituem acompanhamento médico, nutricional ou profissional de educação física.


## Ajuste final dos cards

Os cards da área de ferramentas foram corrigidos para:

- o card inteiro ser clicável
- remover espaço sobrando na parte de baixo
- manter ícone, título, descrição e ação em coluna
- adaptar corretamente no celular, tablet e desktop


## Correção final de layout

Foram corrigidos:

- cards das ferramentas clicáveis
- cards das ferramentas compactos e alinhados
- sobra de espaço nas calculadoras
- cards de formulário que esticavam junto com o resultado
- resultados muito grandes/quebrando texto
- layout de macros e treinos mais alinhado


## Textos removidos

Foram removidas mensagens de desenvolvimento, como referências a Live Server, React, Vite, protótipo e compilação.

## Espaços para anúncios

Foram adicionados espaços de publicidade em:

- topo da página inicial
- entre ferramentas e calculadoras
- entre calculadoras
- antes do blog
- abaixo dos cards do blog
- topo da página de artigo
- dentro do artigo
- lateral do artigo

Para trocar os placeholders por Google AdSense depois da aprovação, procure no HTML por:

```html
<div class="ad-slot
```

E substitua o conteúdo interno pelo código fornecido pelo AdSense.


## Conteúdo obrigatório/recomendado para Google AdSense

Foram adicionadas páginas importantes para um site com anúncios:

- `politica-privacidade.html`
- `politica-cookies.html`
- `termos.html`
- `aviso-saude.html`
- `sobre.html`
- `contato.html`

Também foram adicionados:

- `ads.txt` modelo
- `robots.txt`
- `sitemap.xml` modelo
- links dessas páginas no rodapé
- áreas de anúncio nas páginas legais

## Antes de publicar

Edite obrigatoriamente:

1. O e-mail em `contato.html`.
2. O domínio em `robots.txt` e `sitemap.xml`.
3. O ID do AdSense em `ads.txt`, trocando `pub-0000000000000000`.
4. A Política de Privacidade, caso use Google Analytics, formulário, banco de dados, login ou outras ferramentas.
5. Os placeholders de anúncio, inserindo o código real do AdSense apenas após aprovação/configuração.

## Observação

Essas páginas ajudam na conformidade e transparência, mas não garantem aprovação automática no AdSense. O site também precisa ter conteúdo original, navegação clara e cumprir as políticas do Google.
