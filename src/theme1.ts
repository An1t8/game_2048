export const theme = {
  tile: {
    high:    "#ffd43b", // Vyšší dlaždice
    low:     "#eaddd7", // Nižší dlaždice
    normal:  "#fd7e14", // Normální dlaždice
    empty:   "#ced4da", // Prázdná dlaždice
    background: "#e9ecef", // Pozadí dlaždic
  },
  game: {
    background: "#ffffff", // Defaultní pozadí hry
    score:      "#eebefa", // Score a Best
  },
 
  states: {
    loseBackground: "#9775fa", // Pozadí při prohře
    winBackground:  "#fcc2d7", // Pozadí při výhře
  },
 
  buttons: {
    newGame: "#40c057", // Tlačítko Nová hra
    playAgain: "#fa5252", // Tlačítko Hrát znovu
    restart:  "#ffa94d", // Tlačítko pro Restart
  },
} as const;
 
export type Theme = typeof theme;