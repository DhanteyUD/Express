import taskOne from '../task/app';
import { prefilled } from './mock';

describe('Test for function structure', () => {
  it('Returns an object for even distro - 1', () => {
    let passengers = 5;
    let shuffle = 3;
    expect(taskOne(passengers, shuffle)).toBeInstanceOf(Object);
  });

  it('Returns an object for even distro - 2', () => {
    let passengers = 50;
    let shuffle = 0;
    expect(taskOne(passengers, shuffle)).toHaveProperty('boarded');
    expect(taskOne(passengers, shuffle)).toHaveProperty('reservation');
    expect(taskOne(passengers, shuffle)).toHaveProperty('count');
  });

  it('function is been called with 2 arguments', () => {
    let passengers = 10;
    let shuffle = 3;
    const func = jest.fn(taskOne);
    func(passengers, shuffle);
    expect(func).toHaveBeenCalledWith(passengers, shuffle);
    expect(func).toHaveBeenCalledTimes(1);
  });
});

describe('Test for function expected value', () => {
  it('Returns evenly distributed values for boarded', () => {
    let passengers = 15;
    let shuffle = 0;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(15);
    expect(expected.reservation.length).toBe(0);
    expect(expected.count).toBe(1);
  });

  it('Returns reservation list for uneven distro - 1', () => {
    let passengers = 52;
    let shuffle = 0;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(50);
    expect(expected.boarded[49]).toStrictEqual({
      name: 'passenger50',
      location: expect.any(String),
    });
    expect(expected.reservation.length).toBe(2);
  });

  it('Returns reservation list for uneven distro - 2', () => {
    let expected = taskOne(4, 4);
    expect(expected.reservation).toHaveLength(4);
  });

  it('Passengers does not exceed 50', () => {
    let passengers = 60;
    let shuffle = 0;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(50);
    expect(expected.reservation.length).toBe(10);
    expect(expected.count).toBe(1);
  });
});

describe('test for shuffle', () => {
  it('Single shuffle works ', () => {
    let passengers = 60;
    let shuffle = 1;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(10);
    expect(expected.reservation.length).toBe(0);
    expect(expected.count).toBe(2);
  });

  it('Single shuffle works - structure', () => {
    let expected = taskOne(55, 1);
    let board = [
      { name: 'passenger51', location: 'Abuja' },
      { name: 'passenger52', location: 'Benue' },
      { name: 'passenger53', location: 'Lagos' },
      { name: 'passenger54', location: 'Katsina' },
      { name: 'passenger55', location: 'Sambisa' },
    ];
    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(2);
  });

  it('first multiple shuffle works ', () => {
    let passengers = 60;
    let shuffle = 3;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(10);
    expect(expected.reservation.length).toBe(0);
    expect(expected.count).toBe(2);
  });

  it('first multiple shuffle works - structure', () => {
    let expected = taskOne(105, 2);

    let board = [
      { name: 'passenger101', location: 'Abuja' },
      { name: 'passenger102', location: 'Benue' },
      { name: 'passenger103', location: 'Lagos' },
      { name: 'passenger104', location: 'Katsina' },
      { name: 'passenger105', location: 'Sambisa' },
    ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(3);
  });

  it('second multiple shuffle works ', () => {
    let passengers = 150;
    let shuffle = 3;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(50);
    expect(expected.reservation.length).toBe(0);
    expect(expected.count).toBe(3);
  });

  it('second multiple shuffle works - structure', () => {
    let expected = taskOne(155, 3);

    let board = [
      { name: 'passenger151', location: 'Abuja' },
      { name: 'passenger152', location: 'Benue' },
      { name: 'passenger153', location: 'Lagos' },
      { name: 'passenger154', location: 'Katsina' },
      { name: 'passenger155', location: 'Sambisa' },
    ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(4);
  });

  it('third multiple shuffle works ', () => {
    let passengers = 210;
    let shuffle = 3;
    const expected = taskOne(passengers, shuffle);
    expect(expected.boarded.length).toBe(50);
    expect(expected.reservation.length).toBe(10);
    expect(expected.count).toBe(4);
  });

  it('third multiple shuffle works - structure', () => {
    let expected = taskOne(205, 4);

    let board = [
      { name: 'passenger201', location: 'Abuja' },
      { name: 'passenger202', location: 'Benue' },
      { name: 'passenger203', location: 'Lagos' },
      { name: 'passenger204', location: 'Katsina' },
      { name: 'passenger205', location: 'Sambisa' },
    ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(5);
  });
});

describe('test for boarded value', () => {
  let passengers = 50;
  let shuffle = 0;

  const expected = taskOne(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});
