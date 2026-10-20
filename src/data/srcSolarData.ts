/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SrcMoonItem {
  id: string;
  name: string;
  color: number;
  hexColor: string;
  radius: number;
  distance: number;
  speed: number;
  info: string;
  image: string;
  radiusKm: string;
  orbitalPeriod: string;
}

export interface SrcPlanetItem {
  id: string;
  name: string;
  color: number;
  hexColor: string;
  radius: number;
  distance: number;
  speed: number;
  hasRing?: boolean;
  image: string;
  description: string;
  diameterKm: string;
  gravity: string;
  tempRange: string;
  orbitalPeriod: string;
  distanceAU: string;
  moons: SrcMoonItem[];
}

export const SRC_SOLAR_DATA: SrcPlanetItem[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: 0x9e9e9e,
    hexColor: '#9e9e9e',
    radius: 1.2,
    distance: 14,
    speed: 0.018,
    image: 'https://images-assets.nasa.gov/image/PIA16853/PIA16853~orig.jpg',
    description:
      'The smallest and innermost planet in the Solar System. Mercury possesses a massive iron core accounting for roughly 85% of its radius and experiences extreme surface temperature swings from -180°C to 430°C.',
    diameterKm: '4,879 km',
    gravity: '3.70 m/s²',
    tempRange: '-180°C to +430°C',
    orbitalPeriod: '87.97 Days',
    distanceAU: '0.39 AU',
    moons: [],
  },
  {
    id: 'venus',
    name: 'Venus',
    color: 0xe3bb76,
    hexColor: '#e3bb76',
    radius: 1.9,
    distance: 22,
    speed: 0.014,
    image: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg',
    description:
      'Shrouded by thick clouds of sulfuric acid and a dense carbon dioxide atmosphere, Venus experiences a runaway greenhouse effect making it the hottest planetary surface in the Solar System at 475°C.',
    diameterKm: '12,104 km',
    gravity: '8.87 m/s²',
    tempRange: '+475°C (Mean)',
    orbitalPeriod: '224.70 Days',
    distanceAU: '0.72 AU',
    moons: [],
  },
  {
    id: 'earth',
    name: 'Earth',
    color: 0x2b82c9,
    hexColor: '#2b82c9',
    radius: 2.1,
    distance: 32,
    speed: 0.011,
    image: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg',
    description:
      'An ocean world with a dynamic magnetosphere, active plate tectonics, and a nitrogen-oxygen atmosphere supporting complex biosphere systems.',
    diameterKm: '12,742 km',
    gravity: '9.81 m/s²',
    tempRange: '-89°C to +57°C',
    orbitalPeriod: '365.25 Days',
    distanceAU: '1.00 AU',
    moons: [
      {
        id: 'luna',
        name: 'Moon (Luna)',
        color: 0xd1d5db,
        hexColor: '#d1d5db',
        radius: 0.45,
        distance: 4.2,
        speed: 0.035,
        info: "Tidally locked natural satellite stabilizing Earth's axial tilt and driving planetary ocean tides.",
        image: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001982/GSFC_20171208_Archive_e001982~orig.jpg',
        radiusKm: '1,737.4 km',
        orbitalPeriod: '27.3 Days',
      },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    color: 0xc1440e,
    hexColor: '#c1440e',
    radius: 1.6,
    distance: 43,
    speed: 0.009,
    image: 'https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg',
    description:
      'Home to Olympus Mons and Valles Marineris, Mars is a cold desert world with polar ice caps, iron oxide dust storms, and ancient river delta formations.',
    diameterKm: '6,779 km',
    gravity: '3.72 m/s²',
    tempRange: '-140°C to +20°C',
    orbitalPeriod: '686.98 Days',
    distanceAU: '1.52 AU',
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        color: 0x8d8070,
        hexColor: '#8d8070',
        radius: 0.3,
        distance: 3.2,
        speed: 0.055,
        info: 'Innermost Martian moon orbiting closer to its primary than any other known planetary moon.',
        image: 'https://images-assets.nasa.gov/image/PIA10368/PIA10368~orig.jpg',
        radiusKm: '11.27 km',
        orbitalPeriod: '7.65 Hours',
      },
      {
        id: 'deimos',
        name: 'Deimos',
        color: 0x9c8f80,
        hexColor: '#9c8f80',
        radius: 0.25,
        distance: 4.5,
        speed: 0.032,
        info: 'Small, heavily cratered outer moon gradually spiraling away from Mars.',
        image: 'https://images-assets.nasa.gov/image/PIA11826/PIA11826~orig.jpg',
        radiusKm: '6.2 km',
        orbitalPeriod: '30.3 Hours',
      },
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: 0xd39c7e,
    hexColor: '#d39c7e',
    radius: 4.2,
    distance: 60,
    speed: 0.006,
    image: 'https://images-assets.nasa.gov/image/PIA22946/PIA22946~orig.jpg',
    description:
      'The largest gas giant in the Solar System, composed primarily of hydrogen and helium with powerful jet streams, auroras, and the anticyclonic Great Red Spot.',
    diameterKm: '139,820 km',
    gravity: '24.79 m/s²',
    tempRange: '-110°C (Cloud Deck)',
    orbitalPeriod: '11.86 Years',
    distanceAU: '5.20 AU',
    moons: [
      {
        id: 'io',
        name: 'Io',
        color: 0xfacc15,
        hexColor: '#facc15',
        radius: 0.5,
        distance: 6.2,
        speed: 0.06,
        info: 'The most volcanically active body in the Solar System, heated by intense Jovian tidal flexing.',
        image: 'https://images-assets.nasa.gov/image/PIA02308/PIA02308~orig.jpg',
        radiusKm: '1,821.6 km',
        orbitalPeriod: '1.77 Days',
      },
      {
        id: 'europa',
        name: 'Europa',
        color: 0xe2e8f0,
        hexColor: '#e2e8f0',
        radius: 0.46,
        distance: 7.6,
        speed: 0.045,
        info: 'Silicate rock moon encased in a striated water-ice crust over a global subsurface saltwater ocean.',
        image: 'https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg',
        radiusKm: '1,560.8 km',
        orbitalPeriod: '3.55 Days',
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        color: 0x94a3b8,
        hexColor: '#94a3b8',
        radius: 0.62,
        distance: 9.2,
        speed: 0.032,
        info: 'Largest moon in the Solar System and the only known satellite with its own internally generated magnetosphere.',
        image: 'https://images-assets.nasa.gov/image/PIA00716/PIA00716~orig.jpg',
        radiusKm: '2,634.1 km',
        orbitalPeriod: '7.15 Days',
      },
      {
        id: 'callisto',
        name: 'Callisto',
        color: 0x64748b,
        hexColor: '#64748b',
        radius: 0.55,
        distance: 10.8,
        speed: 0.022,
        info: "Ancient, heavily cratered icy world outside Jupiter's main radiation belt.",
        image: 'https://images-assets.nasa.gov/image/PIA03456/PIA03456~orig.jpg',
        radiusKm: '2,410.3 km',
        orbitalPeriod: '16.69 Days',
      },
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: 0xe6c88a,
    hexColor: '#e6c88a',
    radius: 3.5,
    distance: 80,
    speed: 0.0045,
    hasRing: true,
    image: 'https://images-assets.nasa.gov/image/PIA06193/PIA06193~orig.jpg',
    description:
      'Gas giant distinguished by its extensive, bright ring system of water ice and rocky debris, along with a prominent hexagonal polar jet stream.',
    diameterKm: '116,460 km',
    gravity: '10.44 m/s²',
    tempRange: '-140°C (Cloud Deck)',
    orbitalPeriod: '29.45 Years',
    distanceAU: '9.58 AU',
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        color: 0xf59e0b,
        hexColor: '#f59e0b',
        radius: 0.58,
        distance: 6.8,
        speed: 0.035,
        info: 'Possesses a dense nitrogen-rich atmosphere and stable surface lakes of liquid methane and ethane.',
        image: 'https://images-assets.nasa.gov/image/PIA14922/PIA14922~orig.jpg',
        radiusKm: '2,574.7 km',
        orbitalPeriod: '15.95 Days',
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        color: 0xf8fafc,
        hexColor: '#f8fafc',
        radius: 0.36,
        distance: 5.2,
        speed: 0.052,
        info: 'Reflective ice moon ejecting cryovolcanic plumes of water vapor and organic compounds from its south pole.',
        image: 'https://images-assets.nasa.gov/image/PIA17202/PIA17202~orig.jpg',
        radiusKm: '252.1 km',
        orbitalPeriod: '1.37 Days',
      },
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: 0x7dd3fc,
    hexColor: '#7dd3fc',
    radius: 2.7,
    distance: 100,
    speed: 0.003,
    hasRing: true,
    image: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg',
    description:
      'An ice giant with an extreme axial tilt of 97.77 degrees, causing it to rotate nearly on its side as it orbits the Sun.',
    diameterKm: '50,724 km',
    gravity: '8.69 m/s²',
    tempRange: '-195°C (Min -224°C)',
    orbitalPeriod: '84.02 Years',
    distanceAU: '19.19 AU',
    moons: [
      {
        id: 'titania',
        name: 'Titania',
        color: 0xcbd5e1,
        hexColor: '#cbd5e1',
        radius: 0.42,
        distance: 5.0,
        speed: 0.034,
        info: 'Largest moon of Uranus, marked by giant fault canyons and scarps.',
        image: 'https://images-assets.nasa.gov/image/PIA00039/PIA00039~orig.jpg',
        radiusKm: '788.4 km',
        orbitalPeriod: '8.71 Days',
      },
      {
        id: 'miranda',
        name: 'Miranda',
        color: 0x94a3b8,
        hexColor: '#94a3b8',
        radius: 0.32,
        distance: 3.8,
        speed: 0.05,
        info: 'Features Verona Rupes, the tallest known cliff face in the Solar System.',
        image: 'https://images-assets.nasa.gov/image/PIA00044/PIA00044~orig.jpg',
        radiusKm: '235.8 km',
        orbitalPeriod: '1.41 Days',
      },
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: 0x3b82f6,
    hexColor: '#3b82f6',
    radius: 2.6,
    distance: 118,
    speed: 0.002,
    image: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg',
    description:
      'The outermost major planet, an ice giant whipped by supersonic winds exceeding 2,100 km/h.',
    diameterKm: '49,244 km',
    gravity: '11.15 m/s²',
    tempRange: '-201°C',
    orbitalPeriod: '164.8 Years',
    distanceAU: '30.07 AU',
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        color: 0xe2e8f0,
        hexColor: '#e2e8f0',
        radius: 0.48,
        distance: 5.2,
        speed: -0.04, // Retrograde orbit
        info: 'Large captured Kuiper Belt object in a retrograde orbit with active nitrogen geysers.',
        image: 'https://images-assets.nasa.gov/image/PIA00317/PIA00317~orig.jpg',
        radiusKm: '1,353.4 km',
        orbitalPeriod: '5.88 Days (Retrograde)',
      },
    ],
  },
];

