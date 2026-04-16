import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text, Billboard } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

// Curated skills (16 total)
const skillsData = [
  // Backend & Systems (5)
  { name: "Kafka", category: "Backend", position: [-6, 6, 0] },
  { name: "Microservices", category: "Backend", position: [-2, 8, 0] },
  { name: "SAGA", category: "Backend", position: [2, 8, 0] },
  { name: "REST APIs", category: "Backend", position: [6, 6, 0] },
  { name: "Distributed Sys", category: "Backend", position: [8, 0, 0] },

  // AI / ML (4)
  { name: "RAG", category: "AI/ML", position: [-6, -6, 0] },
  { name: "LLM Integration", category: "AI/ML", position: [-2, -8, 0] },
  { name: "FAISS", category: "AI/ML", position: [2, -8, 0] },
  { name: "OpenAI APIs", category: "AI/ML", position: [6, -6, 0] },

  // Frameworks (3)
  { name: "Spring Boot", category: "Frameworks", position: [-4, 0, 0] },
  { name: "React.js", category: "Frameworks", position: [0, -3, 0] },
  { name: "FastAPI", category: "Frameworks", position: [4, 0, 0] },

  // DevOps (2)
  { name: "Docker", category: "DevOps", position: [-3, 3, 0] },
  { name: "CI/CD", category: "DevOps", position: [3, 3, 0] },

  // Languages (2)
  { name: "Python", category: "Languages", position: [-2, -2, 0] },
  { name: "Java", category: "Languages", position: [2, -2, 0] },
];

type SkillBallProps = {
  skill: (typeof skillsData)[0];
  index: number;
  isHovered: boolean;
  isHoverState: boolean;
};

function SkillBall({ skill, index, isHovered, isHoverState }: SkillBallProps) {
  const ref = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  // Random idle positions for initial state
  const idlePosition = useMemo(() => {
    const angle = (index / skillsData.length) * Math.PI * 2;
    const radius = 12 + Math.sin(index) * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius + Math.sin(index * 0.7) * 2,
      Math.cos(index * 0.3) * 3,
    ] as [number, number, number];
  }, [index]);

  useFrame((_state, delta) => {
    if (!ref.current || !meshRef.current) return;

    const currentPos = ref.current.translation();

    // Target position based on state
    const targetPos = isHoverState ? skill.position : idlePosition;

    // Smooth lerp movement
    const speed = isHoverState ? 0.15 : 0.08;
    const newPos = {
      x: currentPos.x + (targetPos[0] - currentPos.x) * speed,
      y: currentPos.y + (targetPos[1] - currentPos.y) * speed,
      z: currentPos.z + (targetPos[2] - currentPos.z) * speed,
    };
    ref.current.setTranslation(newPos, true);

    // Idle rotation - very subtle
    if (!isHoverState) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.1;
    }

    // Hover scale effect - subtle
    const targetScale = isHovered ? 1.15 : 1;
    setScale((prev) => prev + (targetScale - prev) * 0.12);
    meshRef.current.scale.set(scale, scale, scale);
  });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f5f5f5",
        emissive: "#ffffff",
        emissiveIntensity: isHovered ? 0.4 : 0.15,
        metalness: 0.15,
        roughness: 0.3,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        transparent: true,
        opacity: 0.95,
        ior: 1.5,
      }),
    [isHovered]
  );

  return (
    <RigidBody
      position={idlePosition}
      ref={ref}
      colliders={false}
      type="dynamic"
      linearDamping={1.5}
      angularDamping={1.5}
    >
      <BallCollider args={[0.75]} />
      <mesh
        ref={meshRef}
        geometry={new THREE.SphereGeometry(0.75, 32, 32)}
        material={material}
      >
        <Billboard>
          <Text
            ref={textRef}
            position={[0, 0, 0.85]}
            fontSize={0.28}
            color="#1a1a1a"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.6}
            textAlign="center"
            fontWeight="bold"
            letterSpacing={-0.01}
          >
            {skill.name}
          </Text>
        </Billboard>
      </mesh>
    </RigidBody>
  );
}

const TechStack = () => {
  const [isHoverState, setIsHoverState] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsHoverState(true);
    const handleMouseLeave = () => {
      setIsHoverState(false);
      setHoveredIndex(null);
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="techstack" id="techstack-section" ref={containerRef}>
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 25], fov: 50, near: 0.1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
        className="tech-canvas"
      >
        {/* Ambient light - soft base illumination */}
        <ambientLight intensity={0.5} color="#ffffff" />

        {/* Main directional light */}
        <directionalLight
          position={[15, 15, 20]}
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />

        {/* Fill light */}
        <directionalLight
          position={[-15, -15, 10]}
          intensity={0.4}
          color="#e0e8ff"
        />

        {/* Subtle accent lights for depth */}
        <pointLight position={[20, 10, 15]} intensity={0.25} color="#ffffff" />
        <pointLight position={[-20, -10, 15]} intensity={0.2} color="#f0f4ff" />

        <Physics gravity={[0, 0, 0]}>
          {skillsData.map((skill, idx) => (
            <group
              key={idx}
              onPointerEnter={() => setHoveredIndex(idx)}
              onPointerLeave={() => setHoveredIndex(null)}
            >
              <SkillBall
                skill={skill}
                index={idx}
                isHovered={hoveredIndex === idx}
                isHoverState={isHoverState}
              />
            </group>
          ))}
        </Physics>

        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.2}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={1.2} intensity={0.5} />
        </EffectComposer>
      </Canvas>

      <div className="techstack-info">
        <p>Hover to organize skills</p>
      </div>
    </div>
  );
};

export default TechStack;
