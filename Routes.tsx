export const ROUTES = {
  HOME: "/",
  LOCATIONS: "/locations",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  LOCATIONS: "Локации",
};