export const SRC_SUN_DATA = {
  name: 'The Sun (Sol)',
  spectralClass: 'G2V Main-Sequence Yellow Dwarf',
  age: '4.603 Billion Years',
  image: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~orig.jpg',
  summary:
    'The gravitational, radiative, and magnetic heart of our Solar System. Holding 99.86% of the entire system’s mass, the Sun is a self-gravitating sphere of magnetized plasma sustained by thermonuclear hydrogen fusion at its ultra-dense core.',
  metrics: [
    { label: 'Equatorial Diameter', value: '1,392,700 km (109 × Earth)' },
    { label: 'Total Mass', value: '1.989 × 10³⁰ kg (333,000 × Earth)' },
    { label: 'Core Temperature', value: '~15,000,000 °C (27,000,000 °F)' },
    { label: 'Surface (Photosphere)', value: '5,500 °C (5,778 K)' },
    { label: 'Corona Temperature', value: '1,000,000 °C – 3,000,000 °C' },
    { label: 'Power Luminosity', value: '3.828 × 10²⁶ Watts (J/s)' },
    { label: 'Surface Gravity', value: '274.0 m/s² (27.94 g)' },
    { label: 'Escape Velocity', value: '617.7 km/s' },
    { label: 'Equatorial Rotation', value: '25.05 Days (34.4 Days at Poles)' },
    { label: 'Galactic Orbit (Cosmic Year)', value: '225–250 Million Years' },
  ],
  composition: [
    { element: 'Hydrogen (H)', byMass: '73.46%', byNumber: '90.9%' },
    { element: 'Helium (He)', byMass: '24.85%', byNumber: '8.9%' },
    { element: 'Oxygen (O)', byMass: '0.77%', byNumber: '0.078%' },
    { element: 'Carbon (C)', byMass: '0.29%', byNumber: '0.033%' },
    { element: 'Iron (Fe) & Neon (Ne)', byMass: '0.28%', byNumber: '0.015%' },
  ],
  howItWorks: {
    title: 'How the Sun Works // Thermonuclear Fusion & Hydrostatic Equilibrium',
    coreMechanism:
      'The Sun exists in a state of dynamic balance called Hydrostatic Equilibrium: the inward crushing pull of its immense gravity is continuously counterbalanced by the outward thermal and radiation pressure generated by nuclear fusion in its core.',
    fusionProcess:
      'Via the Proton-Proton (p-p) Chain Reaction, the core fuses roughly 600 million metric tons of hydrogen nuclei (protons) into 596 million tons of helium-4 every single second. The missing 4.26 million metric tons of mass per second are converted directly into radiant energy according to Einstein’s E = mc², releasing 3.828 × 10²⁶ Joules of energy every second.',
    layers: [
      {
        name: '01. The Core (0% – 25% of Radius)',
        temp: '15,000,000 °C',
        density: '150 g/cm³ (13× denser than solid lead)',
        details:
          'The sole region where nuclear fusion occurs. Extreme pressure (265 billion atmospheres) forces positively charged protons close enough for the strong nuclear force to overcome electrostatic repulsion via quantum tunneling.',
      },
      {
        name: '02. Radiative Zone (25% – 70% of Radius)',
        temp: '7,000,000 °C → 2,000,000 °C',
        density: '20 g/cm³ → 0.2 g/cm³',
        details:
          'Packed so tightly with ionized atoms that gamma-ray photons can travel only millimeters before being scattered and re-emitted. This "drunkard’s random walk" means a photon takes 100,000 to 170,000 years just to escape this layer.',
      },
      {
        name: '03. The Tachocline (Transition Shear Layer)',
        temp: '~2,000,000 °C',
        density: '~0.2 g/cm³',
        details:
          'A thin shear boundary between the solid-like rotating radiative zone and the differentially churning convective zone. Massive electrical currents here drive the Solar Dynamo that generates the Sun’s powerful magnetic field.',
      },
      {
        name: '04. Convective Zone (70% – 100% of Radius)',
        temp: '2,000,000 °C → 5,500 °C',
        density: '0.2 g/cm³ → 0.0000002 g/cm³',
        details:
          'Plasma is cool enough to become opaque, trapping heat from below and causing colossal boiling convection cells. Hot plasma rises to the surface in "granules" the size of Texas (~1,000 km wide) and "supergranules" 30,000 km across.',
      },
      {
        name: '05. Photosphere (Visible Surface — ~500 km thick)',
        temp: '5,500 °C (Sunspots: ~3,500 °C)',
        density: '10⁻⁷ g/cm³',
        details:
          'The layer where the plasma becomes transparent to visible light, allowing photons to stream freely across space—reaching Earth in 8 minutes and 20 seconds. Twisted magnetic flux tubes pierce this layer as dark Sunspots.',
      },
      {
        name: '06. Chromosphere & Corona (Outer Atmosphere)',
        temp: '10,000 °C → 2,000,000+ °C',
        density: 'Ultra-high vacuum plasma',
        details:
          'Paradoxically superheated to millions of degrees by magnetic reconnection, nanoflares, and Alfvén waves. The corona continuously expands outward as the supersonic Solar Wind (400–800 km/s), inflating the Heliosphere past Pluto.',
      },
    ],
  },
  howItFormed: {
    title: 'How the Sun Was Formed // Birth from a Supernova Shockwave (4.6 Billion Years Ago)',
    phases: [
      {
        stage: 'Phase I: Giant Molecular Cloud & Supernova Trigger (~4.603 Gya)',
        desc: 'Our Solar System began as a frigid, dark fragment inside a Giant Molecular Cloud of hydrogen, helium, and trace heavy dust forged by older dead stars. A shockwave from one or more nearby Type II Supernovae compressed the cloud—injecting short-lived radioactive isotopes like Aluminum-26 and Iron-60 found in ancient meteorites today.',
      },
      {
        stage: 'Phase II: Gravitational Collapse & Solar Nebula Disk (~100,000 Years)',
        desc: 'Once the compressed core crossed the Jeans Instability threshold, gravity pulled the gas inward. By Conservation of Angular Momentum, the collapsing sphere spun faster and flattened into a 200-AU-wide rotating Protoplanetary Disk surrounding a hot, dense central Protostar.',
      },
      {
        stage: 'Phase III: T-Tauri Stage & Bipolar Outflows (~10–50 Million Years)',
        desc: 'Before nuclear fusion ignited, the young Sun was a violent T-Tauri star powered by gravitational contraction, ejecting supersonic jets of gas from its poles and intense stellar winds.',
      },
      {
        stage: 'Phase IV: Ignition of Core Fusion & Main Sequence Arrival',
        desc: 'When central temperatures exceeded 10 million Kelvin and pressures reached 250 billion atmospheres, hydrogen nuclei began fusing steadily into helium. The resulting radiation surge blew away leftover nebular gas, revealing the newly accreted rocky inner planets and outer gas giants.',
      },
    ],
  },
  whenItWillDie: {
    title: 'When & How the Sun Will Die // Complete Stellar Evolution Timeline',
    overview:
      'Because the Sun is a single, medium-mass G-type star, it does NOT have enough mass to explode as a Supernova (which requires at least 8 times the Sun’s mass) or collapse into a Black Hole. Instead, it will undergo a dramatic expansion into a Red Giant before shedding its outer layers as a glowing Planetary Nebula and leaving behind a dense White Dwarf crystal core.',
    timeline: [
      {
        time: 'Today (Age: 4.6 Billion Years)',
        phase: 'Main-Sequence Prime (Middle Age)',
        status: 'ACTIVE',
        desc: 'The Sun has fused roughly half of the hydrogen in its core. As helium "ash" accumulates in the core, the core slowly contracts and heats up, causing the Sun to grow 1% brighter every 100 million years.',
      },
      {
        time: '+1.0 to +1.5 Billion Years from Now',
        phase: 'Earth’s Runaway Moist Greenhouse',
        status: 'WARNING',
        desc: 'A 10–15% increase in solar luminosity will raise Earth’s surface temperatures enough to evaporate the oceans into the stratosphere, where UV light splits water molecules and hydrogen escapes to space—ending complex surface life on Earth long before the Sun runs out of fuel.',
      },
      {
        time: '+5.0 Billion Years from Now (Age: 9.6 Gyr)',
        phase: 'Core Hydrogen Exhaustion & Subgiant Phase',
        status: 'CRITICAL',
        desc: 'Hydrogen fusion ceases in the central core, leaving an inert helium core. Gravity crushes the core inward while hydrogen fusion ignites in a roaring shell around the core, causing the outer layers to puff outward and double in size.',
      },
      {
        time: '+5.4 to +7.5 Billion Years from Now',
        phase: 'Red Giant Expansion & Inner Planet Engulfment',
        status: 'CATACLYSMIC',
        desc: 'The Sun swells to 200–250 times its current radius (~1 AU, 300 million km wide) and 2,300 times its current brightness. Its cooler, crimson surface (~3,000 °C) completely swallows and vaporizes Mercury and Venus, and likely engulfs Earth. Meanwhile, icy moons like Saturn’s Titan and Jupiter’s Europa thaw into temporary liquid-water worlds.',
      },
      {
        time: '+7.59 Billion Years from Now',
        phase: 'The Helium Flash & Horizontal Branch',
        status: 'THERMONUCLEAR',
        desc: 'The degenerate helium core reaches 100 million Kelvin and ignites all at once in a runaway "Helium Flash"—releasing as much power for a few minutes as an entire galaxy, fusing helium into Carbon and Oxygen via the Triple-Alpha Process.',
      },
      {
        time: '+7.7 to +7.8 Billion Years from Now',
        phase: 'Asymptotic Giant Branch & Planetary Nebula Expulsion',
        status: 'SHEDDING',
        desc: 'After exhausting core helium in ~100 million years, violent thermal pulses eject roughly 46% of the Sun’s total mass into interstellar space as a breathtaking, ionized glowing shell of gas—a Planetary Nebula (similar to the Ring Nebula) visible across the galaxy for ~50,000 years.',
      },
      {
        time: '+8.0 Billion to +10¹⁴ Years (Final Remnant)',
        phase: 'Carbon-Oxygen White Dwarf → Black Dwarf',
        status: 'ETERNAL REMNANT',
        desc: 'The exposed core remains as a White Dwarf: 54% of the Sun’s mass compressed into a sphere the size of Earth (1 teaspoon weighs 5.5 tons), initially glowing at 100,000 K with no further fusion. Over tens of billions of years, its carbon crystallizes into a cosmic diamond and cools into a cold, dark Black Dwarf.',
      },
    ],
  },
  funFacts: [
    {
      title: '99.86% of All Solar System Mass',
      fact: 'If the entire Solar System’s mass were represented by a 100-kilogram weight, the Sun would be 99.86 kg, Jupiter and Saturn would be 130 grams, and Earth would be less than a third of a gram.',
    },
    {
      title: '150,000-Year-Old Ancient Sunlight',
      fact: 'Although sunlight takes only 8 minutes and 20 seconds to cross the 149.6 million km from the Sun’s surface to Earth, those photons were born in the core ~150,000 years ago during the Pleistocene Ice Age and spent millennia pinballing through the dense radiative zone.',
    },
    {
      title: '100 Billion Hydrogen Bombs Every Second',
      fact: 'To match the Sun’s continuous power output of 3.828 × 10²⁶ Watts, you would have to detonate 100 billion 1-megaton thermonuclear bombs every single second.',
    },
    {
      title: 'The 11-Year Magnetic Pole Flip',
      fact: 'Unlike Earth, the Sun rotates faster at its equator (25 days) than at its poles (34 days). This differential rotation tangles its magnetic field lines until the North and South magnetic poles completely flip every 11 years—driving Solar Maximum storms, X-class flares, and auroras.',
    },
    {
      title: '100 Billion Ghost Neutrinos Through Your Thumbnail',
      fact: 'Nuclear fusion in the Sun’s core produces subatomic particles called solar neutrinos that zip untouched straight out of the Sun in 2 seconds. Right now, about 100 billion solar neutrinos are passing harmlessly through your thumbnail every second—even at midnight, after passing straight through the solid Earth!',
    },
    {
      title: 'TheSun Is Actually Pure White, Not Yellow',
      fact: 'Viewed from space (or the International Space Station), the Sun shines brilliant pure white across all visible wavelengths. It only looks yellow, orange, or red from Earth’s surface because nitrogen and oxygen in our atmosphere scatter shorter blue and violet wavelengths across the sky (Rayleigh scattering).',
    },
    {
      title: 'Louder Than a Freight Train—If Space Had Air',
      fact: 'The Sun’s surface roars with acoustic pressure waves (p-modes) from millions of boiling Texas-sized convection cells. If sound could travel through the vacuum of space, the Sun would roar at ~100 decibels on Earth—as loud as a jackhammer or chainsaw from 150 million km away.',
    },
    {
      title: 'Touched by Humanity: The Parker Solar Probe',
      fact: 'In 2021–2025, NASA’s Parker Solar Probe dove inside the Sun’s Alfvén critical surface—officially "touching" the solar corona at a blistering 692,000 km/h (430,000 mph), protected by a 11.4-cm carbon-composite heat shield enduring 1,400 °C.',
    },
  ],
};

