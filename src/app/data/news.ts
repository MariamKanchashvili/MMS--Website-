export interface NewsItem {
  id: string;
  date: string;
  image: string;
}

// ყველაზე ახალი ყოველთვის პირველი უნდა იყოს
export const NEWS: NewsItem[] = [
  { id: 'n1', date: '2026-09-30', image: 'images/news/n1.webp' },
];