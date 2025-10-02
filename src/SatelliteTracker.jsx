import React, { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";
import { GLTFLoader } from "three-stdlib";
import * as THREE from "three";

// Observer location and search params
const OBSERVER = { lat: 36.96, lng: -122.02, alt: 0 };
const SATELLITE_MODEL_URL = "/satellites.glb";
const RADIUS_KM = 70; // Search radius
const CATEGORY = 0; // All categories

const SatelliteTracker = () => {
  const [satellites, setSatellites] = useState([]);
  const [satModel, setSatModel] = useState();
  const loaderRef = useRef();

  // Load the GLTF model once
  useEffect(() => {
    loaderRef.current = new GLTFLoader();
    loaderRef.current.load(SATELLITE_MODEL_URL, (gltf) => {
      gltf.scene.scale.set(2, 2, 2);
      setSatModel(gltf.scene);
    });
  }, []);




  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const params = new URLSearchParams({
          lat: OBSERVER.lat,
          lng: OBSERVER.lng,
          alt: OBSERVER.alt,
          radius: RADIUS_KM,
          category: CATEGORY
        });
        const res = await fetch(
          `/api/satellites/above?${params.toString()}`
        );
        const data = await res.json();
        if (data.above) {
          setSatellites(
            data.above.map((sat) => ({
              id: sat.satid,
              name: sat.satname,
              lat: sat.satlat,
              lng: sat.satlng,
              alt: 0.2, // visually separate from globe
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch satellites", err);
      }
    };

    fetchSatellites();
    const interval = setInterval(fetchSatellites, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1 }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        objectsData={satModel && satellites.length ? satellites : []}
        objectLat={(d) => d.lat}
        objectLng={(d) => d.lng}
        objectAltitude={(d) => d.alt}
        objectThreeObject={() => satModel ? satModel.clone() : null}
        pointLabel={(d) => d.name}
      />
    </div>
  );
};

export default SatelliteTracker;
