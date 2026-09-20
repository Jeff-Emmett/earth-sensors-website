/* =========================================================================
   earth-sensors — data layer
   Every number here carries a source id. Unsourced numbers are marked
   `derived` and show their arithmetic. Nothing is decorative.
   ========================================================================= */

/* ---- SOURCES ------------------------------------------------------------ */

const SOURCES = {
  plos2025: {
    tag: "Chier et al. 2025",
    title: "Passive electroculture using copper rods does not improve yield in home container vegetable gardening",
    where: "PLOS ONE 20(8):e0329615",
    url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0329615",
  },
  blackman1924: {
    tag: "Blackman 1924",
    title: "Field experiments in electro-culture",
    where: "Journal of Agricultural Science",
    url: "https://www.cambridge.org/core/journals/journal-of-agricultural-science/article/abs/field-experiments-in-electroculture1/C1A6D667D1A189E69E93668617A9262C",
  },
  plasmaAg: {
    tag: "Plasma agriculture review",
    title: "From electroculture to plasma agriculture",
    where: "Comptes Rendus Mécanique",
    url: "https://comptes-rendus.academie-sciences.fr/mecanique/item/10.5802/crmeca.331.pdf",
  },
  pulsedPower: {
    tag: "Pulsed power in agriculture",
    title: "Pulsed power applications for agriculture and food processing",
    where: "Reviews of Modern Plasma Physics 5, 2021",
    url: "https://link.springer.com/article/10.1007/s41614-021-00059-9",
  },
  arabidopsis: {
    tag: "Electrocultivation 2024",
    title: "Electrocultivation of Arabidopsis thaliana increases water and mineral absorption",
    where: "Plant Physiology and Biochemistry",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S156753942400255X",
  },
  gec: {
    tag: "Global electric circuit",
    title: "Global atmospheric electrical circuit",
    where: "Wikipedia — 2 pA/m², 250–300 kV ionospheric potential",
    url: "https://en.wikipedia.org/wiki/Global_atmospheric_electrical_circuit",
  },
  fmi: {
    tag: "FMI fair-weather",
    title: "Fair-weather atmospheric electricity",
    where: "Finnish Meteorological Institute — 100–150 V/m diurnal",
    url: "https://space.fmi.fi/~makelaa/fairw.html",
  },
  rycroft: {
    tag: "Rycroft (URSI)",
    title: "A.C./D.C. Atmospheric Global Electric Circuit Phenomena",
    where: "URSI General Assembly 2011",
    url: "https://www.ursi.org/proceedings/procGA11/ursi/EGH-4.pdf",
  },
  tesla685957: {
    tag: "Tesla US 685,957",
    title: "Apparatus for the Utilization of Radiant Energy (1901)",
    where: "USPTO / Google Patents",
    url: "https://patents.google.com/patent/US685957A/en",
  },
  wardenclyffe: {
    tag: "Wardenclyffe",
    title: "Wardenclyffe Tower",
    where: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Wardenclyffe_Tower",
  },
  eltonTesla: {
    tag: "Elton — Tesla's folly",
    title: "Tesla's folly: why Wardenclyffe didn't work",
    where: "moreisdifferent.com",
    url: "https://www.moreisdifferent.com/2015/02/22/teslas-folly-why-wardenclyff-didnt-work/",
  },
  zenneck: {
    tag: "Zenneck wave",
    title: "Zenneck wave",
    where: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Zenneck_wave",
  },
  zenneckWPT: {
    tag: "Zenneck WPT (contested)",
    title: "Experimental and Theoretical Realization of Zenneck Wave-based Wireless Power Transmission",
    where: "arXiv:1903.10294 — cited as contested, not endorsed",
    url: "https://arxiv.org/pdf/1903.10294",
  },
  tte: {
    tag: "TTE comms",
    title: "Through-the-earth communications",
    where: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Through-the-earth_communications",
  },
  bataller: {
    tag: "Bataller et al. 2010",
    title: "Earth impedance model for through-the-earth communication applications with electrodes",
    where: "Radio Science 45, RS6015",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2010RS004406",
  },
  niosh: {
    tag: "NIOSH ELF TTE",
    title: "Simulation and Measurement of Through-the-Earth ELF Signals Using Copper-Clad Steel Ground Rods",
    where: "IEEE Trans. Ind. Appl. / PMC5701283",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5701283/",
  },
  tmfc: {
    tag: "Terrestrial MFC 2016",
    title: "A Terrestrial Microbial Fuel Cell for Powering a Single-Hop Wireless Sensor Network",
    where: "Int. J. Mol. Sci. 17(5):762 — 3 mW/m², 0.75 V OCV, 20 mA/m²",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4881583/",
  },
  pmfc: {
    tag: "Plant MFC IoT",
    title: "Plant Microbial Fuel Cells–Based Energy Harvester System for Self-powered IoT Applications",
    where: "PMC6470559",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6470559/",
  },
  smfcGuide: {
    tag: "UCSC SMFC guide",
    title: "The Engineer's Guide to Practical Soil Microbial Fuel Cell Design",
    where: "ACM IMWUT",
    url: "https://sensors.soe.ucsc.edu/assets/pdf/imwut.pdf",
  },
  love2008: {
    tag: "Love et al. 2008",
    title: "Source of Sustained Voltage Difference between the Xylem of a Potted Ficus benjamina Tree and Its Soil",
    where: "PLoS ONE 3(8):e2963 — 50–200 mV, pH-driven, Faraday-caged",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2493036/",
  },
  voltree: {
    tag: "Voltree / USDA",
    title: "USDA Forest Service Tests Voltree Power's Bio-Energy Harvester",
    where: "Design News",
    url: "https://www.designnews.com/batteries-energy-storage/voltree-power-s-bio-energy-harvester",
  },
  harvest2025: {
    tag: "HARVEST 2025",
    title: "A smart nail platform for wireless subsoil health monitoring via UAV-assisted RF interrogation",
    where: "Nature Communications — 2 m spacing, UAV read to 1.8 m, full season, no onboard electronics",
    url: "https://www.nature.com/articles/s41467-025-67889-w",
  },
  purdueChipless: {
    tag: "Purdue chipless tag",
    title: "Battery-Less Wireless Chipless Sensor Tag for Subsoil Moisture Monitoring",
    where: "IEEE Sensors Journal — 10 cm depth read at 50 cm free space",
    url: "https://engineering.purdue.edu/dcsl/publications/papers/2020/soil-sensing_sensors20.pdf",
  },
  imperialRF: {
    tag: "Imperial RF survey",
    title: "Ambient RF Energy Harvesting in Urban and Semi-Urban Environments",
    where: "IEEE Trans. Microwave Theory Tech. 61(7), 2013 — 270 London Underground stations",
    url: "https://www.imperial.ac.uk/media/imperial-college/faculty-of-engineering/electrical-and-electronic-engineering/public/optical-and-semiconductor-devices/pubs/2013_07_TMTT.pdf",
  },
  gic: {
    tag: "Geomagnetically induced current",
    title: "Geomagnetically induced current",
    where: "Wikipedia — <10 mV/km quiet; 100–300 mV/km mid-latitude storm",
    url: "https://en.wikipedia.org/wiki/Geomagnetically_induced_current",
  },
  czechGIC: {
    tag: "Czech GIC modelling",
    title: "Modelling of Geomagnetically Induced Currents in the Czech Transmission Grid",
    where: "arXiv:2112.02438 — Halloween storm peak ~650 mV/km",
    url: "https://arxiv.org/pdf/2112.02438",
  },
  earthBattery: {
    tag: "Earth battery",
    title: "Earth battery",
    where: "Wikipedia — galvanic couple; anode is consumed",
    url: "https://en.wikipedia.org/wiki/Earth_battery",
  },
  metabunkSR: {
    tag: "Schumann harvesting analysis",
    title: "Claim: harvesting energy from Schumann resonances and Earth's EM field",
    where: "Metabunk — field amplitude ≈ 300 µV/m",
    url: "https://www.metabunk.org/threads/claim-harvesting-energy-from-schumann-resonances-and-earths-em-field-adgex.7285/",
  },
  ised247: {
    tag: "ISED RSS-247",
    title: "RSS-247 — Digital Transmission Systems, Frequency Hopping Systems and Licence-Exempt LAN Devices",
    where: "Innovation, Science and Economic Development Canada",
    url: "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/devices-and-equipment/radio-equipment-standards/radio-standards-specifications-rss/rss-247-digital-transmission-systems-dtss-frequency-hopping-systems-fhss-and-licence-exempt-local",
  },
  ised210: {
    tag: "ISED RSS-210",
    title: "RSS-210 — Licence-Exempt Radio Apparatus: Category I Equipment",
    where: "Innovation, Science and Economic Development Canada",
    url: "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/devices-and-equipment/radio-equipment-standards/radio-standards-specifications-rss/rss-210-licence-exempt-radio-apparatus",
  },
};

