import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [typography, forms],
} satisfies Config