import { defineConfig } from 'vite-plugin-windicss'
import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.no-scrollbar': {
          scrollbarWidth: 'none'
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        }
      }
      addUtilities(newUtilities)
    }),
    plugin(
      ({ addUtilities, addDynamic }) => {
        addUtilities(
          {
            '.aspect-square': {
              'aspect-ratio': '1 / 1'
            }
          },
          { layer: 'components' }
        )
        addDynamic(
          'aspect',
          ({ Utility, Style }) => {
            // aspect-h/w
            const value = Utility.handler.handleFraction().value
            if (value) {
              return Style.generate(Utility.class, {
                aspectRatio: `${parseFloat(value)} / 100`
              })
            }
          },
          {
            layer: 'components',
            group: 'aspectRatio',
            completions: ['aspect-{fraction}']
          }
        )
      },
      {
        theme: {
          aspectRatio: {}
        },
        variants: {
          aspectRatio: ['responsive']
        }
      }
    )
  ],
  theme: {
    extend: {
      colors: {
        'btn-white': '#edf2f4',
        'btn-white-shadow': '#949799',
        'btn-white-active': '#cfd4d6',
        'btn-white-font': '#000000',

        'btn-yellow': '#fca311',
        'btn-yellow-shadow': '#9e660b',
        'btn-yellow-active': '#dd8f0f',
        'btn-yellow-font': '#fee8c4',

        'btn-red': '#d90429',
        'btn-red-shadow': '#88031a',
        'btn-red-active': '#be0424',
        'btn-red-font': '#f6c0ca',

        'btn-blue': '#14213d',
        'btn-blue-shadow': '#0d1526',
        'btn-blue-active': '#121d35',
        'btn-blue-font': '#ffffff'
      },
      transitionTimingFunction: {
        'btn-in': 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        'btn-out': 'cubic-bezier(0.3, 0.7, 0.4, 1.5)'
      }
    },
    fontFamily: {
      viga: ['Viga'],
      teko: ['Teko']
    }
  },

  safelist: [
    ['white', 'yellow', 'red', 'blue'].map((c) => {
      return `bg-btn-${c} group-active:bg-btn-${c}-active text-btn-${c}-font bg-btn-${c}-shadow`
    })
  ]
})