/* ---- PHYSICAL CONSTANTS ------------------------------------------------- */

const PHYS = {
  EPS0: 8.8541878128e-12,
  MU0: 4 * Math.PI * 1e-7,
  C: 2.99792458e8,
  /** Fair-weather conduction current density, A/m². gec / rycroft */
  J_FAIRWEATHER: 2e-12,
  /** Fair-weather potential gradient at the surface, V/m. fmi */
  E_FAIRWEATHER: 120,
};

/* ---- THE LADDER: supply -------------------------------------------------
   `w` is realistic DELIVERED power for the stated unit, not a theoretical
   ceiling — except where `ceiling: true`, which marks a bound nobody has
   reached. `areaScaled` sources multiply with the footprint slider.
   ------------------------------------------------------------------------- */

const SUPPLY = [
  {
    id: "schumann",
    name: "Schumann resonance",
    w: 1e-15,
    unit: "per node",
    areaScaled: false,
    family: "dead",
    note:
      "Field amplitude ≈ 300 µV/m gives 0.24 nW/m² of flux, but at 7.83 Hz the wavelength is 38 000 km. " +
      "A 1 m element has a radiation resistance near 5×10⁻¹³ Ω. Nothing matches that. ELF antennas are " +
      "superb detectors and useless collectors.",
    srcs: ["metabunkSR"],
  },
  {
    id: "atmos",
    name: "Atmospheric E-field, plate at 3 m",
    w: 6e-10,
    unit: "per m²",
    areaScaled: true,
    family: "dead",
    note:
      "2 pA/m² of conduction current against the ~300 V standing at 3 m height. This is the ceiling, " +
      "before any collector imperfection: drawing current collapses the local field, and surface leakage " +
      "at 300 V beats the harvest as soon as dew forms.",
    srcs: ["gec", "fmi", "rycroft"],
  },
  {
    id: "telluric",
    name: "Telluric, 100 m electrode span",
    w: 2.5e-9,
    unit: "per span",
    areaScaled: false,
    family: "dead",
    note:
      "Quiet geoelectric field is under 10 mV/km — about 1 mV across 100 m of copper, into a ground " +
      "resistance of tens to hundreds of ohms. Storms reach 100–300 mV/km at mid-latitudes, rarely, " +
      "and the electrodes' own galvanic offset is a hundred times larger than the signal.",
    srcs: ["gic", "czechGIC"],
  },
  {
    id: "rfRural",
    name: "Ambient RF, rural (incident)",
    w: 1e-6,
    unit: "per m²",
    areaScaled: true,
    family: "marginal",
    recovered: 0.02,
    note:
      "Incident density, not recovered power. Rectifier efficiency collapses below about 1 µW/cm²; " +
      "at rural levels you keep a couple of percent. Away from towers this is effectively zero.",
    srcs: ["imperialRF"],
  },
  {
    id: "teg",
    name: "Thermoelectric, soil↔air ΔT",
    w: 5e-5,
    unit: "per 40 mm module",
    areaScaled: false,
    family: "live",
    note:
      "Diurnal average for one 40 mm module with real heatsinking. Scales with ΔT², so the number is " +
      "seasonal, and stacking modules does not scale linearly — they thermally short each other.",
    srcs: [],
    derived: "SP1848-class module, ΔT≈5 K sustained, matched load, averaged over 24 h",
  },
  {
    id: "tree",
    name: "Tree xylem↔soil tap",
    w: 5e-5,
    unit: "per tree",
    areaScaled: false,
    family: "live",
    note:
      "50–200 mV sustained, measured inside a Faraday cage so it is not RF pickup, tracking the pH " +
      "difference between xylem and soil. Needs a converter that cold-starts at 50 mV. Productised for " +
      "USDA Forest Service fire detection.",
    srcs: ["love2008", "voltree"],
  },
  {
    id: "smfcField",
    name: "Soil MFC, field-realistic",
    w: 3e-4,
    unit: "per m² anode",
    areaScaled: true,
    family: "live",
    note:
      "An order below the bench figure, because field cells dry out, the air cathode fouls, and internal " +
      "resistance rises. Still the best source that works buried, at night, under canopy, in snow.",
    srcs: ["tmfc", "smfcGuide"],
  },
  {
    id: "smfcBench",
    name: "Soil MFC, bench peak",
    w: 3e-3,
    unit: "per m² anode",
    areaScaled: true,
    family: "live",
    note:
      "3 mW/m² of anode, 0.75 V open circuit, 20 mA/m² maximum current — measured, powering a single-hop " +
      "wireless sensor network.",
    srcs: ["tmfc"],
  },
  {
    id: "benthic",
    name: "Benthic MFC, sediment",
    w: 1.5e-2,
    unit: "per m² anode",
    areaScaled: true,
    family: "live",
    note:
      "The mature case. Marine and lake sediment cells have run oceanographic instruments for years; " +
      "saturated sediment never dries, which is exactly the failure mode that limits soil cells.",
    srcs: ["smfcGuide"],
  },
  {
    id: "pvShade",
    name: "Photovoltaic, deep canopy shade",
    w: 1e-2,
    unit: "per m²",
    areaScaled: true,
    family: "live",
    note:
      "Even heavily shaded, PV beats every exotic source on this list. This is the number that should " +
      "make you check whether you have a light problem or an energy problem.",
    srcs: [],
    derived: "≈1 % of full sun incident × ~10 % panel efficiency",
  },
  {
    id: "pvSun",
    name: "Photovoltaic, full sun",
    w: 2e1,
    unit: "per m²",
    areaScaled: true,
    family: "live",
    note:
      "Four to ten orders of magnitude above everything above it. Every argument for an exotic harvester " +
      "is really an argument about places or times where this number is zero.",
    srcs: [],
    derived: "1 kW/m² × 20 % module efficiency",
  },
];

