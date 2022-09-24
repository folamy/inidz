import { Item } from '../model/item';
export function toNaira(figure: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(figure);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function deliveryCharge(price: number, decimal?: number) {
  const percent =
      price >= 100000
        ? 3.5
        : price >= 50000
        ? 5.3
        : price >= 20000
        ? 6.65
        : price >= 15000
        ? 7.48
        : price >= 10000
        ? 8.65
        : 58.45,
    percentage = (percent / 100) * price;
  // dec = decimal || 2
  // console.log(percent)
  return Number(Math.round(percentage));
}

export const useGenUid = () => Date.now().toString();

export const reference = () => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const metaData = (cartItems: Array<Item>, additionalInfo: string) => {
  let disc = '';
  for (let i = 0; i < cartItems.length; i++) {
    const item: Item = cartItems[i],
      commaSpace = cartItems.length - (i + 1) !== 0 ? ', ' : '';
    disc += `${item.qty}X ${item.name}${commaSpace}`;
  }
  return {
    // additionalInfo,
    custom_fields: [
      {
        display_name: 'Ordered items',
        variable_name: 'ordered_items',
        value: disc,
      },
      {
        display_name: 'Additional Instruction',
        variable_name: 'additionalInfo',
        value: additionalInfo,
      },
    ],
  };
};

export const slugify = (toSlug: string) => {
  const from =
      'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;',
    to =
      'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';

  let str = toSlug;
  // Remove accents, swap ñ for n, etc
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return (
    str
      .toLowerCase()
      .replace(/^\s+|\s+$/g, '')
      // Remove invalid chars
      .replace(/[^a-z0-9 -]/g, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-')
  );
};
