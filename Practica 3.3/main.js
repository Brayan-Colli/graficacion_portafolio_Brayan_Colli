import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');

// crear escena 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// crear camara
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 12);

// crear renderizador
const renderizador = new THREE.WebGLRenderer({ canvas, antialias: true }); 
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap;

// Luz ambiental
const luzAmb = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(luzAmb);

const luzSol = new THREE.DirectionalLight(0xffffff, 0.8);
luzSol.position.set(5, 10, 7);
luzSol.castShadow = true;
luzSol.shadow.mapSize.width = 2048;
luzSol.shadow.mapSize.height = 2048;
luzSol.shadow.bias = -0.001;
scene.add(luzSol);

// --- TUS OBJETOS ---

// Piso
const piso = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: 0x8a9ba8 })
);
piso.rotation.x = -Math.PI / 2;
piso.receiveShadow = true;
scene.add(piso);

// Cubo blanco
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
cubo.position.set(0, 1, 0);
cubo.castShadow = true;
cubo.receiveShadow = true;
scene.add(cubo);

// Esfera roja (tu sol)
const sol = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
sol.position.set(0, 4, -3);
sol.castShadow = true;
scene.add(sol);

// Controles para mover con el mouse
const controls = new OrbitControls(camera, renderizador.domElement);
controls.enableDamping = true;

// Animacion
function animate() {
  requestAnimationFrame(animate);
  cubo.rotation.y += 0.01;
  sol.rotation.y += 0.01;
  controls.update();
  renderizador.render(scene, camera);
}
animate();

// Que no se deforme al cambiar tamaño
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
});
