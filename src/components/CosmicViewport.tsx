/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SRC_SOLAR_DATA } from '../data/srcSolarData';
import {
  createSunTexture,
  createMercuryTexture,
  createVenusTexture,
  createEarthTexture,
  createCloudsTexture,
  createMoonTexture,
  createMarsTexture,
  createJupiterTexture,
  createSaturnTexture,
  createSaturnRingsTexture,
  createUranusTexture,
  createNeptuneTexture,
  createEuropaTexture,
  createRocketMetalTexture,
  createSolarPanelTexture,
  createGoldFoilTexture,
} from '../utils/proceduralTextures';
import { sound } from '../utils/audioEngine';

interface CosmicViewportProps {
  currentSection: 'planets' | 'rockets';
  selectedPlanetId: string; // 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune'
  selectedMoonId: string | null;
  focusedSatelliteId: string | null;
  timeSpeed: number;
  showOrbits: boolean;
  isWireframe: boolean;
  isExploded: boolean;
  rocketStageStep: number;
  onUpdateTelemetry?: (coords: string, velocity: string, fps: number) => void;
  onSelectComponent?: (name: string, description: string) => void;
  onSelectPlanet: (planetId: string) => void;
  onSelectMoon: (moonId: string | null) => void;
  onSelectSatellite?: (satId: string | null) => void;
}

