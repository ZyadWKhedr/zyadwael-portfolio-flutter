import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BreathDearMedusae-inspired particle background.
 * Source: https://github.com/Hinarosha/BreathDearMedusae
 * Adapted to the portfolio's dark "Flutter spirit" palette
 * (flutter-blue / flutter-light-blue / flutter-teal / flutter-purple).
 */
const Particles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const countX = 90;
  const countY = 50;
  const count = countX * countY;

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    [],
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vSize;
          varying vec2 vPos;

          attribute vec3 aOffset;
          attribute float aRandom;

          float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
          float noise(vec2 p){
            vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
            float a=hash(i); float b=hash(i+vec2(1.0,0.0));
            float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0));
            return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
          }
          mat2 rot(float a){ return mat2(cos(a),sin(a),-sin(a),cos(a)); }

          void main(){
            vUv = uv;
            vec3 pos = aOffset;

            float drift = uTime * 0.15;
            float dx = sin(drift + pos.y*0.5) + sin(drift*0.5 + pos.y*2.0);
            float dy = cos(drift + pos.x*0.5) + cos(drift*0.5 + pos.x*2.0);
            pos.x += dx * 0.25;
            pos.y += dy * 0.25;

            vec2 rel = pos.xy - uMouse;
            float distM = length(rel);
            float ang = atan(rel.y, rel.x);
            float shape = noise(vec2(ang*2.0, uTime*0.1));
            float breath = sin(uTime*0.8);
            float radius = 2.2 + breath*0.3 + shape*0.5;
            float rim = smoothstep(1.8, 0.0, abs(distM - radius));

            vec2 push = normalize(rel + vec2(0.0001, 0.0));
            float amt = (breath*0.5 + 0.5) * 0.5;
            pos.xy += push * amt * rim;
            pos.z  += rim * 0.3 * sin(uTime);

            float baseSize = 0.012 + sin(uTime + pos.x)*0.003;
            float scale = baseSize + rim * 0.055;
            float stretch = rim * 0.02;

            vec3 t = position;
            t.x *= (scale + stretch);
            t.y *= scale * 0.85;
            vSize = rim;
            vPos = pos.xy;

            t.xy = rot(ang) * t.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + t, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vSize;
          varying vec2 vPos;

          void main(){
            vec2 p = abs(vUv - 0.5) * 2.0;
            float d = pow(pow(p.x, 2.6) + pow(p.y, 2.6), 1.0/2.6);
            float alpha = 1.0 - smoothstep(0.8, 1.0, d);
            if (alpha < 0.01) discard;

            // Flutter palette: dark navy idle -> bright blue / teal / purple active
            vec3 idle   = vec3(0.04, 0.06, 0.15);
            vec3 cBlue  = vec3(0.075, 0.725, 0.992);  // #13B9FD light blue
            vec3 cTeal  = vec3(0.008, 0.827, 0.604);  // #02D39A teal
            vec3 cPurple= vec3(0.361, 0.420, 0.753);  // #5C6BC0 purple

            float t = uTime * 1.0;
            float p1 = sin(vPos.x * 0.6 + t);
            float p2 = sin(vPos.y * 0.6 + t * 0.8 + p1);

            vec3 active = mix(cBlue, cTeal, p1 * 0.5 + 0.5);
            active = mix(active, cPurple, p2 * 0.5 + 0.5);

            vec3 finalColor = mix(idle, active, smoothstep(0.1, 0.8, vSize));
            float finalAlpha = alpha * mix(0.25, 0.95, vSize);
            gl_FragColor = vec4(finalColor, finalAlpha);
          }
        `,
      }),
    [uniforms],
  );

  useEffect(() => {
    if (!meshRef.current) return;
    const offsets = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const angles = new Float32Array(count);
    const gridWidth = 40;
    const gridHeight = 22;
    const jitter = 0.25;
    let i = 0;
    for (let y = 0; y < countY; y++) {
      for (let x = 0; x < countX; x++) {
        const u = x / (countX - 1);
        const v = y / (countY - 1);
        let px = (u - 0.5) * gridWidth + (Math.random() - 0.5) * jitter;
        let py = (v - 0.5) * gridHeight + (Math.random() - 0.5) * jitter;
        offsets[i * 3] = px;
        offsets[i * 3 + 1] = py;
        offsets[i * 3 + 2] = 0;
        randoms[i] = Math.random();
        angles[i] = Math.random() * Math.PI * 2;
        i++;
      }
    }
    meshRef.current.geometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    meshRef.current.geometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
    meshRef.current.geometry.setAttribute('aAngleOffset', new THREE.InstancedBufferAttribute(angles, 1));
  }, [count, countX, countY]);

  const hovering = useRef(true);
  useEffect(() => {
    const leave = () => (hovering.current = false);
    const enter = () => (hovering.current = true);
    document.body.addEventListener('mouseleave', leave);
    document.body.addEventListener('mouseenter', enter);
    return () => {
      document.body.removeEventListener('mouseleave', leave);
      document.body.removeEventListener('mouseenter', enter);
    };
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    material.uniforms.uTime.value = clock.getElapsedTime();
    let tx = 0;
    let ty = 0;
    if (hovering.current) {
      tx = (pointer.x * viewport.width) / 2;
      ty = (pointer.y * viewport.height) / 2;
    }
    const cur = material.uniforms.uMouse.value as THREE.Vector2;
    const drag = 0.055;
    cur.x += (tx - cur.x) * drag;
    cur.y += (ty - cur.y) * drag;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

const MedusaeBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0A0E27 0%, #050818 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default MedusaeBackground;
