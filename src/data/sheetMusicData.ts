import { TenorSheetMusic } from '../types/masterclass';
import { SHEET_MUSIC_PART_1 } from './sheetMusicStandardsPart1';
import { SHEET_MUSIC_PART_2 } from './sheetMusicStandardsPart2';

export const TENOR_SHEET_MUSIC_CATALOG: TenorSheetMusic[] = [
  ...SHEET_MUSIC_PART_1,
  ...SHEET_MUSIC_PART_2
];
