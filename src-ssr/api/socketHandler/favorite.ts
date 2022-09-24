/* eslint-disable one-var */
import { con } from '../../db';

export const handleFavorite = async (productId: string) => {
  try {
    const checkQuery = `SELECT * FROM favorite_items WHERE product_id = "${productId}" AND customer_id = '1644588577755'`,
      allFavQuery = `SELECT * , (SELECT GROUP_CONCAT(image) FROM product_images WHERE product_id = "${productId}") AS images
        FROM
          products tp
        INNER JOIN favorite_items fav ON (fav.product_id = tp.product_id AND fav.customer_id = '1644588577755')
        ORDER BY tp.product_id`,
      addQuery = 'INSERT INTO favorite_items SET ?',
      deleteFav = `DELETE FROM favorite_items WHERE product_id = "${productId}"`,
      newFav = { product_id: productId, customer_id: '1644588577755' },
      [rows] = await con.query(checkQuery);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows.length
      ? await con.query(deleteFav)
      : await con.query(addQuery, newFav);
    const [favItems] = await con.query(allFavQuery);
    return favItems;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};
