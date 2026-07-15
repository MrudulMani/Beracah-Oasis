import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SpineCanvasProps {
  onHoverRegion: (regionInfo: { name: string; description: string; symptoms: string; treatment: string } | null) => void;
}

const REGION_INFO = {
  cervical: {
    name: 'Cervical Spine (Neck - C1 to C7)',
    description: 'Supports the head and facilitates neck rotation, flexion, and extension. Highly flexible and susceptible to strain from modern screen habits.',
    symptoms: 'Neck stiffness, tension headaches, radiating pain in shoulders/arms, numbness in hands (text neck).',
    treatment: 'Cervical mobilization, posture re-training, deep neck flexor strengthening, ergonomic desk alignment.'
  },
  thoracic: {
    name: 'Thoracic Spine (Mid-Back - T1 to T12)',
    description: 'Stabilizes the rib cage and protects vital chest organs. Offers high structural stability but has limited range of motion.',
    symptoms: 'Mid-back stiffness, shoulder blade pain, rib-joint dysfunction, breathing restrictions, posture collapse.',
    treatment: 'Thoracic extension mobilization, scapular stabilization exercises, foam rolling, chest opening stretches.'
  },
  lumbar: {
    name: 'Lumbar Spine (Lower Back - L1 to L5)',
    description: 'Carries the majority of body weight. The lumbar region provides power and flexibility for lifting, bending, and twisting.',
    symptoms: 'Dull ache in lower back, sharp spasms, sciatica (pain shooting down the leg), stiffness after sitting.',
    treatment: 'Core stabilization (McGill Big 3), lumbar decompression, lumbar mobility exercises, hamstring/hip flexor stretching.'
  },
  sacral: {
    name: 'Sacrum & Coccyx (Base - S1 to Coccyx)',
    description: 'The foundation of the spine, linking it to the pelvis. Transmits forces between the upper body and lower extremities.',
    symptoms: 'Pelvic floor pain, tailbone tenderness (coccydynia), sacroiliac (SI) joint instability, localized lower buttock pain.',
    treatment: 'Sacroiliac joint stabilization, gluteal strengthening, pelvic alignment checks, myofascial release.'
  }
};

