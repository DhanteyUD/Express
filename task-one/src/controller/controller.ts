import express, { Request, Response } from 'express';
import {
  getAllData,
  getDataById,
  create,
  update,
  deleteUser,
} from '../model/model';
import { Data } from '../util';

export async function getPageNotFound(req: Request, res: Response) {
  try {
    res.status(404).end('Page not found');
  } catch (err) {
    console.error(err);
  }
}

export async function getAll(req: Request, res: Response) {
  const data: Data[] = await getAllData();
  if (data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else {
    res.status(404).end('No data entry made, kindly make a post');
  }
}

export async function getById(req: Request, res: Response) {
  const id: number | string = req.params.id;
  const data: Data | undefined = await getDataById(id);
  if (data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Data Not Found' }));
  }
}

export async function createData(req: Request, res: Response) {
  const {
    organization,
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees,
  } = req.body;

  const user: Data = {
    organization,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees,
  };
  const newData: Data = await create(user);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newData));
}

export async function updateData(req: Request, res: Response) {
  const id: number | string = req.params.id;
  const data: Data | undefined = await getDataById(id);
  if (data) {
    const {
      organization,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    } = req.body;

    const user: Data = {
      organization: organization || data.organization,
      createdAt: data.createdAt,
      updatedAt: new Date().toISOString(),
      products: products || data.products,
      marketValue: marketValue || data.marketValue,
      address: address || data.address,
      ceo: ceo || data.ceo,
      country: country || data.country,
      noOfEmployees: noOfEmployees || data.noOfEmployees,
      employees: employees || data.employees,
    };
    const updatedData: Data | undefined = await update(id, user);

    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify(updatedData));
  } else {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'User Not Found' }));
  }
}

export async function deleteData(req: Request, res: Response) {
  const id = req.params.id;
  const data = await getDataById(id);
  if (data) {
    await deleteUser(id);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: `Data ${id} deleted` }));
  } else {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Data Not Found' }));
  }
}
