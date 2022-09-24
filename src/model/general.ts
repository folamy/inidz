import { RouteLocationRaw } from 'vue-router';

export interface StateInterface {
  name: string;
  id: number;
}
export interface LgaInterface {
  name: string;
  sid: number;
  id: number;
}
export interface linksType {
  label?: string;
  route: RouteLocationRaw;
  action?: () => void;
}

export interface Crumbs {
  title: string;
  to: RouteLocationRaw;
}
