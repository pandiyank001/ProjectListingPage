export const checkIsMobile = (): boolean => {
    return window.innerWidth < 768;
  };

  export const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "newest", label: "Newest first" },
    { id: "popular", label: "Popular" },
    { id: "price-high", label: "Price: highest to lowest" },
    { id: "price-low", label: "Price: lowest to highest" },
  ];
  