import { IGraph } from '../types';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getGraphData() {
  const graphData: IGraph[] = [];
  const maxAmound = 100;
  for (let i = 0; i < 30; i++) {
    const res = {} as IGraph;
    res.amount = getRandomInt(0, maxAmound);
    res.date = i + 1;

    graphData.push(res);
  }
  return graphData;
}
