import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//sets up scene
const scene = new THREE.Scene();

//sets up camera with field of view, aspect ratio, view frustum details
const camera = new THREE.PerspectiveCamera(75, window.innerHeight/window.innerHeight,0.1,1000);

//sets up renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//sets pixel ratio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
//sets camera posistion (Moves it from the middle of the scene)
camera.position.setZ(30);

renderer.render(scene, camera);

//adding object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100 );
//sets the looks of the object
const material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe:true});
//creates object
const torus = new THREE.Mesh(geometry, material);
//adds to the scene
scene.add(torus);

//emits light like light bulb
const pointlight = new THREE.PointLight(0xffffff);
//sets position
pointlight.position.set(5, 5, 5);

//emits light
const ambientlight = new THREE.AmbientLight(0xffffff);


//adds lights
scene.add(pointlight, ambientlight);

//adds wireframe around the pointlight
const LightHelper = new THREE.PointLightHelper(pointlight);
//adds grid helper
const GridHelper = new THREE.GridHelper(200,50);
//adds helpers
scene.add(LightHelper, GridHelper);

//allows user to interact with mouse
const controls = new OrbitControls(camera, renderer.domElement);


function animate(){
  //recusive loop
  requestAnimationFrame(animate);
  
  //torus rotations
  torus.rotation.x +=0.01;
  torus.rotation.y +=0.01;
  torus.rotation.z +=0.01;
  //updates conroles
  controls.update();
  //renders everything
  renderer.render(scene, camera);
}

animate();

