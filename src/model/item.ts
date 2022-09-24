// export interface Item {
//   name: string
//   product_id: string
//   price: number
//   slug: string
//   images: Array<string>
//   qty?: number
//   description?: string
//   overview?: string
//   category?: string
// }
// export interface Item {
//   name: string
//   product_id: string
//   price: number
//   slug: string
//   images: Array<string>
//   qty?: number
// }

// export interface Category {
//   id: number
//   name: string
// }
// export interface GroupCategory {
//   id: number
//   sub_id: number
//   name: string
// }
// export interface SubCategory {
//   id: number
//   category_id: number
//   name: string
//   group?: Array<GroupCategory>
// }

export interface Item {
  name: string;
  color: string;
  price: number;
  qty: number;
  slug: string;
  description: string;
  overview: string;
  category: number | null;
  sub_category: number | null;
  group_category: number | null;
  images: Blob[] | string[];
  store_id?: string;
  product_id: string;
  qtyInStore?: number | null;
}
export class Product implements Item {
  name = '';
  color = '';
  price = 1;
  qty = 1;
  slug = '';
  description = '';
  overview = '';
  category = null;
  sub_category = null;
  group_category = null;
  images = [];
  store_id = '';
  qtyInStore = null;
  product_id = '';
}

export interface Category {
  id: number;
  name: string;
}
export interface GroupCategory {
  id: number;
  sub_id: number;
  category_id?: number;
  name: string;
}
export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  group?: Array<GroupCategory>;
}

export interface Brands {
  id: number;
  name: string;
  created_at?: Array<GroupCategory>;
}
