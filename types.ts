
export enum GameStage {
  INTRO = 'INTRO',
  MEMORY = 'MEMORY',
  BLOCK_BLAST = 'BLOCK_BLAST',
  CHEST = 'CHEST',
  VICTORY = 'VICTORY'
}

export interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Shape {
  id: number;
  cells: number[][];
  color: string;
}

export interface LootItem {
  id: string;
  name: string;
  type: 'Shard' | 'Permanent';
  description: string;
  rarity: 'Common' | 'Epic' | 'Legendary' | 'Ultimate';
  image: string;
}
