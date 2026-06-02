export type FormStatus = "published" | "draft" | "generating"

export type EduForm = {
  id: string
  title: string
  subject: string
  grade: string
  questions: number
  difficulty: "Fácil" | "Média" | "Difícil"
  status: FormStatus
  createdAt: string
}

export const recentForms: EduForm[] = [
  {
    id: "f-1024",
    title: "Citologia e organelas celulares",
    subject: "Biologia",
    grade: "1º ano EM",
    questions: 10,
    difficulty: "Média",
    status: "published",
    createdAt: "2026-05-28",
  },
  {
    id: "f-1023",
    title: "Revolução Industrial",
    subject: "História",
    grade: "8º ano",
    questions: 15,
    difficulty: "Média",
    status: "published",
    createdAt: "2026-05-27",
  },
  {
    id: "f-1022",
    title: "Equações de 2º grau",
    subject: "Matemática",
    grade: "9º ano",
    questions: 12,
    difficulty: "Difícil",
    status: "draft",
    createdAt: "2026-05-26",
  },
  {
    id: "f-1021",
    title: "Present Perfect Tense",
    subject: "Inglês",
    grade: "2º ano EM",
    questions: 8,
    difficulty: "Fácil",
    status: "published",
    createdAt: "2026-05-24",
  },
  {
    id: "f-1020",
    title: "Sistema solar e planetas",
    subject: "Ciências",
    grade: "6º ano",
    questions: 10,
    difficulty: "Fácil",
    status: "draft",
    createdAt: "2026-05-22",
  },
  {
    id: "f-1019",
    title: "Figuras de linguagem",
    subject: "Português",
    grade: "3º ano EM",
    questions: 14,
    difficulty: "Difícil",
    status: "published",
    createdAt: "2026-05-20",
  },
]

export const stats = [
  { label: "Formulários criados", value: "48", change: "+12%", trend: "up" as const },
  { label: "Perguntas geradas", value: "562", change: "+8%", trend: "up" as const },
  { label: "Publicados no Forms", value: "31", change: "+5%", trend: "up" as const },
  { label: "Respostas coletadas", value: "1.284", change: "+23%", trend: "up" as const },
]

export const activityData = [
  { month: "Jan", forms: 4 },
  { month: "Fev", forms: 7 },
  { month: "Mar", forms: 5 },
  { month: "Abr", forms: 11 },
  { month: "Mai", forms: 9 },
  { month: "Jun", forms: 12 },
]

export const statusLabels: Record<FormStatus, string> = {
  published: "Publicado",
  draft: "Rascunho",
  generating: "Gerando",
}

export type GeneratedQuestion = {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export const sampleGeneratedQuestions: GeneratedQuestion[] = [
  {
    id: "q1",
    question: "Qual organela é responsável pela produção de energia na célula?",
    options: ["Mitocôndria", "Ribossomo", "Lisossomo", "Complexo de Golgi"],
    correctIndex: 0,
  },
  {
    id: "q2",
    question: "O cloroplasto está presente em quais tipos de células?",
    options: ["Células animais", "Células vegetais", "Bactérias", "Vírus"],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "Qual estrutura controla a entrada e saída de substâncias da célula?",
    options: ["Parede celular", "Núcleo", "Membrana plasmática", "Citoplasma"],
    correctIndex: 2,
  },
  {
    id: "q4",
    question: "Onde está localizado o material genético em células eucariontes?",
    options: ["Citoplasma", "Núcleo", "Mitocôndria", "Membrana"],
    correctIndex: 1,
  },
  {
    id: "q5",
    question: "Qual organela realiza a síntese de proteínas?",
    options: ["Ribossomo", "Lisossomo", "Vacúolo", "Centríolo"],
    correctIndex: 0,
  },
]
