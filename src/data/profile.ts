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
  repo: string
  description: string
  tags: string[]
  url: string
  featured?: boolean
  year: string
  status: 'Concluído' | 'Em desenvolvimento' | 'Estudo'
}

export const projects: Project[] = [
  {
    title: 'SuapHub',
    repo: 'Integra-o_Suap',
    description:
      'Integração com a API do SUAP que expõe os dados acadêmicos do aluno em uma interface simples. Back-end em Django REST Framework, front-end em React.',
    tags: ['Django REST', 'React', 'API REST', 'JavaScript'],
    url: 'https://github.com/devigMurilo/Integra-o_Suap',
    featured: true,
    year: '2026',
    status: 'Em desenvolvimento',
  },
  {
    title: 'BE-Desk',
    repo: 'WallisonAndre/BE-Desk',
    description:
      'Sistema de gestão de reservas construído em Django, com controle de disponibilidade, cadastro de usuários e painel administrativo.',
    tags: ['Django', 'Python', 'MySQL'],
    url: 'https://github.com/WallisonAndre/BE-Desk',
    featured: true,
    year: '2026',
    status: 'Concluído',
  },
  {
    title: 'Controle de Finanças',
    repo: 'system-of-control-finances',
    description:
      'Aplicação de controle financeiro pessoal escrita em TypeScript: lançamento de receitas e despesas, categorias e visão consolidada do saldo.',
    tags: ['TypeScript', 'React', 'Vite'],
    url: 'https://github.com/devigMurilo/system-of-control-finances',
    featured: true,
    year: '2026',
    status: 'Em desenvolvimento',
  },
  {
    title: 'Agendamento Barbearia',
    repo: 'appdeAgendamentoDjango',
    description:
      'App em Django onde o cliente escolhe serviço e horário e agenda o atendimento online, com agenda do profissional e confirmação.',
    tags: ['Django', 'Python', 'HTML'],
    url: 'https://github.com/devigMurilo/appdeAgendamentoDjango',
    year: '2026',
    status: 'Concluído',
  },
  {
    title: 'Projeto Banco de Dados',
    repo: 'projeto-banco-de-dados-semana-infor',
    description:
      'Projeto apresentado na Semana da Informática: modelagem relacional acompanhada de uma camada web para consulta dos dados.',
    tags: ['JavaScript', 'SQL', 'Banco de Dados'],
    url: 'https://github.com/devigMurilo/projeto-banco-de-dados-semana-infor',
    year: '2025',
    status: 'Concluído',
  },
  {
    title: 'Clima App',
    repo: 'climaapp',
    description:
      'Consumo de API de previsão do tempo em JavaScript puro, com busca por cidade e renderização das condições atuais.',
    tags: ['JavaScript', 'API', 'CSS'],
    url: 'https://github.com/devigMurilo/climaapp',
    year: '2025',
    status: 'Concluído',
  },
  {
    title: 'Vanilla JS',
    repo: 'vanilla-js',
    description:
      'Laboratório de front-end sem frameworks: manipulação de DOM, eventos e layouts feitos só com HTML, CSS e JavaScript.',
    tags: ['JavaScript', 'CSS', 'DOM'],
    url: 'https://github.com/devigMurilo/vanilla-js',
    year: '2026',
    status: 'Estudo',
  },
  {
    title: 'Cronograma ENEM',
    repo: 'cronogramaEnem',
    description:
      'Cronograma de estudos para o ENEM em página estática, organizando matérias e revisões ao longo das semanas.',
    tags: ['HTML', 'CSS'],
    url: 'https://github.com/devigMurilo/cronogramaEnem',
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