/* ---- THE LADDER: demand -------------------------------------------------
   Mapped to the PowerClass ceilings in power-negotiation.ts, so the chart
   and the type system agree.
   ------------------------------------------------------------------------- */

const DEMAND = [
  {
    id: "passive",
    name: "Passive resonator (SAW / LC / magnetoelastic)",
    w: 0,
    cls: 0,
    note:
      "Exactly zero. No key, no state, no compute, nothing to power. This is the whole reason the " +
      "architecture works — and the reason such a tag can never authenticate itself.",
  },
  { id: "wur", name: "Wake-up receiver, idle", w: 1e-6, cls: 0,
    note: "Cuts node idle draw from ~130 mW to ~1 µW: the largest single power win available. It listens in hardware that cannot decrypt, so the wake pattern travels in clear — which is why it needs a rotating token, not a static address." },
  { id: "leaf", name: "Duty-cycled leaf, 1 report/hour", w: 2.8e-5, cls: 1,
    note: "One 0.1 J report per hour, averaged. The workhorse class for environmental monitoring." },
  { id: "leaf15", name: "Duty-cycled leaf, 1 report/15 min", w: 1.1e-4, cls: 2,
    note: "Four times the duty, four times the supply needed. Usually the point where a soil MFC alone stops being enough." },
  { id: "interrogator", name: "Interrogator sweep, duty-cycled", w: 5e-3, cls: 2,
    note: "A node that pings passive tags rather than only reporting. This is where the field's energy is concentrated — one of these serves hundreds of zero-power tags." },
  { id: "rx", name: "LoRa receiver, always listening", w: 5e-2, cls: 3,
    note: "Continuous receive. Needs mains, a large harvest, or a battery you will be replacing." },
  { id: "rnode", name: "RNode, continuous", w: 1.3e-1, cls: 3,
    note: "The measured idle draw a wake-up receiver exists to avoid." },
  { id: "tx", name: "LoRa transmit, peak", w: 4e-1, cls: 4,
    note: "Instantaneous, not average — but the storage must cover it or the node browns out mid-packet and resets its counters." },
];

