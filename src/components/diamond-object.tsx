"use client";

import {
  Suspense,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

type DragRefs = {
  manual: RefObject<{ x: number; y: number }>;
  vel: RefObject<{ x: number; y: number }>;
  dragging: RefObject<boolean>;
};

/**
 * Echtes 3D-Objekt aus dem Consilanto-Logo: Diamant-Kontur wird extrudiert,
 * matt-metallisch gerendert, per Scroll rotiert UND per Maus-Drag drehbar.
 */
function DiamondMesh({
  rotationRef,
  manual,
  vel,
  dragging,
}: { rotationRef: RefObject<number> } & DragRefs) {
  const data = useLoader(SVGLoader, "/img/logo-icon.svg");
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    data.paths.forEach((path) => {
      // createShapes respektiert die Löcher des Logos → NUR die Linien
      // werden Körper, die Flächen dazwischen bleiben Luft.
      SVGLoader.createShapes(path).forEach((s) => shapes.push(s));
    });
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1.6,
      bevelSize: 1,
      bevelSegments: 3,
    });
    geo.center();
    geo.scale(1, -1, 1); // SVG-Y zeigt nach unten
    geo.computeVertexNormals();
    return geo;
  }, [data]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const p = rotationRef.current ?? 0;

    // Inertia/Nachlauf, wenn nicht gezogen wird
    if (!dragging.current) {
      manual.current.x += vel.current.x;
      manual.current.y += vel.current.y;
      vel.current.x *= 0.92;
      vel.current.y *= 0.92;
    }
    manual.current.x = clamp(manual.current.x, -1.3, 1.3);

    const targetY = -0.6 + p * 6.0 + manual.current.y; // Scroll + Drag
    const targetX = 0.18 + manual.current.x;
    const k = Math.min(1, delta * 6);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.rotation.z = -0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} scale={0.04}>
        {/* MATERIAL — gleichmäßiges, mattes Grau, damit die Balken als
            SOLIDE Masse lesen (nicht als spiegelnd-dunkle, durchsichtig
            wirkende Flächen). */}
        <meshStandardMaterial
          color="#aaaab0"
          metalness={0.45}
          roughness={0.5}
          envMapIntensity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function DiamondObject({
  rotationRef,
}: {
  rotationRef: RefObject<number>;
}) {
  const manual = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // Touch → Seite scrollen lassen
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    vel.current = { x: 0, y: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = (e.clientX - last.current.x) * 0.01;
    const dy = (e.clientY - last.current.y) * 0.01;
    last.current = { x: e.clientX, y: e.clientY };
    manual.current.y += dx;
    manual.current.x += dy;
    vel.current = { x: dy, y: dx };
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 32 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 6]} intensity={1.8} />
        <directionalLight position={[-6, -3, -4]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[0, -6, 4]} intensity={0.6} color="#ffffff" />
        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <color attach="background" args={["#0a0a0a"]} />
            <Lightformer
              position={[0, 0, 6]}
              scale={[10, 10, 1]}
              intensity={1.6}
              color="#ffffff"
            />
            <Lightformer
              position={[5, 4, 2]}
              scale={[4, 8, 1]}
              intensity={2.2}
              color="#ffffff"
            />
            <Lightformer
              position={[-5, -2, 3]}
              scale={[6, 6, 1]}
              intensity={1.2}
              color="#ffffff"
            />
          </Environment>
          <DiamondMesh
            rotationRef={rotationRef}
            manual={manual}
            vel={vel}
            dragging={dragging}
          />
        </Suspense>
      </Canvas>

      {/* Transparentes Overlay greift das Maus-Ziehen sicher ab */}
      <div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />
    </div>
  );
}
