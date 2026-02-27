export interface Team {
  id: number;
  name: string;
  fullName: string;
  base: string;
  teamPrincipal: string;
  chassis: string;
  powerUnit: string;
  firstEntry: number;
  worldChampionships: number;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  number: number;
  teamId: number;
  worldChampionships: number;
  podiums: number;
  points: number;
}

export interface Circuit {
  id: number;
  name: string;
  country: string;
  city: string;
  length: number; // in km
  laps: number;
  firstGrandPrix: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
}

export interface Race {
  id: number;
  name: string;
  circuitId: number;
  date: string;
  round: number;
  season: number;
}

export interface Standing {
  position: number;
  driverId: number;
  points: number;
  wins: number;
}

export interface TeamStanding {
  position: number;
  teamId: number;
  points: number;
  wins: number;
}
