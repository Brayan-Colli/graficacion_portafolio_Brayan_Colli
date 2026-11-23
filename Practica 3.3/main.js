import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
// crear escena 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//crear camara Angulo de perpectiva, relacion de aspecto, plano cercano y plano lejano
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 12);

//crear renderizador
const renderizador = new THREE.WebGLRenderer({ canvas, antialias: true }); 
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap;

//Luz ambiental
const luzAmb = new THREE.AmbientLight(0xffffff, 0.4);
escene.add(luzAmb);

const luzSol = new THREE.DirectionalLight(0xffffff, 0.8);
luzSol.position.set(5, 10, 7);
luzSol.castShadow = true;
luzSol.shadow.mapSize.width = 2048;
luzSol.shadow.mapSize.height = 2048;
luzSol.shadow.bias = -0.001;
scene.add(luzSol);
