/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonographLayer {
  name: string;
  temp: string;
  density: string;
  details: string;
}

export interface MonographPhase {
  stage: string;
  desc: string;
}

export interface MonographTimelineEvent {
  time: string;
  phase: string;
  status: string;
  desc: string;
}

export interface MonographFunFact {
  title: string;
  fact: string;
}

export interface PlanetMonograph {
  id: string;
  name: string;
  subtitle: string;
  category: 'Terrestrial World' | 'Gas Giant' | 'Ice Giant';
  orderNumber: string;
  age: string;
  image: string;
  hexColor: string;
  summary: string;
  metrics: { label: string; value: string; numericValue?: number }[];
  numericComparison: {
    diameterKm: number;
    massEarths: number;
    gravityMps2: number;
    distanceAU: number;
    orbitalSpeedKmS: number;
    moonsCount: number;
  };
  composition: { element: string; byMass: string; role: string }[];
  howItWorks: {
    title: string;
    coreMechanism: string;
    surfaceAndWeather: string;
    layers: MonographLayer[];
  };
  howItFormed: {
    title: string;
    phases: MonographPhase[];
  };
  whenItWillDie: {
    title: string;
    overview: string;
    timeline: MonographTimelineEvent[];
  };
  funFacts: MonographFunFact[];
}