export const SpineCanvas: React.FC<SpineCanvasProps> = ({ onHoverRegion }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background for glassmorphism layout

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 14);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0a142c, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    // Blue glow light from left
    const blueLight = new THREE.PointLight(0x0ea5e9, 12, 15);
    blueLight.position.set(-6, 2, 2);
    scene.add(blueLight);

    // Pink glow light from right
    const pinkLight = new THREE.PointLight(0xec4899, 12, 15);
    pinkLight.position.set(6, -2, 2);
    scene.add(pinkLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 6;
    controls.maxDistance = 25;
    controls.maxPolarAngle = Math.PI / 1.5; // Avoid turning upside down
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // 6. Procedural Spine Model
    const spineGroup = new THREE.Group();
    scene.add(spineGroup);

    // Geometries
    const vertGeoBody = new THREE.CylinderGeometry(0.85, 0.95, 0.45, 24);
    const vertGeoProcess = new THREE.BoxGeometry(0.3, 0.35, 0.95);
    const vertGeoTransverse = new THREE.BoxGeometry(1.6, 0.22, 0.35);
    const discGeo = new THREE.CylinderGeometry(0.78, 0.82, 0.18, 20);

    // Materials
    const boneMaterialDefault = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.75,
      metalness: 0.1,
    });

    const boneMaterialHover = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.2,
    });

    const cervicalDiscMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const thoracicDiscMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const lumbarDiscMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.9,
    });

    const sacralDiscMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8,
    });

    const vertebraeCount = 18;
    const vertebraeMeshes: THREE.Group[] = [];

    for (let i = 0; i < vertebraeCount; i++) {
      const vGroup = new THREE.Group();

      // Determine region
      let region = 'sacral';
      let discMat = sacralDiscMat;
      
      if (i > 13) {
        region = 'cervical';
        discMat = cervicalDiscMat;
      } else if (i > 5) {
        region = 'thoracic';
        discMat = thoracicDiscMat;
      } else if (i > 1) {
        region = 'lumbar';
        discMat = lumbarDiscMat;
      }

      // 1. Vertebra Bone Mesh
      const boneMesh = new THREE.Mesh(vertGeoBody, boneMaterialDefault.clone());
      boneMesh.castShadow = true;
      boneMesh.receiveShadow = true;
      vGroup.add(boneMesh);

      // Spinous process (back spike)
      const spMesh = new THREE.Mesh(vertGeoProcess, boneMaterialDefault.clone());
      spMesh.position.set(0, 0, -0.65);
      // Angle down slightly
      spMesh.rotation.x = 0.2;
      vGroup.add(spMesh);

      // Transverse processes (side wings)
      const tpMesh = new THREE.Mesh(vertGeoTransverse, boneMaterialDefault.clone());
      tpMesh.position.set(0, 0, -0.15);
      vGroup.add(tpMesh);

      // Save metadata properties to group for selection lookup
      vGroup.userData = { region, index: i };
      
      // Calculate coordinates along S-curve
      // Human spine curved: Cervical curves forward, Thoracic curves back, Lumbar curves forward.
      const factor = (i / vertebraeCount) * Math.PI * 2.2;
      const zOffset = Math.sin(factor) * 0.45;
      const yPos = (i - vertebraeCount / 2) * 0.75;
      const xOffset = 0;

      vGroup.position.set(xOffset, yPos, zOffset);
      
      // Rotations along the curve
      vGroup.rotation.x = -Math.cos(factor) * 0.15;
      
      spineGroup.add(vGroup);
      vertebraeMeshes.push(vGroup);

      // 2. Intervertebral Disc Mesh (below each vertebra except the first one)
      if (i > 0) {
        const discMesh = new THREE.Mesh(discGeo, discMat);
        // Disc placed halfway between this and previous vertebra
        const prevGroup = vertebraeMeshes[i - 1];
        discMesh.position.set(
          (vGroup.position.x + prevGroup.position.x) / 2,
          (vGroup.position.y + prevGroup.position.y) / 2 - 0.05,
          (vGroup.position.z + prevGroup.position.z) / 2
        );
        discMesh.rotation.x = (vGroup.rotation.x + prevGroup.rotation.x) / 2;
        spineGroup.add(discMesh);
      }
    }

    // Shift spine down slightly to center it
    spineGroup.position.y = -0.5;

    // 7. Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedVertebra = (event: MouseEvent) => {
      if (!mountRef.current) return null;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      
      // Search all children recursively inside vertebrae groups
      const allObjectsToTest: THREE.Object3D[] = [];
      vertebraeMeshes.forEach(vGroup => {
        vGroup.children.forEach(child => {
          allObjectsToTest.push(child);
        });
      });

      const intersects = raycaster.intersectObjects(allObjectsToTest);
      if (intersects.length > 0) {
        // Return parent group of the intersected bone component
        return intersects[0].object.parent;
      }
      return null;
    };

    let lastHoveredGroup: THREE.Object3D | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const hoveredGroup = getIntersectedVertebra(event);

      if (hoveredGroup) {
        if (lastHoveredGroup !== hoveredGroup) {
          // Reset last hovered group
          if (lastHoveredGroup) {
            lastHoveredGroup.children.forEach(child => {
              const mesh = child as THREE.Mesh;
              if (mesh.material && !(mesh.material instanceof Array)) {
                (mesh.material as THREE.MeshStandardMaterial).color.setHex(0xe5e7eb);
                (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
              }
            });
          }

          // Highlight new hovered group
          hoveredGroup.children.forEach(child => {
            const mesh = child as THREE.Mesh;
            if (mesh.material && !(mesh.material instanceof Array)) {
              (mesh.material as THREE.MeshStandardMaterial).color.setHex(0xffffff);
              
              const region = hoveredGroup.userData.region;
              let highlightColor = 0xec4899; // default pink
              if (region === 'cervical') highlightColor = 0x0ea5e9;
              else if (region === 'thoracic') highlightColor = 0x8b5cf6;
              
              (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(highlightColor);
              (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
            }
          });

          lastHoveredGroup = hoveredGroup;

          // Dispatch hover info
          const rKey = hoveredGroup.userData.region as keyof typeof REGION_INFO;
          onHoverRegion(REGION_INFO[rKey]);
        }
      } else {
        // Reset if hover nothing
        if (lastHoveredGroup) {
          lastHoveredGroup.children.forEach(child => {
            const mesh = child as THREE.Mesh;
            if (mesh.material && !(mesh.material instanceof Array)) {
              (mesh.material as THREE.MeshStandardMaterial).color.setHex(0xe5e7eb);
              (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
            }
          });
          lastHoveredGroup = null;
          onHoverRegion(null);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 500;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      
      // Dispose resources
      vertGeoBody.dispose();
      vertGeoProcess.dispose();
      vertGeoTransverse.dispose();
      discGeo.dispose();
      boneMaterialDefault.dispose();
      boneMaterialHover.dispose();
      cervicalDiscMat.dispose();
      thoracicDiscMat.dispose();
      lumbarDiscMat.dispose();
      sacralDiscMat.dispose();
    };
  }, [onHoverRegion]);

  return (
    <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
      {/* 3D Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ minHeight: '450px' }} />
      
      {/* Interactive Helper Prompt */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#090f1e]/90 border border-white/10 px-4 py-2 rounded-full text-xs text-slate-400 pointer-events-none select-none backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
        Drag to rotate. Hover vertebrae segments to diagnose.
      </div>
    </div>
  );
};

export default SpineCanvas;
