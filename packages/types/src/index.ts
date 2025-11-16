export interface Mission {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives?: string | null;
  zone?: string | null;
  expansion?: string | null;
  coords?: any;
  youtubeId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchQuery {
  q: string;
  limit?: number;
}
