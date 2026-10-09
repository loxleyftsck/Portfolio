import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface HeroSceneProps {
  paused: boolean;
  form: 'chrome' | 'network';
}

/** Owns its WebGL resources and animation loop, independently of UI motion. */
export default function HeroScene({ paused, form }: HeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const formRef = useRef(form);
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      // The sibling artwork remains visible when WebGL is unavailable.
      return;
    }
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 8.5);
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const chrome = new THREE.MeshStandardMaterial({
      color: 0xc8cbd0, metalness: 1, roughness: 0.15, envMapIntensity: 2.2, transparent: true,
    });
    const orange = new THREE.MeshStandardMaterial({
      color: 0xff7439, emissive: 0xff4818, emissiveIntensity: 0.65, metalness: 0.4, roughness: 0.3,
    });
    const sculpture = new THREE.Group();
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.03, 0.33, 200, 28, 2, 3), chrome);
    knot.rotation.set(0.2, 0.4, -0.25);
    sculpture.add(knot);
    scene.add(sculpture);

    const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.009, 6, 160), orange);
    orbit.rotation.set(1.12, 0.3, -0.4);
    scene.add(orbit);
    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.004, 5, 160),
      new THREE.MeshBasicMaterial({ color: 0x72777b, transparent: true, opacity: 0.32 }),
    );
    orbitTwo.rotation.set(0.8, -0.6, 0.4);
    scene.add(orbitTwo);

    const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 14), orange);
    scene.add(satellite);
    const satelliteTwo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 18), chrome);
    satelliteTwo.position.set(-1.7, 1.15, 0.6);
    sculpture.add(satelliteTwo);

    const nodeMaterial = chrome.clone();
    const network = new THREE.Group();
    const networkGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const networkEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(networkGeometry),
      new THREE.LineBasicMaterial({ color: 0xff7439, transparent: true, opacity: 0.7 }),
    );
    network.add(networkEdges);
    const uniquePositions = new Map<string, THREE.Vector3>();
    const positions = networkGeometry.getAttribute('position');
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      uniquePositions.set(v.toArray().map(n => n.toFixed(3)).join(','), v);
    }
    const nodes = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.075, 12, 8), nodeMaterial, uniquePositions.size,
    );
    let nodeIndex = 0;
    for (const position of uniquePositions.values()) {
      nodes.setMatrixAt(nodeIndex++, new THREE.Matrix4().makeTranslation(position.x, position.y, position.z));
    }
    nodes.instanceMatrix.needsUpdate = true;
    network.add(nodes);
    const networkCoreMaterial = orange.clone();
    network.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), networkCoreMaterial));
    scene.add(network);
    networkGeometry.dispose();
    const edgePositions = networkEdges.geometry.getAttribute('position');
    const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xff7439, transparent: true });
    const signals = new THREE.InstancedMesh(new THREE.SphereGeometry(0.048, 10, 6), signalMaterial, 12);
    const signalPaths = Array.from({ length: 12 }, (_, index) => {
      const edge = (index * 7 % (edgePositions.count / 2)) * 2;
      return [
        new THREE.Vector3().fromBufferAttribute(edgePositions, edge),
        new THREE.Vector3().fromBufferAttribute(edgePositions, edge + 1),
      ];
    });
    const signalPoint = new THREE.Vector3();
    const signalMatrix = new THREE.Matrix4();
    network.add(signals);

    // Deterministic particles: identical composition across reloads.
    const particlePositions = new Float32Array(110 * 3);
    for (let i = 0; i < 110; i++) {
      const angle = i * 2.399963;
      const radius = 2.35 + (i % 17) / 17 * 1.4;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = Math.sin(angle) * radius * 0.8;
      particlePositions[i * 3 + 2] = Math.sin(i * 0.81) * 1.6 - 1;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry,
      new THREE.PointsMaterial({ color: 0xff9d70, size: 0.018, transparent: true, opacity: 0.7 }));
    scene.add(particles);
    const ambient = new THREE.HemisphereLight(0xffffff, 0x252528, 2.2);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff7439, 2.5);
    rim.position.set(3, -2, 1);
    scene.add(rim);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let blend = formRef.current === 'network' ? 1 : 0;
    let lastForm = formRef.current;
    const edgeMaterial = networkEdges.material as THREE.LineBasicMaterial;
    const particleMaterial = particles.material as THREE.PointsMaterial;
    networkCoreMaterial.transparent = true;
    const applyTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      renderer.toneMappingExposure = dark ? 1.35 : 0.95;
      chrome.color.setHex(dark ? 0xc8cbd0 : 0x687582);
      nodeMaterial.color.copy(chrome.color);
      ambient.intensity = dark ? 2.2 : 1.4;
      key.intensity = dark ? 5 : 3;
      rim.intensity = dark ? 2.5 : 1.4;
      edgeMaterial.color.setHex(dark ? 0xff864d : 0xb93d08);
      signalMaterial.color.setHex(dark ? 0xff9d70 : 0xb93d08);
      signalMaterial.depthWrite = false;
      orange.color.setHex(dark ? 0xff7439 : 0xb93d08);
      orange.emissiveIntensity = dark ? 0.65 : 0.2;
      particleMaterial.color.setHex(dark ? 0xff9d70 : 0xb93d08);
      particleMaterial.opacity = dark ? 0.7 : 0.5;
    };
    applyTheme();
    let visible = true;
    let contextLost = false;
    let frame = 0;
    let time = 0;
    let lastFrame = 0;
    const draw = () => {
      sculpture.visible = blend < 0.999;
      network.visible = blend > 0.001;
      chrome.opacity = 1 - blend;
      chrome.depthWrite = blend < 0.01;
      nodeMaterial.opacity = blend;
      nodeMaterial.depthWrite = blend > 0.99;
      networkCoreMaterial.opacity = blend;
      networkCoreMaterial.depthWrite = blend > 0.99;
      edgeMaterial.opacity = 0.7 * blend;
      signalMaterial.opacity = blend;
      sculpture.scale.setScalar(1 - blend * 0.12);
      network.scale.setScalar(0.88 + blend * 0.12);
      for (let index = 0; index < signalPaths.length; index++) {
        const [start, end] = signalPaths[index];
        const progress = (time * 0.35 + index / signalPaths.length) % 1;
        signalPoint.lerpVectors(start, end, progress);
        signals.setMatrixAt(index, signalMatrix.makeTranslation(signalPoint.x, signalPoint.y, signalPoint.z));
      }
      signals.instanceMatrix.needsUpdate = true;
      sculpture.rotation.y = time * 0.16 + pointer.x * 0.25;
      sculpture.rotation.x = Math.sin(time * 0.2) * 0.14 - pointer.y * 0.18;
      network.rotation.set(time * 0.1 - pointer.y * 0.15, time * 0.18 + pointer.x * 0.2, 0.1);
      orbit.rotation.z = -0.4 + time * 0.08;
      satellite.position.set(Math.cos(time * 0.45) * 1.98, Math.sin(time * 0.45) * 0.8, 0.6);
      particles.rotation.z = time * 0.015;
      renderer.render(scene, camera);
      host.dataset.ready = 'true';
    };
    const canAnimate = () => visible && !document.hidden && !pausedRef.current && !reducedMotion.matches && !contextLost;
    const tick = (timestamp: number) => {
      frame = 0;
      if (!canAnimate()) return;
      // Cap updates at 30fps; no work is scheduled offscreen or while paused.
      if (timestamp - lastFrame >= 1000 / 30) {
        const delta = Math.min((timestamp - lastFrame) / 1000, 0.1);
        time += delta;
        pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 5));
        const targetBlend = formRef.current === 'network' ? 1 : 0;
        blend = THREE.MathUtils.lerp(blend, targetBlend, 1 - Math.exp(-delta * 7));
        if (Math.abs(blend - targetBlend) < 0.001) blend = targetBlend;
        lastFrame = timestamp;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!canAnimate() && (formRef.current !== lastForm || reducedMotion.matches)) {
        blend = formRef.current === 'network' ? 1 : 0;
      }
      if (reducedMotion.matches) {
        pointer.set(0, 0);
        pointerTarget.set(0, 0);
      }
      lastForm = formRef.current;
      if (!contextLost && visible && !document.hidden) draw();
      if (canAnimate()) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    syncRef.current = sync;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 600 ? 1.25 : 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 440 ? 9.8 : 8.5;
      camera.updateProjectionMatrix();
      sync();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (pausedRef.current || reducedMotion.matches || event.pointerType === 'touch') return;
      const bounds = host.getBoundingClientRect();
      pointerTarget.set((event.clientX - bounds.left) / bounds.width * 2 - 1,
        (event.clientY - bounds.top) / bounds.height * 2 - 1);
    };
    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      delete host.dataset.ready;
    };
    const onContextRestored = () => { contextLost = false; resize(); };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(host);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    const themeObserver = new MutationObserver(() => { applyTheme(); sync(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    resize();

    return () => {
      themeObserver.disconnect();
      cancelAnimationFrame(frame);
      syncRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      nodes.dispose();
      signals.dispose();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      delete host.dataset.ready;
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  useEffect(() => {
    formRef.current = form;
    syncRef.current?.();
  }, [form]);

  return (
    <div className="scene-container" aria-hidden="true">
      <div className="scene-host" ref={hostRef} />
      <img className="scene-fallback" src={form === 'network' ? '/art/network.svg' : '/art/chrome.webp'} alt="" width="1280" height="853" />
    </div>
  );
}
