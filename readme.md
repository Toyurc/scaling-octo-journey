# Take home assessment for job application.

## Goal

The goal of this project get "GeoJSON features" of a location given with the coordinates and represent the dataset.

## Research

After careful study on what needed to be done, I used the [OSM API](https://wiki.openstreetmap.org/wiki/API_v0.6) and [OSM MAP](https://www.openstreetmap.org/) to get the Bounding Box data and API documentation on how to get the `OSM Data` in XML.

To get bounding box data I also used [BBoxFinder](http://bboxfinder.com/)

I used the [osmtogeojson](https://github.com/tyrasd/osmtogeojson) library, which is a JavaScript library for converting OSM data to GeoJSON. 

### A sample format of GEOJSON Data represented below

```json
{
    "type": "FeatureCollection",
    "bbox": [-180, -90, 180, 90],
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-75.1652, 39.9526]
            },
            "properties": {
                "name": "Philadelphia"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [13.3888, 52.5170]
            },
            "properties": {
                "name": "Berlin"
            }
        }
    ]
}
```

## Implementation

I used[ React-Leaflet](https://react-leaflet.js.org/) and [Leaflet](https://leafletjs.com/) to represent the dataset.

### This is a [React](https://reactjs.org/) project that was bootstrapped with [Vite](https://vitejs.dev/).

Vite is a fast and lightweight development server that makes it easy to develop React apps. By bootstrapping your app with Vite, you can quickly get started with React development and take advantage of Vite's fast build times and automatic refresh to iterate quickly on your app.

First we need to install all the dependencies. To do this, we run the command below:

```bash
yarn install
```

To start the development server for the app, navigate to the my-app directory and run the following command:

```bash
yarn dev
```

This will start the development server and open the app in your default web browser. You can now start developing your app and see the changes automatically reflected in the browser.

To build the app for production, run the following command:

```bash
yarn build
```

### This project was uses [Jest](https://jestjs.io/) and [React Testing Library]() as its testing framework.

To start the test server for the app, navigate to the my-app directory and run the following command:

```bash
yarn test
```

## Folder Structure

Inside the `SRC` folder we have a folder structure that helps arrange our code for clarity.

**Components:** This folder contains small component that are used as the building blocks for our application.

**Services:** This folder contains all our side-effects and external API calls.

**Utils:** This is a utility folder that contains sample data, and other utilities like the `schema` for validation, `data types` for type-checking.