export const profile = {
  name: 'Igor Murilo',
  handle: 'devigMurilo',
  role: 'Desenvolvedor Full Stack',
  headline: 'Estudante do técnico em Informática para Internet no IFRN-SPP',
  location: 'Rio Grande do Norte, Brasil',
  email: 'igormurilo.ac.21@gmail.com',
  github: 'https://github.com/devigMurilo',
  linkedin: 'https://www.linkedin.com/in/igor-murilo-68a487386',
  instagram: 'https://instagram.com/_imurilo',
  instagramHandle: '@_imurilo',
  /** Só dígitos, com DDI e DDD (ex.: '5584999999999'). Vazio esconde o botão. */
  whatsapp: '5584991488921',
  avatar: 'https://github.com/devigMurilo.png',
  /**
   * PDF servido de `public/`. O caminho é relativo por causa do `base: './'`
   * do Vite, igual ao favicon. O `download` no link define o nome do arquivo
   * salvo pelo visitante.
   */
  resume: './Igor_Murilo_Resume.pdf',
  bio: [
    'Construo aplicações web de *ponta a ponta*, do modelo no banco até a interface. Meu foco atual é Python/Django no back-end e React no front-end.',
    'Hoje faço o técnico em Informática para Internet no IFRN campus São Paulo do Potengi, onde a maior parte dos meus projetos nasce: integrações com API REST, sistemas de agendamento e controle financeiro.',
    'Fora do curso, o que me puxa é *IA aplicada*: sou entusiasta de LLMs e de automação de processos: tirar do dia a dia a tarefa repetitiva que ninguém deveria estar fazendo à mão.',
  ],
  stats: [
    { label: 'Repositórios públicos', value: '15+' },
    { label: 'Anos programando', value: '2' },
    { label: 'Stack principal', value: 'Django + React' },
  ],
} as const

/**
 * Copy da seção comercial. É argumento de venda, não dado do GitHub — por isso
 * mora aqui, separado, para ser reescrito sem mexer em componente.
 */
export const pitch = {
  eyebrow: 'Para empresas',
  title: 'Cada dia fora da internet é um cliente que escolhe *outro*',
  intro:
    'Quem procura o seu serviço pesquisa antes de ligar. Se não encontra você, ou encontra uma página parada desde 2019, encontra o seu concorrente. E decide ali, sem te dar chance de responder.',

  /** O problema, na linguagem de quem perde dinheiro com ele. */
  losses: [
    {
      title: 'Procuram você e não acham',
      description:
        'Alguém ouviu falar do seu trabalho e digitou o nome no Google. Sem site, o resultado é um perfil incompleto, um mapa desatualizado ou nada. A busca não para aí: ela continua até achar alguém.',
    },
    {
      title: 'Preço vira o único argumento',
      description:
        'Sem um lugar que mostre o que você faz e como faz, o cliente não tem como comparar qualidade. Sobra comparar por preço, e sempre existe alguém disposto a cobrar menos.',
    },
    {
      title: 'Você trabalha de sistema',
      description:
        'Horário, valor, endereço, disponibilidade, forma de pagamento: as mesmas perguntas respondidas uma por uma no WhatsApp. É tempo que sai do seu dia e atendimento que você perde enquanto digita.',
    },
    {
      title: 'O concorrente parece maior',
      description:
        'Duas empresas do mesmo tamanho, uma com site e outra sem. Na primeira olhada, quem tem site parece mais estruturado, mais seguro e mais caro, no bom sentido.',
    },
  ],

  /** A resposta, ancorada no que já foi construído e está no ar. */
  answerTitle: 'Site não é enfeite. É a parte do negócio que trabalha sozinha',
  answerIntro:
    'Não entrego uma página bonita e parada. Entrego a coisa funcionando: o cliente entra, entende o que você faz, confia e age sem passar por você.',
  answers: [
    {
      title: 'Agendamento que roda sem você',
      description:
        'O cliente vê os horários livres e reserva sozinho, de madrugada se quiser. Já está no ar numa barbearia.',
      proof: 'Dom Feliciano',
      href: 'https://dom-feliciano.vercel.app',
    },
    {
      title: 'Conversa com o que você já usa',
      description:
        'Integro sistemas por API: puxo dados de onde eles já estão em vez de te fazer digitar tudo de novo.',
      proof: 'SuapHub · API do SUAP',
      href: 'https://github.com/devigMurilo/Integra-o_Suap',
    },
    {
      title: 'Publicado onde fizer sentido para o seu caso',
      description:
        'Site institucional vai para a Vercel: carrega rápido no celular e não gera conta de hospedagem no fim do mês. Quando o projeto pede mais controle, subo em nuvem (AWS e afins) com o servidor instalado e configurado por mim, do zero.',
      proof: 'Dragon Ball Z Explorer',
      href: 'https://pos-2026-projeto01.vercel.app',
    },
    {
      title: 'Back-end de verdade quando precisa',
      description:
        'Se o seu caso pede cadastro, painel e banco de dados modelado, eu construo: Django e Python, não só a fachada.',
      proof: 'BE-Desk',
      href: 'https://github.com/WallisonAndre/BE-Desk',
    },
  ],

  /** Por que comigo, sem números inventados: só o que é verificável. */
  whyMe: [
    'Você fala direto com quem escreve o código, nada de atendente no meio repassando recado.',
    'Todo projeto meu é público: dá para abrir o código e ver como foi feito antes de me contratar.',
    'Faço front-end e back-end, então o site inteiro é responsabilidade de uma pessoa só.',
    'Cuido também de onde o site vive: instalação e configuração de servidor, nuvem e domínio. Você não fica procurando outra pessoa para pôr no ar.',
    'Começo pelo problema do seu negócio, não pelo template.',
  ],

  ctaTitle: 'Me conta o que a sua empresa faz',
  ctaText:
    'Explica em duas linhas o que você vende e como o cliente chega hoje até você. Eu respondo dizendo o que dá para resolver com um site e o que não dá.',
} as const

