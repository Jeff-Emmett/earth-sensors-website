# earth-sensors-website

**https://earth-sensors.jeffemmett.com** — *Earth Sensors: a field guide to batteryless sensing.*

A sourced, interactive explainer on what the ground can and cannot do for a distributed
sensor network: passive resonant sensing, natural energy harvesting, earth-coupled links,
and the electroculture and Tesla claims that keep getting attached to them.

## The thesis

> The ground cannot power your sensors. It can host them.

Atmospheric electricity pays about **0.6 nW/m²**. Soil bacteria pay about **3 mW/m²**.
Sunlight pays about **20 W/m²**. But a sensor that needs *no* power changes the question:
concentrate the energy in one node that moves, and the landscape fills with instruments
that cannot go flat.

## What is on the page

| Plate | Contents |
|---|---|
| I — Ladder | Interactive. Eighteen decades of supply and demand on one log axis, with a footprint slider and a report-cadence readout. Rows expand to the measurement behind them. |
| II — Traverse | Interactive. Frequency 3 Hz – 6 GHz against soil penetration, computed live from the general lossy-medium form of Maxwell's equations — no good-conductor shortcut. Move the moisture slider and watch UHF die. |
| III — Evidence | Electroculture, claim by claim, with the controlled trial that settles the passive case. |
| IV — Tesla | Five claims, five different verdicts. Right about the circuit, wrong about the source. |
| V — Ground truth | Interactive. Six community-resilience deployments with their full layer stack and real numbers. |
| VI — Architecture | Four layers: resonators, interrogators, links, claims. |
| VII — Bench | Four falsifiable experiments, each with a prediction registered before the build. |

Every figure carries a source id; derived figures show their arithmetic instead.

## Companion work

- `rmesh-antenna/docs/earth-coupled-sensing.md` — the engineering reference
- `rmesh-antenna/bom/earth-coupled-t0.md` — live amazon.ca BOM for the four experiments
- `rmesh-antenna` backlog, label `epic:earth-coupled` — TASK-28 … TASK-47
- `edge-freq-surfer/src/` — `passive-reading.ts`, `energy-ledger.ts`, `power-negotiation.ts`

## Build

No build step. `site/` is the deployable artefact.

```bash
cd site && python3 -m http.server 8777     # local
docker compose up -d --build               # production, behind Traefik
```

Three files carry everything: `site/index.html` (structure and prose),
`site/assets/data.js` (**every number and every citation**),
`site/assets/app.js` (the three instruments).

To correct a figure, edit `data.js`. Nothing else needs to change.

## Licence

Text and figures CC BY-SA 4.0. Code AGPLv3, matching `rmesh-antenna`.
