/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MonographLayer,
  MonographPhase,
  MonographTimelineEvent,
  MonographFunFact,
} from './planetMonographsData';

export interface ProbeMonograph {
  id: string;
  name: string;
  acronym: string;
  subtitle: string;
  category: 'Deep-Space Probe' | 'Space Telescope' | 'Planetary Rover' | 'Orbital Station & Fleet';
  operator: string;
  launchDate: string;
  status: 'ACTIVE MISSION' | 'INTERSTELLAR ACTIVE' | 'HISTORIC COMPLETED';
  image: string;
  hexColor: string;
  focusPlanet3D: string; // Associated 3D solar target ('sun' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'neptune')
  summary: string;
  numericComparison: {
    launchYear: number;
    massKg: number;
    maxSpeedKmH: number;
    distanceFromEarthKm: number;
    powerWatts: number;
  };
  metrics: { label: string; value: string }[];
  subsystems: { system: string; spec: string; role: string }[];
  howItWorks: {
    title: string;
    propulsionAndNav: string;
    powerAndComms: string;
    instruments: MonographLayer[];
  };
  missionChronology: {
    title: string;
    phases: MonographPhase[];
  };
  missionFate: {
    title: string;
    overview: string;
    timeline: MonographTimelineEvent[];
  };
  funFacts: MonographFunFact[];
}

