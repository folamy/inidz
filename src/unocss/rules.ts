export const theme = () => {
  return {
    colors: {
      primary: '#e96d27',
      // primary: '#FF5200',
      secondary: '#5d5d5b',
      // secondary: '#00AEFF',
      accent: '#AEFF00',
      saccent: '#1C8CE6',
      paccent: '#FFEDD5',
      pdark: '#62412e',
      pdark1: '#442',
      dark: '#1D1D1D',
      'ineed-text': '#282828',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037',
    },
    breakpoints: {
      xs: '0px',
      sm: '599px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
      // xs: '599px',
      // sm: '1023px',
      // md: '1439px',
      // lg: '1919px',
      // xl: '1920px'
    },
  };
};
export const rules = () => {
  return [
    ['test', { border: '1px solid green' }],
    [
      'ishadow',
      {
        'box-shadow':
          '0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f',
      },
    ],
    // @ts-expect-error missing types
    [
      /^grid-minmax-(.+)$/,
      ([, d]) => ({
        'grid-template-columns': `repeat(auto-fit, minmax(${d}, 1fr))`,
      }),
    ],
    // [/^line-clamp-(.+)$/, ([, d]) => ({
    //     display: '-webkit-box',
    //     overflow: 'hidden',
    //     '-webkit-line-clamp': 0,
    //     '-webkit-box-orient': 'vertical',
    //     'text-overflow': 'ellipsis'
    //   })
    // ],

    // theme
    // @ts-expect-error missing types
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
  ];
};

export const shortcuts = () => {
  return {
    ibtn: 'py-2 px-4 font-semibold rounded-md dark:text-white outline-none',
  };
};