/* ---- ENERGY COSTS ------------------------------------------------------- */

const ENERGY = {
  /** Joules for one wake → sense → transmit → brief RX window cycle. */
  REPORT_J: 0.1,
  REPORT_NOTE:
    "One report ≈ 0.1 J: wake, read the sensor, transmit ~50 bytes at SF7–SF9, hold a short receive " +
    "window. SF12 in a hard RF environment can cost five times that.",
};

/* ---- BANDS -------------------------------------------------------------- */

const BANDS = [
  { f: 7.83, name: "Schumann fundamental", short: "Schumann", use: "Global cavity mode. A clock, at best.", ca: "n/a — natural" },
  { f: 60, name: "Powerline ENF", short: "ENF 60 Hz", use: "Grid frequency. Enormous near infrastructure; a free shared time reference.", ca: "n/a — incidental" },
  { f: 1e3, name: "Earth-return / TTE voice band", short: "Earth-return", use: "Galvanic conduction between electrode pairs. Cave rescue and mine emergency comms.", ca: "Conducted, not radiated" },
  { f: 2.4e4, name: "VLF (NAA 24 kHz)", short: "VLF 24 kHz", use: "1 MW navy transmitters. Free global illuminator; penetrates soil and seawater.", ca: "Receive only" },
  { f: 5.8e4, name: "Magnetoelastic 58 kHz", short: "Magnetoelastic", use: "EAS resonators. Near-field magnetic, ~$0.02 each, indifferent to soil conductivity.", ca: "RSS-210 EAS" },
  { f: 1.25e5, name: "LF RFID 125 kHz", short: "LF RFID", use: "Inductive coupling. One ID plus one scalar, through a metre of soil.", ca: "RSS-210" },
  { f: 1.356e7, name: "HF RFID 13.56 MHz", short: "HF RFID", use: "NFC-class magnetic coupling. The deepest band with real bandwidth.", ca: "RSS-210" },
  { f: 4.3392e8, name: "433.92 MHz SAW", short: "SAW 433", use: "R433A resonators have real temperature coefficients. The classic passive SAW sensing band.", ca: "RSS-210: 433.5–434.5 MHz only" },
  { f: 9.15e8, name: "915 MHz ISM", short: "915 ISM", use: "LoRa, UHF Gen2 RFID, chipless resonators. 1 W permitted — the interrogator's band.", ca: "RSS-247: 902–928 MHz, 1 W" },
  { f: 1.83e9, name: "1830 MHz (2f harmonic)", short: "2f harmonic", use: "Harmonic tag return. A single diode answers at twice the illumination frequency, with no clutter.", ca: "Receive side" },
  { f: 2.45e9, name: "2.4 GHz", short: "2.4 GHz", use: "WiFi, BLE, backscatter. Fast, and stopped by 10 cm of wet soil.", ca: "RSS-247" },
];

