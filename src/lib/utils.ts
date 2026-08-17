import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Caminho padrão do shadcn/ui (`@/lib/utils`). Junta classes condicionais com
 * clsx e resolve conflitos do Tailwind com tailwind-merge — sem isso, algo como
 * `cn('px-4', 'px-8')` deixaria as duas na string e o vencedor sairia da ordem
 * do CSS, não do argumento.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
