
type Card = { title: string; body: string };
type SmallCard = { title: string; body: string };
type LargeCard = { title: string; body: string };
type Images = { banner: string; gallery: string[] };


export interface OuterProjectCardProps {
  title: string;
  tagline: string;
  addTitle: string;
  cards: Card[];
  smallCards: SmallCard[];
  largeCard: LargeCard;
  images: Images;
}