/* ---- INTERROGATION FAMILIES --------------------------------------------- */

const FAMILIES = [
  {
    name: "Magnetoelastic ribbon",
    f: "58 kHz",
    range: "0.3–1 m",
    depth: "1–2 m",
    powered: "none",
    cost: "$0.02",
    why: "Reactive, magnetic, near-field. Soil conductivity barely matters at 58 kHz, so this is the one family that genuinely reaches depth. Sold by the thousand as shop anti-theft labels.",
  },
  {
    name: "SAW resonator",
    f: "433.92 MHz",
    range: "10–30 m",
    depth: "≲0.2 m",
    powered: "none",
    cost: "$0.50–4",
    why: "Linear and reciprocal, so its floor is receiver noise rather than a rectifier threshold. The fixed acoustic delay separates the answer from the clutter in time — and bounds range, though not against a relay.",
  },
  {
    name: "Harmonic tag (one diode)",
    f: "915 → 1830 MHz",
    range: "50–100 m",
    depth: "≲0.1 m",
    powered: "none",
    cost: "$1",
    why: "Answers at 2f, where nothing else is talking. Exploits nonlinearity without needing efficiency, so it does not care that a diode is a poor rectifier at these levels.",
  },
  {
    name: "Chipless LC / nail probe",
    f: "868–915 MHz",
    range: "0.4–2 m",
    depth: "0.1–0.3 m buried, or probe-only",
    powered: "none",
    cost: "$0.10",
    why: "Resonance shifts with the dielectric around it — water is ε≈80, dry soil ε≈2, so moisture moves it hard. Bury only the probe and leave the antenna above ground and read range recovers completely.",
  },
  {
    name: "UHF Gen2 sensor tag",
    f: "902–928 MHz",
    range: "2–8 m",
    depth: "≲0.1 m",
    powered: "harvested",
    cost: "$0.40",
    why: "Has a chip, so it has an identifier and a checksum — but the identifier is readable and clonable, so it names a tag and not a device. Off-the-shelf readers work.",
  },
];

/* ---- SCENARIOS ---------------------------------------------------------- */

