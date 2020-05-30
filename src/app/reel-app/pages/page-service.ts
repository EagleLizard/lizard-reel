
export enum PAGE_ENUM {
  HOME = 'HOME',
  SETUP = 'SETUP',
  REEL = 'REEL',
}

interface Page {
  key: PAGE_ENUM,
  label: string,
  route: string,
}

export const HOME_PAGE: Page = {
  key: PAGE_ENUM.HOME,
  label: 'Welcome',
  route: '/home',
};

export const SETUP_PAGE: Page = {
  key: PAGE_ENUM.SETUP,
  label: 'Setup Page',
  route: '/setup',
};

export const REEL_PAGE: Page = {
  key: PAGE_ENUM.REEL,
  label: 'Reel Wheel',
  route: '/reel',
}

export const PAGES: Page[] = [
  HOME_PAGE,
  SETUP_PAGE,
];