export const CosmicViewport: React.FC<CosmicViewportProps> = ({
  currentSection,
  selectedPlanetId,
  selectedMoonId,
  focusedSatelliteId,
  timeSpeed,
  showOrbits,
  isWireframe,
  isExploded,
  rocketStageStep,
  onUpdateTelemetry,
  onSelectComponent,
  onSelectPlanet,
  onSelectMoon,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef({
    currentSection,
    selectedPlanetId,
    selectedMoonId,
    focusedSatelliteId,
    timeSpeed,
    showOrbits,
    isWireframe,
    isExploded,
    rocketStageStep,
  });
  propsRef.current = {
    currentSection,
    selectedPlanetId,
    selectedMoonId,
    focusedSatelliteId,
    timeSpeed,
    showOrbits,
    isWireframe,
    isExploded,
    rocketStageStep,
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. THREE.JS SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07080c);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    camera.position.set(0, 55, 130);

    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({ antialias: !isHeadless, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.2;
    controls.maxDistance = 600;

    // 2. LIGHTING & SUN
    const ambientLight = new THREE.AmbientLight(0x2a344a, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 800, 0.4);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 3. STARFIELD (3500 stars)
    const starGeo = new THREE.BufferGeometry();
    const starVertices: number[] = [];
    const starColors: number[] = [];
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xcce6ff),
      new THREE.Color(0xfff4cc),
      new THREE.Color(0xffd6b3),
    ];

    for (let i = 0; i < 3500; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 1400,
        (Math.random() - 0.5) * 1400,
        (Math.random() - 0.5) * 1400
      );
      const c = palette[Math.floor(Math.random() * palette.length)];
      starColors.push(c.r, c.g, c.b);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ vertexColors: true, size: 1.1, transparent: true, opacity: 0.9 })
    );
    scene.add(stars);

    // Generate Procedural Textures
    const sunTex = createSunTexture();
    const mercuryTex = createMercuryTexture();
    const venusTex = createVenusTexture();
    const earthTex = createEarthTexture();
    const cloudsTex = createCloudsTexture();
    const moonTex = createMoonTexture();
    const marsTex = createMarsTexture();
    const jupiterTex = createJupiterTexture();
    const saturnTex = createSaturnTexture();
    const saturnRingsTex = createSaturnRingsTexture();
    const uranusTex = createUranusTexture();
    const neptuneTex = createNeptuneTexture();
    const europaTex = createEuropaTexture();
    const rocketMetalTex = createRocketMetalTexture();
    const solarPanelTex = createSolarPanelTexture();
    const goldFoilTex = createGoldFoilTexture();

    const solarSystemGroup = new THREE.Group();
    scene.add(solarSystemGroup);

    // Sun Mesh & Corona Glow
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 48, 48),
      new THREE.MeshBasicMaterial({ map: sunTex, color: 0xffdd44 })
    );
    sunMesh.name = 'planet_sun';
    solarSystemGroup.add(sunMesh);

    const sunCorona = new THREE.Mesh(
      new THREE.SphereGeometry(7.6, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      })
    );
    sunMesh.add(sunCorona);

    // Track Planet & Moon Objects for Orbits & Camera Tracking
    interface MoonRuntime {
      id: string;
      name: string;
      pivot: THREE.Object3D;
      mesh: THREE.Mesh;
      orbitRing: THREE.Mesh;
      speed: number;
      radius: number;
    }

    interface PlanetRuntime {
      id: string;
      name: string;
      pivot: THREE.Object3D;
      planetHolder: THREE.Group;
      mesh: THREE.Mesh;
      cloudMesh?: THREE.Mesh;
      ringMesh?: THREE.Mesh;
      orbitRing: THREE.Mesh;
      speed: number;
      radius: number;
      moons: MoonRuntime[];
    }

    const planetObjects: Record<string, PlanetRuntime> = {};
    const clickableMeshes: THREE.Object3D[] = [sunMesh];

    // 4. BUILD ALL 8 PLANETS & MOONS IN SOLAR SYSTEM
    SRC_SOLAR_DATA.forEach((pData) => {
      // Heliocentric Orbit Ring
      const orbitGeo = new THREE.RingGeometry(pData.distance - 0.09, pData.distance + 0.09, 128);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      solarSystemGroup.add(orbitMesh);

      const planetPivot = new THREE.Object3D();
      planetPivot.rotation.y = Math.random() * Math.PI * 2;
      solarSystemGroup.add(planetPivot);

      const planetHolder = new THREE.Group();
      planetHolder.position.set(pData.distance, 0, 0);
      planetPivot.add(planetHolder);

      // Select appropriate procedural map
      let tex = earthTex;
      let roughness = 0.65;
      if (pData.id === 'mercury') tex = mercuryTex;
      else if (pData.id === 'venus') tex = venusTex;
      else if (pData.id === 'earth') {
        tex = earthTex;
        roughness = 0.5;
      } else if (pData.id === 'mars') tex = marsTex;
      else if (pData.id === 'jupiter') {
        tex = jupiterTex;
        roughness = 0.45;
      } else if (pData.id === 'saturn') {
        tex = saturnTex;
        roughness = 0.5;
      } else if (pData.id === 'uranus') {
        tex = uranusTex;
        roughness = 0.4;
      } else if (pData.id === 'neptune') {
        tex = neptuneTex;
        roughness = 0.4;
      }

      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(pData.radius, 48, 48),
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness,
          metalness: 0.05,
        })
      );
      pMesh.name = `planet_${pData.id}`;
      planetHolder.add(pMesh);
      clickableMeshes.push(pMesh);

      let cloudMesh: THREE.Mesh | undefined;
      if (pData.id === 'earth') {
        cloudMesh = new THREE.Mesh(
          new THREE.SphereGeometry(pData.radius * 1.025, 36, 36),
          new THREE.MeshStandardMaterial({
            map: cloudsTex,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        planetHolder.add(cloudMesh);
      }

      let ringMesh: THREE.Mesh | undefined;
      if (pData.hasRing) {
        const innerR = pData.radius * 1.35;
        const outerR = pData.id === 'saturn' ? pData.radius * 2.3 : pData.radius * 1.75;
        const rGeo = new THREE.RingGeometry(innerR, outerR, 64);
        const pos = rGeo.attributes.position;
        const uvs = rGeo.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
          const v = new THREE.Vector3().fromBufferAttribute(pos, i);
          const d = (v.length() - innerR) / (outerR - innerR);
          uvs.setXY(i, d, 0.5);
        }
        ringMesh = new THREE.Mesh(
          rGeo,
          new THREE.MeshStandardMaterial({
            map: pData.id === 'saturn' ? saturnRingsTex : uranusTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: pData.id === 'saturn' ? 0.9 : 0.45,
            roughness: 0.5,
          })
        );
        ringMesh.rotation.x = Math.PI * 0.42;
        if (pData.id === 'uranus') {
          ringMesh.rotation.y = Math.PI * 0.48;
        }
        planetHolder.add(ringMesh);
      }

      // Build Moons for this Planet
      const moonsList: MoonRuntime[] = [];
      pData.moons.forEach((mData) => {
        const mOrbitGeo = new THREE.RingGeometry(mData.distance - 0.03, mData.distance + 0.03, 64);
        const mOrbitMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.22,
        });
        const mOrbitMesh = new THREE.Mesh(mOrbitGeo, mOrbitMat);
        mOrbitMesh.rotation.x = Math.PI / 2;
        planetHolder.add(mOrbitMesh);

        const mPivot = new THREE.Object3D();
        mPivot.rotation.y = Math.random() * Math.PI * 2;
        planetHolder.add(mPivot);

        let mTex = moonTex;
        if (mData.id === 'europa') mTex = europaTex;
        else if (mData.id === 'io') mTex = marsTex;

        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(mData.radius, 28, 28),
          new THREE.MeshStandardMaterial({
            map: mTex,
            color: new THREE.Color(mData.color),
            roughness: 0.75,
            metalness: 0.05,
          })
        );
        mMesh.position.set(mData.distance, 0, 0);
        mMesh.name = `moon_${pData.id}_${mData.id}`;
        mPivot.add(mMesh);
        clickableMeshes.push(mMesh);

        moonsList.push({
          id: mData.id,
          name: mData.name,
          pivot: mPivot,
          mesh: mMesh,
          orbitRing: mOrbitMesh,
          speed: mData.speed,
          radius: mData.radius,
        });
      });

      planetObjects[pData.id] = {
        id: pData.id,
        name: pData.name,
        pivot: planetPivot,
        planetHolder,
        mesh: pMesh,
        cloudMesh,
        ringMesh,
        orbitRing: orbitMesh,
        speed: pData.speed,
        radius: pData.radius,
        moons: moonsList,
      };
    });

    // 5. Rocket & Satellites Group (Available when in 'rockets' mode)
    const rocketGroup = new THREE.Group();
    rocketGroup.visible = false;
    scene.add(rocketGroup);

    const stage1Group = new THREE.Group();
    rocketGroup.add(stage1Group);
    const boosterMat = new THREE.MeshStandardMaterial({
      map: rocketMetalTex,
      metalness: 0.45,
      roughness: 0.25,
    });
    const boosterMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 4.5, 32), boosterMat);
    boosterMesh.position.y = 2.25;
    boosterMesh.name = 'First Stage LOX / RP-1 Booster Core';
    stage1Group.add(boosterMesh);

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x242830,
      metalness: 0.85,
      roughness: 0.15,
    });
    const stage2Group = new THREE.Group();
    rocketGroup.add(stage2Group);
    const s2Mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2.2, 32), boosterMat);
    s2Mesh.position.y = 6.5;
    s2Mesh.name = 'Second Stage Cryogenic Propellant Core';
    stage2Group.add(s2Mesh);

    const payloadGroup = new THREE.Group();
    rocketGroup.add(payloadGroup);
    const goldMat = new THREE.MeshStandardMaterial({
      map: goldFoilTex,
      metalness: 0.95,
      roughness: 0.15,
      color: 0xffd700,
    });
    const busMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.9, 8), goldMat);
    busMesh.position.y = 8.05;
    busMesh.name = 'Satellite Bus & Telemetry Core';
    payloadGroup.add(busMesh);

    const solarWingMat = new THREE.MeshStandardMaterial({
      map: solarPanelTex,
      metalness: 0.6,
      roughness: 0.25,
    });
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.04), solarWingMat);
    leftWing.position.set(-1.3, 8.05, 0);
    payloadGroup.add(leftWing);
    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.04), solarWingMat);
    rightWing.position.set(1.3, 8.05, 0);
    payloadGroup.add(rightWing);

    // Raycaster for 3D click selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: MouseEvent) => {
      const distMoved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (distMoved > 6) return; // Ignore drag gestures

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(clickableMeshes, false);
      if (intersects.length > 0) {
        const hitName = intersects[0].object.name;
        if (hitName === 'planet_sun') {
          sound.playBeep(620, 0.05);
          onSelectPlanet('sun');
          onSelectMoon(null);
        } else if (hitName.startsWith('planet_')) {
          const pId = hitName.replace('planet_', '');
          sound.playBeep(700, 0.05);
          onSelectPlanet(pId);
          onSelectMoon(null);
        } else if (hitName.startsWith('moon_')) {
          const parts = hitName.split('_');
          if (parts.length >= 3) {
            sound.playBeep(820, 0.05);
            onSelectPlanet(parts[1]);
            onSelectMoon(parts[2]);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Camera Tracking State
    const _targetWorldPos = new THREE.Vector3();
    const _desiredCamPos = new THREE.Vector3();
    let prevTargetKey = '';
    let isTransitioningCam = false;

    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const p = propsRef.current;

      // FPS & Telemetry callback
      frameCount++;
      if (now - fpsTimer >= 500) {
        const currentFps = Math.round((frameCount * 1000) / (now - fpsTimer));
        frameCount = 0;
        fpsTimer = now;
        if (onUpdateTelemetry) {
          const coords = `X:${camera.position.x.toFixed(1)} Y:${camera.position.y.toFixed(1)} Z:${camera.position.z.toFixed(1)}`;
          onUpdateTelemetry(coords, '29.78 km/s', currentFps);
        }
      }

      solarSystemGroup.visible = p.currentSection === 'planets';
      rocketGroup.visible = p.currentSection === 'rockets';

      if (p.currentSection === 'planets') {
        sunMesh.rotation.y += 0.002 * p.timeSpeed;

        // Update all planets & moons
        Object.values(planetObjects).forEach((pObj) => {
          pObj.pivot.rotation.y += pObj.speed * 0.25 * p.timeSpeed;
          pObj.mesh.rotation.y += 0.012 * p.timeSpeed;
          if (pObj.cloudMesh) {
            pObj.cloudMesh.rotation.y += 0.016 * p.timeSpeed;
          }
          pObj.orbitRing.visible = p.showOrbits;
          (pObj.mesh.material as THREE.MeshStandardMaterial).wireframe = p.isWireframe;

          pObj.moons.forEach((mObj) => {
            mObj.pivot.rotation.y += mObj.speed * 0.45 * p.timeSpeed;
            mObj.mesh.rotation.y += 0.015 * p.timeSpeed;
            mObj.orbitRing.visible = p.showOrbits;
            (mObj.mesh.material as THREE.MeshStandardMaterial).wireframe = p.isWireframe;
          });
        });

        // Determine active 3D target (Sun, Planet, or Moon)
        const currentKey = `${p.selectedPlanetId}_${p.selectedMoonId || 'none'}`;
        if (currentKey !== prevTargetKey) {
          prevTargetKey = currentKey;
          isTransitioningCam = true;
        }

        let focusRadius = 6.5;
        if (p.selectedPlanetId === 'sun' || !planetObjects[p.selectedPlanetId]) {
          _targetWorldPos.set(0, 0, 0);
          focusRadius = 22;
        } else {
          const pObj = planetObjects[p.selectedPlanetId];
          if (p.selectedMoonId) {
            const mObj = pObj.moons.find((m) => m.id === p.selectedMoonId);
            if (mObj) {
              mObj.mesh.getWorldPosition(_targetWorldPos);
              focusRadius = Math.max(mObj.radius * 4.5, 1.8);
            } else {
              pObj.mesh.getWorldPosition(_targetWorldPos);
              focusRadius = pObj.radius * 3.8;
            }
          } else {
            pObj.mesh.getWorldPosition(_targetWorldPos);
            focusRadius = pObj.radius * 3.8;
          }
        }

        // Smoothly follow moving target center
        const targetDelta = _targetWorldPos.clone().sub(controls.target);
        controls.target.lerp(_targetWorldPos, 0.12);
        camera.position.add(targetDelta.multiplyScalar(0.12));

        // When user switches target, smoothly zoom camera to optimal viewing distance
        if (isTransitioningCam) {
          if (p.selectedPlanetId === 'sun') {
            _desiredCamPos.set(0, 55, 130);
          } else {
            _desiredCamPos.set(
              _targetWorldPos.x + focusRadius * 0.8,
              _targetWorldPos.y + focusRadius * 0.65,
              _targetWorldPos.z + focusRadius * 1.8
            );
          }
          camera.position.lerp(_desiredCamPos, 0.08);
          if (camera.position.distanceTo(_desiredCamPos) < 0.8) {
            isTransitioningCam = false;
          }
        }
      } else {
        // Rocket mode animation
        rocketGroup.rotation.y += 0.3 * delta * p.timeSpeed;
        stage1Group.position.y = THREE.MathUtils.damp(
          stage1Group.position.y,
          p.isExploded || p.rocketStageStep >= 1 ? -3.2 : 0,
          4,
          delta
        );
        payloadGroup.position.y = THREE.MathUtils.damp(
          payloadGroup.position.y,
          p.isExploded || p.rocketStageStep >= 3 ? 2.0 : 0,
          4,
          delta
        );
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    renderer.compile(scene, camera);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} id="canvas-container" className="absolute inset-0 z-1 w-full h-full" />;
};