const SCENARIOS = [
  {
    id: "flood",
    name: "Watershed & culvert early warning",
    stake:
      "Rain-on-snow and atmospheric-river events fail culverts before anyone sees the water rise. " +
      "A washed-out culvert is the single most common way a rural road — and the community behind it — " +
      "gets cut off.",
    measure: "Upslope soil saturation on a grid, plus stage at the culvert throat.",
    layer0: "Chipless nail probes, 2 m grid on the slope, buried 20 cm. Zero power, zero maintenance.",
    layer1: "One interrogator at the culvert: 0.25 m² soil MFC + 20 W PV, supercapacitor buffer.",
    layer2: "LoRa to the village hall. Earth-return fallback across the creek where the canyon blocks RF.",
    claim: "`resonance-observed` per probe; `target-reports` only inside the fenced culvert zone.",
    harvestW: 2e-2,
    reportsPerDay: 96,
    costCad: 420,
    why:
      "Saturation upslope leads stage at the throat by hours. You are buying lead time, and lead time " +
      "is the only thing that converts a measurement into an evacuation.",
  },
  {
    id: "fire",
    name: "Sub-canopy wildfire ignition watch",
    stake:
      "Satellite detection sees a fire once it has a thermal signature large enough to punch through " +
      "canopy. Under the canopy, PV is near zero and batteries in a forest are a decade-long retrieval " +
      "problem nobody funds.",
    measure: "Temperature and relative humidity at 1.5 m, sub-canopy, continuously.",
    layer0: "SAW temperature resonators on trunks — no electronics, nothing to retrieve or recycle.",
    layer1: "Tree xylem↔soil tap, 50–200 mV, cold-start converter. The Voltree precedent, deployed with USDA.",
    layer2: "LoRa hop to a ridge node; the ridge node has sun.",
    claim: "`resonance-observed` at the interrogator; energy ledger flags harvest collapse as drought signal.",
    harvestW: 5e-5,
    reportsPerDay: 43,
    costCad: 180,
    why:
      "The power source is also the sensor: xylem potential tracks the tree's water status, so a node " +
      "getting weaker is itself the drought-stress reading you wanted.",
  },
  {
    id: "carbon",
    name: "Soil carbon & regenerative practice verification",
    stake:
      "Carbon and biodiversity claims are worth what their measurement is worth. Today that means a " +
      "handful of expensive cores and a model, or a battery under every point — which nobody maintains " +
      "past year two.",
    measure: "Volumetric water content and electrical conductivity on a 2 m grid, all season.",
    layer0: "HARVEST-class nail probes: buried probe, antenna above ground, no onboard electronics.",
    layer1: "Nothing permanent. A drone flies the grid weekly at 1.8 m.",
    layer2: "Drone carries the readings home. No field radio at all.",
    claim: "Every reading is `resonance-observed`, self-observed by the drone, with the zone carried as a field.",
    harvestW: 0,
    reportsPerDay: 0.14,
    costCad: 95,
    why:
      "Demonstrated for a full growing season in Indiana corn. The probes cost pennies and outlive the " +
      "farm plan; the expensive part flies away and charges overnight.",
  },
  {
    id: "cellar",
    name: "Root cellar & community cold chain",
    stake:
      "Food sovereignty runs on storage. A cellar that drifts two degrees loses a winter's harvest, " +
      "and battery-powered loggers fail first in exactly the cold and damp they are there to watch.",
    measure: "Temperature at a dozen points through the stack, continuously, for decades.",
    layer0: "SAW temperature resonators through the pile. Nothing to change, nothing to corrode.",
    layer1: "One reader at the door, mains or a small panel.",
    layer2: "None needed — read locally, or push over the building's existing link.",
    claim: "`resonance-observed` with `time-of-flight-bound`; the cellar walls are the zone.",
    harvestW: 1e-2,
    reportsPerDay: 1440,
    costCad: 260,
    why:
      "The cheapest, least romantic scenario, and the one most likely to be running in ten years. " +
      "A cellar is a naturally controlled volume, which is precisely what passive sensing needs.",
  },
  {
    id: "permafrost",
    name: "Permafrost & ground-ice watch",
    stake:
      "Thaw takes buildings, roads and airstrips with it. Thermistor strings cost thousands per hole " +
      "and their cables are the first thing frost heave destroys.",
    measure: "Temperature at depth, several points down a borehole, read seasonally.",
    layer0: "Magnetoelastic and SAW elements down the hole — 58 kHz reaches through a metre of frozen ground.",
    layer1: "None in the ground. The interrogator arrives on a snowmobile twice a year.",
    layer2: "Data walks out with the operator.",
    claim: "`resonance-observed`, observer is the visiting interrogator, epoch is the visit.",
    harvestW: 0,
    reportsPerDay: 0.005,
    costCad: 140,
    why:
      "Nothing in the ground can fail, because nothing in the ground is doing anything. The failure " +
      "mode of a resonator is that it is still a resonator.",
  },
  {
    id: "seepage",
    name: "Tailings & contamination seepage",
    stake:
      "Seepage plumes move underground and are invisible until they surface in a well or a creek. " +
      "Communities downstream of a tailings facility have almost no independent way to watch it.",
    measure: "Self-potential across an electrode array; SP anomalies track redox fronts and streaming potential.",
    layer0: "Non-polarizable Cu/CuSO₄ electrodes on a grid. The electrode is the sensor.",
    layer1: "One logger with a 24-bit ADC; mV-scale signals, so the ADC is the cost, not the sensor.",
    layer2: "The same electrode pairs carry an earth-return link. Sensor and antenna are one object.",
    claim: "Direct measurement, not interrogation — `self`-observed, and it can reach `verified`.",
    harvestW: 3e-4,
    reportsPerDay: 24,
    costCad: 310,
    why:
      "The sleeper result on this whole page. The copper you put in the ground for the link is " +
      "simultaneously a geophysical instrument, and self-potential is established practice, not speculation.",
  },
];

/* ---- ELECTROCULTURE EVIDENCE -------------------------------------------- */

