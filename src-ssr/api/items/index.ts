import { con } from '../../db';
// import type { Request, Response } from 'express'

export const fetchItems = async (
  req: any,
  res: {
    send: (
      arg0:
        | import('mysql2/typings/mysql/lib/protocol/packets/RowDataPacket')[]
        | import('mysql2/typings/mysql/lib/protocol/packets/RowDataPacket')[][]
        | import('mysql2/typings/mysql/lib/protocol/packets/OkPacket')
        | import('mysql2/typings/mysql/lib/protocol/packets/OkPacket')[]
        | import('mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader')
    ) => void;
  }
) => {
  try {
    const query = `SELECT pt.*, GROUP_CONCAT(pi.image) AS images,
      ct.name AS category, sub_ct.name AS sub_category,
      (SELECT name FROM group_categories WHERE id = pt.group_category AND sub_id = pt.sub_category) AS group_category
        FROM
          products AS pt,
          product_images AS pi,
          categories AS ct,
          sub_categories AS sub_ct
        WHERE
          pt.product_id = pi.product_id 
            AND 
              ct.id = pt.category
            AND
              (pt.sub_category = sub_ct.id AND sub_ct.category_id = ct.id)
        GROUP BY
          pt.product_id`;
    const [rows] = await con.query(query);
    // @ts-expect-error types
    const items = rows.map((item: { images: string }) => {
      // @ts-expect-error types
      item.images = item.images.split(',');
      return item;
    });
    res.send(items);
  } catch (error) {
    res.send(error);
  }
};

export const viewItem = async (
  req: { query: { slug: any } },
  res: { send: (arg0: any) => void }
) => {
  try {
    const { slug } = req.query,
      query = `SELECT products.*, GROUP_CONCAT(product_images.image) AS images
      FROM
        products, product_images
      WHERE products.slug = "${slug}"
      AND
        products.product_id = product_images.product_id
      GROUP BY
        products.product_id`,
      [rows] = await con.query(query),
      item = rows[0];
    // images = rows[0].images.split(',')

    // item.images = images
    res.send(item);
  } catch (error) {
    res.send(error);
  }
};
export const getUserFavs = async (
  req: { session: { customer: { uid: any } } },
  res: { send: (arg0: any) => void }
) => {
  try {
    const { uid } = req.session.customer,
      query = `SELECT tp.*, (SELECT GROUP_CONCAT(image) FROM product_images WHERE product_id = tp.product_id)  AS images
        FROM
          products tp
        LEFT JOIN favorite_items fav ON fav.product_id = tp.product_id
        WHERE fav.customer_id = "${uid}"
        GROUP BY tp.product_id`,
      [rows] = await con.query(query),
      // @ts-expect-error missing types
      items = rows.map((item: { images: string }) => {
        // @ts-expect-error missing types
        item.images = item.images.split(',');
        return item;
      });
    // console.log(items)
    res.send(items);
  } catch (error) {
    res.send(error);
  }
};
export const handleFavorite = async (
  req: { query: { productId: any }; session: { customer: { uid: any } } },
  res: { send: (arg0: any) => void }
) => {
  try {
    const { productId } = req.query,
      { uid } = req.session.customer,
      checkQuery = `SELECT * FROM favorite_items WHERE product_id = "${productId}" AND customer_id = "${uid}"`,
      allFavQuery = `SELECT * , (SELECT GROUP_CONCAT(image) FROM product_images WHERE product_id = "${productId}") AS images
        FROM
          products tp
        INNER JOIN favorite_items fav ON (fav.product_id = tp.product_id AND fav.customer_id = "${uid}")
        ORDER BY tp.product_id`,
      addQuery = 'INSERT INTO favorite_items SET ?',
      deleteFav = `DELETE FROM favorite_items WHERE product_id = "${productId}"`,
      newFav = { product_id: productId, customer_id: uid },
      [rows] = await con.query(checkQuery);

    // @ts-expect-error missing types
    rows.length
      ? await con.query(deleteFav)
      : await con.query(addQuery, newFav);
    const [favItems] = await con.query(allFavQuery),
      // @ts-expect-error missing types
      items = favItems.map((item) => {
        const images = item.images.split(',');
        item.images = images;
        return item;
      });
    // console.log(items)
    res.send(items);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

export const addOrder = async (
  req: { body: { order: any } },
  res: {
    send: (
      arg0:
        | import('mysql2/typings/mysql/lib/protocol/packets/RowDataPacket')[]
        | import('mysql2/typings/mysql/lib/protocol/packets/RowDataPacket')[][]
        | import('mysql2/typings/mysql/lib/protocol/packets/OkPacket')
        | import('mysql2/typings/mysql/lib/protocol/packets/OkPacket')[]
        | import('mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader')
    ) => void;
  }
) => {
  try {
    const order = req.body.order,
      query = 'INSERT INTO order_items SET ?';
    await con.query(query, order).then(([row]) => {
      res.send(row);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrderHistory = async (
  req: { session: { customer: any } },
  res: { send: (arg0: any) => void }
) => {
  try {
    console.log(req.session);
    // if (req.session.customer !== undefined) {
    // const
    //   { email, phoneNumber } = req.session.customer,
    //   query = `SELECT * FROM order_items WHERE email = "${email}" AND phoneNumber = "${phoneNumber}"`,
    //   [rows] = await con.query(query)

    // for (const i in rows) {
    //   const item = rows[i].items.split(',').map(str => {
    //     return str.replace(/\s.*\s\d/, '')
    //   })
    //   console.log(item)
    // }
    // console.log(req.session)
    res.send(req.session.customer);
    // }
  } catch (error) {
    console.log(error);
  }
};
