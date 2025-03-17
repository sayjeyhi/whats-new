
export interface TechnologyShortData {
  slug: string;
  title: string;
  image: string;
}
export interface TechnologyListItem {
  slug: string;
  title: string;
  updated: string;
  formatedDate: string;
  tags: string[];
  description: string;
  image: string;
  excerpt: string;
}

export type TechnologyList = TechnologyListItem[];

export interface TechnologyDetails {
  slug: string;
  title: string;
  updated: string;
  formatedDate: string;
  tags: string[];
  description: string;
  image: string;
  content: string;
  excerpt: string;
  latestVersion: string;
  versionsList: string[];
}