const ELECTROCULTURE = [
  {
    verdict: "refuted",
    claim: "Passive copper coil antenna raises yield",
    evidence:
      "Four crops, ten plants per treatment, three arms — control, exposed copper rod, buried copper rod. " +
      "Burying isolates copper chemistry from copper electricity, and the result inverts the claimed " +
      "mechanism: buried copper raised root-vegetable biomass (p<0.01) while exposed copper — the actual " +
      "electroculture configuration — did nothing.",
    numbers: "Rod delivers 2 mV into soil, 20 mV maximum near fluorescent lights.",
    srcs: ["plos2025"],
  },
  {
    verdict: "refuted",
    claim: "The atmosphere supplies the voltage the effect needs",
    evidence:
      "Studies that do show an effect used 6–1200 V, most above 200 V. The same paper computes the " +
      "theoretical ceiling available from the atmospheric gradient at 4 V — and measures 2 mV actually " +
      "delivered. Two to three orders short of the floor, from either direction.",
    numbers: "Needed >200 V · ceiling 4 V · delivered 0.002 V",
    srcs: ["plos2025", "fmi"],
  },
  {
    verdict: "real",
    claim: "High-voltage overhead discharge affects growth",
    evidence:
      "Lemström (1904) and Blackman at Imperial College (1924) ran insulated wires about 7 ft above the " +
      "crop at 40–80 kV crest, 10–40 kV/m, six hours a day. Ten trials in oats and barley, three in " +
      "wheat, four in clover-hay. Effects reported and taken seriously.",
    numbers: "40 000–80 000 V · 6 h/day",
    srcs: ["blackman1924"],
  },
  {
    verdict: "real",
    claim: "The field has a living, powered descendant",
    evidence:
      "Plasma agriculture and plasma-activated water are active research with modern reviews, and 2024 " +
      "work on Arabidopsis shows auxin accumulation and increased mineral uptake under an applied field. " +
      "None of it is free, and all of it has a power supply.",
    numbers: "kV-class, mains-driven",
    srcs: ["plasmaAg", "pulsedPower", "arabidopsis"],
  },
];

/* ---- TESLA -------------------------------------------------------------- */

const TESLA = [
  {
    claim: "US 685,957 — Apparatus for the Utilization of Radiant Energy, 1901",
    status: "right about the circuit",
    body:
      "An insulated elevated plate, a ground, a capacitor, and a discharger that fires at a threshold. " +
      "Read in modern terms that is harvest → accumulate → threshold-dump: precisely the topology every " +
      "microwatt sensor node uses today. The patent names its own source as ultraviolet and cathodic " +
      "radiation ejecting charge from the plate — so it is governed by the atmospheric budget on this " +
      "page. It works. It works at nanowatts per square metre.",
    srcs: ["tesla685957"],
  },
  {
    claim: "Colorado Springs 1899 — an Earth fundamental near 6 Hz",
    status: "coincidence, not confirmation",
    body:
      "Tesla inferred longitudinal impulses travelling through the Earth, reflecting at the antipode, " +
      "standing waves in the planet. Schumann computed 7.83 Hz in 1952 for a transverse mode of the " +
      "Earth–ionosphere cavity. Different cavity, different mechanism, different wave. The numbers land " +
      "near each other because both scale off Earth's circumference. Treating the near-miss as " +
      "vindication is the most common error in this whole literature.",
    srcs: ["eltonTesla"],
  },
  {
    claim: "Wardenclyffe — power to everyone, everywhere",
    status: "internally inconsistent",
    body:
      "He argued low-frequency Earth resonance, and built hardware that ran at tens to hundreds of " +
      "kilohertz. The resonance he theorised was not the resonance he engineered for. The Colorado " +
      "Springs record also carries documented confirmation bias — horses disturbed in a nearby pasture " +
      "were read as ground currents through iron shoes.",
    srcs: ["wardenclyffe", "eltonTesla"],
  },
  {
    claim: "Zenneck surface waves — the modern revival",
    status: "contested",
    body:
      "Zenneck modes are genuine solutions of Maxwell's equations at a lossy interface. Whether a " +
      "vertical monopole launches one efficiently, and whether the energy stays bound over useful " +
      "distance, is disputed. Listed because it is the live claim, not because it is endorsed.",
    srcs: ["zenneck", "zenneckWPT"],
  },
  {
    claim: "Earth-return conduction",
    status: "deployed technology",
    body:
      "The part of Tesla's instinct that survives intact. Inject current between two widely spaced " +
      "ground electrodes; detect the potential difference at a second pair. ELF through LF, because the " +
      "skin effect closes everything above. Ranges to about a kilometre. Characterised in the " +
      "literature, measured by NIOSH on copper-clad steel rods, and in use in cave rescue and mining " +
      "today. Copper in the ground earns its place here — as a link, never as a source.",
    srcs: ["tte", "bataller", "niosh"],
  },
];

