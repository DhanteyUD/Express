const taskOne = (passengers: number, shuffle: number) => {
  if (passengers < 1) {
    throw "passsengers can't be less than 1";
  }
  if (passengers === null) {
    throw "passsengers can't be empty";
  }

  const boarded: object[] = [];
  const reservation: object[] = [];
  const locations: string[] = ['Abuja', 'Benue', 'Lagos', 'Katsina', 'Sambisa'];
  let tripCount: number = 0;
  let count: number = 1;

  // Equal passengers to each location...
  const noOfPassengers = passengers - (passengers % 5);

  // Passenger to get boarded...
  for (let i = 0; i < noOfPassengers; i++) {
    let num = i % locations.length;
    boarded.push({ name: `passenger${i + 1}`, location: `${locations[num]}` });
  }
  // Passengers to get be in reservation...
  let reserved = passengers % 5;
  for (let i = 0; i < reserved; i++) {
    reservation.push({
      name: `passenger${i + noOfPassengers + 1}`,
      location: `${locations[i]}`,
    });
  }
  // To get count...
  while (passengers > 50 && shuffle > 0) {
    count++;
    passengers -= 50;
    shuffle--;
  }
  let grouped = [...boarded];
  let board = boarded.splice(50 * (count - 1), 50);

  let reserve = grouped.splice(grouped.indexOf(board[board.length - 1]) + 1);

  return {
    boarded: board,
    reservation: reserve.concat(reservation),
    count: passengers < 5 ? tripCount : count,
  };
};

export default taskOne;

console.log(taskOne(10, 4));
console.log(taskOne(14, 4));
console.log(taskOne(55, 4));
console.log(taskOne(4, 4));
console.log(taskOne(50, 0));
