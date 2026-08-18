export const profile = {
  name: 'Igor Murilo',
  handle: 'devigMurilo',
  role: 'Desenvolvedor Full Stack',
  headline: 'Estudante de Informática para Internet no IFRN-SPP',
  location: 'Rio Grande do Norte, Brasil',
  email: 'igormurilo.ac.21@gmail.com',
  github: 'https://github.com/devigMurilo',
  linkedin: 'https://www.linkedin.com/in/igor-murilo-68a487386',
  avatar: 'https://github.com/devigMurilo.png',
  bio: [
    'Construo aplicações web de ponta a ponta — do modelo no banco até a interface. Meu foco atual é Python/Django no back-end e React/TypeScript no front-end.',
    'Hoje estudo Informática para Internet no IFRN campus São Paulo do Potengi, onde a maior parte dos meus projetos nasce: integrações com API REST, sistemas de agendamento e controle financeiro.',
  ],
  stats: [
    { label: 'Repositórios públicos', value: '15+' },
    { label: 'Anos programando', value: '2' },
    { label: 'Stack principal', value: 'Django + React' },
  ],
} as const

/**
 * Faixa fixada no herói. Capa e preview de 30s vêm da API pública de busca da
 * Apple (`itunes.apple.com/search`), então são os arquivos oficiais servidos
 * pela própria Apple — nada é rehospedado aqui.
 */
export const nowPlaying = {
  track: 'Snap Out of It',
  artist: 'Arctic Monkeys',
  album: 'AM',
  year: '2013',
  artwork:
    'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/600x600bb.jpg',
  preview:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/2b/fd/532bfd4a-e84c-b4c0-e46a-df4f33e4d51a/mzaf_6684437442842576614.plus.aac.p.m4a',
  url: 'https://music.apple.com/us/album/snap-out-of-it/663097964?i=663098063',
} as const

export type Skill = {
  name: string
  level: number
  category: 'Back-end' | 'Front-end' | 'Dados' | 'Ferramentas'
}

export const skills: Skill[] = [
  { name: 'Python', level: 85, category: 'Back-end' },
  { name: 'Django', level: 82, category: 'Back-end' },
  { name: 'Django REST Framework', level: 75, category: 'Back-end' },
  { name: 'Node.js', level: 60, category: 'Back-end' },
  { name: 'JavaScript', level: 80, category: 'Front-end' },
  { name: 'TypeScript', level: 70, category: 'Front-end' },
  { name: 'React', level: 78, category: 'Front-end' },
  { name: 'HTML5', level: 90, category: 'Front-end' },
  { name: 'CSS3', level: 85, category: 'Front-end' },
  { name: 'MySQL', level: 72, category: 'Dados' },
  { name: 'SQL', level: 70, category: 'Dados' },
  { name: 'Git & GitHub', level: 80, category: 'Ferramentas' },
  { name: 'Docker', level: 55, category: 'Ferramentas' },
]

export const marqueeStack = [
  'Python',
  'Django',
  'Django REST',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'HTML5',
  'CSS3',
  'MySQL',
  'Docker',
  'Git',
]

export type Project = {
  title: string
  /** Slug do repositório ou domínio do deploy — o que aparece abaixo do título. */
  subtitle: string
  description: string
  tags: string[]
  kind: 'Deploy' | 'Repositório'
  /** Aplicação no ar. Quando existe, vira a ação principal do card. */
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  year: string
  status: 'Concluído' | 'Em desenvolvimento' | 'Estudo'
}

export const projects: Project[] = [
  {
    title: 'Dom Feliciano',
    subtitle: 'dom-feliciano.vercel.app',
    description:
      'Barbearia clássica com agendamento online: o cliente escolhe o serviço, vê os horários livres e reserva só com o nome — sem cadastro nem senha. Construído em Next.js.',
    tags: ['Next.js', 'React', 'TypeScript'],
    kind: 'Deploy',
    liveUrl: 'https://dom-feliciano.vercel.app',
    featured: true,
    year: '2026',
    status: 'Concluído',
  },
  {
    title: 'Star Wars Explorer',
    subtitle: 'pos-2026-projeto01.vercel.app',
    description:
      'Projeto da unidade 02 de Programação Orientada a Serviços: consome a SWAPI e lista personagens, planetas e naves, cada um com os filmes em que aparece.',
    tags: ['React', 'Vite', 'API REST', 'JavaScript'],
    kind: 'Deploy',
    liveUrl: 'https://pos-2026-projeto01.vercel.app',
    repoUrl: 'https://github.com/devigMurilo/pos-2026-projeto01',
    featured: true,
    year: '2026',
    status: 'Concluído',
  },
  {
    title: 'SuapHub',
    subtitle: 'devigMurilo/Integra-o_Suap',
    description:
      'Integração com a API do SUAP que expõe os dados acadêmicos do aluno em uma interface simples. Back-end em Django REST Framework, front-end em React.',
    tags: ['Django REST', 'React', 'API REST', 'Python'],
    kind: 'Repositório',
    repoUrl: 'https://github.com/devigMurilo/Integra-o_Suap',
    featured: true,
    year: '2026',
    status: 'Em desenvolvimento',
  },
  {
    title: 'BE-Desk',
    subtitle: 'WallisonAndre/BE-Desk',
    description:
      'Sistema de gestão de reservas construído em Django, com controle de disponibilidade, cadastro de usuários e painel administrativo.',
    tags: ['Django', 'Python', 'MySQL'],
    kind: 'Repositório',
    repoUrl: 'https://github.com/WallisonAndre/BE-Desk',
    year: '2026',
    status: 'Concluído',
  },
]

export type TimelineItem = {
  period: string
  title: string
  place: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    period: '2026 — atual',
    title: 'Programação Orientada a Serviços',
    place: 'IFRN — São Paulo do Potengi',
    description:
      'APIs REST, integração entre serviços e consumo de dados externos. Projetos em Python e Django REST Framework.',
  },
  {
    period: '2025 — 2026',
    title: 'Programação de Sistemas para Internet',
    place: 'IFRN — São Paulo do Potengi',
    description:
      'Fundamentos de back-end com Python e Django, modelagem de banco de dados relacional e desenvolvimento web.',
  },
  {
    period: '2025',
    title: 'Semana da Informática',
    place: 'IFRN — São Paulo do Potengi',
    description:
      'Apresentação do projeto de banco de dados, unindo modelagem relacional a uma interface web de consulta.',
  },
  {
    period: '2024 — 2025',
    title: 'Primeiros passos no front-end',
    place: 'Estudos independentes',
    description:
      'HTML, CSS e JavaScript puro. Clones de interfaces, consumo de APIs públicas e primeiros repositórios no GitHub.',
  },
]
