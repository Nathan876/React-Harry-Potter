export const House = {
  Gryffindor: 'Gryffindor',
  Hufflepuff: 'Hufflepuff',
  Ravenclaw: 'Ravenclaw',
  Slytherin: 'Slytherin',
  Accessible: 'Accessible',
} as const;

export type House = typeof House[keyof typeof House];