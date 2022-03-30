import { Data, writeDataToFile } from '../util';
import { v4 as uuid } from 'uuid';

let DATA: Data[];

try {
  DATA = require('../../data/database');
} catch (err) {
  console.error('No database available');
}

export function getAllData(): Promise<Data[]> {
  return new Promise((resolve, reject) => {
    try {
      resolve(DATA);
    } catch (err) {
      reject(err);
    }
  });
}

export function getDataById(id: number | string): Promise<Data | undefined> {
  return new Promise((resolve, reject) => {
    if (!DATA) {
      DATA = [];
    }
    const singleData: Data | undefined = DATA.find((e: Data) => e.id === id);
    resolve(singleData);
  });
}

export function create(userData: Data): Promise<Data> {
  return new Promise((resolve, reject) => {
    if (!DATA) {
      DATA = [];
    }
    const newData = { id: uuid(), ...userData };
    DATA.push(newData);
    writeDataToFile('./data/database.json', DATA);
    resolve(newData);
  });
}

export function update(
  id: number | string,
  user: Data
): Promise<Data | undefined> {
  return new Promise((resolve, reject) => {
    const index: number = DATA.findIndex((e: Data) => e.id === id);
    DATA[index] = { id, ...user };
    writeDataToFile('./data/database.json', DATA);
    resolve(DATA[index]);
  });
}

export function deleteUser(id: number | string): Promise<Data | null> {
  return new Promise((resolve, reject) => {
    DATA = DATA.filter((e: Data) => e.id !== id);
    writeDataToFile('./data/database.json', DATA);
    resolve(null);
  });
}