export const PROBES_MONOGRAPHS: Record<string, ProbeMonograph> = {
  voyager: {
    id: 'voyager',
    name: 'Voyager 1 & Voyager 2',
    acronym: 'VGR-1 / VGR-2',
    subtitle: 'Interstellar Emissaries // Grand Tour of the Outer Giants',
    category: 'Deep-Space Probe',
    operator: 'NASA / Jet Propulsion Laboratory (JPL)',
    launchDate: 'Aug 20 & Sep 5, 1977',
    status: 'INTERSTELLAR ACTIVE',
    image: 'https://images-assets.nasa.gov/image/PIA17046/PIA17046~orig.jpg',
    hexColor: '#a855f7',
    focusPlanet3D: 'neptune',
    summary:
      'The farthest and longest-operating human-made objects in existence. Launched in 1977 to exploit a once-every-176-years geometric alignment of Jupiter, Saturn, Uranus, and Neptune, the twin Voyager spacecraft rewrote planetary science before crossing the Heliopause into true interstellar space—where both still transmit telemetry back to Earth from over 24.5 billion kilometers away.',
    numericComparison: {
      launchYear: 1977,
      massKg: 815,
      maxSpeedKmH: 61500,
      distanceFromEarthKm: 24600000000,
      powerWatts: 220,
    },
    metrics: [
      { label: 'Voyager 1 Distance', value: '>164 AU (24.6 Billion km)' },
      { label: 'Voyager 2 Distance', value: '>137 AU (20.5 Billion km)' },
      { label: 'Heliocentric Velocity', value: '17.0 km/s (61,200 km/h)' },
      { label: 'One-Way Radio Light Time', value: '22h 48m (At Speed of Light)' },
      { label: 'Launch Mass (Wet)', value: '815 kg (Dry Bus: 721.9 kg)' },
      { label: 'Power Source', value: '3 × MHW-RTG (Plutonium-238)' },
      { label: 'High-Gain Dish Diameter', value: '3.66 meters (12 ft Parabolic)' },
      { label: 'Onboard Computer Memory', value: '69.63 Kilobytes Total (3 Dual CPUs)' },
      { label: 'Transmit Power at Dish', value: '22.4 Watts (Dim Refrigerator Bulb)' },
      { label: 'Cultural Artifact', value: '12-Inch Gold-Plated Copper Record' },
    ],
    subsystems: [
      { system: 'Power: 3 × Plutonium-238 RTGs', spec: '470 W at Launch (~220 W Today)', role: 'Thermocouple decay heat conversion' },
      { system: 'Comms: S-Band & X-Band Dish', spec: '160 bps Interstellar Downlink', role: 'Captured by 70m Deep Space Network dishes' },
      { system: 'Attitude: 16 Hydrazine Thrusters', spec: 'MR-103 Monopropellant', role: '3-axis sun/star-tracker stabilization' },
      { system: 'Computers: CCS, FDS & AACS', spec: '18-bit CMOS / Plated-Wire Memory', role: 'Fault-protection & science formatting' },
    ],
    howItWorks: {
      title: 'How Voyager Works // Plutonium RTGs, Gravity-Assist Slingshots & Deep Space Network',
      propulsionAndNav:
        'No chemical rocket on Earth was powerful enough to push an 815-kg probe directly to Neptune and out of the Solar System. Instead, Voyager used "Gravity Assists": by flying just behind a moving giant planet (like Jupiter), the spacecraft steals a tiny fraction of the planet’s orbital momentum around the Sun—slingshotting Voyager 1 by +16 km/s while slowing Jupiter down by one foot per trillion years!',
      powerAndComms:
        'Beyond Jupiter, sunlight is too weak for solar panels. Each Voyager carries three Radioisotope Thermoelectric Generators (RTGs) mounted on an beryllium boom: as Plutonium-238 naturally decays (87.7-year half-life), it glows red-hot, and silicon-germanium thermocouples convert that heat directly into electricity. Its 22-watt X-band radio beam arrives at Earth diluted to one twenty-billionth of a billionth of a watt (10⁻¹⁹ W), requiring NASA’s 70-meter Deep Space Network antennas to decode.',
      instruments: [
        {
          name: '01. Magnetometer (MAG) on 13-Meter Fiberglass Boom',
          temp: '-200 °C Operating',
          density: '5.6 kg Sensor Suite',
          details:
            'Mounted on a self-uncoiling 13-meter (43-ft) boom to isolate sensors from the spacecraft’s own electrical currents. Measured the magnetic fields of all 4 giant planets and detected the magnetic boundary of the Heliopause.',
        },
        {
          name: '02. Cosmic Ray Subsystem (CRS) & Low-Energy Charged Particle (LECP)',
          temp: 'Heated Bay',
          density: '14.2 kg Combined',
          details:
            'Confirmed the exact day Voyager 1 (Aug 25, 2012) and Voyager 2 (Nov 5, 2018) exited the Sun’s protective bubble when solar protons abruptly vanished and galactic cosmic rays surged.',
        },
        {
          name: '03. Plasma Wave Subsystem (PWS) — Twin 10-Meter Antennas',
          temp: 'Interstellar Vacuum',
          density: '1.4 kg',
          details:
            'Two 10-meter beryllium-copper V-antennas that "listen" to electron plasma oscillations in interstellar space, measuring the density of the local interstellar medium.',
        },
        {
          name: '04. Imaging Science System (ISS) & Ultraviolet/Infrared Spectrometers',
          temp: 'Powered Down (1990)',
          density: 'Scan Platform',
          details:
            'Narrow and wide-angle vidicon tube cameras that captured 67,000 historic portraits of the outer Solar System—including the famous "Pale Blue Dot" image of Earth from 6 billion km away on Feb 14, 1990—before being turned off to save power.',
        },
        {
          name: '05. The Voyager Golden Record (Time Capsule for Extraterrestrials)',
          temp: '1-Billion-Year Shelf Life',
          density: 'Gold-Plated Copper Disk',
          details:
            'Curated by Carl Sagan, containing 115 analog-encoded images, greetings in 55 languages, whale songs, brainwaves, and 90 minutes of music (Bach, Beethoven, Chuck Berry, Blind Willie Johnson) with an aluminum cover electroplated with ultra-pure Uranium-238 as a 4.5-billion-year radioactive clock.',
        },
      ],
    },
    missionChronology: {
      title: 'How the Voyager Grand Tour Unfolded // Four Giants & The Heliopause Crossing',
      phases: [
        {
          stage: 'Phase I: Launch & Jovian System Encounters (1977 – 1979)',
          desc: 'Voyager 2 launched first (Aug 20, 1977) on a slower trajectory, followed 16 days later by faster Voyager 1 (Sep 5, 1977). In 1979, both swept past Jupiter—discovering active sulfur volcanoes on Io, cracked ice on Europa, and Jupiter’s faint rings.',
        },
        {
          stage: 'Phase II: Saturn, Titan & Trajectory Divergence (1980 – 1981)',
          desc: 'In Nov 1980, Voyager 1 flew within 6,490 km of Saturn’s moon Titan to study its thick nitrogen-methane atmosphere; that close flyby bent Voyager 1’s path 35° northward out of the ecliptic plane. Voyager 2 arrived in Aug 1981 on a path keeping it in the plane toward Uranus and Neptune.',
        },
        {
          stage: 'Phase III: Voyager 2’s Solo Ice Giant Odyssey (1986 & 1989)',
          desc: 'Voyager 2 became the sole spacecraft in history to visit Uranus (Jan 1986, discovering 11 moons and its corkscrew magnetic field) and Neptune (Aug 1989, discovering the Great Dark Spot and active nitrogen geysers on Triton).',
        },
        {
          stage: 'Phase IV: Termination Shock, Heliopause & Interstellar Space (2004 – Present)',
          desc: 'Voyager 1 crossed the Heliopause into the interstellar medium on Aug 25, 2012 (at 121 AU), followed by Voyager 2 on Nov 5, 2018 (at 119 AU). In 2024, JPL engineers famously rewrote Voyager 1’s 1970s assembly code from 24 billion km away to bypass a failed memory chip!',
        },
      ],
    },
    missionFate: {
      title: 'When & How Voyager Will End // RTG Power Loss & Eternal Galactic Orbit',
      overview:
        'Plutonium-238 decay and thermocouple degradation reduce each Voyager’s electrical power by ~4 watts per year. While radio transmissions will cease in the early 2030s, the physical spacecraft will orbit the center of the Milky Way galaxy forever.',
      timeline: [
        {
          time: '2026 – 2032',
          phase: 'Sequential Instrument Shutdowns to Preserve Core Transmitter',
          status: 'LOW POWER',
          desc: 'Engineers turn off remaining heaters and instruments one by one so the last ~200 watts can keep one science sensor and the X-band radio transmitter alive past the 50th anniversary in 2027.',
        },
        {
          time: '~2032 – 2036',
          phase: 'Final Radio Silence (Loss of Attitude Lock)',
          status: 'END OF SIGNAL',
          desc: 'Electrical power drops below the threshold required to run the hydrazine thruster heaters and gyroscopes. Once the 3.66m dish drifts off-point from Earth, both Voyagers fall silent forever.',
        },
        {
          time: '+300 Years to +30,000 Years from Now',
          phase: 'Passage Through the Oort Cloud',
          status: 'DRIFTING',
          desc: 'Voyager 1 enters the inner boundary of the Oort Cloud of comets in ~300 years and takes ~30,000 years to emerge completely from the Sun’s gravitational sphere.',
        },
        {
          time: '+40,272 Years from Now',
          phase: 'Closest Stellar Flyby: Gliese 445 & Ross 248',
          status: 'STELLAR ENCOUNTER',
          desc: 'Voyager 1 will pass within 1.6 light-years of the red dwarf star Gliese 445 in the constellation Camelopardalis, while Voyager 2 will pass within 1.7 light-years of Ross 248—carrying the Golden Record for billions of yearslong after Earth itself is gone.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Your Smartphone Has 1,000,000× More Memory Than Voyager',
        fact: 'Voyager’s three redundant onboard computers have a combined memory of just 69.63 kilobytes—less than the file size of a single low-resolution email icon—and originally recorded photos onto an 8-track digital magnetic tape recorder!',
      },
      {
        title: 'Fired Backup Thrusters After Sitting Dormant for 37 Years in -200 °C Space',
        fact: 'In 2017, when Voyager 1’s primary attitude thrusters began clogging after 40 years of pulses, JPL engineers fired four trajectory-correction thrusters that hadn’t been used since Saturn in November 1980. Every single one fired on the first try!',
      },
      {
        title: 'Still Getting Faster Data Only When 70-Meter Arrays Combine',
        fact: 'By the time Voyager 1’s 22-watt radio signal travels 24.6 billion km to Earth, it is 20 billion times weaker than the power needed to run a digital wristwatch.',
      },
      {
        title: 'The "Pale Blue Dot" Was Taken Against Managers’ Objections',
        fact: 'Carl Sagan pleaded for years to turn Voyager 1’s camera backward one last time on Valentine’s Day 1990 from 6 billion km away. Engineers worried sunlight might burn the camera tube, Value-wise it didn’t matter because the cameras were being permanently shut off hours later—capturing Earth as a 0.12-pixel mote of dust suspended in a sunbeam.',
      },
      {
        title: 'Ann Druyan’s Brainwaves Were Recorded onto the Golden Record While Thinking of Love',
        fact: 'Creative director Ann Druyan had her 1-hour EEG brainwave and ECG heartbeat patterns compressed into a 1-minute audio track on the Golden Record while meditating on human history and falling in love with Carl Sagan.',
      },
      {
        title: 'Chuck Berry in Interstellar Space',
        fact: 'Alongside Bach’s Brandenburg Concertos, Mozart’s Magic Flute, and Navajo night chants, the Golden Record carries Chuck Berry’s "Johnny B. Goode" on a 225-million-year orbit around the Milky Way.',
      },
    ],
  },

  jwst: {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    acronym: 'JWST',
    subtitle: 'Sun-Earth L2 Observatory // Infrared Time Machine to the Cosmic Dawn',
    category: 'Space Telescope',
    operator: 'NASA / ESA / CSA (STScI)',
    launchDate: 'December 25, 2021',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000383/GSFC_20171208_Archive_e000383~orig.jpg',
    hexColor: '#f59e0b',
    focusPlanet3D: 'earth',
    summary:
      'The largest, most complex, and most powerful space science telescope ever constructed. Stationed in a halo orbit around the Sun-Earth second Lagrange point (L2) 1.5 million kilometers beyond Earth, JWST uses a 6.5-meter segmented gold-coated beryllium mirror and a 5-layer tennis-court-sized Kapton sunshield to peer through cosmic dust in infrared light—observing the very first stars and galaxies born 13.5 billion years ago.',
    numericComparison: {
      launchYear: 2021,
      massKg: 6161,
      maxSpeedKmH: 3600,
      distanceFromEarthKm: 1500000,
      powerWatts: 2000,
    },
    metrics: [
      { label: 'Primary Mirror Diameter', value: '6.5 Meters (18 Hexagonal Segments)' },
      { label: 'Collecting Area', value: '25.4 m² (6.25 × Hubble’s Area)' },
      { label: 'Orbital Location', value: 'Sun-Earth Lagrange Point 2 (1.5M km)' },
      { label: 'Cold-Side Operating Temp', value: '-233 °C (40 K) • MIRI at 6.7 K (-266 °C)' },
      { label: 'Hot-Side Sunshield Temp', value: '+85 °C (+185 °F)' },
      { label: 'Total Launch Mass', value: '6,161.4 kg (Mirror Mass: 705 kg)' },
      { label: 'Sunshield Dimensions', value: '21.197 m × 14.162 m (Tennis Court)' },
      { label: 'Wavelength Coverage', value: '0.6 µm (Orange) to 28.5 µm (Mid-IR)' },
      { label: 'Single-Point Failures Survived', value: '344 Sequential Origami Deployments' },
      { label: 'Gold Coating Total Mass', value: '48.25 Grams (100 nm Thick Across 18 Mirrors)' },
    ],
    subsystems: [
      { system: 'Optics: 18 Beryllium-Gold Hexagons', spec: '132 Nano-Actuators (10 nm Precision)', role: 'Phased into a single optical wave surface' },
      { system: 'Thermal: 5-Layer Kapton Sunshield', spec: '0.025 mm to 0.05 mm Silicon/Aluminum', role: 'Blocks 300,000 W of heat down to <1 W' },
      { system: 'Cryocooler: Closed-Loop Helium Pulse', spec: 'Chills MIRI to 6.7 Kelvin', role: 'Eliminates thermal self-glow in mid-IR' },
      { system: 'Bus: 2-kW Solar Array & Ka-Band Dish', spec: '28 Mbps Downlink (57 GB/day)', role: 'Power & high-rate science telemetry' },
    ],
    howItWorks: {
      title: 'How JWST Works // Redshift Cosmology, Cryogenic Shielding & Nano-Actuator Mirror Phasing',
      propulsionAndNav:
        'As the universe expands, ultraviolet and visible light emitted by the earliest stars 13.5 billion years ago gets stretched by cosmic expansion into longer Infrared wavelengths ("Cosmological Redshift"). Furthermore, infrared light penetrates opaque clouds of interstellar dust where stars and planets are born. To see faint infrared photons from the edge of time, the telescope itself must be kept near absolute zero so its own heat glow doesn’t blind its sensors.',
      powerAndComms:
        'JWST orbits the Sun-Earth L2 point (1.5 million km anti-sunward from Earth), allowing its 5-layer Kapton sunshield to block heat from the Sun, Earth, and Moon simultaneously from one direction. Because no rocket fairing is 6.5 meters wide, JWST had to fold up like origami inside an Ariane 5 rocket and execute 344 single-point-of-failure deployments in deep space.',
      instruments: [
        {
          name: '01. Primary Mirror Array (18 Gold-Coated Beryllium Hexagons)',
          temp: '40 K (-233 °C)',
          density: '20.1 kg per 1.32m Segment',
          details:
            'Milled from light, cryogenic-stable Beryllium and vapor-coated with 100 nanometers of pure gold (which reflects 98% of infrared light). Seven micro-motors behind each segment align the mirrors to within 1/10,000th the thickness of a human hair.',
        },
        {
          name: '02. NIRCam (Near-Infrared Camera — 0.6 to 5.0 µm)',
          temp: '37 K (-236 °C)',
          density: '40 Megapixel Mercury-Cadmium-Telluride',
          details:
            'JWST’s primary imager and wavefront sensor, equipped with coronagraphs to block out bright host stars and directly image exoplanets and the earliest galaxies.',
        },
        {
          name: '03. NIRSpec (Micro-Shutter Array Spectrograph)',
          temp: '37 K (-236 °C)',
          density: '250,000 Programmable Micro-Shutters',
          details:
            'Uses a grid of quarter-million microscopic magnetic doors (each the width of a human hair) to capture spectra of 100+ distant galaxies simultaneously in a single exposure.',
        },
        {
          name: '04. MIRI (Mid-Infrared Instrument — 4.9 to 28.8 µm)',
          temp: '6.7 K (-266.5 °C — 7° Above Absolute Zero!)',
          density: 'Actively Cooled by Helium Cryocooler',
          details:
            'Peers into the coldest dust disks around newborn stars and identifies complex molecules (water, methane, CO₂, silicates) in cooler exoplanet atmospheres.',
        },
        {
          name: '05. NIRISS & Fine Guidance Sensor (FGS)',
          temp: '37 K (-236 °C)',
          density: 'Canadian Space Agency Contribution',
          details:
            'Locks JWST onto guide stars with a stability equivalent to holding a laser beam steady on a dime from 400 kilometers away, while performing exoplanet transit transmission spectroscopy.',
        },
      ],
    },
    missionChronology: {
      title: 'How JWST Reached L2 // Christmas Launch & 29 Days on the Edge',
      phases: [
        {
          stage: 'Phase I: Precision Ariane 5 Launch (December 25, 2021)',
          desc: 'Launched from Kourou, French Guiana on Christmas morning. The European Ariane 5 rocket placed JWST onto such an exact trajectory that the spacecraft saved nearly half of its onboard hydrazine fuel—doubling its expected operational lifespan from 10 years to >20 years!',
        },
        {
          stage: 'Phase II: The "29 Days on the Edge" Origami Unfolding (Jan 2022)',
          desc: 'In deep space, JWST unfolded its solar array, deployed its sunshield pallets, tensioned 5 razor-thin Kapton membranes using 90 cables and 107 release pins, extended its secondary mirror tripod, and latched its two primary mirror wings into place.',
        },
        {
          stage: 'Phase III: L2 Halo Orbit Insertion & 10-Nanometer Mirror Phasing (Jan – Jun 2022)',
          desc: 'Arrived at L2 on Jan 24, 2022. Over five months of cryogenic cooling, engineers aligned all 18 mirror segments into a single diffraction-limited optical surface surpassing every design requirement.',
        },
        {
          stage: 'Phase IV: Science Operations & Rewriting Early Cosmic History (July 2022 – Present)',
          desc: 'On July 12, 2022, JWST released its First Deep Field (SMACS 0723). Since then, it has discovered luminous galaxies like JADES-GS-z14-0 existing just 290 million years after the Big Bang and detected CO₂, SO₂, and methane in exoplanet atmospheres.',
        },
      ],
    },
    missionFate: {
      title: 'When & How JWST Will End // Hydrazine Stationkeeping Depletion & Heliocentric Graveyard Orbit',
      overview:
        'Because the Sun-Earth L2 point is an unstable gravitational saddle point (like balancing a ball on a mountain ridge), JWST must fire its thrusters every 21 days for stationkeeping. When its hydrazine/dinitrogen-tetroxide fuel runs out, it will be placed in a permanent solar orbit.',
      timeline: [
        {
          time: '2026 – ~2042+',
          phase: '20+ Years of Extended Infrared Science Operations',
          status: 'OPTIMAL',
          desc: 'Thanks to the ultra-accurate Ariane 5 launch injection, JWST holds enough stationkeeping and momentum-wheel-unloading propellant to operate well into the 2040s.',
        },
        {
          time: '~2044 (End of Propellant Reserves)',
          phase: 'Decommissioning Burn out of L2 into Heliocentric Graveyard Orbit',
          status: 'GRAVEYARD ORBIT',
          desc: 'Before the final drops of hydrazine are exhausted, mission controllers will fire JWST’s thrusters one last time to push it out of the L2 halo orbit into a stable, permanent orbit around the Sun—freeing L2 for future observatories.',
        },
      ],
    },
    funFacts: [
      {
        title: 'All 18 Mirrors Are Coated in Less Gold Than a Golf Ball Weighs',
        fact: 'Even though the 6.5-meter mirror looks like solid gold, the electroplated gold layer is only 100 nanometers (1,000 atoms) thick. Across all 18 mirrors (25.4 square meters), the total amount of gold used is just 48.25 grams—about the weight of a single golf ball!',
      },
      {
        title: 'A 318 °C Temperature Drop Across a Sunshield as Thin as a Human Hair',
        fact: 'The sun-facing Layer 1 of JWST’s Kapton sunshield bakes at +85 °C (+185 °F), while just 1.5 meters away on the shaded side of Layer 5, the telescope sits at -233 °C (-388 °F). The vacuum gaps between the 5 V-shaped layers bounce heat out the sides so effectively you could boil water on one side and freeze nitrogen on the other!',
      },
      {
        title: 'Could Spot the Heat Signature of a Bumblebee on the Moon',
        fact: 'JWST’s infrared detectors are so sensitive that if you placed a single bumblebee at the distance of the Moon (384,400 km away), JWST could detect both the sunlight reflected off the bee AND the tiny thermal body heat the bee radiates!',
      },
      {
        title: 'Why It Can Never Look Backward Toward Earth or the Sun',
        fact: 'If JWST ever rotated so that direct sunlight hit its cryogenic mirrors and instruments, the 300,000 watts of focused solar energy would instantly boil its helium cryocooler and blind its infrared sensors. It must always keep its sunshield between its optics and the Sun/Earth/Moon.',
      },
      {
        title: 'Designed with a Docking Grapple Fixture for Future Robotic Refueling',
        fact: 'Although L2 is 1.5 million km away (4× farther than the Moon, beyond human crew reach), engineers painted an optical target ring around JWST’s launch adapter ring so a future autonomous robotic tanker spacecraft could theoretically dock and refuel its hydrazine tanks!',
      },
      {
        title: 'First Detection of Photochemical Sulfur Dioxide in an Exoplanet Sky',
        fact: 'Studying the hot Saturn-mass exoplanet WASP-39b (700 light-years away), JWST detected not only water, CO₂, and CO, but Sulfur Dioxide (SO₂) produced by starlight reactions—the first time active atmospheric photochemistry was observed on a planet outside our Solar System.',
      },
    ],
  },

  hubble: {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    acronym: 'HST',
    subtitle: 'Low-Earth Orbit Icon // 35+ Years of Optical & Ultraviolet Discovery',
    category: 'Space Telescope',
    operator: 'NASA / ESA (STScI)',
    launchDate: 'April 24, 1990 (STS-31 Discovery)',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/sts125-s-011/sts125-s-011~orig.jpg',
    hexColor: '#38bdf8',
    focusPlanet3D: 'earth',
    summary:
      'Arguably the most transformative scientific instrument ever built. Orbiting 535 km above the blurring turbulence of Earth’s atmosphere at 27,300 km/h, Hubble overcame an initial mirror flaw via five heroic Space Shuttle astronaut servicing missions to pin down the age of the universe (13.8 billion years), co-discover Dark Energy, prove supermassive black holes sit at the center of galaxies, and capture the Hubble Ultra Deep Field.',
    numericComparison: {
      launchYear: 1990,
      massKg: 11110,
      maxSpeedKmH: 27300,
      distanceFromEarthKm: 535,
      powerWatts: 2800,
    },
    metrics: [
      { label: 'Primary Mirror Diameter', value: '2.4 Meters (Hyperbolic Ultra-Low Expansion Glass)' },
      { label: 'Orbital Altitude (LEO)', value: '~525 – 540 km (28.5° Inclination)' },
      { label: 'Orbital Velocity & Period', value: '7.59 km/h (27,300 km/h) • 95.4 Minutes' },
      { label: 'Spacecraft Mass & Size', value: '11,110 kg • 13.2 m Long × 4.2 m Wide' },
      { label: 'Spectral Range', value: '115 nm (Far-UV) to 1,700 nm (Near-IR)' },
      { label: 'Pointing Accuracy', value: '0.007 Arcseconds (Laser on a Dime at 320 km)' },
      { label: 'Shuttle Servicing Missions', value: '5 Crew Missions (1993, 1997, 1999, 2002, 2009)' },
      { label: 'Total Observations', value: '>1.6 Million Science Exposures' },
      { label: 'Peer-Reviewed Papers', value: '>21,000 Scientific Publications' },
      { label: 'Propellant Onboard', value: '0 kg (Slews Purely via Reaction Wheels & Magnetorquers!)' },
    ],
    subsystems: [
      { system: 'Optics: 2.4m Ritchey-Chrétien Mirror', spec: 'Polished to 10 nm Smoothness', role: 'Coated in 65 nm aluminum + 25 nm MgF₂' },
      { system: 'Attitude: Reaction Wheels & Gyros', spec: 'Zero Chemical Thrusters Used', role: 'Avoids exhaust contamination of UV optics' },
      { system: 'Power: Dual GaAs Solar Wings', spec: '2,800 Watts + 6 Nickel-Hydrogen Batteries', role: 'Powers instruments through 36-min orbital night' },
      { system: 'Science: WFC3, ACS, COS, STIS', spec: 'Installed on SM4 (STS-125 in 2009)', role: 'UV-Visible-NearIR imaging & spectroscopy' },
    ],
    howItWorks: {
      title: 'How Hubble Works // Propellant-Free Reaction Wheel Slewing & UV-Optical Precision',
      propulsionAndNav:
        'Unlike almost every other spacecraft, Hubble has ZERO chemical rocket thrusters! Rocket exhaust gas would coat and ruin its delicate ultraviolet mirror coatings. Instead, Hubble turns by Newton’s Third Law using four heavy flywheels (Reaction Wheels) spinning up to 3,000 RPM, and dumps excess angular momentum by pushing against Earth’s magnetic field with four electromagnetic rods (Magnetorquers).',
      powerAndComms:
        'Whereas JWST sees deep infrared, Hubble is humanity’s premier eye in Ultraviolet and Visible light—wavelengths blocked by Earth’s ozone layer or blurred by atmospheric twinkling. Its 2.4-meter mirror is made of Corning Ultra-Low Expansion titanium-silicate glass over a honeycomb core weighing 828 kg.',
      instruments: [
        {
          name: '01. Wide Field Camera 3 (WFC3 — Installed in 2009)',
          temp: '-83 °C CCD / -128 °C IR',
          density: 'UVIS (200–1000 nm) & NIR (850–1700 nm)',
          details:
            'Hubble’s workhorse camera installed by astronauts during STS-125, responsible for iconic deep-space portraits like the infrared Pillars of Creation and weather monitoring of Jupiter, Saturn, Uranus, and Neptune.',
        },
        {
          name: '02. Cosmic Origins Spectrograph (COS)',
          temp: 'Ambient / Thermally Controlled',
          density: 'Far-Ultraviolet (115 – 320 nm)',
          details:
            'The most sensitive ultraviolet spectrograph ever flown, mapping the "Cosmic Web" of warm intergalactic gas between galaxies and analyzing exoplanet atmospheric escape.',
        },
        {
          name: '03. Advanced Camera for Surveys (ACS — Repaired in Orbit in 2009)',
          temp: '-81 °C Cryo-Cooler',
          density: 'Wide-Field & Solar-Blind Channels',
          details:
            'Captured the Hubble Ultra Deep Field (10,000 galaxies in a patch of sky one-tenth the width of the full Moon).',
        },
        {
          name: '04. Space Telescope Imaging Spectrograph (STIS)',
          temp: 'Thermally Stabilized',
          density: 'Spatially Resolved Spectroscopy',
          details:
            'Measures the Doppler velocity of stars and gas swirling around galaxy cores—proving that almost every massive galaxy harbors a Supermassive Black Hole millions to billions of times the mass of the Sun.',
        },
      ],
    },
    missionChronology: {
      title: 'How Hubble Triumphed // From Spherical Aberration to Cosmic Legend',
      phases: [
        {
          stage: 'Phase I: Launch & Discovery of the 2.2-Micrometer Mirror Flaw (1990)',
          desc: 'Deployed by Space Shuttle Discovery on April 25, 1990. First-light images revealed "Spherical Aberration": a miscalibrated laser null-corrector during manufacturing had ground the outer edge of the 2.4m mirror too flat by just 2.2 micrometers (1/50th the width of a human hair), preventing sharp focus.',
        },
        {
          stage: 'Phase II: Servicing Mission 1 & The COSTAR "Contact Lenses" Rescue (Dec 1993)',
          desc: 'Because the mirror was ground *precisely* to the wrong curve, engineers built corrective mirrors (COSTAR and WFPC2) with the exact opposite 2.2-µm curve. During 5 spacewalks on STS-61, astronauts installed the corrective optics, instantly restoring crystal-clear vision!',
        },
        {
          stage: 'Phase III: Four Upgrade Missions & The Ultra Deep Field (1997 – 2009)',
          desc: 'Astronauts returned in 1997, 1999, 2002, and 2009 (STS-125)—replacing solar arrays, gyroscopes, and computers, performing the first-ever on-orbit circuit-board repair of ACS and STIS, and attaching a Soft Capture Mechanism ring to Hubble’s aft bulkhead.',
        },
        {
          stage: 'Phase IV: Single-Gyro Mode & Tandem Science with JWST (2024 – Present)',
          desc: 'In 2024, NASA transitioned Hubble to an ingenious "One-Gyroscope Mode" originally developed in the 2000s, keeping one remaining healthy gyro in reserve to extend Hubble’s UV-optical partnership with infrared JWST into the 2030s.',
        },
      ],
    },
    missionFate: {
      title: 'When & How Hubble Will End // Atmospheric Drag Decay vs. Robotic Boost/Deorbit',
      overview:
        'At ~525 km altitude, trace molecules of Earth’s upper thermosphere exert subtle drag on Hubble, especially during Solar Maximum when solar heating puffs up the atmosphere. Because Hubble is an 11-ton vehicle with a massive glass mirror and titanium rings that would survive atmospheric reentry, it cannot be allowed to reenter uncontrolled.',
      timeline: [
        {
          time: '2026 – Early 2030s',
          phase: 'Continued Science in Single-Gyroscope Mode',
          status: 'ACTIVE',
          desc: 'Hubble continues unique ultraviolet and visible astronomy that JWST cannot perform (since JWST starts at 600 nm red/infrared).',
        },
        {
          time: 'Mid-2030s (~350–400 km Altitude)',
          phase: 'Controlled Propulsive Deorbit or Private Re-Boost Decision',
          status: 'END OF MISSION',
          desc: 'Using the Soft Capture Mechanism ring installed by astronauts in 2009, NASA plans to dock an autonomous robotic propulsion module to steer Hubble into a safe, targeted disposal splashdown at Point Nemo in the South Pacific Ocean (or boost it to a higher stable museum orbit).',
        },
      ],
    },
    funFacts: [
      {
        title: 'Stared at an "Empty" Patch of Sky the Size of a Pinhead for 11 Days—And Found 10,000 Galaxies',
        fact: 'In 1995, Hubble director Robert Williams risked 10 days of prime telescope time to point Hubble at a completely blank, dark patch of sky near the Big Dipper the width of a grain of sand held at arm’s length. The resulting Hubble Deep Field revealed over 3,000 galaxies (later expanded to 10,000 in the Ultra Deep Field) stretching back 13 billion years!',
      },
      {
        title: 'Turns Slower Than the Minute Hand on a Clock',
        fact: 'Because Hubble uses spinning reaction wheels rather than thrusters to avoid vibrations and exhaust fumes, it slews across the sky at just 90 degrees every 15 minutes—the exact angular speed of the minute hand on an analog clock.',
      },
      {
        title: 'Discovered 4 of Pluto’s 5 Moons Before New Horizons Arrived',
        fact: 'Even from 5 billion km away, Hubble’s sharp optics discovered four tiny moons orbiting Pluto—Nix, Hydra, Kerberos, and Styx—allowing the New Horizons probe to safely plot a path through the Pluto system in 2015.',
      },
      {
        title: 'Co-Discovered That the Universe’s Expansion Is Accelerating (Dark Energy)',
        fact: 'In 1998, two teams using Hubble to measure Type Ia supernovae in distant galaxies expected to find gravity slowing cosmic expansion down. Instead, they discovered the expansion of the universe is speeding up—revealing that 68% of the cosmos is mysterious Dark Energy (2011 Nobel Prize in Physics).',
      },
      {
        title: 'If Earth’s Surface Were as Smooth as Hubble’s Mirror, Mount Everest Would Be 2 Centimeters Tall',
        fact: 'Hubble’s 2.4-meter mirror was polished so smooth that if you scaled the mirror up to the size of the entire continental United States, the tallest bump or valley would be less than 2 centimeters (under 1 inch) high!',
      },
      {
        title: 'Over 6 Billion Kilometers Traveled in Low Earth Orbit',
        fact: 'Completing ~15 orbits of Earth every single day since April 1990 (>190,000 orbits), Hubble has logged more than 6.5 billion kilometers—greater than a round trip to Neptune.',
      },
    ],
  },

  cassini: {
    id: 'cassini',
    name: 'Cassini-Huygens',
    acronym: 'CAS-HYG',
    subtitle: 'Saturn Flagship Orbiter & Titan Lander // 13 Years in the Ringed Realm',
    category: 'Deep-Space Probe',
    operator: 'NASA / ESA / ASI (Italian Space Agency)',
    launchDate: 'October 15, 1997 (Ended Sep 15, 2017)',
    status: 'HISTORIC COMPLETED',
    image: 'https://images-assets.nasa.gov/image/PIA03883/PIA03883~orig.jpg',
    hexColor: '#facc15',
    focusPlanet3D: 'saturn',
    summary:
      'One of the most ambitious interplanetary flagship missions ever flown. Standing 6.7 meters tall and weighing 5.7 metric tons at launch, the NASA Cassini orbiter and ESA Huygens lander spent 13 years orbiting Saturn (2004–2017)—completing the farthest landing in human history on methane-rich Titan, discovering habitable hydrothermal geysers on Enceladus, and ending in a heroic "Grand Finale" plunge into Saturn to protect its icy ocean moons.',
    numericComparison: {
      launchYear: 1997,
      massKg: 5712,
      maxSpeedKmH: 122000,
      distanceFromEarthKm: 1430000000,
      powerWatts: 885,
    },
    metrics: [
      { label: 'Total Launch Mass', value: '5,712 kg (3,132 kg Propellant)' },
      { label: 'Spacecraft Dimensions', value: '6.7 m High × 4.0 m Wide (School-Bus Sized)' },
      { label: 'Saturn Orbital Tour', value: '13 Years (294 Orbits of Saturn)' },
      { label: 'Targeted Moon Flybys', value: '162 Close Flybys (127 of Titan)' },
      { label: 'Huygens Titan Landing', value: 'January 14, 2005 (Farthest Touchdown)' },
      { label: 'Power Source', value: '3 × GPHS-RTGs (32.7 kg Plutonium-238)' },
      { label: 'Grand Finale Dive Speed', value: '122,000 km/h (34 km/s into Saturn)' },
      { label: 'Images Captured', value: '453,048 Photographs' },
      { label: 'New Moons Discovered', value: '7 Moons (Methone, Pallene, Polydeuces, Daphnis, Anthe, Aegaeon, S/2009 S1)' },
      { label: 'Scientific Instruments', value: '12 on Cassini Orbiter + 6 on Huygens Probe' },
    ],
    subsystems: [
      { system: 'Power: 3 × GPHS-RTGs', spec: '885 W at Launch (633 W at End)', role: 'Powered 20 years of operations at 9.5 AU' },
      { system: 'Propulsion: Bipropellant Main Engine', spec: '2 × 445 N Redundant R-4D Engines', role: 'MMH + N₂O₄ orbital maneuvers' },
      { system: 'Lander: ESA Huygens Probe', spec: '318 kg • 2.7 m Heat Shield', role: '2h 27m parachute descent + 72m on Titan surface' },
      { system: 'Radar: Ku-Band Synthetic Aperture', spec: '13.78 GHz Cloud-Piercing Radar', role: 'Mapped Titan’s methane seas through orange haze' },
    ],
    howItWorks: {
      title: 'How Cassini Worked // Titan Gravity-Assist Tour Design & Cloud-Piercing Radar',
      propulsionAndNav:
        'Once in orbit around Saturn, Cassini used its giant moon Titan (which has 1.8× the mass of Earth’s Moon) as an orbital "pinball": every single one of Cassini’s 127 close flybys of Titan gave the spacecraft a gravity assist equal to burning 75 kg of rocket fuel! By skimming Titan at different angles, engineers bent Cassini’s orbit up over Saturn’s poles, out to distant Iapetus, and straight through the geyser plumes of Enceladus.',
      powerAndComms:
        'Its 4-meter high-gain dish served four roles simultaneously: transmitting science data to Earth, acting as a Synthetic Aperture Radar (SAR) to map Titan’s lakes through opaque smog, bouncing radio waves through Saturn’s rings to measure particle sizes, and acting as an umbrella-shield during risky ring-plane crossings!',
      instruments: [
        {
          name: '01. Ion and Neutral Mass Spectrometer (INMS) & Cosmic Dust Analyzer (CDA)',
          temp: 'Direct Plume Sampling',
          density: 'Molecular Sniffer & Dust Impact Detector',
          details:
            'Although Cassini was never designed to sample geysers, when it discovered Enceladus’s south polar plumes, engineers flew Cassini right through the spray at 30,000 km/h—directly tasting water vapor, salt (NaCl), molecular hydrogen (H₂), and complex organic molecules!',
        },
        {
          name: '02. Ku-Band RADAR Mapper & Altimeter',
          temp: 'Active Microwave Transceiver',
          density: '4m Dish Shared Aperture',
          details:
            'Pierced Titan’s thick orange tholin smog to reveal rugged water-ice mountains, dendritic river valleys, and hydrocarbon oceans like Kraken Mare (400,000 km²) and Ligeia Mare.',
        },
        {
          name: '03. Imaging Science Subsystem (ISS) & VIMS Infrared Spectrometer',
          temp: '-90 °C Passive Radiator Cooled',
          density: 'Narrow & Wide-Angle Telescopes',
          details:
            'Captured Saturn’s north polar Hexagon, vertical 2.5-km "propeller" towers in the rings during Saturn’s 2009 equinox, and lightning storms 10,000 km across.',
        },
        {
          name: '04. ESA Huygens Atmospheric Entry & Surface Science Package',
          temp: '-179.5 °C Surface Landing',
          density: '318 kg Autonomous Probe',
          details:
            'Detached from Cassini on Christmas Day 2004 and parachuted onto Titan’s Xanadu floodplain on Jan 14, 2005—recording wind sounds, photographing rounded water-ice river cobbles, and measuring damp liquid methane in the soil.',
        },
      ],
    },
    missionChronology: {
      title: 'How the Cassini-Huygens Odyssey Unfolded // VVEJGA Trajectory to The Grand Finale',
      phases: [
        {
          stage: 'Phase I: Launch & 4-Planet Gravity-Assist Cruise (1997 – 2004)',
          desc: 'Too heavy to fly straight to Saturn, Cassini executed a 7-year "VVEJGA" trajectory—using two gravity assists at Venus (1998, 1999), one at Earth (Aug 1999), and one at Jupiter (Dec 2000) to reach Saturn.',
        },
        {
          stage: 'Phase II: Saturn Orbit Insertion & Huygens Touchdown on Titan (2004 – 2005)',
          desc: 'On July 1, 2004, Cassini threaded the gap between the F and G rings and fired its engine for 96 minutes to enter Saturn orbit. Six months later (Jan 14, 2005), Huygens landed on Titan—still the most distant touchdown on another world in history.',
        },
        {
          stage: 'Phase III: Discovery of Enceladus’s Hydrothermal Ocean & Equinox/Solstice Tours (2005 – 2017)',
          desc: 'Magnetometer anomalies led Cassini to discover supersonic water-ice geysers erupting from warm "Tiger Stripe" fractures on Enceladus, proving a habitable salty ocean with hydrothermal vents exists beneath its ice shell.',
        },
        {
          stage: 'Phase IV: The "Grand Finale" — 22 Dives Between Saturn & Its Rings (Apr – Sep 2017)',
          desc: 'With propellant nearly exhausted, Cassini jumped into a daring orbit threading the 2,000-km gap *inside* the innermost D-ring 22 times—measuring the mass and young age of the rings before plunging into Saturn on Sep 15, 2017.',
        },
      ],
    },
    missionFate: {
      title: 'How Cassini Died // Planetary Protection Sacrifice in Saturn’s Skies',
      overview:
        'Why did NASA intentionally destroy a healthy $3.9-billion spacecraft? Because Cassini discovered that Enceladus and Titan are potentially habitable worlds! Under Planetary Protection treaties, NASA could not risk an out-of-fuel Cassini eventually crashing into Enceladus and contaminating its ocean with surviving Earth microbes.',
      timeline: [
        {
          time: 'April 22, 2017',
          phase: ' The "Goodbye Kiss" Final Flyby of Titan',
          status: 'BALLISTIC LOCK',
          desc: 'Cassini skimmed 979 km above Titan one last time. Titan’s gravity bent Cassini’s path onto an inescapable ballistic trajectory that dropped its periapsis inside Saturn’s rings.',
        },
        {
          time: 'April 26 – September 14, 2017',
          phase: '22 Grand Finale Proximal Orbits Inside the Rings',
          status: 'SCIENCE FINALE',
          desc: 'Hurtling at 122,000 km/h between Saturn’s cloud tops and the inner edge of the D-ring, Cassini directly sampled Saturn’s upper atmosphere and mapped its interior gravity.',
        },
        {
          time: 'September 15, 2017 (11:55 UTC Earth Received Time)',
          phase: 'Atmospheric Entry & Vaporization as a Shooting Star in Saturn’s Sky',
          status: 'MISSION COMPLETE',
          desc: 'Firing its thrusters at 100% duty cycle to keep its antenna pointed at Earth until the final second, Cassini transmitted real-time atmospheric mass-spectrometer data from 1,500 km above Saturn’s clouds before aerodynamic forces overwhelmed its thrusters and it vaporized like a meteor—becoming part of the planet it studied for 13 years.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Huygens Landed on Wet Methane Mud & Pebbles Made of Water Ice as Hard as Granite',
        fact: 'When the Huygens probe touched down on Titan at -179.5 °C, its penetrometer felt a surface with the consistency of wet sand or damp clay soaked in liquid methane, surrounded by rounded river cobbles made not of silicate rock, but of solid water ice frozen harder than concrete!',
      },
      {
        title: 'Detected Molecular Hydrogen (H₂) Food for Microbes in Enceladus’s Plumes',
        fact: 'During its deepest dive through Enceladus’s geysers (49 km above the surface in Oct 2015), Cassini detected native molecular hydrogen (H₂) and silica nanoparticles—direct chemical proof of active alkaline hydrothermal vents on Enceladus’s seafloor, virtually identical to the deep-sea vents where life may have begun on Earth.',
      },
      {
        title: 'Saved from a Fatal Radio Doppler Glitch by an Italian Engineer’s Pre-Flight Test',
        fact: 'While Cassini was already flying to Saturn in 2000, Boris Smeds of ESA discovered a design flaw in the Huygens radio receiver: the Doppler frequency shift during Titan descent would have made Huygens’ data unreadable to Cassini! Engineers solved it by changing Cassini’s flyby geometry to reduce the relative speed between the two craft.',
      },
      {
        title: 'Found That Saturn’s Moon Iapetus Is Half Coal-Black and Half Snow-White with a 20-km Equatorial Wall',
        fact: 'Cassini solved a 300-year mystery hired by Giovanni Cassini himself in 1671: moon Iapetus sweeps up dark dust from outer moon Phoebe on its leading hemisphere, warming the dark side so water ice sublimates and hops to the cold trailing side—plus it has a 20-km-tall mountain ridge running around its equator making it look like a giant walnut!',
      },
      {
        title: 'Photographed Earth & the Moon Framed Under Saturn’s Rings ("The Day the Earth Smiled")',
        fact: 'On July 19, 2013, while Saturn eclipsed the Sun from Cassini’s vantage point 1.44 billion km away, Cassini photographed the entire backlit ring system with Earth and the Moon visible as a tiny pale blue dot between the E and G rings.',
      },
      {
        title: 'The "Big Empty": The Gap Between Saturn and Its Rings Was Almost Completely Dust-Free',
        fact: 'Scientists feared the first Grand Finale dive might sandblast Cassini, so they used the 4m dish as a shield. To everyone’s shock, the plasma-wave detector heard almost zero dust impacts— only the gentle whistle of nanometers-wide water-ice "Ring Rain" grains!',
      },
    ],
  },

  juno: {
    id: 'juno',
    name: 'Juno',
    acronym: 'JUNO',
    subtitle: 'Jovian Polar Orbiter // Solar-Powered Radiation Vault Explorer',
    category: 'Deep-Space Probe',
    operator: 'NASA / JPL / Southwest Research Institute (SwRI)',
    launchDate: 'August 5, 2011',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/PIA21974/PIA21974~orig.jpg',
    hexColor: '#22d3ee',
    focusPlanet3D: 'jupiter',
    summary:
      'Named after the Roman goddess who peered through the veil of clouds Jupiter drew around himself, Juno is the farthest solar-powered spacecraft in history. Using three tractor-trailer-sized solar wings and a 180-kg solid titanium radiation vault, Juno dives repeatedly over Jupiter’s poles at 210,000 km/h—probing 600 km beneath the ammonia cloud tops to reveal Jupiter’s fuzzy diluted core, 3,000-km-deep jet streams, and geometric polar cyclone clusters.',
    numericComparison: {
      launchYear: 2011,
      massKg: 3625,
      maxSpeedKmH: 210000,
      distanceFromEarthKm: 778000000,
      powerWatts: 486,
    },
    metrics: [
      { label: 'Spacecraft Span (With Wings)', value: '20 Meters (66 Feet — Basketball Court)' },
      { label: 'Solar Cells Count', value: '18,698 High-Efficiency Cells (486 Watts at 5.2 AU)' },
      { label: 'Radiation Protection', value: '180 kg Solid Titanium Vault (1 cm Thick Walls)' },
      { label: 'Perijove Skim Altitude', value: '3,400 km Above Cloud Tops (At 210,000 km/h)' },
      { label: 'Launch Mass', value: '3,625 kg (Dry Mass: 1,593 kg)' },
      { label: 'Stabilization', value: 'Spin-Stabilized at 2 RPM (Propeller-Style)' },
      { label: 'Completed Perijove Dives', value: '>65 Polar Radiation Belt Dives' },
      { label: 'Close Moon Flybys', value: 'Ganymede (2021), Europa (2022), Io (2023–2024)' },
      { label: 'Passengers Onboard', value: '3 Custom Milled Aluminum LEGO Minifigures' },
      { label: 'Primary Instruments', value: '9 Suites (MWR, MAG, Gravity Science, JIRAM, JunoCam)' },
    ],
    subsystems: [
      { system: 'Power: 3 × 8.9m Solar Arrays', spec: '14,000 W at Earth → 486 W at Jupiter', role: 'Replaced scarce Plutonium-238 with ultra-efficient cells' },
      { system: 'Shield: Titanium Radiation Vault', spec: '1 m³ Titanium Box (180 kg)', role: 'Reduces 20-million-rad electron dose by 800×' },
      { system: 'Probe: 6-Channel Microwave Radiometer', spec: '600 MHz to 22 GHz Antennas', role: 'Sees 600 km deep through ammonia & water clouds' },
      { system: 'Gravity: Ka-Band Doppler Transponder', spec: 'Measures 0.001 mm/s Velocity Shifts', role: 'Mapped Jupiter’s fuzzy core & 3,000-km jet depth' },
    ],
    howItWorks: {
      title: 'How Juno Works // Threading the Radiation Needle & Microwave Deep Sounding',
      propulsionAndNav:
        'Jupiter’s magnetic field traps a toroidal belt of relativistic electrons near its equator so lethal it would fry normal spacecraft electronics in hours. Juno’s highly elliptical polar orbit "threads the needle": it dives straight down over Jupiter’s North Pole, skims just 3,400 km above the clouds *underneath* the worst inner radiation belt in less than 2 hours at 210,000 km/h, and shoots out over the South Pole!',
      powerAndComms:
        'At 5.2 AU, sunlight is 27 times weaker than at Earth. Juno generates 486 watts from three 8.9-meter solar arrays—and because Juno spins like a 3-bladed ceiling fan at 2 RPM with its solar panels always facing the Sun, its 6 Microwave Radiometer antennas on the sides of its hexagonal body sweep across Jupiter from horizon to horizon on every rotation.',
      instruments: [
        {
          name: '01. Microwave Radiometer (MWR — 6 Frequencies on Body Sides)',
          temp: 'Deep Tropospheric Sounding',
          density: 'Peering 600 km Below Cloud Tops',
          details:
            'Proved that the Great Red Spot’s roots extend 350 to 500 km deep (30× deeper than Earth’s oceans!) and discovered "Mushballs"—slushy hailstones of water and liquid ammonia that strip ammonia from the upper air.',
        },
        {
          name: '02. Dual-Frequency Ka/X-Band Gravity Science Experiment',
          temp: 'Ultra-Stable Oscillator in Vault',
          density: 'Milli-Gal Gravity Mapping',
          details:
            'By measuring tiny Doppler shifts in Juno’s radio signal as Jupiter’s internal mass pulls on the spacecraft, scientists discovered Jupiter’s zonal winds extend 3,000 km deep and its core is "fuzzy" and diluted across half the planet.',
        },
        {
          name: '03. Fluxgate Magnetometer (MAG) & Advanced Stellar Compass',
          temp: 'Mounted on Outer Solar Wing Tip',
          density: '3D Magnetic Field Tomography',
          details:
            'Discovered "The Great Blue Spot"—an intense isolated magnetic anomaly near Jupiter’s equator that is being sheared apart by deep jet streams.',
        },
        {
          name: '04. JIRAM (Infrared Auroral Mapper) & JunoCam',
          temp: 'Vault-Shielded Readout Electronics',
          density: 'Public Citizen-Science Camera',
          details:
            'Captured the octagonal and pentagonal cyclone clusters at Jupiter’s poles and mapped active glowing lava lakes across every latitude of volcanic moon Io during 2023–2024 flybys.',
        },
      ],
    },
    missionChronology: {
      title: 'How Juno Conquered Jupiter // Earth Slingshot, July 4th Arrival & The Extended Moon Tour',
      phases: [
        {
          stage: 'Phase I: Launch & Deep-Space Earth Gravity Assist (2011 – 2013)',
          desc: 'Launched Aug 5, 2011 on an Atlas V 551. Flew out past Mars’s orbit, fired its engine, and dove back past Earth on Oct 9, 2013 (skimming 559 km over South Africa) for a 7.3 km/s gravity slingshot to Jupiter.',
        },
        {
          stage: 'Phase II: Independence Day Orbit Insertion & Polar Discovery (July 4, 2016)',
          desc: 'Entered Jovian polar orbit on July 4, 2016 after a 35-minute engine burn, unveiling Jupiter’s turquoise polar regions and geometric hurricane polygons.',
        },
        {
          stage: 'Phase III: Natural Orbit Precession & Galilean Moon Flyby Tour (2021 – 2024)',
          desc: 'Jupiter’s oblate gravity naturally rotated Juno’s orbit northward so each orbit crossed the equator closer to the Galilean moons—enabling breathtaking close flybys of Ganymede (June 2021), Europa (Sep 2022, 352 km altitude), and twin 1,500-km skims of volcanic Io (Dec 2023 & Feb 2024)!',
        },
        {
          stage: 'Phase IV: Inner Ring & Northern Aurora Exploration (2024 – Present)',
          desc: 'Now in tight 33-day orbits, Juno is mapping Jupiter’s faint inner rings and high-latitude northern cyclones while self-healing radiation-damaged camera pixels using built-in heaters ("annealing").',
        },
      ],
    },
    missionFate: {
      title: 'When & How Juno Will End // Orbital Decay Into Jupiter’s Atmosphere',
      overview:
        'Like Cassini at Saturn, Juno must never be allowed to crash into ocean moon Europa, Ganymede, or Callisto. Its naturally precessing orbit is engineered to eventually graze and burn up in Jupiter’s atmosphere.',
      timeline: [
        {
          time: '2026 – Late 2020s',
          phase: 'Continued High-Radiation Polar & Ring Science',
          status: 'EXTENDED MISSION',
          desc: 'Juno’s titanium vault and heater-annealing protocols have kept its instruments operating far beyond their original 37-orbit radiation design life.',
        },
        {
          time: 'End of Extended Mission',
          phase: 'Atmospheric Entry & Vaporization in Jupiter',
          status: 'PLANETARY PROTECTION',
          desc: 'Juno will plunge into Jupiter’s hydrogen atmosphere at >200,000 km/h, completely vaporizing to guarantee zero biological contamination of Europa.',
        },
      ],
    },
    funFacts: [
      {
        title: 'JunoCam Was Expected to Die After 8 Orbits—Engineers "Baked" It Back to Life at 60+ Orbits!',
        fact: 'JunoCam’s optical head sits outside the main titanium vault and was only guaranteed to survive 8 radiation dives. When radiation damaged its CCD image sensor on Orbit 55, engineers turned its heater up to 25 °C ("annealing") to cure the microscopic silicon crystal defects—restoring crisp images for the 1,500-km Io flyby!',
      },
      {
        title: 'Carries Three Space-Grade Aluminum LEGO Minifigures',
        fact: 'Bolted inside Juno are three custom-milled aircraft-grade aluminum LEGO minifigures: the Roman god Jupiter (holding lightning bolts), his wife Juno (holding a magnifying glass to see through clouds), and astronomer Galileo Galilei (holding his telescope and a globe of Jupiter)!',
      },
      {
        title: 'Discovered "Mushballs" & "Shallow Lightning" in Ammonia Clouds',
        fact: 'Above Jupiter’s freezing altitude where water should be solid ice, Juno saw strange high-altitude lightning flashes. It turned out liquid ammonia acts as antifreeze, melting rising water-ice crystals into slushy ammonia-water hailstones ("mushballs") that generate static lightning at -88 °C!',
      },
      {
        title: 'A 180-Kilogram Titanium Bank Vault for Computers',
        fact: 'Juno’s central computer and power electronics are locked inside a 1-centimeter-thick solid titanium cube weighing 180 kg (400 lbs). Without that vault, a single pass through Jupiter’s relativistic electron belt would fry its processors in 30 minutes.',
      },
      {
        title: 'Every Single JunoCam Photo Is Processed by Citizen Scientists Around the World',
        fact: 'JunoCam has no dedicated official imaging team—raw red, green, blue, and methane-band strips are uploaded directly to the web where amateur astronomers and artists stitch and color-calibrate them.',
      },
      {
        title: 'Recorded the Eerie "Audio" Roar of Ganymede’s Magnetosphere',
        fact: 'During its June 2021 flyby within 1,038 km of Ganymede, Juno’s Waves instrument recorded electric and magnetic radio emissions inside Ganymede’s miniature magnetosphere and shifted the frequencies into the human hearing range.',
      },
    ],
  },

  parker: {
    id: 'parker',
    name: 'Parker Solar Probe',
    acronym: 'PSP',
    subtitle: 'Coronal Diver // Fastest Human-Made Object in History (692,000 km/h)',
    category: 'Deep-Space Probe',
    operator: 'NASA / Johns Hopkins Applied Physics Laboratory (APL)',
    launchDate: 'August 12, 2018',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/GSFC_20180812_Archive_e000001/GSFC_20180812_Archive_e000001~orig.jpg',
    hexColor: '#f97316',
    focusPlanet3D: 'sun',
    summary:
      'The first spacecraft in history named after a living scientist (astrophysicist Eugene Parker, who predicted the solar wind in 1958 and watched it launch at age 91) and the first spacecraft to literally "touch the Sun." Using 7 gravity assists at Venus to shed orbital angular momentum, Parker Solar Probe dives inside the Sun’s outer atmosphere (corona) to within 6.16 million km of the solar surface at a mind-bending 692,000 km/h (192 km/s)—fast enough to fly from New York to Tokyo in under 1 minute.',
    numericComparison: {
      launchYear: 2018,
      massKg: 685,
      maxSpeedKmH: 692000,
      distanceFromEarthKm: 143000000,
      powerWatts: 343,
    },
    metrics: [
      { label: 'Peak Velocity Record', value: '692,000 km/h (192 km/s — 0.064% Speed of Light!)' },
      { label: 'Closest Solar Approach', value: '6.16 Million km from Photosphere (8.86 Solar Radii)' },
      { label: 'Heat Shield Front Temp', value: '~1,400 °C (+2,500 °F) • 475 × Earth Sunlight' },
      { label: 'Payload Temp Behind Shield', value: '~29.4 °C (+85 °F — Room Temperature!)' },
      { label: 'Heat Shield Thickness', value: '11.4 cm (4.5 Inches) Carbon-Carbon Foam' },
      { label: 'Venus Gravity Assists', value: '7 Flybys (Final VGA-7 on Nov 6, 2024)' },
      { label: 'Alfvén Surface Crossing', value: 'April 28, 2021 (First Entry into Solar Corona)' },
      { label: 'Launch Mass', value: '685 kg (Dry Mass: 555 kg)' },
      { label: 'Solar Array Cooling', value: '1 Gallon (3.7 L) Deionized Water Radiator Loop' },
      { label: 'Primary Instruments', value: 'FIELDS, WISPR, SWEAP (Solar Cup), IS☉IS' },
    ],
    subsystems: [
      { system: 'TPS: Carbon-Composite Heat Shield', spec: '2.4 m Wide • 11.4 cm Thick • Only 73 kg!', role: '97% porous carbon foam + white alumina ceramic coat' },
      { system: 'Cooling: Water-Cooled Solar Flaps', spec: '3.7 Liters Pressurized Deionized Water', role: 'Retracts into shadow behind shield at perihelion' },
      { system: 'Sensor: Solar Probe Cup (SPC)', spec: 'Tungsten-Niobium-Molybdenum Faraday Cup', role: 'Peeks around heat shield into raw 1,650 °C plasma' },
      { system: 'Autonomy: 7 Limb-Shadow Sensors', spec: 'Autonomous Fault Correction in <60s', role: 'Keeps body inside shield shadow with 8-min light delay' },
    ],
    howItWorks: {
      title: 'How Parker Touches the Sun Without Melting // Heat vs. Temperature & The Carbon Shield',
      propulsionAndNav:
        'Why doesn’t Parker vaporize inside a 2,000,000 °C solar corona? Because of the difference between *Temperature* (how fast individual particles move) and *Heat* (how many particles transfer energy)! The corona has an ultra-high temperature (millions of degrees), but very low particle density—like sticking your hand into a 200 °C kitchen oven vs. boiling water. Parker’s heat shield therefore only absorbs radiant sunlight heating it to ~1,400 °C.',
      powerAndComms:
        'To fall close to the Sun, a spacecraft must cancel out Earth’s 30 km/s sideways orbital speed (which takes 55× more energy than flying to Mars!). Parker used 7 gravity assists in front of Venus to brake its orbit inward. Its 11.4-cm-thick Thermal Protection System (TPS) is a sandwich of two carbon-carbon composite sheets filled with 97%-air carbon foam painted bright white with aluminum oxide—keeping instruments just inches behind it at a comfortable 29 °C!',
      instruments: [
        {
          name: '01. Thermal Protection System (TPS) — 2.4m Hexagonal Shield',
          temp: '1,400 °C Front → 29 °C Back',
          density: '73 kg Total Weight',
          details:
            'So light and porous (97% air inside carbon foam) that the entire 2.4-meter shield weighs only 73 kg. Seven optical sensors around the spacecraft rim detect the slightest sliver of sunlight and fire thrusters autonomously to keep the spacecraft tucked in the cone of shadow.',
        },
        {
          name: '02. SWEAP & The Solar Probe Cup (Faraday Cup Peeking Past the Shield)',
          temp: '1,650 °C Glowing Red-Hot',
          density: 'Sapphire, Tungsten & Tantalum-Niobium',
          details:
            'The boldest sensor on the spacecraft: it sticks out beyond the edge of the heat shield directly into the raw solar wind, using grids of high-melting-point tungsten (melts at 3,422 °C) and sapphire crystal insulators to catch protons and electrons.',
        },
        {
          name: '03. FIELDS (4 Refractory Niobium Whip Antennas in Full Sunlight)',
          temp: '1,350 °C Exposed Whip Antennas',
          density: '2-Meter C-103 Niobium Alloy Rods',
          details:
            'Four 2-meter antennas protruding into full blazing sunlight to measure magnetic switchbacks, electric fields, and radio waves right inside the solar corona.',
        },
        {
          name: '04. WISPR (Wide-Field Imager for Solar Probe)',
          temp: 'Shaded Behind Heat Shield',
          density: 'Dual Telescopic Coronagraphs',
          details:
            'The only imaging cameras onboard, looking sideways from behind the heat shield to photograph coronal streamers, CME shockwaves, and even glowing volcanic thermal emission from the surface of Venus!',
        },
      ],
    },
    missionChronology: {
      title: 'How Parker Conquered the Corona // 24 Perihelion Dives & Breaking the Speed Record',
      phases: [
        {
          stage: 'Phase I: Delta IV Heavy Launch Watched by Dr. Eugene Parker (Aug 12, 2018)',
          desc: 'Launched atop a Delta IV Heavy with an extra Star 48BV solid third stage to achieve the highest launch energy (C3 = 154 km²/s²) in history, with 91-year-old Eugene Parker cheering from Cape Canaveral.',
        },
        {
          stage: 'Phase II: Discovery of Magnetic "Switchbacks" (2018 – 2020)',
          desc: 'On its very first solar dives, Parker discovered that the solar magnetic fieldใกล้ the Sun suddenly whips backward on itself in S-shaped kinks ("switchbacks") originating from the boundaries of boiling convection supergranules.',
        },
        {
          stage: 'Phase III: Crossing the Alfvén Critical Surface — Officially Touching the Sun (Apr 28, 2021)',
          desc: 'On Encounter 8 (at 18.8 solar radii / 13 million km), Parker crossed the Alfvén Critical Surface—the boundary where solar gravity and magnetic fields dominate over solar wind speed, entering the true solar corona for the first time.',
        },
        {
          stage: 'Phase IV: Final Venus Assist & Christmas Eve 6.16-Million-km Record Dive (Dec 24, 2024 – Present)',
          desc: 'After its 7th Venus flyby (Nov 6, 2024), Parker plunged to just 6.16 million km (8.86 solar radii) from the Sun’s surface on Christmas Eve 2024—hitting 692,000 km/h (192 km/s). If the Earth-Sun distance were a 100-yard football field, Parker is now parked on the 4-yard line!',
        },
      ],
    },
    missionFate: {
      title: 'When & How Parker Solar Probe Will End // Becoming an Eternal Carbon Wafer Orbiting the Sun',
      overview:
        'When Parker eventually exhausts its hydrazine attitude thruster fuel, it will no longer be able to keep its heat shield pointed directly at the Sun during perihelion.',
      timeline: [
        {
          time: '2026 – Late 2020s',
          phase: 'Extended 88-Day Orbits at 6.16 Million km Perihelion',
          status: 'ACTIVE CORONAL ORBIT',
          desc: 'Having completed its final Venus gravity assist, Parker remains permanently locked in a tight 88-day orbit skimming 6.16 million km from the Sun.',
        },
        {
          time: 'After Propellant Exhaustion',
          phase: 'Loss of Attitude Lock & Vaporization of Aluminum Bus',
          status: 'CARBON REMNANT',
          desc: 'Once attitude thrusters run dry, solar torque will tip the spacecraft sideways. Blazing 1,400 °C sunlight will melt and vaporize the aluminum spacecraft body into gas—EXCEPT for the refractory carbon-carbon heat shield, which will continue orbiting the Sun intact as a silent human artifact for billions of years!',
        },
      ],
    },
    funFacts: [
      {
        title: 'Cooled by 1 Gallon of Ordinary Tap Water!',
        fact: 'Liquid chemical refrigerants would break down under the intense radiation and temperatures near the Sun. Instead, engineers cooled Parker’s solar panels with a closed-loop radiator circulating just 1 gallon (3.7 liters) of ordinary deionized water under pressure!',
      },
      {
        title: 'Fast Enough to Fly from New York to London in 29 Seconds',
        fact: 'At its perihelion velocity of 692,000 km/h (430,000 mph or 192 km/s), Parker Solar Probe moves so fast it could circle the entire Earth at the equator in 3 minutes and 28 seconds.',
      },
      {
        title: 'Flew Directly Inside a Monster Coronal Mass Ejection (CME) and Survived Unscathed',
        fact: 'On September 5, 2022, one of the most powerful Coronal Mass Ejections ever recorded erupted directly into Parker from just 9.2 million km away. Parker flew straight through the billion-ton magnetic plasma shockwave, filming the interior turbulence of a CME for the first time in history.',
      },
      {
        title: 'Confirmed the "Dust-Free Zone" Predicted by Henry Norris Russell in 1929',
        fact: 'For 90 years, astronomers theorized that close to the Sun, interplanetary dust grains would vaporize into gas, leaving a "Dust-Free Zone." Parker’s WISPR cameras observed the zodiacal dust thinning out starting at 19 solar radii!',
      },
      {
        title: 'Accidentally Saw the Glowing Red-Hot Surface of Venus Through Its Acid Clouds',
        fact: 'During nightside flybys of Venus, Parker’s WISPR optical camera turned out to be sensitive enough to 750–800 nm near-infrared light to see the 475 °C rocky continents of Venus (Aphrodite Terra) glowing like a red-hot stove burner right through the sulfuric acid clouds!',
      },
      {
        title: '60 Years from Ridiculed Paper to Historic Launch',
        fact: 'When 31-year-old Eugene Parker submitted his 1958 paper predicting the supersonic "solar wind," two peer reviewers rejected it as absurd (saying space was empty!). Only because Editor Subrahmanyan Chandrasekhar overruled the referees was it published—and 60 years later, Dr. Parker watched the probe bearing his name launch into the sky.',
      },
    ],
  },

  newhorizons: {
    id: 'newhorizons',
    name: 'New Horizons',
    acronym: 'NH-PKB',
    subtitle: 'Kuiper Belt Pathfinder // Explorer of Pluto, Charon & Arrokoth',
    category: 'Deep-Space Probe',
    operator: 'NASA / Johns Hopkins APL / SwRI',
    launchDate: 'January 19, 2006',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/PIA19952/PIA19952~orig.jpg',
    hexColor: '#f43f5e',
    focusPlanet3D: 'neptune',
    summary:
      'Launched with the highest Earth-departure velocity of any spacecraft in history (58,536 km/h), crossing the Moon’s orbit in just 9 hours (compared to Apollo’s 3 days!). On July 14, 2015, after a 9.5-year, 5-billion-kilometer voyage, New Horizons swept 12,500 km above Pluto—transforming a blurry pixel into a geologically active wonderland of 3.5-km water-ice mountains and convecting nitrogen-ice glaciers (Sputnik Planitia)—before flying past primordial contact-binary Arrokoth at 43.4 AU on New Year’s Day 2019.',
    numericComparison: {
      launchYear: 2006,
      massKg: 478,
      maxSpeedKmH: 84000,
      distanceFromEarthKm: 9000000000,
      powerWatts: 185,
    },
    metrics: [
      { label: 'Earth Escape Speed Record', value: '16.26 km/s (58,536 km/h — Crossed Moon in 9h)' },
      { label: 'Current Distance', value: '>60 AU (>9.0 Billion km in Kuiper Belt)' },
      { label: 'Pluto Flyby (July 14, 2015)', value: '12,500 km Altitude at 49,600 km/h' },
      { label: 'Arrokoth Flyby (Jan 1, 2019)', value: '3,538 km Altitude at 43.4 AU (Farthest Encounter)' },
      { label: 'Launch Mass (Grand-Piano Size)', value: '478 kg (Including 77 kg Hydrazine)' },
      { label: 'Power Source', value: '1 × GPHS-RTG (240 W at Launch / ~180 W Now)' },
      { label: 'Power Consumption of All 7 Instruments', value: '28 Watts Total (Less Than a Nightlight!)' },
      { label: 'Pluto Downlink Time', value: '15 Months at 1,000 – 2,000 bits/sec' },
      { label: 'Special Memento Onboard', value: '1 Ounce of Clyde Tombaugh’s Ashes' },
      { label: 'Instruments', value: 'LORRI, Ralph, Alice, REX, SWAP, PEPSSI, SDC' },
    ],
    subsystems: [
      { system: 'Imager: LORRI 20.8-cm Telescope', spec: 'Silicon Carbide Cryo-Optics', role: 'Mapped Pluto craters & Arrokoth at 33 m/pixel' },
      { system: 'Spectrometer: Ralph (MVIC & LEISA)', spec: 'Color & Near-IR Composition', role: 'Mapped nitrogen, methane, water ice & red tholins' },
      { system: 'Power: Single Spare Cassini RTG', spec: '~185 W Plutonium-238 Generator', role: 'Powers hibernation & active Kuiper Belt science' },
      { system: 'Dust: Venetia Burney Student Counter', spec: 'First Student-Built Planetary Instrument', role: 'Counts interplanetary dust impacts out past 60 AU' },
    ],
    howItWorks: {
      title: 'How New Horizons Works // Ultra-Light Grand Piano Bus, Hibernation Mode & 1,000-bps Telemetry',
      propulsionAndNav:
        'To reach Pluto before Pluto’s thin atmosphere could potentially freeze onto the ground as it moved farther from the Sun, engineers built New Horizons as light as a concert grand piano (478 kg) and launched it atop a massive Atlas V 551 with 5 solid rocket boosters and a Star 48B third stage. At Jupiter in Feb 2007, a gravity assist added +14,000 km/h (boosted to 84,000 km/h), shaving 3 full years off the trip to Pluto!',
      powerAndComms:
        'Because New Horizons raced past Pluto at 13.78 km/s, it couldn’t stop or enter orbit. During the 2015 flyby, it turned away from Earth for 22 hours to focus 100% on photographing Pluto and Charon, storing 50 gigabits of data on two solid-state flash drives. At 33 AU, its 12-watt transmitter could only trickle that data back at 1 to 2 kilobits per second—taking 15 full months to send all the Pluto photos home!',
      instruments: [
        {
          name: '01. LORRI (Long-Range Reconnaissance Imager)',
          temp: 'Silicon Carbide Mirror & Structure',
          density: '20.8-cm Aperture Panchromatic Camera',
          details:
            'Built entirely of silicon carbide so extreme cold cannot warp its focus. Revealed that Pluto’s heart (Sputnik Planitia) has zero impact craters—meaning its nitrogen-ice glaciers are actively convecting and renewing right now!',
        },
        {
          name: '02. Ralph (Multispectral Visible Imaging Camera & LEISA Infrared)',
          temp: 'Passive Cryo-Cooled',
          density: '6.0 Watts Power Draw',
          details:
            'Revealed that Pluto’s tall mountains (Tenzing Montes and Hillary Montes, 3.5 km high) are built of solid bedrock water ice coated in methane snow, while its red plains are painted in complex organic tholins.',
        },
        {
          name: '03. Alice (Ultraviolet Imaging Spectrometer) & REX (Radio Science)',
          temp: '4.4 Watts',
          density: 'Atmospheric Occultation Suite',
          details:
            'Looked back at the Sun and Earth as Pluto eclipsed them—revealing up to 20 distinct layers of blue organic hydrocarbon haze extending 200 km into Pluto’s nitrogen sky.',
        },
        {
          name: '04. Venetia Burney Student Dust Counter (SDC)',
          temp: 'External PVDF Film Panel',
          density: '1.9 kg (Univ. of Colorado Students)',
          details:
            'Named after Venetia Burney (who suggested the name "Pluto" as an 11-year-old schoolgirl in 1930!). Recently detected higher-than-expected dust densities past 55 AU, suggesting our Kuiper Belt extends much farther outward than previously thought.',
        },
      ],
    },
    missionChronology: {
      title: 'How New Horizons Unlocked the Third Zone of the Solar System',
      phases: [
        {
          stage: 'Phase I: Record-Breaking Launch & Jovian Volcano Flyby (2006 – 2007)',
          desc: 'Launched Jan 19, 2006. On Feb 28, 2007, swept past Jupiter—capturing a stunning movie of a 330-km-tall volcanic eruption plume from Tvashtar volcano on Io while gaining a 4 km/s speed boost.',
        },
        {
          stage: 'Phase II: Historic Flyby of the Pluto-Charon Binary System (July 14, 2015)',
          desc: 'Threaded the needle 12,500 km above Pluto and 28,800 km from Charon—discovering Pluto’s nitrogen glacier heart, probable cryovolcanoes (Wright Mons), a subsurface liquid ocean, and Charon’s 1,000-km tectonic canyon and red north polar cap (Mordor Macula).',
        },
        {
          stage: 'Phase III: Farthest Planetary Flyby in History — 486958 Arrokoth (Jan 1, 2019)',
          desc: 'At 43.4 AU (6.5 billion km from Earth), flew within 3,538 km of Kuiper Belt object Arrokoth (2014 MU69, discovered by Hubble for the mission!). Revealed a pristine 36-km-long reddish "snowman" contact binary formed by gentle low-speed pebble accretion 4.5 billion years ago.',
        },
        {
          stage: 'Phase IV: Outer Kuiper Belt & Heliospheric Boundary Exploration (2020 – Present)',
          desc: 'Now past 60 AU, measuring the cosmic optical background (in pitch-black skies free of inner zodiacal dust), mapping outer Kuiper Belt dust, and preparing to cross the Termination Shock in the late 2020s.',
        },
      ],
    },
    missionFate: {
      title: 'When & How New Horizons Will End // Joining the Voyagers in Interstellar Space',
      overview:
        'New Horizons is the 5th human spacecraft (after Pioneer 10, Pioneer 11, Voyager 1, and Voyager 2) to achieve solar escape velocity. It will never return to the inner Solar System.',
      timeline: [
        {
          time: 'Late 2020s – Mid-2030s (~65 – 90 AU)',
          phase: 'Crossing the Solar Termination Shock with Modern Plasma Sensors',
          status: 'HELIOSPHERE BOUNDARY',
          desc: 'With its RTG decaying by ~3.5 W/year, New Horizons has enough power to operate into the late 2030s—potentially sampling the Termination Shock with far more advanced plasma and dust sensors than the 1970s Voyagers.',
        },
        {
          time: 'Late 2030s (~100 AU)',
          phase: 'End of RTG Power & Eternal Drift Toward Sagittarius',
          status: 'INTERSTELLAR DRIFT',
          desc: 'After its radio falls silent in the late 2030s, New Horizons will coast out of the Solar System at ~13.8 km/s in the direction of the constellation Sagittarius forever.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Clyde Tombaugh Discovered Pluto in 1930—And Reached It in 2015!',
        fact: 'Bolted to the inside of New Horizons’ lower deck is an aluminum capsule containing 1 ounce of the cremated ashes of astronomer Clyde Tombaugh (who discovered Pluto at Lowell Observatory in 1930 and passed away in 1997). His ashes are now on their way to the stars—the farthest human remains in the universe.',
      },
      {
        title: 'Pluto Was Still Classified as the 9th Planet When New Horizons Launched!',
        fact: 'When New Horizons launched on January 19, 2006, Pluto was officially the 9th planet. Just 7 months later (August 2006), while the spacecraft was already passing the asteroid belt, the IAU reclassified Pluto as a Dwarf Planet.',
      },
      {
        title: 'Demonstrated the First Interstellar Parallax Navigation Using Nearby Stars',
        fact: 'In April 2020, when New Horizons was 7 billion km (47 AU) from Earth, it photographed our two closest neighboring stars—Proxima Centauri and Wolf 359—at the exact same moment telescopes on Earth did. Because of the 7-billion-km baseline, the stars visibly jumped against the background constellations!',
      },
      {
        title: 'Pluto Paints Its Own Moon’s North Pole Red!',
        fact: 'New Horizons solved why Pluto’s giant moon Charon has a dark reddish-brown cap at its North Pole ("Mordor Macula"): methane gas escaping from Pluto’s atmosphere gets captured by Charon’s gravity, freezes onto Charon’s freezing winter pole, and is baked by solar UV rays into red organic tholin tar!',
      },
      {
        title: 'Arrokoth Proved Planets Formed by Gentle "Pebble Cloud Collapse," Not Violent Smashes',
        fact: 'Because the two flattened lobes of Arrokoth are joined together with no crushing fracture marks or high-speed cratering, its flyby proved that primordial planetesimals coalesced gently at walking speed (~few meters per second) inside local swirling pebble clouds.',
      },
      {
        title: 'Powered by the Original PlayStation 1 CPU Architecture (Mongoose-V)',
        fact: 'New Horizons’ command and data handling is driven by a radiation-hardened 12-MHz Mongoose-V processor—an aerospace-hardened version of the MIPS R3000 CPU that powered the original 1994 Sony PlayStation console!',
      },
    ],
  },

  perseverance: {
    id: 'perseverance',
    name: 'Perseverance Rover & Ingenuity',
    acronym: 'M2020 / INGENUITY',
    subtitle: 'Jezero Crater Astrobiologist // Sample Caching & First Extraterrestrial Flight',
    category: 'Planetary Rover',
    operator: 'NASA / JPL',
    launchDate: 'July 30, 2020 (Landed Feb 18, 2021)',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/PIA24428/PIA24428~orig.jpg',
    hexColor: '#ef4444',
    focusPlanet3D: 'mars',
    summary:
      'The most advanced robotic astrobiologist ever sent to another world. Touching down inside Mars’s ancient 45-km Jezero Crater lakebed and river delta via a rocket-powered Sky Crane on February 18, 2021, the 1,025-kg nuclear-powered Perseverance rover searches for fossilized microbial biosignatures, cores and seals titanium rock sample tubes for future return to Earth, produces breathable oxygen from Martian CO₂ air (MOXIE), and deployed the historic Ingenuity Mars Helicopter—the Wright Brothers moment on another planet.',
    numericComparison: {
      launchYear: 2020,
      massKg: 1025,
      maxSpeedKmH: 0.15,
      distanceFromEarthKm: 225000000,
      powerWatts: 110,
    },
    metrics: [
      { label: 'Rover Mass & Dimensions', value: '1,025 kg (SUV-Sized: 3.0 m × 2.7 m × 2.2 m)' },
      { label: 'Landing Site', value: 'Jezero Crater Paleo-Lake & River Delta (18.38°N)' },
      { label: 'Power Source', value: 'MMRTG (4.8 kg Plutonium-238 Dioxide • 110 Watts)' },
      { label: 'Robotic Turret Arm', value: '2.1-Meter 5-Joint Arm + Rotary Percussive Drill' },
      { label: 'Sealed Sample Tubes', value: '43 Ultra-Clean Titanium-Nitride Hermetic Tubes' },
      { label: 'Cameras & Microphones', value: '23 Cameras + 2 Microphones (First Mars Audio!)' },
      { label: 'MOXIE Oxygen Production', value: '122 Grams of 98%-Pure Breathable O₂ Generated' },
      { label: 'Ingenuity Helicopter Mass', value: '1.8 kg • 1.2 m Carbon-Fiber Coaxial Rotors' },
      { label: 'Ingenuity Flight Record', value: '72 Powered Flights (Designed for Only 5!)' },
      { label: 'Autonomous Driving', value: 'AutoNav AI (Drives 5× Faster Than Curiosity)' },
    ],
    subsystems: [
      { system: 'Power: Multi-Mission RTG', spec: '110 W Continuous + 2 Li-Ion Batteries', role: 'Operates day, night, and through dust storms' },
      { system: 'Mobility: 6-Wheel Rocker-Bogie', spec: '52.5 cm Titanium-Spoke Aluminum Wheels', role: 'Climbs 30° slopes & rocks up to 40 cm tall' },
      { system: 'ISRU: MOXIE Solid-Oxide Electrolysis', spec: '800 °C CO₂ → O₂ + CO Splitter', role: 'Proved astronauts can make rocket fuel & air on Mars' },
      { system: 'Aerial: Ingenuity Coaxial Rotorcraft', spec: '2,400–2,900 RPM Counter-Rotating Blades', role: '72 aerial scouting flights in 0.6%-density air' },
    ],
    howItWorks: {
      title: 'How Perseverance & Ingenuity Work // Sky Crane EDL, UV Raman Spectroscopy & 2,500-RPM Flight',
      propulsionAndNav:
        'Landing a 1-ton rover on Mars ("The 7 Minutes of Terror") is uniquely hard because Mars has enough atmosphere to burn up a spacecraft at 20,000 km/h, yet too little atmosphere (0.6% of Earth’s) for parachutes alone to stop it. Perseverance used a heat shield, a 21.5-meter supersonic parachute with Terrain-Relative Navigation (matching live ground camera photos against orbital maps to dodge cliffs!), and a 8-hydrazine-engine rocket backpack ("Sky Crane") that lowered the rover on 6.4-meter nylon bridles directly onto its wheels.',
      powerAndComms:
        'Mounted on its 2.1-meter robotic arm are two microscopic chemical detectives—SHERLOC (UV Raman luminescence) and PIXL (X-ray fluorescence)—that map organic carbon and mineral chemistry at the scale of a single grain of salt before its core drill extracts pencil-sized rock cores into sterile titanium tubes.',
      instruments: [
        {
          name: '01. SuperCam (Mast-Mounted Pulsed Laser & Microphone)',
          temp: 'Vaporizes Rock up to 7 Meters Away',
          density: 'LIBS, Raman, VISIR & Audio Mic',
          details:
            'Fires an infrared laser pulse that heats a pinpoint of rock to 10,000 °C plasma from 7 meters away, analyzing the flash spectrum to identify elements—while its microphone listens to the acoustic "snap" of the laser shockwave to measure rock hardness!',
        },
        {
          name: '02. SHERLOC ("Scanning Habitable Environments with Raman & Luminescence")',
          temp: 'Turret-Mounted Deep-UV Laser',
          density: 'Paired with WATSON Microscopic Camera',
          details:
            'Uses a 248.6-nm ultraviolet laser to detect aromatic organic rings and biosignature minerals without destroying the rock—famously discovering the "Cheyava Falls" leopard-spot rock in Neretva Vallis in July 2024!',
        },
        {
          name: '03. MOXIE (Mars Oxygen In-Situ Resource Utilization Experiment)',
          temp: '800 °C Solid-Oxide Electrolysis',
          density: 'Gold-Plated Thermal Box',
          details:
            'Compressed Martian CO₂ air through a HEPA filter and electrochemically split off oxygen atoms across a scandia-stabilized zirconia ceramic membrane—producing 122 grams of 98% pure breathable O₂ across 16 runs!',
        },
        {
          name: '04. RIMFAX (Ground-Penetrating Radar) & Sample Caching System',
          temp: '150–1200 MHz Radar',
          density: '3,000 Moving Parts in Caching Carousel',
          details:
            'Probes 10+ meters beneath the rover wheels to map buried ancient lakebed sediments, while the internal "Belly" robot arm seals rock cores with less than 1 nanogram of Earth contamination.',
        },
        {
          name: '05. Ingenuity Mars Helicopter ("Ginny")',
          temp: 'Solar Charged / Survival Heater',
          density: '1.8 kg • Qualcomm Snapdragon 801 CPU',
          details:
            'Because Mars’s air at the surface is as thin as Earth’s atmosphere at 30 km (100,000 ft) altitude—more than 3× higher than any helicopter has ever flown on Earth—Ingenuity spun two 1.2-meter carbon-fiber blades at 2,537 RPM. Designed for just 5 test hops over 30 days, it flew 72 times over nearly 3 years!',
        },
      ],
    },
    missionChronology: {
      title: 'How Perseverance Explored Jezero Crater // From Crater Floor to Rim Climb',
      phases: [
        {
          stage: 'Phase I: Pinpoint Sky Crane Touchdown & First Sounds of Mars (Feb 18, 2021)',
          desc: 'Landed inside Jezero Crater—recording the first real video of a Mars landing and the first genuine acoustic sounds of Martian wind gusts.',
        },
        {
          stage: 'Phase II: Ingenuity’s Wright Brothers Flight & Three Forks Sample Depot (Apr 2021 – Jan 2023)',
          desc: 'On April 19, 2021, Ingenuity executed the first powered, controlled aerodynamic flight on another planet. In Jan 2023, Perseverance completed the first sample depot on another world, depositing 10 backup titanium sample tubes at "Three Forks".',
        },
        {
          stage: 'Phase III: Ascent of the Ancient River Delta & Discovery of "Cheyava Falls" (2023 – 2024)',
          desc: 'Climbed the 3.5-billion-year-old western river delta and entered the ancient Neretva Vallis river channel. In July 2024, drilled "Cheyava Falls"—an arrowhead-shaped mudstone rock containing organic carbon compounds, calcium sulfate veins, and millimeter-scale "leopard spots" with iron-phosphate rings that on Earth are formed by subsurface microbial metabolism!',
        },
        {
          stage: 'Phase IV: Climbing the 500-Meter Jezero Crater Rim (2024 – Present)',
          desc: 'Completed a grueling 500-meter vertical climb up the steep western rim of Jezero Crater ("Witch Hazel Hill") to inspect 4.0-billion-year-old Noachian crust blasted up by the original impact.',
        },
      ],
    },
    missionFate: {
      title: 'When & How Perseverance Will End // Preserving Humanity’s Most Precious Martian Samples',
      overview:
        'Powered by a Plutonium-238 MMRTG (whose sisters on Curiosity has operated since 2012!), Perseverance can operate into the mid-2030s while holding ~30 sealed rock cores inside its belly awaiting a future Mars Sample Return lander.',
      timeline: [
        {
          time: '2026 – Early 2030s',
          phase: 'Extended Exploration of Nili Planum Beyond the Crater Rim',
          status: 'ACTIVE ROVING',
          desc: 'Perseverance explores ancient hydrothermal and impact-megabreccia outcrops outside Jezero Crater.',
        },
        {
          time: '2030s (Future Sample Return Rendezvous)',
          phase: 'Delivery of Sealed Titanium Core Tubes',
          status: 'SAMPLE TRANSFER',
          desc: 'Perseverance is designed to drive directly up to a future Sample Retrieval Lander to hand off its onboard cache of sealed rock tubes (including the "Sapphire Canyon" core from Cheyava Falls), while the 10 backup tubes at Three Forks remain on the crater floor as insurance.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Secret Binary Code Hidden in the Red-and-White Parachute Stripes: "DARE MIGHTY THINGS"',
        fact: 'During the landing broadcast, internet sleuths noticed the red and white gores of Perseverance’s 21.5-meter supersonic parachute formed an asymmetric pattern. In just 6 hours, fans decoded it as 10-bit binary ASCII spelling out JPL’s motto: "DARE MIGHTY THINGS" along with the GPS coordinates of JPL (34°11\'58"N 118°10\'31"W)!',
      },
      {
        title: 'Ingenuity Carried a Postage-Stamp Swatch of the Original 1903 Wright Flyer Wing',
        fact: 'Wrapped around a cable underneath Ingenuity’s solar panel is a small piece of unbleached muslin fabric from the left wing of Orville and Wilbur Wright’s 1903 Wright Flyer from Kitty Hawk—linking humanity’s first flight on Earth with our first flight on another planet.',
      },
      {
        title: 'Why SHERLOC Always Carries "WATSON" — And a Piece of a Martian Meteorite Back to Mars',
        fact: 'The UV spectrometer SHERLOC is paired with a close-up camera named WATSON. To calibrate its laser on Mars, engineers mounted a slice of Martian meteorite "SaU 008" (blasted off Mars millions of years ago and found in Oman in 1999) plus spacesuit materials (Teflon, Vectran, polycarbonate helmet visor) onto the rover’s arm—returning a piece of Mars back home!',
      },
      {
        title: 'Discovered That Sound Travels at Two Different Speeds on Mars!',
        fact: 'Using its microphones to listen to Ingenuity’s rotor hum and SuperCam’s laser zaps, scientists discovered a bizarre acoustic quirk of Mars’s cold, low-pressure CO₂ air: low-pitched sounds (<240 Hz) travel at ~240 m/s, while high-pitched sounds (>240 Hz) travel 10 m/s faster (~250 m/s)! Listening to a concert from 20 meters away on Mars would sound out of sync.',
      },
      {
        title: 'The "Cheyava Falls" Leopard Spots: Closest Potential Biosignature Yet',
        fact: 'In July 2024, Perseverance sampled "Cheyava Falls", a reddish mudstone rock with white mineral veins and tiny black-rimmed whitish spots ("leopard spots") rich in iron and phosphate alongside organic molecules. On Earth, those exact chemical reduction spots form when subterranean microbes use iron oxide for energy.',
      },
      {
        title: 'Ingenuity Still Functions as a Stationary Weather Station After Breaking a Rotor Tip on Flight 72',
        fact: 'Even after a hard landing on featureless sand dunes damaged its rotor blade tips on Flight 72 (Jan 18, 2024), Ingenuity’s computer and solar battery remained healthy—programmed by JPL to wake up daily and log surface temperature and avionic data onto its flash memory for the next 20 years!',
      },
    ],
  },

  iss: {
    id: 'iss',
    name: 'International Space Station',
    acronym: 'ISS',
    subtitle: 'Modular LEO Orbital Outpost // 25+ Years of Continuous Human Presence in Space',
    category: 'Orbital Station & Fleet',
    operator: 'NASA / Roscosmos / ESA / JAXA / CSA (15 Nations)',
    launchDate: 'November 20, 1998 (Zarya Module)',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/iss056e201248/iss056e201248~orig.jpg',
    hexColor: '#10b981',
    focusPlanet3D: 'earth',
    summary:
      'The largest and most complex engineering structure ever assembled in space. Spanning the area of an American football field (109 meters wide) and weighing 450,000 kilograms, the ISS was constructed in orbit across 40+ assembly flights by a partnership of 15 nations. Travelling at 27,600 km/h (7.66 km/s) 408 kilometers above Earth, it has maintained an unbroken chain of human habitation in space since November 2, 2000—serving as humanity’s premier microgravity laboratory.',
    numericComparison: {
      launchYear: 1998,
      massKg: 450000,
      maxSpeedKmH: 27600,
      distanceFromEarthKm: 415,
      powerWatts: 120000,
    },
    metrics: [
      { label: 'Total Span & Length', value: '109 m Truss Span × 73 m Module Length' },
      { label: 'Total Orbital Mass', value: '~450,000 kg (990,000 lbs — 450 Metric Tons)' },
      { label: 'Pressurized Living Volume', value: '916 m³ (Larger Than a 6-Bedroom House)' },
      { label: 'Orbital Altitude & Inclination', value: '408 – 420 km LEO • 51.6° Inclination' },
      { label: 'Orbital Speed & Sunrises', value: '27,600 km/h (92.9m Orbit = 16 Sunrises/Day)' },
      { label: 'Solar Power Generation', value: '8 Solar Wings + 6 iROSA Roll-Out Arrays (>120 kW)' },
      { label: 'Water Recycling Efficiency', value: '98% Closed-Loop Recovery (ECLSS)' },
      { label: 'Continuous Habitation', value: 'Since Nov 2, 2000 (>280 Visitors from 23 Countries)' },
      { label: 'Robotic Manipulators', value: '17.6m Canadarm2 + Dextre + European ERA + JEM Arm' },
      { label: 'Scientific Experiments', value: '>3,300 Investigations from 108+ Countries' },
    ],
    subsystems: [
      { system: 'Power: 8 Legacy Wings + 6 iROSA Arrays', spec: '120–215 kW DC Power + Li-Ion Batteries', role: 'Powers 16 Pressurized Modules & Labs' },
      { system: 'ECLSS: Regenerative Life Support', spec: '98% Water Recycle + Sabatier O₂ Generator', role: 'Sustains 7+ crew members indefinitely' },
      { system: 'Robotics: Canadarm2 & Dextre (SSRMS)', spec: '7-Joint Inchworm Walking Arm', role: 'Grapples cargo ships & moves 116-ton payloads' },
      { system: 'Attitude: 4 Control Moment Gyroscopes', spec: '6,600 RPM 98-kg Steel Flywheels', role: 'Maintains Torque Equilibrium Attitude without fuel' },
    ],
    howItWorks: {
      title: 'How the ISS Works // Why Astronauts Float (Continuous Freefall) & 98% Closed-Loop Life Support',
      propulsionAndNav:
        'A common misconception is that astronauts on the ISS float because there is "zero gravity" in space. In reality, at 408 km altitude, Earth’s gravity is still **89% as strong** as on the ground! Astronauts and experiments float because the ISS is flying sideways at 27,600 km/h (7.66 km/s): as gravity pulls the station downward toward Earth, Earth’s curved surface drops away beneath it at the exact same rate—putting the station and crew in permanent, continuous freefall around the globe.',
      powerAndComms:
        'To minimize supply rockets from Earth, the Environmental Control and Life Support System (ECLSS) splits water into breathable oxygen via electrolysis, reacts exhaled CO₂ with waste hydrogen in a Sabatier reactor to produce more water, and distills crew sweat, breath humidity, and urine back into ultra-pure drinking water at **98% total water recovery** (cleaner than municipal tap water on Earth!).',
      instruments: [
        {
          name: '01. Destiny (US), Columbus (ESA), Kibo (JAXA) & Nauka Science Modules',
          temp: '22 °C Pressurized (1.0 atm Nitrogen-Oxygen)',
          density: 'International Microgravity Lab Racks',
          details:
            'Equipped with standardized International Standard Payload Racks (ISPRs) where fluid dynamics, tissue-chip organoids, protein crystals, and fiber-optic ZBLAN glass grow without sedimentation or buoyancy convection.',
        },
        {
          name: '02. Cold Atom Laboratory (CAL — Coldest Spot in the Known Universe!)',
          temp: '100 Picokelvins (10⁻¹⁰ K Above Absolute Zero)',
          density: 'Bose-Einstein Condensate Chamber',
          details:
            'Uses laser cooling and magnetic traps in microgravity to chill rubidium and potassium atoms to one ten-billionth of a degree above absolute zero—10 billion times colder than deep interstellar space—creating macroscopic quantum Bose-Einstein Condensates.',
        },
        {
          name: '03. Alpha Magnetic Spectrometer (AMS-02 — 8.5-Ton Particle Physics Detector)',
          temp: 'Mounted on Upper Integrated Truss',
          density: 'Permanent Neodymium Magnet Spectrometer',
          details:
            'Led by Nobel Laureate Samuel Ting, AMS-02 has recorded over 230 billion cosmic ray particles—searching for antimatter nuclei and positron signatures of Dark Matter annihilation.',
        },
        {
          name: '04. The 7-Window Cupola Observatory & Whipple Micrometeoroid Shields',
          temp: '80-cm Fused Silica Top Window',
          density: 'Kevlar / Nextel Stuffed Whipple Armor',
          details:
            'A panoramic dome facing nadir toward Earth for robotic operations and Earth observation, while the station’s exterior hulls are wrapped in multi-layer Kevlar and ceramic Nextel blankets that shatter hypervelocity orbital debris traveling at 10 km/s.',
        },
      ],
    },
    missionChronology: {
      title: 'How the ISS Was Built in Orbit // 40+ Flights Without Ever Touching Together on Earth',
      phases: [
        {
          stage: 'Phase I: Zarya & Unity First Linkup & Expedition 1 (1998 – 2000)',
          desc: 'Began Nov 20, 1998 with the proton launch of Zarya, joined two weeks later by the US Unity node aboard Space Shuttle Endeavour (STS-88). On Nov 2, 2000, Expedition 1 (Shepherd, Gidzenko, Krikalev) boarded the station—beginning an unbroken human presence in space that has lasted over 25 years.',
        },
        {
          stage: 'Phase II: The 11-Year Assembly Marathon & International Labs (2001 – 2011)',
          desc: 'Piece by piece, Space Shuttles and Proton rockets delivered the Destiny lab (2001), Canadarm2 (2001), the 109-meter Integrated Truss Structure and solar wings, the European Columbus lab (2008), the Japanese Kibo complex with its exposed external porch (2008), and the Cupola (2010). None of these modules had ever been physically bolted together on the ground before meeting in orbit at 27,600 km/h!',
        },
        {
          stage: 'Phase III: Commercial Cargo, Crew Dragon & iROSA Solar Upgrades (2012 – Present)',
          desc: 'Pioneered commercial spaceflight with SpaceX Dragon and Northrop Grumman Cygnus cargo ships, followed by Crew Dragon astronaut flights (2020) and 6 roll-out iROSA solar arrays that boosted station power by 30%.',
        },
      ],
    },
    missionFate: {
      title: 'When & How the ISS Will End // The US Deorbit Vehicle & Point Nemo Splashdown (2030–2031)',
      overview:
        'After 32 years of thermal cycling (16 transitions from +121 °C sunlight to -157 °C shadow every single day!) and docking stresses on its primary structural seals, the ISS is scheduled for retirement at the end of the decade as commercial Low-Earth Orbit stations take over.',
      timeline: [
        {
          time: '2026 – 2030',
          phase: 'Full-Utilization Science & Transition to Commercial LEO Destinations',
          status: 'ACTIVE LAB',
          desc: 'Continuous 7-person crews maximize microgravity research while commercial successor stations deploy.',
        },
        {
          time: '~2030',
          phase: 'Docking of the NASA / SpaceX US Deorbit Vehicle (USDV)',
          status: 'DEORBIT PREP',
          desc: 'A custom high-thrust Dragon-derived tug holding 16,000 kg of propellant and 46 Draco thrusters docks to the forward port as atmospheric drag lowers the station toward 280 km.',
        },
        {
          time: '~2031',
          phase: 'Final Crew Departure & Targeted Reentry into Point Nemo (South Pacific)',
          status: 'CONTROLLED SPLASHDOWN',
          desc: 'After the final crew departs, the US Deorbit Vehicle executes a powerful retro-burn, steering the 450-ton station into a steep, controlled reentry over the South Pacific Oceanic Uninhabited Area (Point Nemo)—the spacecraft cemetery 2,700 km from the nearest land.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Yesterday’s Coffee Is Today’s Coffee: 98% Water Recovery!',
        fact: 'In 2023, the ISS Environmental Control and Life Support System achieved a milestone 98% water recovery rate—recycling every drop of crew urine, sweat, and cabin breath moisture through vacuum distillation and catalytic filters into water purer than bottled spring water on Earth.',
      },
      {
        title: 'Astronauts Grow 5 Centimeters (2 Inches) Taller in Orbit—And Lose Calluses on Their Feet',
        fact: 'Without gravity compressing their spinal discs, astronauts stretch up to 5 cm taller in the first days aboard the ISS. And because they never walk on the floor—instead hooking the tops of their toes under handrails to hold position—the calluses on the bottoms of their feet peel off while they grow new calluses on the tops of their toes!',
      },
      {
        title: 'Flames Burn as Quiet Blue Spheres in Microgravity',
        fact: 'On Earth, hot air rises (buoyancy), pulling fresh oxygen into the bottom of a candle flame and stretching it into a yellow teardrop. On the ISS, hot air doesn’t rise because nothing is "heavier" or "lighter"—so a candle flame forms a silent, slow-burning glowing blue sphere fed only by molecular diffusion!',
      },
      {
        title: 'Hosts the Coldest Known Place in the Entire Universe (Cold Atom Lab)',
        fact: 'Natural deep space is warmed to 2.7 Kelvin (-270.45 °C) by the Cosmic Microwave Background radiation from the Big Bang. Inside the ISS Cold Atom Lab, lasers chill atomic clouds to 100 picokelvins (0.0000000001 K above absolute zero)—27 billion times colder than natural deep space!',
      },
      {
        title: 'Third Brightest Object in the Night Sky—Visible with the Naked Eye',
        fact: 'Because its acre of solar arrays and white radiators reflect sunlight so strongly, the ISS shines up to magnitude -5.9 at dawn and dusk—brighter than every star in the sky and brighter than Venus!',
      },
      {
        title: 'A 3.5-Second Time Dilation Lag Behind Earth Clocks',
        fact: 'Because the ISS travels at 7.66 km/s, Einstein’s Special Relativity (kinematic time dilation) outweighs General Relativity (weaker gravity at 408 km)—meaning astronauts on the ISS age 0.007 seconds *slower* for every 6 months they spend in orbit compared to people on Earth!',
      },
    ],
  },

  constellations: {
    id: 'constellations',
    name: 'GPS Block III & Starlink Fleets',
    acronym: 'GPS-III / SL-V2',
    subtitle: 'Planetary Infrastructure // Relativistic Atomic Trilateration & Optical Laser Mesh',
    category: 'Orbital Station & Fleet',
    operator: 'US Space Force (GPS) & SpaceX (Starlink)',
    launchDate: '1978–Present (GPS) • 2019–Present (Starlink)',
    status: 'ACTIVE MISSION',
    image: 'https://images-assets.nasa.gov/image/KSC-20181223-PH_SPX01_0001/KSC-20181223-PH_SPX01_0001~orig.jpg',
    hexColor: '#00f0ff',
    focusPlanet3D: 'earth',
    summary:
      'While flagship deep-space probes explore distant worlds, two orbital mega-architectures wrap Earth itself in an invisible technological nervous system: the 31-satellite Medium Earth Orbit (MEO) Global Positioning System (GPS) at 20,180 km altitude—which turns Einstein’s General and Special Relativity into sub-meter navigation and nanosecond global banking synchronization—and the Low Earth Orbit (LEO) Starlink constellation at 550 km, which links thousands of Argon-ion-propelled satellites via 100-Gbps optical space lasers.',
    numericComparison: {
      launchYear: 2018,
      massKg: 4331,
      maxSpeedKmH: 13900,
      distanceFromEarthKm: 20180,
      powerWatts: 4500,
    },
    metrics: [
      { label: 'GPS Orbital Altitude (MEO)', value: '20,180 km (Semi-Synchronous 11h 58m Orbit)' },
      { label: 'GPS Constellation Layout', value: '31 Active Satellites Across 6 Planes (55° Inc)' },
      { label: 'GPS Onboard Clocks', value: '3 × Rubidium Atomic Frequency Standards (1 ns)' },
      { label: 'Relativistic Clock Shift', value: '+38.6 Microseconds/Day (Einstein Correction!)' },
      { label: 'Starlink Orbital Altitude', value: '525 – 550 km vLEO (~27 ms Latency vs 600 ms GEO)' },
      { label: 'Starlink Inter-Satellite Lasers', value: '3 Optical Space Lasers per Sat (100 Gbps Each)' },
      { label: 'Starlink Electric Propulsion', value: 'Argon Hall-Effect Ion Thrusters (Isp 2,500 s!)' },
      { label: 'Starlink V2 Mini Mass', value: '~800 kg • 105 m² Solar Array • 4× Bandwidth' },
      { label: 'Autonomous Collision Avoidance', value: '>50,000 Autonomous Ion-Thruster Dodge Maneuvers' },
      { label: 'Demiseability Design', value: '100% Atmospheric Vaporization on Deorbit' },
    ],
    subsystems: [
      { system: 'GPS: Rubidium Atomic Clocks', spec: 'Stability <10⁻¹⁴ Seconds', role: 'Nanosecond time-of-flight trilateration' },
      { system: 'GPS: L1/L2/L5 Phased Array', spec: 'High-Power Spot Beam L-Band', role: 'Anti-jamming & 30-cm civilian L1C accuracy' },
      { system: 'Starlink: Optical Space Lasers', spec: '100 Gbps over 5,400 km Vacuum', role: 'Routes data in space at 47% faster speed than fiber!' },
      { system: 'Starlink: Argon Hall Thrusters', spec: '4.2 kW Electric Ion Engine', role: 'Low-cost abundant noble gas orbit raising & deorbit' },
    ],
    howItWorks: {
      title: 'How GPS & Starlink Work // Einstein’s Relativistic Clocks & Speed-of-Light Vacuum Lasers',
      propulsionAndNav:
        'A GPS satellite does NOT know where your phone is—it never receives a signal from you! Instead, each GPS satellite continuously broadcasts a one-way radio message saying: *"I am Satellite #X, at coordinates (X,Y,Z), and my atomic clock says the exact time is T."* Because radio waves travel at ~300,000 km/s (30 centimeters per nanosecond!), your phone compares the arrival time delay from 4+ satellites to calculate your 3D position and exact clock offset via **Trilateration**.',
      powerAndComms:
        'Why LEO vs GEO for broadband internet? Traditional geostationary communication satellites orbit at 35,786 km, forcing every internet packet to travel >143,000 km round-trip (~600 ms lag). Orbiting 65× closer at 550 km, Starlink drops round-trip light travel to ~25 milliseconds—and because light travels **47% faster in the vacuum of space** ($300,000\text{ km/s}$) than inside glass subsea fiber-optic cables ($204,000\text{ km/s}$), laser-linked LEO satellites can actually route long-distance packets between continents faster than undersea cables!',
      instruments: [
        {
          name: '01. GPS Block III Rubidium Atomic Clocks & Relativistic Factory Offset',
          temp: 'Vacuum-Isolated Atomic Cavity',
          density: '1-Nanosecond Accuracy',
          details:
            'Because GPS satellites move at 3.87 km/s, Special Relativity slows their clocks down by -7.2 microseconds/day. But because they sit at 20,180 km in weaker gravity, General Relativity speeds their clocks up by +45.8 microseconds/day! The net +38.6 µs/day drift would cause a **11.4-kilometer navigation error every single day** if engineers didn’t pre-tune the satellite clocks prior to launch from 10.23 MHz down to 10.22999999543 MHz!',
        },
        {
          name: '02. Starlink Optical Inter-Satellite Laser Links ("Space Lasers")',
          temp: 'Pointing Across 5,400 km at 27,360 km/h',
          density: '3 × 100-Gbps Infrared Laser Terminals',
          details:
            'Forms a global space mesh network carrying petabytes of traffic per day directly from satellite to satellite—delivering connectivity over the middle of the Pacific Ocean, Antarctica, and aircraft without needing a nearby ground station.',
        },
        {
          name: '03. Argon Hall-Effect Electric Ion Thruster',
          temp: 'Ionized Plasma Plume',
          density: '2,500-Second Specific Impulse (7× Chemical Rockets!)',
          details:
            'First spacecraft ever to fly on Argon gas in orbit (which is 20× cheaper and vastly more abundant in Earth’s air than Krypton or Xenon), accelerating ionized argon atoms with magnetic and electric fields at 25 km/s exhaust velocity.',
        },
        {
          name: '04. Phased-Array Electronically Steered Antennas & Direct-to-Cell Modems',
          temp: 'Zero Moving Parts Beam Steering',
          density: 'Ku/Ka/E-Band & LTE Cellular Arrays',
          details:
            'Uses constructive interference across thousands of tiny antenna elements to steer radio beams across the ground in microseconds with zero mechanical motors—including Direct-to-Cell "cellphone towers in space".',
        },
      ],
    },
    missionChronology: {
      title: 'How Orbital Constellations Evolved // From Navstar 1 to Optical Space Meshes',
      phases: [
        {
          stage: 'Phase I: Transit, Timation & Navstar GPS Launch (1960s – 1978)',
          desc: 'Inspired when Johns Hopkins physicists tracked Sputnik 1’s radio Doppler shift in 1957 and realized the math worked in reverse! After Roger Easton and Gladys West’s geoid modeling, the first prototype Navstar GPS satellite launched on Feb 22, 1978.',
        },
        {
          stage: 'Phase II: Removal of "Selective Availability" & Global Smartphone Era (May 1, 2000)',
          desc: 'Originally, civilian GPS signals were intentionally degraded ("Selective Availability") to ~100-meter accuracy. On May 1, 2000, the switch was turned off overnight—instantly improving civilian GPS 10-fold and sparking the modern smartphone, ride-sharing, and precision farming revolution.',
        },
        {
          stage: 'Phase III: GPS Block III & Starlink Flat-Pack Mass Production (2018 – 2020)',
          desc: 'GPS Block III introduced the civilian L1C signal (interoperable with Europe’s Galileo) while SpaceX stacked 60 flat-panel Starlink satellites inside a single Falcon 9 fairing in May 2019.',
        },
        {
          stage: 'Phase IV: Global Laser Mesh & Direct-to-Smartphone Connectivity (2023 – Present)',
          desc: 'Optical inter-satellite lasers connected the entire LEO shell into a vacuum-speed mesh, while Direct-to-Cell satellites enabled unmodified LTE phones to text from dead zones worldwide.',
        },
      ],
    },
    missionFate: {
      title: 'How GPS & Starlink Satellites End Their Lives // MEO Disposal Orbits vs. 5-Year LEO Demise',
      overview:
        'Because MEO (20,180 km) and LEO (550 km) have completely different atmospheric densities, the two constellations use opposite end-of-life disposal strategies to prevent space debris.',
      timeline: [
        {
          time: 'End of Starlink 5-Year Lifespan (550 km → 0 km)',
          phase: 'Active Ion-Thruster Deorbit & 100% Atmospheric Vaporization',
          status: 'ZERO DEBRIS',
          desc: 'Before retiring, each Starlink satellite uses its Argon ion thruster to lower its orbit into the upper atmosphere within weeks. Built of low-melting-point aluminum and silicon rather than titanium/tungsten, 100% of the satellite vaporizes into harmless atmospheric dust—and even if a satellite died completely at 550 km, natural atmospheric drag automatically pulls it down in <5 years.',
        },
        {
          time: 'End of GPS 15-Year Lifespan (20,180 km → ~20,700 km)',
          phase: 'Boost to Permanent MEO Graveyard Disposal Orbit',
          status: 'GRAVEYARD ORBIT',
          desc: 'At 20,180 km altitude, there is zero atmospheric drag, and deorbiting all the way to Earth would require prohibitive fuel. Instead, retired GPS satellites burn their remaining hydrazine to climb +500 km above the active constellation into a stable MEO disposal belt and passivate their batteries.',
        },
      ],
    },
    funFacts: [
      {
        title: 'Without Einstein’s General Relativity, Google Maps Would Be Wrong by 11.4 Kilometers Every Day!',
        fact: 'GPS is the only everyday consumer technology that requires both Einstein’s 1905 Special Relativity AND 1915 General Relativity to function. Because clocks tick 38,600 nanoseconds faster per day at 20,180 km altitude than on Earth’s surface, GPS would fail within 2 minutes of launch without relativistic corrections!',
      },
      {
        title: 'Stock Exchanges, Power Grids & Cell Towers Use GPS Mostly as a Giant Invisible Wall Clock',
        fact: 'Trillions of dollars in daily financial trades, 5G cellular handoffs, and high-voltage AC power-grid phase synchrophasors rely on GPS not to know *where* their buildings are, but to synchronize their clocks to within 10 nanoseconds across continents.',
      },
      {
        title: 'Dr. Gladys West Calculated the Exact Lumpiness of the Earth ("The Geoid") to Make GPS Work',
        fact: 'Because Earth is not a uniform sphere—having ocean trenches, mountain ranges, and mantle density lumps—satellite orbits bob up and down. Mathematician Dr. Gladys West programmed IBM stretch supercomputers in the 1970s and 80s to create the ultra-accurate geoid gravity model that underpins all GPS accuracy.',
      },
      {
        title: 'Light Travels 47% Faster Between Satellites in Space Than Inside Undersea Fiber-Optic Cables!',
        fact: 'In glass fiber-optic cables, the refractive index ($n \\approx 1.47$) slows light down from 300,000 km/s to ~204,000 km/s. Because Starlink’s inter-satellite lasers travel through the pure vacuum of space at the full speed of light, a data packet routed over long distances (>3,000 km) via space lasers actually beats a direct fiber cable!',
      },
      {
        title: ' GPS SatellitesAlso Carry Nuclear Detonation Sensors for Global Treaty Verification',
        fact: 'Every GPS satellite carries the US Nuclear Detonation Detection System (USNDS)—optical, X-ray, and EMP sensors that monitor the entire globe 24/7 to enforce nuclear test-ban treaties.',
      },
      {
        title: 'Each GPS Satellite Transmits With Less Power Than a Car Headlight (50 Watts)',
        fact: 'From 20,180 km away, a GPS satellite’s L1 signal is broadcast at just ~50 watts. By the time it reaches your phone antenna inside your pocket, the signal power is -160 dBW ($10^{-16}$ watts)—requiring clever pseudo-random gold-code correlation math to pull the signal out of background thermal noise!',
      },
    ],
  },
};