export type Skill = {
  name: string
  category: 'Back-end' | 'Front-end' | 'Dados' | 'Infra' | 'IA no fluxo de trabalho' | 'Ferramentas'
}

export const skills: Skill[] = [
  { name: 'Python', category: 'Back-end' },
  { name: 'Django', category: 'Back-end' },
  { name: 'Django REST Framework', category: 'Back-end' },
  { name: 'Node.js', category: 'Back-end' },
  { name: 'JavaScript', category: 'Front-end' },
  { name: 'React', category: 'Front-end' },
  { name: 'HTML5', category: 'Front-end' },
  { name: 'CSS3', category: 'Front-end' },
  { name: 'MySQL', category: 'Dados' },
  { name: 'PostgreSQL', category: 'Dados' },
  { name: 'MariaDB', category: 'Dados' },
  { name: 'Google Cloud', category: 'Infra' },
  { name: 'Servidores', category: 'Infra' },
  { name: 'Vercel', category: 'Infra' },
  { name: 'Claude', category: 'IA no fluxo de trabalho' },
  { name: 'Git & GitHub', category: 'Ferramentas' },
  { name: 'Docker', category: 'Ferramentas' },
]

/**
 * Linha opcional embaixo do título de uma categoria. Existe para a categoria de
 * IA: nome de ferramenta solto não diz nada: o que conta é onde ela entra no
 * trabalho e o que continua sendo decisão minha.
 */
export const categoryNotes: Partial<Record<Skill['category'], string>> = {
  'IA no fluxo de trabalho':
    'Uso para revisar código, cortar boilerplate e destravar bug. Arquitetura, decisão técnica e revisão final continuam minhas: não entrego código que eu não saiba explicar linha por linha.',
}

export const marqueeStack = [
  'Python',
  'Django',
  'Django REST',
  'JavaScript',
  'React',
  'Node.js',
  'HTML5',
  'CSS3',
  'MySQL',
  'PostgreSQL',
  'MariaDB',
  'Google Cloud',
  'Servidores',
  'Docker',
  'Claude',
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
      'Barbearia clássica com agendamento online: o cliente escolhe o serviço, vê os horários livres e reserva só com o nome, sem cadastro nem senha. Construído em Next.js.',
    tags: ['Next.js', 'React', 'TypeScript'],
    kind: 'Deploy',
    liveUrl: 'https://dom-feliciano.vercel.app',
    featured: true,
    year: '2026',
    status: 'Concluído',
  },
  {
    title: 'Dragon Ball Z Explorer',
    subtitle: 'pos-2026-projeto01.vercel.app',
    description:
      'Projeto da unidade 02 de Programação Orientada a Serviços: consome a Dragon Ball API e, para o personagem escolhido, mostra raça, ki, afiliação, o planeta de origem e a lista de transformações.',
    tags: ['JavaScript', 'Vite', 'API REST'],
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
