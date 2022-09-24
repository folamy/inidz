import { con } from '../../db';
import type { Request, Response } from 'express';

export const categories = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM categories`,
      [rows] = await con.query(query);
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};

export const getGender = async (req: Request, res: Response) => {
  try {
    const { gender } = req.query,
      query = gender
        ? `SELECT * FROM gender WHERE id = "${gender}"`
        : 'SELECT * FROM gender',
      [rows] = await con.query(query);
    // return gender ? rows[0] : rows
    res.send(gender ? rows[0] : rows);
  } catch (error) {
    res.send(error);
  }
};
export const groupCategories = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM group_categories`,
      [rows] = await con.query(query);
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM sub_categories`,
      [rows] = await con.query(query);
    // console.log(rows)
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};

export const getNgStates = async (req: Request, res: Response) => {
  try {
    const { stateid } = req.query,
      query = stateid
        ? `SELECT * FROM ng_states WHERE id = "${stateid}"`
        : 'SELECT * FROM ng_states',
      [rows] = await con.query(query);
    res.send(stateid ? rows[0] : rows);
  } catch (error) {
    res.send(error);
  }
};

export const getLga = async (req: Request, res: Response) => {
  try {
    const { stateid, lga } = req.query,
      query = lga
        ? `SELECT * FROM lga WHERE id = "${lga}"`
        : `SELECT * FROM lga WHERE stid = "${stateid}"`,
      [rows] = await con.query(query);

    res.send(lga ? rows[0] : rows);
  } catch (error) {
    res.send(error);
  }
};
