export type NavBarCategory = {
  title: string;
  description?: string;
  link: string;
  contents?: CategoryContent[];
};
export type CategoryContent = {
  content: string;
  description?: string;
  link: string;
};
