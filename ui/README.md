# UI

## Deployment

This UI auto-deploys on [Vercel.app](https://vercel.com/) 

# Processing geojson data

To process [the country geojson data](https://github.com/undp/digital-readiness-assessment/blob/main/dashboard/UN_world_map.geojson), import it into [mapshaper](https://mapshaper.org/) and run in the console:

```bash
$ simplify 2.0% -keep-shapes
$ dissolve2 ISO3CD
```

Then export as geojson and rewind the geometries using this tool:

https://observablehq.com/@bumbeishvili/rewind-geojson

Then replace the contents of `/database/raw/country-geojson.json` and run `yarn` to update the db data.