export const PLANET_MONOGRAPHS: Record<string, PlanetMonograph> = {
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    subtitle: 'First Planet // Iron-Core Cinder World',
    category: 'Terrestrial World',
    orderNumber: '01',
    age: '4.503 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA16853/PIA16853~orig.jpg',
    hexColor: '#9e9e9e',
    summary:
      'The innermost and smallest planet in the Solar System, orbiting closer to the Sun than any other world. Stripped of its outer silicate mantle in a primordial cataclysm, Mercury is essentially a titanic metallic iron-nickel planetary core wrapped in a thin, heavily cratered rocky crust that endures a 610 °C temperature swing between day and night.',
    numericComparison: {
      diameterKm: 4879,
      massEarths: 0.055,
      gravityMps2: 3.7,
      distanceAU: 0.39,
      orbitalSpeedKmS: 47.36,
      moonsCount: 0,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '4,879.4 km (0.38 × Earth)' },
      { label: 'Total Mass', value: '3.301 × 10²³ kg (0.055 × Earth)' },
      { label: 'Mean Density', value: '5.427 g/cm³ (2nd Densest)' },
      { label: 'Surface Gravity', value: '3.70 m/s² (0.38 g)' },
      { label: 'Escape Velocity', value: '4.25 km/s' },
      { label: 'Surface Temperature', value: '-180 °C to +430 °C' },
      { label: 'Orbital Distance', value: '0.387 AU (57.9M km)' },
      { label: 'Orbital Velocity', value: '47.36 km/s (Fastest Planet)' },
      { label: 'Solar Day (3:2 Resonance)', value: '176 Earth Days' },
      { label: 'Orbital Period (Year)', value: '87.97 Earth Days' },
    ],
    composition: [
      { element: 'Oxygen (Exosphere)', byMass: '42.0%', role: 'Sputtered from silicate crust' },
      { element: 'Sodium (Exosphere)', byMass: '29.0%', role: 'Forms comet-like sodium tail' },
      { element: 'Hydrogen (Exosphere)', byMass: '22.0%', role: 'Captured from Solar Wind' },
      { element: 'Helium & Potassium', byMass: '6.5%', role: 'Outgassed crustal volatiles' },
      { element: 'Argon & Trace Metals', byMass: '0.5%', role: 'Radioactive decay products' },
    ],
    howItWorks: {
      title: 'How Mercury Works // Giant Iron Core, Spin-Orbit Resonance & Exosphere',
      coreMechanism:
        'Unlike Earth, where the metallic core accounts for ~17% of planetary volume, Mercury’s iron-nickel core occupies nearly 85% of the planet’s radius (2,020 km out of 2,439.7 km) and ~60% of its totalvolume. As this massive core slowly cools and solidifies from the inside out, the entire planet contracts radially—shrinking by ~7 km in radius and buckling the brittle surface crust into 1,000-km-long thrust-fault cliffs called "lobate scarps".',
      surfaceAndWeather:
        'Because of Mercury’s low gravity and intense solar wind bombardment, it cannot retain a true atmosphere. Instead, it possesses an ultra-thin "surface-bounded exosphere" (10⁻¹⁴ bar) where atoms knocked loose from the surface by micrometeorites and solar photons arc into space, streaming behind the planet in a 24-million-km glowing sodium tail.',
      layers: [
        {
          name: '01. Solid Inner Iron Core (0 – 1,000 km Radius)',
          temp: '~2,200 °C',
          density: '~9.3 g/cm³',
          details:
            'A crystallized solid iron-nickel center discovered via MESSENGER gravity and spin-libration measurements. Its slow crystallization releases latent heat that helps drive convection in the surrounding outer core.',
        },
        {
          name: '02. Molten Outer Iron-Sulfide Core (1,000 – 2,020 km)',
          temp: '1,600 °C – 2,000 °C',
          density: '~7.2 g/cm³',
          details:
            'A liquid metallic shell enriched with sulfur and silicon that lowers the freezing point of iron. Weak convective dynamo currents here generate a global dipole magnetic field (~1.1% as strong as Earth’s).',
        },
        {
          name: '03. Iron-Sulfide Solid Boundary Layer (~2,020 km)',
          temp: '~1,500 °C',
          density: '~5.8 g/cm³',
          details:
            'A dense, solid iron-sulfide cap atop the core that insulates the rocky mantle and shapes the unusually northward-offset geometry of Mercury’s magnetosphere.',
        },
        {
          name: '04. Thin Silicate Mantle (2,020 – 2,400 km)',
          temp: '600 °C – 1,400 °C',
          density: '~3.3 g/cm³',
          details:
            'Only ~400 km thick (compared to Earth’s 2,900-km mantle). Depleted of iron but rich in magnesium silicates, likely stripped by a giant proto-planetary collision.',
        },
        {
          name: '05. Basaltic & Graphite Crust (35 km thick)',
          temp: '-180 °C (Night) to +430 °C (Day)',
          density: '~2.9 g/cm³',
          details:
            'Ancient volcanic plains, impact basins (like the 1,550-km Caloris Basin), and remnants of an early primordial graphite flotation crust that gives Mercury its dark charcoal albedo.',
        },
      ],
    },
    howItFormed: {
      title: 'How Mercury Was Formed // Primordial Giant Impact & Inner Nebula Condensation',
      phases: [
        {
          stage: 'Phase I: High-Temperature Inner Nebula Condensation (~4.55 Gya)',
          desc: 'Formed in the scorching innermost edge of the protoplanetary disk where solar temperatures exceeded 1,400 K, evaporating volatile silicates while refractory metallic iron-nickel grains condensed preferentially.',
        },
        {
          stage: 'Phase II: Proto-Mercurian Differentiation (~4.52 Gya)',
          desc: 'Proto-Mercury originally accreted to roughly twice its present mass, differentiating into an iron core, a thick silicate mantle, and an early magma ocean topped by a buoyant carbon-graphite crust.',
        },
        {
          stage: 'Phase III: The Cataclysmic Mantle-Stripping Impact (~4.50 Gya)',
          desc: 'A high-velocity grazing collision with a massive planetesimal (or series of hit-and-run impacts) blasted away up to 70% of Proto-Mercury’s rocky silicate mantle into solar orbit, leaving the exposed iron-rich core behind.',
        },
        {
          stage: 'Phase IV: Late Heavy Bombardment & Global Volcanic Flooding (~3.9 Gya)',
          desc: 'Asteroid impacts excavated colossal basins like Caloris (sending seismic shockwaves that jumbled the exact opposite side of the planet into "Weird Terrain"), followed by flood-basalt lava eruptions and 4 billion years of thermal contraction.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Mercury Will Die // Orbital Chaos & First Victim of the Red Giant Sun',
      overview:
        'As the innermost planet, Mercury is destined to be the very first world destroyed when the Sun leaves the main sequence. Additionally, secular gravitational resonances with Jupiter give Mercury a ~1% statistical chance of having its orbital eccentricity pumped into a catastrophic collision before the Sun even expands.',
      timeline: [
        {
          time: 'Today to +1.0 Billion Years',
          phase: 'Core Solidification & Dynamo Shutdown',
          status: 'COOLING',
          desc: 'Mercury’s molten outer core continues to freeze onto the solid inner core, shrinking the planet by another 1–2 km and eventually extinguishing its weak magnetic field.',
        },
        {
          time: '+3.0 to +4.5 Billion Years from Now',
          phase: 'Secular Resonance Risk with Jupiter',
          status: 'ORBITAL INSTABILITY',
          desc: 'Numerical integrations of the Solar System show that if Mercury’s perihelion precession locks into resonance with Jupiter’s, Mercury’s eccentricity can reach >0.9 within millions of years—either plunging it into the Sun or colliding it with Venus.',
        },
        {
          time: '+5.2 Billion Years from Now',
          phase: 'Subgiant Solar Heating & Crustal Melting',
          status: 'SCORCHING',
          desc: 'As the Sun exhausts core hydrogen and brightens into a subgiant, Mercury’s dayside temperature climbs past 1,500 °C, melting its silicate surface into a glowing lava ocean that vaporizes rock into a silicate-vapor atmosphere.',
        },
        {
          time: '+5.6 to +6.5 Billion Years from Now',
          phase: 'Tidal Decay & Complete Engulfment by Red Giant Sun',
          status: 'DESTROYED',
          desc: 'As the expanding Red Giant Sun swells past 0.4 AU, solar atmospheric drag and tidal bulges rapidly decay Mercury’s orbit. Mercury spirals into the Sun’s convective envelope and is completely vaporized into atomic iron and silicon gas.',
        },
      ],
    },
    funFacts: [
      {
        title: 'A Day Lasts Two Years (3:2 Spin-Orbit Resonance)',
        fact: 'Mercury rotates exactly 3 times on its axis for every 2 orbits around the Sun. Because of this 3:2 tidal lock and its elliptical orbit, a single solar day on Mercury (sunrise to sunrise) lasts 176 Earth days—twice as long as its 88-day year!',
      },
      {
        title: 'The Double Sunrise Phenomenon',
        fact: 'At certain longitudes on Mercury, when the planet sweeps closest to the Sun (perihelion), its orbital speed temporarily exceeds its rotational speed. An observer on the surface would see the Sun rise, stop in mid-sky, loop backward toward the horizon, and then rise a second time!',
      },
      {
        title: 'Billions of Tons of Water Ice Inside a 430 °C Furnace',
        fact: 'Because Mercury’s axial tilt is almost zero (0.034°), deep craters at its North and South poles never see sunlight. Temperatures inside these permanent shadows stay below -170 °C, preserving billions of tons of pure water ice confirmed by radar and NASA’s MESSENGER probe.',
      },
      {
        title: 'The Shrinking Planet & 3-Kilometer Cliffs',
        fact: 'As Mercury’s giant iron core cools, the planet wrinkles like a drying raisin. This global contraction has pushed up "Enterprise Rupes"—a sheer thrust-fault cliff over 1,000 km long and 3 km high.',
      },
      {
        title: 'A 24-Million-Kilometer Glowing Sodium Tail',
        fact: 'Radiation pressure from sunlight pushes sputtered sodium atoms off Mercury’s surface, creating a glowing yellow-orange comet-like tail stretching over 24 million km into space that can be photographed from Earth with specialized filters.',
      },
      {
        title: 'Darkened by a Primordial Graphite Pencil-Lead Crust',
        fact: 'Mercury reflects less light than the Moon because its surface is dusted with 1–4% pure crystalline graphite—remnants of a buoyant carbon crust that floated to the top of its ancient global magma ocean.',
      },
    ],
  },

  venus: {
    id: 'venus',
    name: 'Venus',
    subtitle: 'Second Planet // Super-Critical Greenhouse Crucible',
    category: 'Terrestrial World',
    orderNumber: '02',
    age: '4.503 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg',
    hexColor: '#e3bb76',
    summary:
      'Often called Earth’s twin in size, mass, and bulk composition, Venus evolved down a radically divergent path. Shrouded beneath an opaque, reflective canopy of concentrated sulfuric acid clouds, its 96.5% carbon dioxide atmosphere exerts a crushing 92-bar surface pressure (equivalent to 900 meters underwater on Earth) and traps heat at a lead-melting 475 °C across the entire globe.',
    numericComparison: {
      diameterKm: 12104,
      massEarths: 0.815,
      gravityMps2: 8.87,
      distanceAU: 0.72,
      orbitalSpeedKmS: 35.02,
      moonsCount: 0,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '12,103.6 km (0.95 × Earth)' },
      { label: 'Total Mass', value: '4.867 × 10²⁴ kg (0.815 × Earth)' },
      { label: 'Surface Gravity', value: '8.87 m/s² (0.904 g)' },
      { label: 'Surface Pressure', value: '92 bar (92 × Earth Sea Level)' },
      { label: 'Mean Surface Temp', value: '+475 °C (+887 °F — Hottest Planet)' },
      { label: 'Sidereal Rotation (Retrograde)', value: '-243.02 Earth Days' },
      { label: 'Orbital Period (Year)', value: '224.70 Earth Days' },
      { label: 'Axial Tilt', value: '177.36° (Upside-Down Spin)' },
      { label: 'Orbital Distance', value: '0.723 AU (108.2M km)' },
      { label: 'Spherical Albedo', value: '0.77 (Reflects 77% of Sunlight)' },
    ],
    composition: [
      { element: 'Carbon Dioxide (CO₂)', byMass: '96.5%', role: 'Supercritical greenhouse gas at surface' },
      { element: 'Molecular Nitrogen (N₂)', byMass: '3.5%', role: '4× total nitrogen mass of Earth’s air' },
      { element: 'Sulfur Dioxide (SO₂)', byMass: '150 ppm', role: 'Feeds sulfuric acid cloud deck via volcanism' },
      { element: 'Argon & Noble Gases', byMass: '70 ppm', role: 'Primordial accretion tracers' },
      { element: 'Water Vapor (H₂O)', byMass: '20 ppm', role: 'Desiccated remnant of lost ancient oceans' },
    ],
    howItWorks: {
      title: 'How Venus Works // Runaway Greenhouse, Supercritical CO₂ & Episodic Lid Tectonics',
      coreMechanism:
        'Without water to lubricate tectonic plates or dissolve atmospheric CO₂ into carbonate limestone rocks, Venus lacks Earth-style plate tectonics. Instead, it operates under a "Stagnant / Episodic Lid" regime: internal radioactive heat builds up beneath a rigid basaltic crust for hundreds of millions of years until massive mantle plumes erupt globally, resurfacing ~80% of the planet in volcanic flood basalts.',
      surfaceAndWeather:
        'Near the surface, 92 bars of pressure and 475 °C temperatures compress carbon dioxide into a "supercritical fluid"—a state halfway between a gas and a liquid with a density ~6.5% that of liquid water. Meanwhile, at 50–70 km altitude, winds super-rotate 60 times faster than the solid planet below, circling the globe in just 4 Earth days and raining sulfuric acid (virga) that evaporates at 25 km altitude before ever touching the ground.',
      layers: [
        {
          name: '01. Iron-Nickel Core (0 – 3,200 km Radius)',
          temp: '~4,800 °C',
          density: '~10.5 g/cm³',
          details:
            'Likely partially or fully molten iron-nickel. Because Venus lacks plate tectonic cooling to draw heat rapidly from its core, thermal convection inside the core is too sluggish to generate an intrinsic dipole magnetic field.',
        },
        {
          name: '02. Rocky Silicate Mantle (3,200 – 6,020 km)',
          temp: '1,200 °C – 3,800 °C',
          density: '~4.4 g/cm³',
          details:
            'Driven by gigantic thermal plumes that push up circular volcanic "coronae" (100–1,000 km wide ring structures) and shield volcanoes like Maat Mons.',
        },
        {
          name: '03. Basaltic Stagnant Crust (20 – 50 km thick)',
          temp: '475 °C (Surface)',
          density: '~2.9 g/cm³',
          details:
            'Geologically young surface (~300–600 million years old) dominated by over 85,000 volcanoes—more than any other planet in the Solar System—and radar-bright metallic "snow" of lead and bismuth sulfide on high mountain peaks.',
        },
        {
          name: '04. Supercritical Lower Troposphere (0 – 48 km Altitude)',
          temp: '475 °C → 80 °C',
          density: '65 kg/m³ at surface',
          details:
            'Dense supercritical CO₂ blanket that equalizes temperatures so completely that the poles and nightside are the exact same 475 °C as the equator at noon.',
        },
        {
          name: '05. Temperate Cloud Deck & Ionosphere (48 – 70 km Altitude)',
          temp: '75 °C → -20 °C',
          density: '~1.0 bar at 50 km',
          details:
            'Composed of 75–96% concentrated sulfuric acid droplets. Ironically, at 52–55 km altitude, pressure (1 atm) and temperature (20–30 °C) are the most Earth-like anywhere in the Solar System!',
        },
      ],
    },
    howItFormed: {
      title: 'How Venus Was Formed // Twin Accretion & The Great Desiccation',
      phases: [
        {
          stage: 'Phase I: Inner Disk Terrestrial Accretion (~4.50 Gya)',
          desc: 'Formed from virtually the same reservoir of silicate and iron planetesimals as Earth, acquiring a similar bulk mass (81.5% Earth) and likely an early inventory of water delivered by hydrated asteroids.',
        },
        {
          stage: 'Phase II: Possible Temperate Ocean Era (~4.2 – 1.0 Gya)',
          desc: 'Climate models suggest that under the fainter young Sun, slow-rotating Venus may have hosted shallow liquid water oceans and habitable surface temperatures for up to 2–3 billion years if high dayside cloud shields reflected sunlight.',
        },
        {
          stage: 'Phase III: Runaway Greenhouse & Photodissociation of Oceans',
          desc: 'Rising solar luminosity or simultaneous mega-volcanic Large Igneous Province eruptions evaporated Venus’s water into the stratosphere. Solar ultraviolet radiation split H₂O into hydrogen (which escaped to space, leaving a 150× enrichment of heavy Deuterium) and oxygen (absorbed by surface rocks).',
        },
        {
          stage: 'Phase IV: Global Volcanic Resurfacing (~500 Million Years Ago)',
          desc: 'Without water to carbonate CO₂ or lubricate subduction zones, all planetary carbon remained in the atmosphere while global volcanic plains erased older impact craters.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Venus Will Die // From Runaway Hothouse to Red Giant Engulfment',
      overview:
        'Venus already previews Earth’s future in ~1.5 billion years. Over the remaining 5 billion years of the Sun’s life, Venus will grow even hotter before being swallowed by the expanding Red Giant Sun shortly after Mercury.',
      timeline: [
        {
          time: 'Today (Active Volcanism Confirmed)',
          phase: 'Ongoing Episodic Volcanic Outgassing',
          status: 'ACTIVE',
          desc: 'Re-analysis of Magellan radar imagery at Maat Mons confirmed active volcanic vent remodeling and lava flows on Venus today, continuously replenishing atmospheric SO₂.',
        },
        {
          time: '+2.0 to +4.0 Billion Years from Now',
          phase: 'Hyper-Greenhouse Crustal Softening',
          status: 'EXTREME',
          desc: 'As solar output climbs by 25–40%, Venus’s surface temperature will surpass 750 °C, causing its basaltic crust to become ductile and erasing high mountain massifs like Maxwell Montes.',
        },
        {
          time: '+5.5 Billion Years from Now',
          phase: 'Atmospheric Blow-Off & Magma Ocean',
          status: 'VAPORIZING',
          desc: 'Intense Red Giant solar winds strip away the thick CO₂ atmosphere while surface rocks melt into a planet-wide glowing magma sea.',
        },
        {
          time: '+6.8 to +7.2 Billion Years from Now',
          phase: 'Engulfment into the Red Giant Sun',
          status: 'DESTROYED',
          desc: 'As the Red Giant Sun’s radius expands past 0.72 AU, tidal friction drags Venus directly into the solar envelope, where it is vaporized.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Spins Backward & Its Day Is Longer Than Its Year',
        fact: 'Venus rotates clockwise (retrograde)—opposite to almost every other planet—so on Venus the Sun rises in the West and sets in the East. One full sidereal rotation takes 243 Earth days, while its orbit around the Sun takes only 224.7 Earth days!',
      },
      {
        title: 'Metallic Lead & Bismuth "Snow" on Mountain Peaks',
        fact: 'In the scorching lowlands, metallic compounds like lead sulfide (galena) and bismuth sulfide evaporate as gas. When winds carry them up to the cooler peaks of Maxwell Montes (11 km high), they condense and coat the mountains in shiny, radar-reflective heavy-metal frost!',
      },
      {
        title: 'Crushed & Melted: Venera 13 Survived 127 Minutes',
        fact: 'The Soviet Venera landers in the 1970s and 1980s are the only spacecraft to transmit images from Venus’s surface. Built like titanium deep-sea submarines, Venera 13 survived 127 minutes in the 475 °C, 92-bar furnace before its electronics baked.',
      },
      {
        title: 'More Volcanoes Than Any Other Planet (>85,000 Mapped)',
        fact: 'Radar mapping has cataloged over 85,000 shield volcanoes, pancake domes, and volcanic calderas across Venus—including lava channels like Baltis Vallis that snake for 6,800 km (longer than the Nile River).',
      },
      {
        title: 'Air So Thick You Could Strap On Wings and Fly by Muscle Power',
        fact: 'At Venus’s surface, the supercritical CO₂ air is 65 kg/m³ (~55 times denser than Earth’s air at sea level). A gentle 3 km/h breeze pushes with the force of a gale, and a human in a cooled pressure suit could strap on small wings and pedal into flight!',
      },
      {
        title: 'Earth’s Closest Cloud-Top Neighbor by Temperature',
        fact: 'At 53 km altitude in the Venusian cloud layer, atmospheric pressure is 1 bar and temperature is a pleasant 25 °C—meaning normal breathable air (nitrogen + oxygen) is a lifting gas on Venus, stronger than helium is on Earth, enabling hypothetical floating cloud cities.',
      },
    ],
  },

  earth: {
    id: 'earth',
    name: 'Earth',
    subtitle: 'Third Planet // Tectonic Ocean & Biosphere Sanctuary',
    category: 'Terrestrial World',
    orderNumber: '03',
    age: '4.543 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg',
    hexColor: '#2b82c9',
    summary:
      'The largest and densest of the four rocky terrestrial planets, and the only astronomical object known to harbor life. Earth’s unique habitability stems from the synergy of liquid surface water (70.8% surface coverage), recycling plate tectonics that regulate the carbonate-silicate climate thermostat, a protective ozone layer, a strong dipolar magnetosphere, and a large stabilizing Moon.',
    numericComparison: {
      diameterKm: 12742,
      massEarths: 1.0,
      gravityMps2: 9.81,
      distanceAU: 1.0,
      orbitalSpeedKmS: 29.78,
      moonsCount: 1,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '12,756.2 km (Mean: 12,742 km)' },
      { label: 'Total Mass', value: '5.972 × 10²⁴ kg (1.00 Earth)' },
      { label: 'Mean Density', value: '5.514 g/cm³ (Densest in Solar System)' },
      { label: 'Surface Gravity', value: '9.80665 m/s² (1.00 g)' },
      { label: 'Escape Velocity', value: '11.186 km/s' },
      { label: 'Surface Temperature', value: '+15 °C Mean (-89.2 °C to +56.7 °C)' },
      { label: 'Solar Day / Sidereal Day', value: '24h 00m / 23h 56m 04s' },
      { label: 'Orbital Period (Year)', value: '365.256 Days (1.000 AU)' },
      { label: 'Axial Tilt (Obliquity)', value: '23.439° (Stabilized by Moon)' },
      { label: 'Ocean Water Volume', value: '1.335 Billion km³' },
    ],
    composition: [
      { element: 'Molecular Nitrogen (N₂)', byMass: '78.08%', role: 'Inert atmospheric buffer pressure' },
      { element: 'Molecular Oxygen (O₂)', byMass: '20.95%', role: 'Biogenic product of photosynthesis' },
      { element: 'Argon (⁴⁰Ar)', byMass: '0.93%', role: 'Radiogenic decay of Potassium-40' },
      { element: 'Water Vapor (H₂O)', byMass: '0.1% – 4.0%', role: 'Hydrological weather & latent heat engine' },
      { element: 'Carbon Dioxide (CO₂)', byMass: '0.042%', role: 'Carbonate-silicate climate thermostat' },
    ],
    howItWorks: {
      title: 'How Earth Works // Geodynamo Shield, Plate Tectonics & Biogeochemical Loops',
      coreMechanism:
        'Earth operates as an interconnected thermodynamic engine. Deep inside, the crystallization of the solid iron inner core releases latent heat and buoyant light elements into the liquid iron outer core, driving helical Coriolis convection currents (the Geodynamo). This generates a magnetosphere stretching 60,000 km sunward that deflects solar wind plasma that would otherwise strip away our atmosphere and oceans.',
      surfaceAndWeather:
        'Earth is the only known planet with active Plate Tectonics: oceanic crust is continuously born at mid-ocean ridges and subducted back into the mantle at deep trenches. This geological conveyor belt drives the Carbonate-Silicate Cycle—weathering CO₂ out of the air when the planet warms and outgassing CO₂ through volcanoes when it freezes—keeping liquid water stable for over 4 billion years despite a 30% brightening of the Sun.',
      layers: [
        {
          name: '01. Solid Inner Core (0 – 1,220 km Radius)',
          temp: '~5,400 °C (As hot as the Sun’s surface)',
          density: '12.8 – 13.1 g/cm³',
          details:
            'A crystalline sphere of iron-nickel alloy kept solid despite 5,400 °C heat by a crushing pressure of 3.6 million atmospheres (360 GPa). Grows outward by ~1 mm per year as the planet cools.',
        },
        {
          name: '02. Liquid Outer Core (1,220 – 3,480 km Radius)',
          temp: '4,000 °C – 5,000 °C',
          density: '9.9 – 12.2 g/cm³',
          details:
            'A 2,260-km-thick churning ocean of low-viscosity liquid iron, nickel, and ~10% lighter elements (sulfur, oxygen, silicon). Turbulent electrical currents here generate Earth’s magnetic field.',
        },
        {
          name: '03. Lower & Upper Silicate Mantle (3,480 – 6,336 km)',
          temp: '1,000 °C – 3,700 °C',
          density: '3.4 – 5.6 g/cm³',
          details:
            'Accounts for 84% of Earth’s volume. Though solid rock (bridgmanite and peridotite), it creeps plastically like warm taffy at a few centimeters per year, driving continental drift.',
        },
        {
          name: '04. Oceanic & Continental Crust (5 – 70 km thick)',
          temp: '-89 °C to +400 °C (base)',
          density: '2.7 g/cm³ (Granite) / 3.0 g/cm³ (Basalt)',
          details:
            'Divided into dense, young basaltic oceanic plates (<200 Myr old) and buoyant, ancient granitic continental cratons up to 4.0 billion years old.',
        },
        {
          name: '05. Hydrosphere, Biosphere & 5-Layer Atmosphere',
          temp: '+15 °C Surface Mean',
          density: '1.013 bar Sea Level',
          details:
            'Global liquid ocean averaging 3.7 km deep paired with a nitrogen-oxygen atmosphere protected by the stratospheric ozone (O₃) UV shield and Van Allen radiation belts.',
        },
      ],
    },
    howItFormed: {
      title: 'How Earth Was Formed // Protoplanetary Accretion & Theia Giant Impact',
      phases: [
        {
          stage: 'Phase I: Planetesimal Accretion & Core Differentiation (~4.54 Gya)',
          desc: 'Dust grains and rocky embryos in the 1 AU feeding zone collided over ~30–50 million years. Radioactive decay and impact energy melted the proto-Earth, allowing heavy iron to sink to the center (the Iron Catastrophe) in just ~10 million years.',
        },
        {
          stage: 'Phase II: The Theia Giant Impact & Birth of the Moon (~4.50 Gya)',
          desc: 'A Mars-sized protoplanet named Theia struck the young Earth at an oblique angle. The collision vaporized both mantles, tilted Earth’s axis to 23.4°, spun Earth to a 5-hour day, and flung a ring of molten silicate debris into orbit that coalesced into the Moon.',
        },
        {
          stage: 'Phase III: Hadean Cooling, Zircon Crust & First Oceans (~4.40 Gya)',
          desc: 'Steam outgassed from the cooling magma ocean condensed into torrential rains, supplemented by volatile-rich carbonaceous asteroids. Detrital Jack Hills zircon crystals prove liquid water existed on Earth’s surface by 4.4 billion years ago.',
        },
        {
          stage: 'Phase IV: Abiogenesis & The Great Oxidation Event (~3.8 – 2.4 Gya)',
          desc: 'Microbial life emerged near hydrothermal vents by ~3.8 Gya. Around 2.4 Gya, photosynthetic cyanobacteria flooded the atmosphere with free oxygen (O₂), creating the ozone layer and paving the way for complex eukaryotic life.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Earth Will Die // Carbonate Starvation, Ocean Loss & Red Giant Fate',
      overview:
        'Earth’s biosphere is already in the final ~20% of its habitable lifespan—not because the Sun is dying yet, but because the Sun steadily brightens by ~10% every billion years.',
      timeline: [
        {
          time: '+250 Million Years from Now',
          phase: 'Formation of Supercontinent "Pangea Ultima"',
          status: 'TECTONIC',
          desc: 'All continents will collide into a single equatorial supercontinent. Massive volcanic CO₂ outgassing and continental interior deserts will push temperatures to 40–50 °C across most land.',
        },
        {
          time: '+600 to +800 Million Years from Now',
          phase: 'CO₂ Starvation of C3 & C4 Plant Life',
          status: 'BIOSPHERE COLLAPSE',
          desc: 'Brightening sunlight accelerates silicate rock weathering, scrubbing CO₂ out of the atmosphere below 10 ppm. Plants can no longer photosynthesize, causing atmospheric oxygen (O₂) and the ozone layer to vanish, leaving only anaerobic microbes.',
        },
        {
          time: '+1.0 to +1.5 Billion Years from Now',
          phase: 'Moist Runaway Greenhouse & Ocean Evaporation',
          status: 'STERILIZATION',
          desc: 'Solar luminosity reaches +10–15% above today. Earth’s oceans evaporate into the stratosphere, where UV light splits H₂O and hydrogen escapes to space. Without water to lubricate subduction, plate tectonics grinds to a halt, turning Earth into a dry, scorching desert like Venus.',
        },
        {
          time: '+7.59 Billion Years from Now',
          phase: 'Tidal Drag & Likely Engulfment by Red Giant Sun',
          status: 'FINAL FATE',
          desc: 'As the Red Giant Sun expands to ~1.2 AU, its outer atmosphere reaches Earth’s orbit. Even though solar mass loss widens Earth’s orbit slightly, tidal bulges raised on the Sun’s surface by Earth will likely drag the molten, scorched cinder of Earth directly into the solar inferno.',
        },
      ],
    },
    funFacts: [
      {
        title: 'The Densest Planet in the Entire Solar System',
        fact: 'At 5.514 g/cm³, Earth is the densest of all 8 planets. Even though Mercury has a larger iron core ratio, Earth’s greater mass gravitationally compresses its interior iron core to a higher density.',
      },
      {
        title: 'Not a Perfect Sphere: An Equatorial Bulge',
        fact: 'Because Earth spins at 1,670 km/h at the equator, centrifugal force flattens the poles and bulges the equator by 42.7 km. As a result, the summit of Mount Chimborazo in Ecuador is actually 2.1 km farther from Earth’s center than the summit of Mount Everest!',
      },
      {
        title: 'Days Were Only 6 Hours Long When the Moon Formed',
        fact: 'The Moon’s gravity pulls on Earth’s ocean tidal bulges, acting like a brake on Earth’s spin while flinging the Moon 3.82 cm farther away every year. 4.5 billion years ago, an Earth day lasted ~6 hours; during the Jurassic era of dinosaurs, a year had ~377 days of 23 hours each.',
      },
      {
        title: 'Oxygen Was Once a Toxic Global Pollutant',
        fact: 'For the first 2 billion years, Earth’s air had zero free oxygen. When cyanobacteria evolved oxygenic photosynthesis 2.4 billion years ago, the sudden surge of O₂ poisoned almost all existing anaerobic life AND wiped out methane greenhouse warming—freezing the entire planet pole-to-pole in the "Huronian Snowball Earth".',
      },
      {
        title: 'Gold & Platinum in Your Ring Came from Neutron Star Collisions',
        fact: 'When Earth melted early on, 99% of its original gold and platinum sank into the unreachable iron core (enough to coat the entire globe 4 meters deep in solid gold). The gold mined in Earth’s crust today was delivered later by asteroid impacts during the "Late Veneer" bombardment.',
      },
      {
        title: 'A Living Shield: The Magnetosphere Flips Randomly',
        fact: 'Earth’s magnetic poles have reversed hundreds of times over geological history (averaging once every ~300,000 years, with the last full flip—the Brunhes-Matuyama reversal—occurring 780,000 years ago).',
      },
    ],
  },

  mars: {
    id: 'mars',
    name: 'Mars',
    subtitle: 'Fourth Planet // Rust-Oxide Desert & Ancient Ocean World',
    category: 'Terrestrial World',
    orderNumber: '04',
    age: '4.603 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg',
    hexColor: '#c1440e',
    summary:
      'A cold, hyper-arid desert world half the diameter of Earth, colored blood-orange by ubiquitous iron(III) oxide (rust) dust. Though today its carbon dioxide atmosphere is less than 1% as dense as Earth’s, ancient river deltas, dry lakebeds, and hydrated clay minerals prove that early Mars was once a wetter, warmer world capable of supporting microbial life.',
    numericComparison: {
      diameterKm: 6779,
      massEarths: 0.107,
      gravityMps2: 3.72,
      distanceAU: 1.52,
      orbitalSpeedKmS: 24.07,
      moonsCount: 2,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '6,792.4 km (0.53 × Earth)' },
      { label: 'Total Mass', value: '6.417 × 10²³ kg (0.107 × Earth)' },
      { label: 'Surface Gravity', value: '3.721 m/s² (0.379 g)' },
      { label: 'Escape Velocity', value: '5.027 km/s' },
      { label: 'Surface Pressure', value: '0.00636 bar (0.6% of Earth)' },
      { label: 'Surface Temperature', value: '-63 °C Mean (-143 °C to +20 °C)' },
      { label: 'Martian Sol (Solar Day)', value: '24h 39m 35.2s' },
      { label: 'Orbital Period (Year)', value: '686.98 Earth Days (668.6 Sols)' },
      { label: 'Axial Tilt', value: '25.19° (Chaotic 0°–60° Swings)' },
      { label: 'Natural Moons', value: '2 (Phobos & Deimos)' },
    ],
    composition: [
      { element: 'Carbon Dioxide (CO₂)', byMass: '95.32%', role: '25% freezes onto polar caps each winter' },
      { element: 'Molecular Nitrogen (N₂)', byMass: '2.60%', role: 'Remnant primordial atmosphere' },
      { element: 'Argon (Ar)', byMass: '1.90%', role: 'Inert radiogenic tracer' },
      { element: 'Molecular Oxygen (O₂)', byMass: '0.174%', role: 'Photolysis of water and CO₂' },
      { element: 'Carbon Monoxide & Water', byMass: '0.08%', role: 'Produces frost and high cirrus clouds' },
    ],
    howItWorks: {
      title: 'How Mars Works // Frozen Cryosphere, Dust Devils & Seasonal CO₂ Collapse',
      coreMechanism:
        'Because Mars is only ~11% of Earth’s mass, its interior cooled much faster. Around 4.0 billion years ago, Mars’s liquid core stopped convecting strongly enough to sustain a global magnetic dynamo. Left unshielded, the solar wind systematically sputtered away most of Mars’s early thick atmosphere, dropping surface pressure to the "triple point" of water (6.1 millibars) where liquid water immediately boils or freezes.',
      surfaceAndWeather:
        'Without plate tectonics to move the crust over mantle hotspots, volcanic lava piled up over the exact same spot for billions of years—building colossal volcanoes like Olympus Mons (21.9 km tall). Every winter, it gets so cold at the poles (-143 °C) that 25–30% of the entire planet’s CO₂ atmosphere freezes directly out of the sky as dry-ice snow onto the polar cap!',
      layers: [
        {
          name: '01. Liquid Iron-Nickel-Sulfur Core (0 – 1,830 km Radius)',
          temp: '~1,700 °C – 2,000 °C',
          density: '~6.0 – 6.5 g/cm³',
          details:
            'Confirmed by NASA’s InSight seismic lander to be fully liquid and rich in lighter elements (sulfur, oxygen, carbon, hydrogen). Because it has no solid inner core crystallizing inside it, it lacks a magnetic dynamo.',
        },
        {
          name: '02. Molten Silicate Basal Layer (~150 km thick)',
          temp: '~1,600 °C',
          density: '~4.0 g/cm³',
          details:
            'A newly discovered radioactive-element-rich molten silicate blanket insulating the liquid metallic core like a thermal blanket.',
        },
        {
          name: '03. Silicate Mantle (1,830 – 3,340 km Radius)',
          temp: '500 °C – 1,500 °C',
          density: '~3.5 g/cm³',
          details:
            'A single-plate stagnant mantle that fed the monumental Tharsis volcanic bulge and still produces occasional "marsquakes" and magma movements in Cerberus Fossae.',
        },
        {
          name: '04. Dichotomous Basaltic Crust (24 – 72 km thick)',
          temp: '-63 °C Surface Mean',
          density: '~2.9 g/cm³',
          details:
            'Split into the "Martian Dichotomy": flat, low-lying northern plains (30 km crust) that may have held an ancient ocean, and heavily cratered southern highlands (60+ km crust) retaining localized crustal magnetic stripes.',
        },
        {
          name: '05. Subsurface Cryosphere & Dusty CO₂ Atmosphere',
          temp: '-143 °C to +20 °C',
          density: '0.006 bar',
          details:
            'Millions of cubic kilometers of water ice locked in polar caps and mid-latitude glaciers, topped by a thin CO₂ atmosphere capable of spawning planet-encircling dust storms.',
        },
      ],
    },
    howItFormed: {
      title: 'How Mars Was Formed // Rapid Starved Planetary Embryo & The Noachian Ocean Era',
      phases: [
        {
          stage: 'Phase I: Rapid Runaway Embryo Growth (~2 – 5 Myr after Solar Birth)',
          desc: 'Isotopic Hafnium-Tungsten dating of Martian meteorites shows Mars formed extraordinarily fast—reaching its full size in just 2 to 5 million years (10× faster than Earth) as a surviving "stranded planetary embryo" whose feeding zone was starved of material by Jupiter’s early migration.',
        },
        {
          stage: 'Phase II: The Borealis Giant Impact & Crustal Dichotomy (~4.5 Gya)',
          desc: 'A Pluto-sized body slammed into Mars’s northern hemisphere, excavating the 8,500-km-wide Borealis Basin (the largest impact basin in the Solar System) and making the northern third of Mars 5 km lower in elevation than the south.',
        },
        {
          stage: 'Phase III: The Noachian Warm & Wet Era (~4.1 – 3.7 Gya)',
          desc: 'Protected by an early magnetic field and warmed by volcanic greenhouse gases from the rising Tharsis volcanoes, liquid rivers carved valley networks and filled crater lakes like Jezero Crater (explored by Perseverance).',
        },
        {
          stage: 'Phase IV: Dynamo Shutdown & Hesperian/Amazonian Freeze (~3.7 Gya – Present)',
          desc: 'Core convection stalled, the global magnetosphere collapsed, and solar wind stripped the atmosphere into space—freezing remaining water into underground permafrost and oxidizing the surface into red iron oxide.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Mars Will Die // Destruction of Phobos into a Ring & Red Giant Thaw',
      overview:
        'Before the Sun dies, Mars will undergo a dramatic transformation: its inner moon Phobos will be torn apart into a planetary ring system, and the expanding Red Giant Sun will briefly thaw Mars’s frozen ice reserves before scorching it dry.',
      timeline: [
        {
          time: '+30 to +50 Million Years from Now',
          phase: 'Tidal Destruction of Phobos & Birth of the Martian Rings',
          status: 'RING FORMATION',
          desc: 'Phobos orbits below synchronous altitude and spirals 1.8 meters closer to Mars every century. In ~40 million years, Phobos will cross the Roche Limit: Martian tidal forces will rip the rubble-pile moon apart into a bright Saturn-like ring around Mars lasting tens of millions of years.',
        },
        {
          time: '+1.5 to +3.0 Billion Years from Now',
          phase: 'The Second Habitable Spring of Mars',
          status: 'TEMPORARY THAW',
          desc: 'As the aging Sun brightens and sterilizes Earth, the Solar System’s Habitable Zone moves outward to Mars’s orbit (1.52 AU). Sublimating polar CO₂ and melting subsurface water ice could briefly restore surface streams and lakes on Mars.',
        },
        {
          time: '+6.5 to +7.6 Billion Years from Now',
          phase: 'Red Giant Scorching (Close Skim of the Solar Surface)',
          status: 'SCORCHED',
          desc: 'At peak Red Giant expansion (~1.2 AU), the Sun’s surface stops just shy of Mars’s expanded orbit. Mars escapes direct engulfment, but its surface is baked to >1,000 °C into a sterile, airless rock orbiting the eventual White Dwarf remnant.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Olympus Mons: A Volcano 3 Times Taller Than Everest',
        fact: 'Standing 21.9 km (72,000 ft) high with a base as wide as France (600 km across), Olympus Mons is so colossal that if you stood on its slopes, its peak would be hidden beyond the curvature of the Martian horizon!',
      },
      {
        title: 'Valles Marineris Would Stretch from New York to Los Angeles',
        fact: 'Valles Marineris is a tectonic rift canyon system 4,000 km long, 200 km wide, and up to 7 km deep—making Earth’s Grand Canyon look like a tiny scratch.',
      },
      {
        title: 'Blue Sunsets & Butterscotch Noon Skies',
        fact: 'Fine iron-oxide dust suspended in Mars’s air scatters red light across the daytime sky (making it butterscotch/pink), but permits blue wavelengths to penetrate straight through around the Sun disk—giving Mars eerie, glowing blue sunsets and sunrises!',
      },
      {
        title: 'Chaotic Axial Tilt: Ice Ages at the Equator',
        fact: 'Because Phobos and Deimos are tiny, Mars lacks a large Moon to stabilize its spin axis. Over millions of years, gravitational tugs from Jupiter cause Mars’s tilt to wobble wildly between 0° and 60°—periodically shifting its polar ice caps all the way to the equator.',
      },
      {
        title: 'The Only Planet Inhabited Entirely by Robots',
        fact: 'Mars is currently home to an active fleet of human-built robotic explorers—including the nuclear-powered Curiosity and Perseverance rovers and multiple international orbiters.',
      },
      {
        title: 'Enough Polar Water Ice to Flood the Entire Planet 35 Meters Deep',
        fact: 'Radar sounding by Mars Express revealed that if the water ice locked in Mars’s South and North polar layered deposits were melted, it would cover the entire globe in an ocean 35 meters deep.',
      },
    ],
  },

  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'Fifth Planet // Sovereign Gas Giant & Liquid Metallic Dynamo',
    category: 'Gas Giant',
    orderNumber: '05',
    age: '4.603 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA22946/PIA22946~orig.jpg',
    hexColor: '#d39c7e',
    summary:
      'The first planet to form and the undisputed gravitational titan of our Solar System—possessing 2.5 times the mass of all other planets, moons, and asteroids combined. Beneath its turbulent ammonia cloud bands and the centuries-old Great Red Spot lies no solid surface, but rather the largest ocean in the Solar System: a 40,000-km-deep sea of electrically conductive Liquid Metallic Hydrogen.',
    numericComparison: {
      diameterKm: 139820,
      massEarths: 317.8,
      gravityMps2: 24.79,
      distanceAU: 5.2,
      orbitalSpeedKmS: 13.07,
      moonsCount: 95,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '142,984 km (11.2 × Earth)' },
      { label: 'Total Mass', value: '1.898 × 10²⁷ kg (317.8 × Earth)' },
      { label: 'Mean Density', value: '1.326 g/cm³' },
      { label: 'Cloud-Top Gravity', value: '24.79 m/s² (2.53 g)' },
      { label: 'Escape Velocity', value: '59.5 km/s' },
      { label: 'Rotation Period (Shortest Day)', value: '9h 55m 30s' },
      { label: 'Orbital Period (Year)', value: '11.862 Earth Years (4,332.6 Days)' },
      { label: 'Orbital Distance', value: '5.204 AU (778.5M km)' },
      { label: 'Magnetic Field Moment', value: '20,000 × Earth’s Magnetosphere' },
      { label: 'Known Natural Moons', value: '95 Confirmed (4 Galilean Giants)' },
    ],
    composition: [
      { element: 'Molecular Hydrogen (H₂)', byMass: '89.8% (By Vol)', role: 'Transitions to liquid metallic state at depth' },
      { element: 'Helium (He)', byMass: '10.2% (By Vol)', role: 'Condenses as helium rain in deep interior' },
      { element: 'Methane (CH₄)', byMass: '0.3%', role: 'Absorbs infrared & drives hydrocarbon chemistry' },
      { element: 'Ammonia (NH₃)', byMass: '0.026%', role: 'Forms bright white upper cloud zones' },
      { element: 'Ammonium Hydrosulfide & Water', byMass: '0.05%', role: 'Colors middle & deep storm belts' },
    ],
    howItWorks: {
      title: 'How Jupiter Works // Kelvin-Helmholtz Contraction & Liquid Metallic Hydrogen',
      coreMechanism:
        'Jupiter radiates ~1.67 times more energy into space than it receives from the distant Sun. This excess internal heat is powered by the Kelvin-Helmholtz mechanism: Jupiter is still slowly gravitationally contracting by ~1 millimeter per year, converting gravitational potential energy into thermal heat, supplemented by droplets of helium condensing and raining down through the metallic hydrogen mantle.',
      surfaceAndWeather:
        'Because Jupiter completes a full rotation in less than 10 hours, extreme Coriolis forces split its rising and sinking convection cells into 20+ alternating zonal jet streams: bright, cool, rising ammonia "Zones" and dark, warm, sinking "Belts" with winds exceeding 600 km/h. At the boundaries, giant anticyclones like the Great Red Spot (16,350 km wide, 300–500 km deep) spin for centuries because there is no solid continent below to create friction.',
      layers: [
        {
          name: '01. Fuzzy / Diluted Heavy-Element Core (0 – 30,000 km)',
          temp: '~20,000 °C – 24,000 °C (Hotter than Sun’s surface)',
          density: '~6.0 – 25.0 g/cm³',
          details:
            'NASA’s Juno mission revealed Jupiter does NOT have a small, sharp rocky core. Instead, it has a vast "fuzzy" diluted core extending across nearly half the planet’s radius where rock, metal, and ice are dissolved into supercritical metallic hydrogen—likely stirred up by a head-on collision with a 10-Earth-mass protoplanet 4.5 billion years ago.',
        },
        {
          name: '02. Liquid Metallic Hydrogen Mantle (30,000 – 56,000 km)',
          temp: '10,000 °C → 20,000 °C',
          density: '1.0 – 4.0 g/cm³',
          details:
            'At pressures above 2 million bars (200 GPa), hydrogen atoms are squeezed so tightly that their electrons break free and flow like a liquid metal. Rapid 9.9-hour rotation of this electrically conductive ocean generates a magnetosphere so gigantic that if visible from Earth, it would appear 5 times larger than the Full Moon in our sky!',
        },
        {
          name: '03. Supercritical Molecular Hydrogen & Helium Ocean (56,000 – 69,000 km)',
          temp: '1,000 °C → 10,000 °C',
          density: '0.2 – 1.0 g/cm³',
          details:
            'Gas smoothly thickens into a supercritical fluid with no distinct liquid surface boundary. At its base, liquid helium separates like oil from vinegar and rains downward.',
        },
        {
          name: '04. Three-Deck Tropospheric Cloud Layer (50 km thick)',
          temp: '-145 °C (Top) to +20 °C (Water Base)',
          density: '0.1 – 10 bar',
          details:
            'Three distinct cloud decks: upper white Ammonia ice clouds (0.7 bar), middle reddish-brown Ammonium Hydrosulfide clouds (2 bar), and deep roaring Water-Ice & Liquid Water clouds (5–7 bar) crackling with super-bolts of lightning 1,000× stronger than Earth’s.',
        },
      ],
    },
    howItFormed: {
      title: 'How Jupiter Was Formed // Beyond the Frost Line & The "Grand Tack" Migration',
      phases: [
        {
          stage: 'Phase I: Rapid Ice-Rock Core Accretion Beyond the Frost Line (~1 Myr)',
          desc: 'Formed at ~3.5–5 AU where temperatures were cold enough for water, ammonia, and methane to freeze into solid ice—quadrupling the solid building blocks available and allowing a 10–20 Earth-mass core to assemble in under 1 million years.',
        },
        {
          stage: 'Phase II: Runaway Nebular Gas Envelope Capture (~1 – 3 Myr)',
          desc: 'Once the core exceeded ~10 Earth masses, its gravity triggered runaway gas accretion, vacuuming up 300 Earth masses of pristine hydrogen and helium gas from the solar nebula before the Sun blew the disk away.',
        },
        {
          stage: 'Phase III: The "Grand Tack" Inward & Outward Migration',
          desc: 'Disk torques caused young Jupiter to spiral inward to ~1.5 AU (Mars’s current orbit), truncating the inner rocky disk and explaining why Mars is so small—before locking into a 3:2 orbital resonance with newborn Saturn and "tacking" back outward to 5.2 AU.',
        },
        {
          stage: 'Phase IV: Circumplanetary Disk & Birth of the Galilean Moons',
          desc: 'A miniature accretion disk of gas and ice swirled around young Jupiter, giving birth to Io, Europa, Ganymede, and Callisto in a clockwork 4:2:1 Laplace orbital resonance.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Jupiter Will Die // Surviving the Red Giant & Eternal Cooling',
      overview:
        'At 5.2 AU, Jupiter orbits far beyond the reach of the Red Giant Sun’s surface (~1.2 AU). Jupiter will survive the death of the Sun intact, eventually orbiting the White Dwarf remnant at ~10 AU as a cold, dark brown-dwarf-like sphere.',
      timeline: [
        {
          time: '+5.5 to +7.6 Billion Years from Now',
          phase: 'The Thawing of Europa, Ganymede & Callisto',
          status: 'OCEAN WORLDS AWAKEN',
          desc: 'When the Sun swells into a 2,300-solar-luminosity Red Giant, the Solar System’s habitable zone sweeps outward to 5–10 AU. The icy crusts of Europa, Ganymede, and Callisto will melt into warm, exposed global liquid water oceans for hundreds of millions of years!',
        },
        {
          time: '+7.7 Billion Years from Now',
          phase: 'Atmospheric Heating & "Hot Jupiter" Glow',
          status: 'RADIATIVE',
          desc: 'Intense Red Giant radiation heats Jupiter’s upper cloud deck to ~500 K, vaporizing ammonia clouds and causing Jupiter to glow dull red in infrared light while solar mass loss causes Jupiter’s orbit to expand outward to ~9.5 AU.',
        },
        {
          time: '+10 to +100 Billion Years from Now',
          phase: 'Complete Internal Solidification Around the White Dwarf',
          status: 'FROZEN TITAN',
          desc: 'Orbiting the fading White Dwarf Sun, Jupiter exhausts its internal Kelvin-Helmholtz heat, its metallic core solidifies, and it cools toward absolute zero (-270 °C) over trillions of years.',
        },
      ],
    },
    funFacts: [
      {
        title: 'The Sun & Jupiter Orbit a Point Outside the Sun’s Surface',
        fact: 'Jupiter is so massive that the center of mass (barycenter) between the Sun and Jupiter actually lies 1.07 solar radii from the Sun’s center—46,000 km above the Sun’s visible surface! As Jupiter orbits, it makes the Sun wobble in a circle the size of the Sun itself.',
      },
      {
        title: 'Fastest Spin in the Solar System: A 9-Hour 55-Minute Day',
        fact: 'Despite being 11 times wider than Earth, Jupiter spins so fast that its equatorial cloud tops whip around at 45,300 km/h (28,000 mph). This centrifugal force flattens Jupiter into an oblate spheroid—its equator is 9,276 km wider than its pole-to-pole diameter!',
      },
      {
        title: 'Geometric Cyclone Polygons at Both Poles',
        fact: 'When NASA’s Juno spacecraft flew over Jupiter’s poles, it discovered something never seen before: 8 colossal hurricanes arranged in a perfect octagon around a central cyclone at the North Pole, and 5 cyclones in a pentagon at the South Pole.',
      },
      {
        title: 'A Faint Ring System Made of Moon Dust',
        fact: 'Discovered by Voyager 1 in 1979, Jupiter has a 4-part ring system (Halo, Main Ring, and two Gossamer Rings) made not of ice like Saturn’s, but of microscopic dark dust blasted off tiny inner moons Metis, Adrastea, Amalthea, and Thebe by micrometeorite impacts.',
      },
      {
        title: 'The 4:2:1 Laplace Clockwork Resonance',
        fact: 'For every 1 orbit Ganymede completes around Jupiter, Europa completes exactly 2 orbits, and Io completes exactly 4 orbits. This rhythmic gravitational tug flexes Io and Europa’s interiors, powering Io’s 400 volcanoes and keeping Europa’s subsurface ocean liquid!',
      },
      {
        title: 'Cosmic Shield AND Asteroid Slingshot',
        fact: 'Jupiter’s immense gravity absorbs and deflects long-period comets from the outer Solar System—as dramatically witnessed in July 1994 when Jupiter tore Comet Shoemaker-Levy 9 into 21 fragments and swallowed them in Earth-sized fireballs.',
      },
    ],
  },

  saturn: {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'Sixth Planet // Ringed Gas Giant & Hexagonal Jet World',
    category: 'Gas Giant',
    orderNumber: '06',
    age: '4.503 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA06193/PIA06193~orig.jpg',
    hexColor: '#e6c88a',
    summary:
      'The jewel of the Solar System, encircled by a dazzling ring system spanning 282,000 km across yet averaging only 10 meters thick. Saturn is a hydrogen-helium gas giant with a mean density of just 0.687 g/cm³—meaning it is 30% less dense than liquid water. Its system hosts 146 confirmed moons, including hydrocarbon-shrouded Titan and geyser-erupting Enceladus.',
    numericComparison: {
      diameterKm: 116460,
      massEarths: 95.16,
      gravityMps2: 10.44,
      distanceAU: 9.58,
      orbitalSpeedKmS: 9.68,
      moonsCount: 146,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '120,536 km (9.45 × Earth)' },
      { label: 'Total Mass', value: '5.683 × 10²⁶ kg (95.16 × Earth)' },
      { label: 'Mean Density', value: '0.687 g/cm³ (Less Dense than Water)' },
      { label: 'Cloud-Top Gravity', value: '10.44 m/s² (1.065 g)' },
      { label: 'Main Ring Span', value: '282,000 km Wide / ~10 m Thick' },
      { label: 'Rotation Period (Day)', value: '10h 33m 38s' },
      { label: 'Orbital Period (Year)', value: '29.457 Earth Years (10,759 Days)' },
      { label: 'Orbital Distance', value: '9.582 AU (1.43 Billion km)' },
      { label: 'Axial Tilt', value: '26.73° (Produces Ring Seasons)' },
      { label: 'Known Natural Moons', value: '146 Confirmed (Most in Solar System)' },
    ],
    composition: [
      { element: 'Molecular Hydrogen (H₂)', byMass: '96.3% (By Vol)', role: 'Primary envelope & metallic dynamo medium' },
      { element: 'Helium (He)', byMass: '3.25% (By Vol)', role: 'Depleted in upper atmosphere via helium rain' },
      { element: 'Methane (CH₄)', byMass: '0.45%', role: 'Stratospheric photochemistry' },
      { element: 'Ammonia (NH₃) Crystals', byMass: '0.012%', role: 'Creates pale gold-butterscotch cloud haze' },
      { element: 'Pure Water Ice (Rings)', byMass: '99.9% of Rings', role: 'billions of icy particles from µm to 10m' },
    ],
    howItWorks: {
      title: 'How Saturn Works // Helium Rain Engine, Ring Orbital Mechanics & The Polar Hexagon',
      coreMechanism:
        'Saturn radiates nearly 2.5 times more heat than it receives from the Sun—more than can be explained by simple gravitational contraction alone. Because Saturn is cooler internally than Jupiter, liquid helium becomes immiscible (unable to stay mixed) in liquid metallic hydrogen, condensing into droplets that rain down toward the core. Friction from this "Helium Rain" releases immense gravitational heat and explains why Saturn’s upper atmosphere is depleted in helium (3.25% vs Jupiter’s 10.2%).',
      surfaceAndWeather:
        'Equatorial winds on Saturn reach 1,800 km/h (1,100 mph)—four times faster than Jupiter’s. At 78° North latitude, a six-sided Rossby wave jet stream forms "Saturn’s Hexagon": a permanent geometric storm 29,000 km wide (more than twice the diameter of Earth) with a towering 300-km/h hurricane eye at the exact North Pole.',
      layers: [
        {
          name: '01. Diffuse Rock-Ice-Fluid Core (0 – 25,000 km)',
          temp: '~11,700 °C',
          density: '~4.0 – 15.0 g/cm³',
          details:
            'Ring seismology ("kronoseismology"—measuring gravity waves in the C-ring caused by oscillations inside Saturn) revealed that Saturn’s core is a fuzzy, stably stratified "slush" of 15–18 Earth masses of rock and ice mixed with metallic fluids.',
        },
        {
          name: '02. Liquid Metallic Hydrogen & Helium Rain Zone (25,000 – 38,000 km)',
          temp: '6,000 °C → 11,700 °C',
          density: '0.8 – 3.0 g/cm³',
          details:
            'Conductive metallic hydrogen layer generating a magnetic field whose dipole axis is aligned to within 0.0095° of Saturn’s rotation axis—the most axisymmetric magnetic field known.',
        },
        {
          name: '03. Molecular Hydrogen-Helium Envelope (38,000 – 58,000 km)',
          temp: '100 °C → 6,000 °C',
          density: '0.1 – 0.8 g/cm³',
          details:
            'Low-density gaseous and supercritical molecular hydrogen layer responsible for Saturn’s 0.687 g/cm³ overall density and 10% equatorial flattening.',
        },
        {
          name: '04. Main Ring System (D, C, B, Cassini Division, A, F, G, E Rings)',
          temp: '-200 °C to -163 °C',
          density: '99.9% Pure Water Ice',
          details:
            'Orbiting inside Saturn’s Roche Limit, billions of water-ice blocks (totaling ~40% the mass of moon Mimas) are sculpted by orbital resonances and "Shepherd Moons" (Pan, Daphnis, Prometheus, Pandora) that carve sharp gaps and vertical 2.5-km waves.',
        },
      ],
    },
    howItFormed: {
      title: 'How Saturn Was Formed // Outer Nebula Giant & Recent Birth of the Rings',
      phases: [
        {
          stage: 'Phase I: Core Accretion at ~7–9 AU (~4.50 Gya)',
          desc: 'Assembled an icy-rocky core of ~15 Earth masses slightly after Jupiter, capturing a 80-Earth-mass envelope of hydrogen and helium just as the solar nebula was dissipating.',
        },
        {
          stage: 'Phase II: The 3:2 Resonance & Rescue of the Inner Solar System',
          desc: 'Saturn migrated inward until it locked into resonance with Jupiter, halting Jupiter’s inward march toward the Sun and pulling both gas giants outward to their modern orbits.',
        },
        {
          stage: 'Phase III: Accretion of Titan & Icy Satellite System',
          desc: 'Titan (larger than Mercury) and Saturn’s mid-sized icy moons formed from Saturn’s circumplanetary gas-starved sub-nebula.',
        },
        {
          stage: 'Phase IV: Catastrophic Tidal Destruction of an Icy Moon (~100–400 Million Years Ago)',
          desc: 'Cassini’s Grand Finale measurements showed the rings are remarkably pristine and light (~1.5 × 10¹⁹ kg). Rather than being 4.5 billion years old, Saturn’s bright rings formed only 100 to 400 million years ago (when dinosaurs walked Earth!) when a Titan-approaching icy moon ("Chrysalis") wandered inside Saturn’s Roche Limit and was shredded into trillions of icy shards.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Saturn Will Die // "Ring Rain" Disappearance & The Awakening of Titan',
      overview:
        'Saturn’s iconic rings are temporary—they are actively draining into the planet today and will vanish long before the Sun dies. Later, when the Sun becomes a Red Giant, Saturn’s giant moon Titan will warm into a prime habitable ocean world.',
      timeline: [
        {
          time: '+100 to +300 Million Years from Now',
          phase: 'Complete Disappearance of Saturn’s Rings ("Ring Rain")',
          status: 'RINGS VANISHING',
          desc: 'Solar UV light and micrometeorites electrically charge icy ring particles, which are pulled down along Saturn’s magnetic field lines into the upper atmosphere at up to 10,000 kg per second (enough to fill an Olympic swimming pool every 30 minutes). In 100–300 million years, Saturn will be completely ringless!',
        },
        {
          time: '+6.0 to +7.6 Billion Years from Now',
          phase: 'Titan’s 300-Million-Year Habitable Window',
          status: 'TITAN AWAKENS',
          desc: 'As the Red Giant Sun brightens 2,300-fold, surface temperatures on organic-rich Titan rise from -179 °C to ~0 °C, melting its water-ice crust into a warm water-ammonia ocean beneath its nitrogen sky.',
        },
        {
          time: '+8.0+ Billion Years from Now',
          phase: 'Ringless Giant Orbiting the White Dwarf at ~18 AU',
          status: 'ETERNAL REMNANT',
          desc: 'After the Sun sheds half its mass into a planetary nebula, Saturn’s orbit doubles in radius to ~18 AU, where it slowly cools over tens of billions of years.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Paper-Thin Rings: If Scaled to a Sheet of Paper, Saturn Is a 1-Kilometer Sphere',
        fact: 'Although Saturn’s main rings span 282,000 km (nearly three-quarters of the distance from Earth to the Moon), they are only 10 meters (33 feet) thick on average—making them 10,000 times thinner relative to their width than a razor blade!',
      },
      {
        title: 'Dinosaurs Walked Earth Before Saturn Got Its Rings',
        fact: 'Cassini data proved that cosmic dust darkens the rings so quickly that their 99.9% pure bright water ice can only be 100 to 400 million years old—meaning early sharks, insects, and dinosaurs lived under a ringless Saturn!',
      },
      {
        title: '146 Moons: The Undisputed Moon King of the Solar System',
        fact: 'Saturn holds the record for the most confirmed natural satellites (146 moons), ranging from tiny 300-meter "moonlets" embedded inside the rings to planet-sized Titan (5,149 km diameter).',
      },
      {
        title: 'Enceladus Creates an Entire Planetary Ring Out of Geyser Snow',
        fact: 'Over 100 supersonic cryovolcanic geysers at the south pole of tiny moon Enceladus blast 200 kg of water vapor, ice crystals, and organic molecules into space every second—creating Saturn’s diffuse, 1-million-km-wide E-Ring!',
      },
      {
        title: 'Once-in-a-Saturnian-Year "Great White Spot" Mega-Storms',
        fact: 'Every ~29.5 Earth years (one Saturnian year, during Northern Summer), stored convective heat erupts in a colossal lightning mega-storm ("The Great White Spot") that wraps all the way around the entire planet for months.',
      },
      {
        title: 'Janus & Epimetheus: The Two Moons That Swap Orbits Every 4 Years',
        fact: 'Two Saturnian moons, Janus and Epimetheus, share virtually the same orbit (separated by just 50 km—less than their own widths!). Instead of colliding, every 4 years their mutual gravity makes the inner moon slow down and move outward while the outer moon speeds up and drops inward, trading places in a cosmic dance.',
      },
    ],
  },

  uranus: {
    id: 'uranus',
    name: 'Uranus',
    subtitle: 'Seventh Planet // Sideways-Rolling Ice Giant & Diamond Mantle World',
    category: 'Ice Giant',
    orderNumber: '07',
    age: '4.503 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg',
    hexColor: '#7dd3fc',
    summary:
      'The first planet discovered by telescope (William Herschel, 1781) and the first of a distinct planetary class: the Ice Giants. Unlike hydrogen-dominated Jupiter and Saturn, 80% of Uranus’s mass resides in a hot, high-pressure supercritical ocean of "ices"—water, ammonia, and methane. Knocked onto an extreme 97.77° axial tilt, Uranus rolls sideways around the Sun with the coldest planetary atmosphere in the Solar System (-224 °C).',
    numericComparison: {
      diameterKm: 50724,
      massEarths: 14.54,
      gravityMps2: 8.69,
      distanceAU: 19.19,
      orbitalSpeedKmS: 6.8,
      moonsCount: 28,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '51,118 km (4.01 × Earth)' },
      { label: 'Total Mass', value: '8.681 × 10²⁵ kg (14.54 × Earth)' },
      { label: 'Mean Density', value: '1.270 g/cm³' },
      { label: 'Cloud-Top Gravity', value: '8.69 m/s² (0.886 g — Lower than Earth!)' },
      { label: 'Minimum Temperature', value: '-224.2 °C (49 K — Coldest Planet)' },
      { label: 'Axial Tilt (Sideways Spin)', value: '97.77° (Retrograde Rolling)' },
      { label: 'Rotation Period (Day)', value: '-17h 14m 24s' },
      { label: 'Orbital Period (Year)', value: '84.02 Earth Years (30,688.5 Days)' },
      { label: 'Orbital Distance', value: '19.191 AU (2.87 Billion km)' },
      { label: 'Rings & Moons', value: '13 Dark Rings • 28 Literary Moons' },
    ],
    composition: [
      { element: 'Molecular Hydrogen (H₂)', byMass: '82.5% (Upper Air)', role: 'Outer gaseous envelope' },
      { element: 'Helium (He)', byMass: '15.2% (Upper Air)', role: 'Primordial solar nebula ratio' },
      { element: 'Methane (CH₄)', byMass: '2.3% (Upper Air)', role: 'Absorbs red light, creating cyan-aquamarine hue' },
      { element: 'Hydrogen Sulfide (H₂S)', byMass: 'Cloud Deck', role: 'Forms upper cloud tops ("rotten egg" gas)' },
      { element: 'Supercritical H₂O, NH₃, CH₄', byMass: '80% of Planet Mass', role: 'Ionic "ice" ocean & diamond-rain mantle' },
    ],
    howItWorks: {
      title: 'How Uranus Works // Ionic Supercritical Water Ocean, Diamond Rain & Tilted Quadrupole Magnetosphere',
      coreMechanism:
        'Mystery of the Missing Heat: Unlike Jupiter, Saturn, and Neptune—all of which radiate 1.7× to 2.6× more internal heat than they absorb from the Sun—Uranus radiates virtually ZERO excess internal heat, making its upper atmosphere the coldest in the Solar System (-224 °C). Scientists suspect a composition boundary (thermal barrier) inside its mantle traps primordial heat deep within the core, preventing full-planet convection.',
      surfaceAndWeather:
        'Because Uranus is tilted 97.77° on its side, its poles point almost directly at the Sun during solstices: each pole experiences 42 continuous Earth years of blinding daylight followed by 42 years of total winter darkness. Even so, its equator remains warmer than its poles, whipped by 900-km/h winds and seasonal methane storms.',
      layers: [
        {
          name: '01. Silicate & Iron-Nickel Core (0 – 5,000 km Radius)',
          temp: '~4,700 °C',
          density: '~9.0 g/cm³',
          details:
            'A small rocky-metallic core of only ~0.5 to 1.5 Earth masses surrounded by immense pressure (8 million bars).',
        },
        {
          name: '02. Superionic Water & "Diamond Rain" Mantle (5,000 – 20,000 km)',
          temp: '2,000 °C – 4,700 °C',
          density: '~1.5 – 5.0 g/cm³',
          details:
            'A dense, electrically conductive fluid of water, ammonia, and methane. At pressures of 1.5 million bars, methane (CH₄) molecules are ripped apart and carbon atoms compress into solid crystalline diamonds that literally hail downward through the mantle like "Diamond Rain", while water enters an exotic "Superionic Ice" phase where oxygen forms a solid lattice and hydrogen ions flow freely like a liquid metal!',
        },
        {
          name: '03. Off-Center Tilted Magnetosphere Generator',
          temp: '~1,500 °C',
          density: 'Ionic Fluid',
          details:
            'Because the magnetic dynamo is generated in the outer ionic water shell rather than the deep core, Uranus’s magnetic field is tilted 59° away from its spin axis and shifted one-third of the way off-center toward the South Pole—causing the magnetosphere to tumble like a wobbling corkscrew every 17.2 hours!',
        },
        {
          name: '04. Hydrogen-Helium-Methane Atmosphere & 13 Dark Rings',
          temp: '-224 °C to -150 °C',
          density: '0.1 – 100 bar',
          details:
            'Topped by methane ice haze and hydrogen sulfide clouds, encircled by 13 narrow, coal-black rings rotating vertically like a giant bullseye around the sideways planet.',
        },
      ],
    },
    howItFormed: {
      title: 'How Uranus Was Formed // Nice Model Migration & The Cataclysmic Oblique Impact',
      phases: [
        {
          stage: 'Phase I: Ice-Rich Planetesimal Accretion (~4.50 Gya)',
          desc: 'Formed closer to the Sun (~11–14 AU) where volatile ices (H₂O, NH₃, CH₄) were abundant, building a 12-Earth-mass ice-rock body that captured only a modest 2-Earth-mass hydrogen-helium envelope before the solar nebula vanished.',
        },
        {
          stage: 'Phase II: The "Nice Model" Planetary Instability & Outward Scattering (~4.0 Gya)',
          desc: 'Gravitational resonances with Jupiter and Saturn flung Uranus and Neptune outward into the primordial Kuiper Belt, scattering icy planetesimals across the Solar System and pushing Uranus out to 19.2 AU.',
        },
        {
          stage: 'Phase III: The Grazing Earth-Sized Protoplanet Collision',
          desc: 'One or two grazing impacts by an icy protoplanet 1 to 3 times the mass of Earth knocked Uranus 97.77° onto its side, stirred up a thermal boundary layer that trapped its internal heat, and spun out a vertical debris disk.',
        },
        {
          stage: 'Phase IV: Vertical Moon & Ring Coalescence',
          desc: 'Uranus’s 5 major moons (Miranda, Ariel, Umbriel, Titania, Oberon) formed from that tilted impact disk, explaining why all its moons and 13 rings orbit at 98° right along its sideways equator!',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Uranus Will Die // Outward Orbital Drift & Eternal Ice Giant',
      overview:
        'Orbiting at 19.2 AU, Uranus will remain completely safe from engulfment when the Sun becomes a Red Giant. Instead, its atmosphere will warm enough to clear its methane haze before drifting out to ~38 AU around the White Dwarf Sun.',
      timeline: [
        {
          time: '+7.5 Billion Years from Now',
          phase: 'Peak Red Giant Illumination & Atmospheric Warming',
          status: 'THAWING',
          desc: 'Even at 19.2 AU, the 2,300-solar-luminosity Red Giant Sun increases solar flux at Uranus by >100×, warming Uranus’s cloud tops from -200 °C to ~0 °C and melting the icy surfaces of Titania, Oberon, and Ariel.',
        },
        {
          time: '+7.8 Billion Years from Now',
          phase: 'Orbital Expansion to ~38 AU During Planetary Nebula Mass Loss',
          status: 'DRIFTING OUTWARD',
          desc: 'As the dying Sun ejects 46% of its mass into space, its gravitational hold weakens, causing Uranus’s orbital distance to nearly double.',
        },
        {
          time: '+10+ Billion Years from Now',
          phase: 'Frozen Sideways Sentinel of the White Dwarf',
          status: 'ETERNAL REMNANT',
          desc: 'Uranus continues rolling sideways around the cold White Dwarf remnant for trillions of years unless perturbed by a close stellar flyby in the Milky Way.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Lower Surface Gravity Than Earth Despite Being 14.5× More Massive!',
        fact: 'Because Uranus’s 14.5 Earth masses are puffed out over a volume 63 times larger than Earth, its cloud-top gravity is only 8.69 m/s² (88.6% of Earth’s gravity). If you weighed 100 lbs on Earth, you would weigh only 89 lbs floating in a balloon in Uranus’s clouds!',
      },
      {
        title: 'Real Diamond Hailstorms Deep Inside the Mantle',
        fact: 'Laboratory laser-shock experiments at SLAC confirmed that under the 1.5-million-bar pressure and 3,000 °C heat inside Uranus, methane splits and compresses into solid millions-of-carat diamonds that sink like hailstones into a liquid diamond sea atop the core.',
      },
      {
        title: 'All 28 Moons Are Named After Characters from Shakespeare & Alexander Pope',
        fact: 'Instead of Greek or Roman mythology, every Uranian moon is named after literary characters from William Shakespeare (Titania, Oberon, Puck, Miranda, Ariel, Juliet, Portia, Prospero) and Alexander Pope (Umbriel, Belinda).',
      },
      {
        title: 'Miranda’s Verona Rupes: A 12-Minute Freefall Down a 20-Kilometer Cliff',
        fact: 'Uranus’s patchwork moon Miranda boasts Verona Rupes—a sheer tectonic cliff up to 20 km (65,000 ft) tall, twice the depth of the Mariana Trench. Because Miranda’s gravity is only 0.008 g, jumping off the top would result in a gentle 12-minute freefall!',
      },
      {
        title: 'Clouds That Smell Like Rotten Eggs (Hydrogen Sulfide)',
        fact: 'Spectroscopic observations with the Gemini North telescope proved that Uranus’s upper cloud deck is composed of frozen Hydrogen Sulfide (H₂S)—the exact molecule that gives rotten eggs their pungent odor.',
      },
      {
        title: 'Visited Only Once in Human History (Voyager 2, January 1986)',
        fact: 'Every close-up photograph humanity possesses of Uranus and its moons was taken during a single 6-hour flyby by Voyager 2 on January 24, 1986. A dedicated Uranus Orbiter and Probe has been named NASA’s #1 flagship priority for the next decade.',
      },
    ],
  },

  neptune: {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'Eighth Planet // Supersonic Wind Engine & Outermost Ice Giant',
    category: 'Ice Giant',
    orderNumber: '08',
    age: '4.503 Billion Years',
    image: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg',
    hexColor: '#3b82f6',
    summary:
      'The outermost major planet in the Solar System, orbiting 30 times farther from the Sun than Earth (4.5 billion km) where sunlight is 900 times fainter than on Earth. The first planet discovered by pure mathematical prediction (1846) rather than empirical sky-scanning, Neptune is a dynamic ice giant that radiates 2.61 times more internal heat than it receives from the Sun—driving the fastest supersonic winds in the Solar System at 2,160 km/h.',
    numericComparison: {
      diameterKm: 49244,
      massEarths: 17.15,
      gravityMps2: 11.15,
      distanceAU: 30.07,
      orbitalSpeedKmS: 5.43,
      moonsCount: 16,
    },
    metrics: [
      { label: 'Equatorial Diameter', value: '49,528 km (3.88 × Earth)' },
      { label: 'Total Mass', value: '1.024 × 10²⁶ kg (17.15 × Earth)' },
      { label: 'Mean Density', value: '1.638 g/cm³ (Densest Giant Planet)' },
      { label: 'Cloud-Top Gravity', value: '11.15 m/s² (1.14 g)' },
      { label: 'Peak Wind Velocity', value: '2,160 km/h (1,340 mph — Supersonic!)' },
      { label: 'Rotation Period (Day)', value: '16h 06m 36s' },
      { label: 'Orbital Period (Year)', value: '164.79 Earth Years (60,190 Days)' },
      { label: 'Orbital Distance', value: '30.07 AU (4.50 Billion km)' },
      { label: 'Internal Heat Ratio', value: '2.61 × Absorbed Solar Energy' },
      { label: 'Moons & Rings', value: '16 Moons (Triton = 99.5% Mass) • 5 Rings' },
    ],
    composition: [
      { element: 'Molecular Hydrogen (H₂)', byMass: '80.0% (Atmosphere)', role: 'Low-viscosity supersonic wind medium' },
      { element: 'Helium (He)', byMass: '19.0% (Atmosphere)', role: 'Outer gaseous envelope' },
      { element: 'Methane (CH₄)', byMass: '1.5% (Atmosphere)', role: 'Creates azure blue hue & white cirrus clouds' },
      { element: 'Superionic Water (H₂O)', byMass: '~60% Total Mass', role: 'Conductive ionic ocean & magnetic dynamo' },
      { element: 'Ammonia & Methane Ices', byMass: '~20% Total Mass', role: 'Deep high-pressure diamond-producing mantle' },
    ],
    howItWorks: {
      title: 'How Neptune Works // Internal Heat Engine, Supersonic Jet Streams & Triton Capture',
      coreMechanism:
        'Although Neptune is slightly smaller in diameter than Uranus (49,244 km vs 50,724 km), it is 18% MORE massive (17.15 vs 14.54 Earths) because it contains a larger rocky core and denser ice mantle. Unlike stagnant Uranus, Neptune’s interior is vigorously convective—releasing 2.61 times as much thermal energy from deep within as it absorbs from the distant Sun.',
      surfaceAndWeather:
        'This powerful internal heat engine, combined with ultra-cold, low-turbulence upper air and the absence of solid surface friction, accelerates equatorial retrograde winds to 2,160 km/h (600 m/s)—exceeding the speed of sound in Neptune’s atmosphere! Giant dark anticyclonic vortices ("The Great Dark Spot", the size of Earth) form and dissipate every few years, crowned by bright white methane-ice cirrus clouds casting shadows 50 km onto the blue cloud deck below.',
      layers: [
        {
          name: '01. Iron-Nickel & Silicate Core (0 – 6,000 km Radius)',
          temp: '~5,100 °C',
          density: '~9.5 g/cm³',
          details:
            'A rocky-metallic core of ~1.2 Earth masses subjected to 7 million bars (700 GPa) of pressure—twice the pressure at the center of the Earth.',
        },
        {
          name: '02. Superionic Water-Ammonia-Methane Mantle (6,000 – 21,000 km)',
          temp: '2,000 °C – 5,000 °C',
          density: '1.8 – 5.5 g/cm³',
          details:
            'A 15,000-km-deep hot, electrically conductive ionic ocean where water exists as superionic ice and compressed methane rains solid diamonds toward the core.',
        },
        {
          name: '03. Offset Quadrupole Magnetic Dynamo Zone',
          temp: '~1,800 °C',
          density: 'Ionic Slush',
          details:
            'Like Uranus, Neptune’s magnetic field is generated in a shallow convective ionic shell, tilting its magnetic axis 47° from its rotation axis and offsetting it by 0.55 radii (13,500 km) from the planet’s physical center.',
        },
        {
          name: '04. Supersonic Hydrogen-Helium-Methane Troposphere & 5 Rings',
          temp: '-218 °C to -190 °C',
          density: '0.1 – 50 bar',
          details:
            'Deep hydrogen sulfide and ammonia clouds topped by methane ice cirrus clouds, surrounded by 5 dusty rings (Galle, Le Verrier, Lassell, Arago, and Adams—which contains clumpy bright ring arcs named Liberté, Égalité, and Fraternité).',
        },
      ],
    },
    howItFormed: {
      title: 'How Neptune Was Formed // Outward Migration & The Violent Capture of Triton',
      phases: [
        {
          stage: 'Phase I: Formation Closer to the Sun (~15–20 AU, ~4.50 Gya)',
          desc: 'At 30 AU, the primordial solar nebula was too sparse to build a 17-Earth-mass planet before the gas dissipated. Instead, Neptune formed much closer to the Sun (~15–17 AU, initially inside Uranus’s orbit in many Nice Model simulations!).',
        },
        {
          stage: 'Phase II: Nice Model Planet-Jumping & Kuiper Belt Plowing (~4.0 Gya)',
          desc: 'Gravitational instability among the giant planets hurled Neptune past Uranus into the dense primordial Kuiper Belt. Through "planetesimal-driven migration", Neptune plowed outward to 30.07 AU, sculpting the modern Kuiper Belt and locking Pluto into a 3:2 orbital resonance.',
        },
        {
          stage: 'Phase III: Gravitational Capture of Binary Kuiper Belt Dwarf Planet Triton',
          desc: 'During its outward march, Neptune encountered a binary pair of Pluto-sized Kuiper Belt dwarf planets. Neptune gravitationally flung one partner away and captured the other—Triton—into a backward (retrograde), highly inclined orbit.',
        },
        {
          stage: 'Phase IV: Destruction of Neptune’s Original Moon System',
          desc: 'Newly captured Triton’s eccentric orbit plowed through Neptune’s original family of prograde moons, smashing and scattering them while tidal flexing melted Triton’s interior for a billion years until its orbit circularized.',
        },
      ],
    },
    whenItWillDie: {
      title: 'When & How Neptune Will Die // The Cataclysmic Ring of Triton & 60-AU Drift',
      overview:
        'In 3.6 billion years, Neptune will witness the most spectacular ring-formation event in the Solar System’s history when its giant retrograde moon Triton spirals inside Neptune’s Roche Limit and is torn to shreds.',
      timeline: [
        {
          time: '+3.6 Billion Years from Now',
          phase: 'Tidal Destruction of Triton & Birth of a Mega-Ring System',
          status: 'SUPER-RING EVENT',
          desc: 'Because Triton orbits backward (opposite to Neptune’s spin), tidal forces steadily drain Triton’s orbital energy. In 3.6 billion years, Triton (larger than Pluto!) will cross Neptune’s Roche Limit and be ripped apart into an icy ring system far more massive and dazzling than Saturn’s rings today!',
        },
        {
          time: '+7.6 Billion Years from Now',
          phase: 'Red Giant Solar Brightening at 30 AU',
          status: 'WARMING',
          desc: 'During the Sun’s peak Red Giant phase, Neptune receives as much sunlight as Jupiter or Mars receives today, warming its atmosphere and lighting up its post-Triton ring system.',
        },
        {
          time: '+7.8+ Billion Years from Now',
          phase: 'Outward Expansion to ~60 AU Around the White Dwarf',
          status: 'OUTER SENTINEL',
          desc: 'As the Sun sheds half its mass into a planetary nebula, Neptune spirals outward to ~60 AU—guarding the outer edge of the dead White Dwarf system for eternity.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Discovered with Pen and Paper Before Anyone Looked Through a Telescope',
        fact: 'After astronomers noticed Uranus was being pulled slightly off its predicted orbit, French mathematician Urbain Le Verrier calculated the exact mass and sky coordinates of an unseen eighth planet by hand. On September 23, 1846, Johann Galle pointed the Berlin Observatory telescope to Le Verrier’s coordinates and found Neptune within 1° on the very first night—in under 30 minutes!',
      },
      {
        title: 'Just Completed Its First Full Orbit Since Discovery in 2011!',
        fact: 'Because Neptune takes 164.79 Earth years to orbit the Sun once, it did not complete its first full 360° orbit since its 1846 discovery until July 12, 2011.',
      },
      {
        title: 'Supersonic Winds Powered by Less Sunlight Than a Dim Lightbulb',
        fact: 'At 30 AU, sunlight at Neptune is 900 times weaker than on Earth. Paradoxically, this lack of solar heating reduces atmospheric turbulence, allowing Neptune’s internal heat to drive frictionless jet streams past 2,160 km/h (faster than the speed of sound).',
      },
      {
        title: 'Triton: Active Liquid Nitrogen Geysers at -235 °C',
        fact: 'Neptune’s giant captured moon Triton has one of the coldest surfaces in the Solar System (-235 °C / 38 K), yet Voyager 2 photographed active cryovolcanic geysers blasting plumes of dark nitrogen gas and dust 8 km high into its thin sky!',
      },
      {
        title: 'Pluto Crosses Inside Neptune’s Orbit—Yet They Can Never Collide',
        fact: 'For 20 years out of every 248-year orbit, Pluto’s elliptical path actually brings it closer to the Sun than Neptune! However, they are locked in a stable 3:2 mean-motion resonance (Neptune completes 3 orbits for every 2 of Pluto’s), ensuring they never come within 17 AU of each other.',
      },
      {
        title: 'GalileoActually Saw Neptune in 1612—234 Years Early!',
        fact: 'Galileo Galilei’s notebooks from December 1612 and January 1613 show he plotted Neptune right next to Jupiter and even noted that it appeared to move relative to background stars, but because Neptune was just starting its slow retrograde loop, he mistook it for a fixed background star.',
      },
    ],
  },
};
