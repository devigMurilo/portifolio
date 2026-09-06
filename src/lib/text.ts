export type Token = {
  word: string
  /** Veio de um trecho marcado com *asteriscos* no texto de origem. */
  accent: boolean
}

/**
 * Quebra o texto em palavras marcando quais estavam entre asteriscos, para que
 * um trecho como `por trás do *código*` possa sair em outra fonte sem precisar
 * de JSX no meio do conteúdo. O marcador aceita mais de uma palavra
 * (`*dia a dia*`).
 *
 * A divisão é por espaço, e não pelos marcadores, de propósito: em
 * `*ponta a ponta*, do modelo` a vírgula fica colada em `ponta`. Se o corte
 * fosse no asterisco, ela viraria uma palavra solta e ganharia um espaço antes.
 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  let inside = false

  for (const raw of text.split(/\s+/)) {
    if (!raw) continue

    let word = raw
    let accent = inside

    if (word.startsWith('*')) {
      accent = true
      inside = true
      word = word.slice(1)
    }

    // Fechamento pode vir no fim ou antes da pontuação (`ponta*,`).
    if (word.includes('*')) {
      accent = true
      inside = false
      word = word.replace('*', '')
    }

    if (word) tokens.push({ word, accent })
  }

  return tokens
}

/** Mesmo texto sem os marcadores, para `aria-label` e afins. */
export function stripAccents(text: string) {
  return text.replace(/\*/g, '')
}
