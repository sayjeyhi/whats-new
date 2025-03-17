export const getTechnologyCanonical = (slug: string) => {
  return `/technology/${slug}`;
};

export const getTechnologyVersionCanonical = (
  slug: string,
  version: string
) => {
  return `/technology/${slug}/${version
    .replace(/\s/g, "-")
    .replace(/[^0-9]/g, "")
  }`;
};