/* ---- BENCH EXPERIMENTS -------------------------------------------------- */

const BENCH = [
  {
    id: "A",
    name: "Atmospheric collector null test",
    cost: "~$60 CAD",
    build: "1 m² foil plate at 3 m on a PTFE standoff, electrometer input, logged against weather.",
    predict:
      "Short-circuit current ≈ 2 pA. Delivered power ≤ 1 nW. Insulator surface leakage overtakes the " +
      "harvest within hours of the first dew.",
    falsifies:
      "If it delivers more than 10 nW sustained from 1 m², the entire atmospheric row on this page is wrong.",
  },
  {
    id: "B",
    name: "Soil microbial fuel cell, one season",
    cost: "~$120 CAD",
    build:
      "Carbon-felt anode ≈0.1 m² buried 20 cm, air cathode at the surface, titanium current collectors, " +
      "cold-start boost converter, logged beside a capacitive moisture probe.",
    predict:
      "10–300 µW. More than a tenfold collapse in drought. Output correlating with volumetric water " +
      "content — which is the interesting result, not the power.",
    falsifies:
      "If harvest does not track moisture, the power-source-as-sensor idea fails and an MFC is just a " +
      "weak battery.",
  },
  {
    id: "C",
    name: "Earth-return link",
    cost: "~$40 CAD",
    build:
      "Two pairs of copper rods, 20 m electrode spacing, ~1 kHz tone, USB audio interface at both ends.",
    predict: "Usable link at 50–200 m. Sharp degradation as the ground dries.",
    falsifies:
      "If range does not exceed roughly the electrode spacing, galvanic coupling is not worth the copper.",
  },
  {
    id: "D",
    name: "Chipless resonator in soil",
    cost: "~$30 CAD on top of a VNA",
    build:
      "Copper-tape dipole at 10 cm depth, VNA with a patch antenna at 30 cm, soil wetted in steps.",
    predict:
      "Readable resonance shift with moisture. Range collapses past about 40 cm. Moving the antenna " +
      "above ground and leaving only the probe buried restores it.",
    falsifies:
      "If the fully buried tag reads as far as the probe-plus-surface-antenna does, the HARVEST design " +
      "move is unnecessary and the geometry simplifies.",
  },
];

/* ---- ARCHITECTURE LAYERS ------------------------------------------------ */

const LAYERS = [
  {
    n: "0",
    name: "The resonators",
    cls: "PowerClass 0 — ceiling 10 µW",
    body:
      "Buried or mounted passive elements. No key, no state, no compute, no maintenance, decades of " +
      "life. They cannot authenticate and never will: any resonator cut to the same frequency answers " +
      "the same interrogation identically.",
    consequence:
      "So authenticity comes from controlling the interrogated volume, not from cryptography — and " +
      "underground, soil attenuation makes that volume cheap to control. Thirty centimetres of read " +
      "range is a stronger physical bound than anything free space offers.",
  },
  {
    n: "1",
    name: "The interrogators",
    cls: "PowerClass 2–4",
    body:
      "Where all the energy lives. One powered node — fixed, or flying, or walking, or on a collar — " +
      "serves hundreds of zero-power tags. Harvest locally: photovoltaic first, soil MFC where there is " +
      "no light, thermoelectric or a tree tap at the margins.",
    consequence:
      "Concentrating the energy is the design. It is what removes the battery from every point that is " +
      "hard to reach, by accepting one battery somewhere that is not.",
  },
  {
    n: "2",
    name: "The links",
    cls: "carrier selection",
    body:
      "915 MHz LoRa where there is line of sight. Earth-return galvanic conduction for the last few " +
      "hundred metres through canopy, rock or snow. VLF as a receive-only illuminator. The copper rods " +
      "driven for the link are simultaneously a self-potential instrument.",
    consequence:
      "Penetration and bandwidth trade against each other across nine orders of magnitude. Choosing a " +
      "band is choosing how deep you can see and how much you can say — never both.",
  },
  {
    n: "3",
    name: "The claims",
    cls: "attestation",
    body:
      "\"This node observed a response at f\" is a self-observation and can be verified. \"Target X " +
      "reports value Y\" is an inference layered on top, and the step between them is exactly the " +
      "assumption that nothing else in the volume resonates there.",
    consequence:
      "That assumption travels as a machine-checkable field, not a comment somebody deletes. A network " +
      "that cannot say how it knows something is not a monitoring network; it is a rumour with a radio.",
  },
];

if (typeof module !== "undefined") {
  module.exports = { SOURCES, PHYS, SUPPLY, DEMAND, ENERGY, BANDS, FAMILIES, SCENARIOS, ELECTROCULTURE, TESLA, BENCH, LAYERS };
}
