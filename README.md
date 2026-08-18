# Portfólio — Igor Murilo

Portfólio pessoal de [Igor Murilo](https://github.com/devigMurilo), estudante de Informática para
Internet no IFRN campus São Paulo do Potengi. A seção de projetos reúne as aplicações no ar na
Vercel e os repositórios que valem abrir o código; bio e stack vêm do perfil do GitHub.

## Stack

| Camada      | Tecnologia                                        |
| ----------- | ------------------------------------------------- |
| Build       | Vite 8                                            |
| UI          | React 19 + TypeScript                             |
| Estilo      | Tailwind CSS 4 (`@theme`)                         |
| Componentes | convenções shadcn/ui + `@radix-ui/react-slot`     |
| Variantes   | `class-variance-authority`, `tailwind-merge`       |
| Animação    | Motion (`motion/react`)                           |
| Ícones      | lucide-react + SVG embutido                       |

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

O servidor sobe em `http://localhost:5173`. Para gerar o build de produção em `dist/`:

```bash
npm run build
```

```bash
npm run preview
```

## Estrutura

```
src/
├── App.tsx                 # composição das seções
├── index.css               # tokens shadcn, tema Tailwind, keyframes e utilitários
├── data/profile.ts         # única fonte de conteúdo (perfil, skills, projetos, timeline)
├── lib/utils.ts            # cn() — clsx + tailwind-merge
└── components/
    ├── demo/               # demos de referência dos componentes do registro
    ├── sections/           # Navbar, Hero, About, Stack, Projects, Timeline, Contact, Footer
    └── ui/                 # primitivas animadas reutilizáveis + componentes shadcn
```

Para atualizar o portfólio, edite apenas `src/data/profile.ts` — as seções são geradas a partir dele.

## Estrutura shadcn/ui

O projeto segue as convenções do shadcn/ui para que componentes do registro possam ser colados sem
adaptação. Quatro peças fazem isso funcionar:

1. **`components.json`** — declara os aliases que a CLI do shadcn lê. Com ele, `npx shadcn@latest add
   <componente>` já escreve no lugar certo.
2. **Alias `@/`** — apontando para `src/`, declarado em dois lugares: `paths` no `tsconfig.json` (para
   o TypeScript) e `resolve.alias` no `vite.config.ts` (para o bundler). Faltando um dos dois, o
   editor ou o build quebra.
3. **`src/lib/utils.ts`** — exporta `cn()`. Todo componente do registro importa de `@/lib/utils`.
4. **Tokens em `src/index.css`** — `--primary`, `--ring`, `--destructive`, `--border` e companhia,
   definidos em `:root`/`.dark` e expostos ao Tailwind via `@theme inline`. Sem eles, classes como
   `text-primary` ou `ring-ring` não resolvem para nada e o componente aparece sem cor.

**Por que `components/ui`:** é o diretório que a CLI do shadcn usa por padrão e o caminho que os
componentes do registro assumem nos próprios imports (`@/components/ui/...`). Colar um componente em
outra pasta obriga a reescrever imports a cada atualização e faz `shadcn add` criar uma segunda
árvore paralela.

O `cn()` aqui usa `tailwind-merge`, não só concatenação: sem ele, `cn('text-primary', 'text-white')`
mantém as duas classes e o vencedor sai da ordem do CSS, não do argumento. Os botões dependem disso
para sobrescrever a cor da variante.

## Card de música no herói

`NowPlayingCard` fixa uma faixa no herói — capa, título, artista, álbum e uma prévia de 30 segundos
com play/pause. A faixa fica em `nowPlaying`, dentro de
[`profile.ts`](src/data/profile.ts); trocar de música é trocar esse objeto.

Capa e prévia vêm da API pública de busca da Apple (`itunes.apple.com/search`), então são os arquivos
oficiais servidos pela própria Apple — nada é rehospedado no projeto. Para descobrir as URLs de outra
faixa:

```bash
curl -s "https://itunes.apple.com/search?term=arctic+monkeys+snap+out+of+it&entity=song&limit=1"
```

O campo `artworkUrl100` volta em 100×100; troque o sufixo por `600x600bb.jpg` para a versão grande.

Detalhes que importam: o áudio só toca por clique (nada de autoplay), o estado do botão segue os
eventos do próprio elemento `<audio>` em vez do clique — assim ele volta para "play" sozinho quando a
prévia acaba; e a capa tem `onError` que cai para um ícone, então uma URL que expire não deixa um
buraco no layout.

## Menu com troca de letras

Os links da navbar (desktop e mobile), o badge e o rótulo de scroll do herói e os textos do card de
música usam `RandomLetterSwap`, de
[`random-letter-swap.tsx`](src/components/ui/random-letter-swap.tsx). Cada caractere vira uma coluna
com `overflow: hidden` e duas cópias empilhadas; no hover as duas sobem uma altura de linha, então a
letra é substituída por ela mesma.

O "random" está na ordem, não no conteúdo: em vez de cascatear da esquerda para a direita, o atraso
de cada letra vem de uma permutação sorteada (Fisher-Yates) a cada entrada do ponteiro. O texto
acessível fica num `<span class="sr-only">` e as colunas animadas são `aria-hidden`, então leitores
de tela leem a palavra inteira, não letra por letra. `useReducedMotion()` desliga o movimento.

O registro do 21st.dev publica só o arquivo de uso (`m-random-letter-swap-1.tsx`), que importa
`@/components/ui/random-letter-swap` — esse arquivo não vem junto. A implementação aqui foi escrita a
partir da API que o uso assume: `label`, `staggerDuration` e `transition`.

## Botões

Todos os botões e CTAs do site usam `LiquidButton`, de
[`liquid-glass-button.tsx`](src/components/ui/liquid-glass-button.tsx) — 12 instâncias: as duas do
herói, os três filtros de projeto, "Ver todos os repositórios", as duas de contato, "voltar ao topo"
e os três controles da navbar. O efeito vem de um `backdrop-filter` que aponta para um filtro SVG
(`feTurbulence` + `feDisplacementMap`), então o vidro distorce o que está atrás dele.

Para links, use `asChild` com uma âncora dentro — o `<a>` vira a raiz e mantém `href`, clique do meio
e indexação:

```tsx
<LiquidButton asChild size="xl" className="rounded-full">
  <a href="#projetos">Ver projetos</a>
</LiquidButton>
```

Duas correções foram necessárias no componente publicado, ambas comentadas no arquivo:

- **`asChild` quebrava em runtime.** O original manda as camadas de vidro como irmãs para o `Slot`, e
  o `Slot` do Radix aceita um único filho (`React.Children.only`). Agora as camadas entram *dentro*
  do elemento do consumidor.
- **Ícone + rótulo empilhavam em duas linhas.** O conteúdo ia num `<div>` block; como as camadas de
  vidro são absolutas e saem do fluxo, sobrava um único filho em fluxo e o `gap-2` do botão não tinha
  efeito. O wrapper virou `inline-flex items-center gap-2`.

Duas ressalvas conhecidas: cada instância renderiza seu próprio `<svg id="container-glass">`, então o
mesmo `id` aparece 12 vezes no DOM (funciona, mas é HTML inválido — dá para içar o filtro uma vez em
`App.tsx`); e os links de seta dentro dos cards de projeto ficaram sem vidro de propósito, porque
`backdrop-filter` dentro de um pai com transform 3D (o `TiltCard`) não amostra o fundo corretamente.

`ShimmerButton`/`GhostButton` continuam no repositório mas não são mais usados — ficaram como
alternativa caso o vidro não agrade.

## Componentes animados

As primitivas em `src/components/ui/` foram construídas do zero, tomando como referência os padrões
de animação do [21st.dev](https://21st.dev):

| Componente            | Efeito                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| `AuroraBackground`    | Três manchas de cor em blur pesado girando em loop sobre uma grade fina    |
| `Spotlight`           | Brilho radial que segue o cursor dentro do card                           |
| `TiltCard`            | Inclinação 3D com mola, proporcional à posição do ponteiro                |
| `Magnetic`            | Elemento é atraído na direção do cursor                                   |
| `ShimmerButton`       | Borda cônica em rotação + varredura de brilho interna (não usado)         |
| `BlurText`            | Texto revelado palavra por palavra, saindo de `blur()`                    |
| `TypeWriter`          | Digitação e apagamento cíclico com cursor piscando                        |
| `Marquee`             | Faixa infinita com conteúdo duplicado, pausa no hover                     |
| `Reveal`              | Wrapper de scroll reveal com direção configurável                         |
| `ScrollProgress`      | Barra de progresso do scroll no topo                                      |
| `GlowCursor`          | Halo que segue o ponteiro com atraso elástico (desligado em touch)        |
| `RandomLetterSwap`    | Letras trocadas por cópias deslizantes, em ordem sorteada a cada hover    |

Todas as animações respeitam `prefers-reduced-motion: reduce`, desativadas via `src/index.css`.

## Ícones de tecnologia

`src/components/ui/TechIcons.tsx` guarda os paths oficiais das marcas (Simple Icons, licença CC0)
das 11 tecnologias usadas no site, em vez de depender do pacote `simple-icons` inteiro — são 3.453
marcas para usar 11. `<TechIcon name="React" />` resolve o nome, aceita apelidos (`SQL`,
`Git & GitHub`, `Django REST Framework`) e devolve `null` quando não existe ícone, então o rótulo
aparece sozinho sem quebrar o layout.

Duas observações de contraste: o verde oficial do Django (`#092E20`) é quase preto no fundo escuro,
então usamos o verde claro da marca (`#44B78B`); o roxo do CSS foi alinhado ao roxo de destaque do
site (`#8B5CF6`).

## Notas de implementação

Gradiente de texto e `filter: blur()` não convivem: o Chrome não pinta um `background-clip: text`
enquanto o elemento tem `filter`, mesmo `blur(0px)`. Por isso `BlurText` aceita `blur={false}`, usado
no sobrenome do herói, que é gradiente.

## Deploy

O `base` do Vite está em `'./'`, então o `dist/` funciona tanto em domínio próprio quanto em
subdiretório (GitHub Pages, Vercel, Netlify). Basta publicar a pasta `dist/`.
