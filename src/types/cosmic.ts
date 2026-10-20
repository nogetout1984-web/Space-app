/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MoonData {
  id: string;
  name: string;
  designation: string;
  radiusKm: number;
  orbitDistanceKm: number;
  orbitalPeriodDays: number;
  eccentricity: number;
  composition: string;
  color: string;
  features: string[];
  badges: string[]; // e.g. 'Ocean World', 'Tidally Locked', 'Cryovolcanoes'
  overview: string;
  scale3d: number;
  orbitRadius3d: number;
  orbitSpeed: number;
}

export interface AtmosphereComponent {
  gas: string;
  percentage: number;
  formula: string;
}

export interface PlanetData {
  id: string;
  name: string;
  order: string;
  type: string; // 'Terrestrial' | 'Gas Giant' | 'Ice Giant'
  diameterKm: number;
  massKg: string;
  gravityMps2: number;
  escapeVelocityKmS: number;
  meanTempC: string;
  dayLengthHours: number;
  yearLengthDays: number;
  orbitalDistanceAU: number;
  orbitalSpeedKmS: number;
  axialTiltDeg: number;
  atmospherePressureBar: string;
  atmosphere: AtmosphereComponent[];
  description: string;
  funFact: string;
  explorationMilestones: string[];
  moons: MoonData[];
  scale3d: number;
  hasRings?: boolean;
  ringsInnerRadius?: number;
  ringsOuterRadius?: number;
  primaryColor: string;
  accentColor: string;
}

export interface SatelliteData {
  id: string;
  name: string;
  acronym: string;
  category: 'LEO' | 'MEO' | 'GEO' | 'Deep Space / L2';
  launchYear: number;
  altitudeKm: string;
  velocityKmH: string;
  orbitalPeriod: string;
  massKg: string;
  operator: string;
  purpose: string;
  description: string;
  keyInstruments: string[];
  scientificImpact: string;
  modelType: 'iss' | 'jwst' | 'hubble' | 'voyager' | 'gps' | 'starlink';
}

export interface RocketStageInfo {
  step: number;
  title: string;
  subtitle: string;
  event: string;
  altitudeKm: number;
  velocityKmS: number;
  gForce: number;
  qDynamicPressureKPa: number;
  fuelPercentage: number;
  description: string;
  actionInstruction: string;
}
