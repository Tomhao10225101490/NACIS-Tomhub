export {
  TEXTBOOK_SHELVES,
  HS_BOOKS,
  getShelf,
  getBook,
  getUnit,
  textbookTotalWords,
} from './meta.js';
import { packs } from '../load.js';

export function getTextbookWords(shelfId, bookId) {
  return (packs.textbookWords[shelfId] || {})[bookId] || [];
}
