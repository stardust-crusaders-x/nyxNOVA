// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Import dat.GUI
import * as dat from 'https://cdn.skypack.dev/dat.gui';

// Import RGBELoader for loading HDRI
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/RGBELoader.js';

// Import OrthographicCamera for minimap
import { OrthographicCamera } from 'https://cdn.skypack.dev/three@0.129.0/src/cameras/OrthographicCamera.js';

// Import CSS2DRenderer for labels
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS2DRenderer.js';

// Constants
const CAMERA_FOV = 55;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 12000;
const RENDERER_ALPHA = true;
const LIGHT_COLOR = 0xffffff;
const LIGHT_INTENSITY = 1;
const AMBIENT_LIGHT_INTENSITY = 0.3;

// Refined constants for camera behavior
const CAMERA_HEIGHT = 5;
const GRAVITY_STRENGTH = 0;
const COLLISION_PADDING = 2;
const MAX_SLOPE = Math.PI / 3;

// Refined variables for camera shake
const SHAKE_INTENSITY = 1;
const SHAKE_DECAY = 0.95;
const SHAKE_THRESHOLD_SPEED = 5;

// New constants for smooth movement
const SMOOTHING_FACTOR = 0.15;
const ROTATION_SMOOTHING = 0.1;



// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR, CAMERA_FAR);

// Set initial camera position
camera.position.set(1799, 5500, 5000);

// Create dat.GUI
const gui = new dat.GUI();

// Create an object to store camera position
const cameraPosition = {
  x: 0,
  y: 5500,
  z: 5000
};

// Add camera position controls to dat.GUI
const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(cameraPosition, 'x', -5000, 5000).onChange(updateCameraPosition);
cameraFolder.add(cameraPosition, 'y', 100, 10000).onChange(updateCameraPosition);
cameraFolder.add(cameraPosition, 'z', -5000, 5000).onChange(updateCameraPosition);
cameraFolder.open();

// Function to update camera position
function updateCameraPosition() {
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
}

// Keep the 3D object on a global variable so we can access it later
let object;

// Set which object folder to render
let objToRender = 'my_glb_model';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the rover model and place it on top of the ground plane
loader.load(
  `models/${objToRender}/moon_try_1.glb`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(1000, 1000, 1000);
    object.position.set(0, 0, 0);

    // Adjust material properties
    object.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 500;
        child.material.metalness = 0;
        child.material.envMapIntensity = 1;
      }
    });

    scene.add(object);

    // Add random rocks after the moon model is loaded
    addRandomRocks();

    // Position camera on the surface after the model is loaded
    positionCameraOnSurface();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Function to add random rocks
function addRandomRocks() {
  const rockGeometry = new THREE.IcosahedronGeometry(1, 0);
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.2,
    envMapIntensity: 1
  });

  const numRocks = 1000;
  const moonRadius = 1000;

  for (let i = 0; i < numRocks; i++) {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    
    // Random position on a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = moonRadius * Math.sin(phi) * Math.cos(theta);
    const y = moonRadius * Math.sin(phi) * Math.sin(theta);
    const z = moonRadius * Math.cos(phi);

    rock.position.set(x, y, z);

    // Random rotation
    rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    // Random scale (adjusted to be smaller)
    const scale = Math.random() * 10 + 1;
    rock.scale.set(scale, scale, scale);

    scene.add(rock);
    console.log(`Added rock ${i} at position (${x}, ${y}, ${z}) with scale ${scale}`);
  }
}

// Function to position camera on the surface
function positionCameraOnSurface() {
  const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 5500, 5000), new THREE.Vector3(0, -1, 0));
  const intersects = raycaster.intersectObject(object, true);

  if (intersects.length > 0) {
    const groundPoint = intersects[0].point;
    const groundNormal = intersects[0].face.normal.clone().applyQuaternion(intersects[0].object.quaternion);
    camera.position.copy(groundPoint.clone().add(groundNormal.multiplyScalar(CAMERA_HEIGHT)));
    camera.lookAt(groundPoint.clone().add(groundNormal));

    // Update GUI values
    cameraPosition.x = camera.position.x;
    cameraPosition.y = camera.position.y;
    cameraPosition.z = camera.position.z;

    // Update GUI controllers
    for (let i in cameraFolder.__controllers) {
      cameraFolder.__controllers[i].updateDisplay();
    }
  }
}

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: RENDERER_ALPHA });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// Add the renderer to the DOM
const container = document.getElementById("container3D");
if (container) {
  container.appendChild(renderer.domElement);
} else {
  console.error("Container element not found");
}

// Minimap setup
const minimapSize = 200;
const minimapAspect = 1;
const minimapCamera = new OrthographicCamera(
  minimapSize * minimapAspect / -2,
  minimapSize * minimapAspect / 2,
  minimapSize / 2,
  minimapSize / -2,
  1,
  1000
);
minimapCamera.position.set(0, 500, 0);
minimapCamera.lookAt(0, 0, 0);

const minimapRenderer = new THREE.WebGLRenderer({ alpha: true });
minimapRenderer.setSize(minimapSize, minimapSize);
const minimapContainer = document.getElementById('minimap');
if (minimapContainer) {
  minimapContainer.appendChild(minimapRenderer.domElement);
} else {
  console.error("Minimap container not found");
}

// Create a camera indicator for the minimap
const cameraIndicator = new THREE.Mesh(
  new THREE.ConeGeometry(5, 10, 8),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cameraIndicator.rotation.x = Math.PI / 2;
scene.add(cameraIndicator);

// CSS2D Renderer for labels
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Create a label for the minimap
const minimapLabel = document.createElement('div');
minimapLabel.className = 'minimap-label';
minimapLabel.textContent = 'Minimap';
const minimapLabelObject = new CSS2DObject(minimapLabel);
minimapLabelObject.position.set(0, 250, 0);
scene.add(minimapLabelObject);

// Add lights to the scene
const topLight = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY);
topLight.position.set(5, 10, 7.5);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
scene.add(ambientLight);

// Add hemisphere light for better ambient lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
scene.add(hemisphereLight);

// Add GUI controls for lighting
const lightingFolder = gui.addFolder('Lighting');
lightingFolder.add(topLight, 'intensity', 0, 5).name('Direct Light');
lightingFolder.add(ambientLight, 'intensity', 0, 1).name('Ambient Light');
lightingFolder.add(hemisphereLight, 'intensity', 0, 1).name('Hemisphere Light');
lightingFolder.add(renderer, 'toneMappingExposure', 0, 2).name('Exposure');
lightingFolder.open();

// Environment map setup
let envMap;
const envMapRotation = { x: Math.PI / 4, y: Math.PI / 6, z: 0 };

// Load HDRI environment map
new RGBELoader()
  .setPath('hdri_map/')
  .load('alpha mayoris.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    envMap = texture;
    scene.background = envMap;
    scene.environment = envMap;

    // Apply initial rotation
    updateEnvMapRotation();

    // Update all materials in the scene to use the new environment map
    scene.traverse((object) => {
      if (object.isMesh && object.material.isMeshStandardMaterial) {
        object.material.envMap = envMap;
        object.material.envMapIntensity = 1;
        object.material.needsUpdate = true;
      }
    });

    // Add GUI controls for environment map rotation
    const envMapFolder = gui.addFolder('Environment Map');
    envMapFolder.add(envMapRotation, 'x', 0, Math.PI * 2).name('Rotate X').onChange(updateEnvMapRotation);
    envMapFolder.add(envMapRotation, 'y', 0, Math.PI * 2).name('Rotate Y').onChange(updateEnvMapRotation);
    envMapFolder.add(envMapRotation, 'z', 0, Math.PI * 2).name('Rotate Z').onChange(updateEnvMapRotation);
    envMapFolder.open();
  });

// Function to update environment map rotation
function updateEnvMapRotation() {
  if (envMap) {
    envMap.rotation.set(envMapRotation.x, envMapRotation.y, envMapRotation.z);
    scene.background.needsUpdate = true;
    scene.environment.needsUpdate = true;
  }
}

// WASD movement and middle mouse rotation
const keys = {};
const moveSpeed = 40;
const rotateSpeed = 0.002;
let isRotating = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

// Define boundaries
const minX = -3750;
const maxX = 1800;
const minZ = -3050;
const maxZ = 5450;
const minY = 5350;
const maxY = 10000;

let shakeOffset = new THREE.Vector3();
let previousPosition = new THREE.Vector3();
let currentVelocity = new THREE.Vector3();
let targetPosition = new THREE.Vector3();
let smoothedPosition = new THREE.Vector3();
let targetQuaternion = new THREE.Quaternion();

// Event listeners
window.addEventListener('keydown', (event) => {
  keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key.toLowerCase()] = false;
});

window.addEventListener('mousedown', (event) => {
  if (event.button === 1) { // Middle mouse button
    isRotating = true;
  }
});

window.addEventListener('mouseup', (event) => {
  if (event.button === 1) { // Middle mouse button
    isRotating = false;
  }
});

window.addEventListener('mousemove', (event) => {
  if (isRotating) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    // Rotate the camera based on mouse movement
    camera.rotation.y -= deltaMove.x * rotateSpeed;
    camera.rotation.x -= deltaMove.y * rotateSpeed;

    // Clamp the vertical rotation to prevent flipping
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});



function updateCamera() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);

  let movementVector = new THREE.Vector3();

  if (keys['w']) movementVector.add(direction.clone().multiplyScalar(moveSpeed));
  if (keys['s']) movementVector.sub(direction.clone().multiplyScalar(moveSpeed));
  if (keys['a']) movementVector.add(direction.cross(camera.up).normalize().multiplyScalar(-moveSpeed));
  if (keys['d']) movementVector.add(direction.cross(camera.up).normalize().multiplyScalar(moveSpeed));

  // Apply movement to target position
  targetPosition.copy(camera.position).add(movementVector);

  // Clamp the target position within the defined boundaries
  targetPosition.x = Math.max(minX, Math.min(maxX, targetPosition.x));
  targetPosition.z = Math.max(minZ, Math.min(maxZ, targetPosition.z));
  targetPosition.y = Math.max(minY, Math.min(maxY, targetPosition.y));

  // Raycast to find the ground height
  const raycaster = new THREE.Raycaster(targetPosition.clone().add(new THREE.Vector3(0, 100, 0)), new THREE.Vector3(0, -1, 0));
  const intersects = raycaster.intersectObject(object, true);

  if (intersects.length > 0) {
    const groundPoint = intersects[0].point;
    const groundNormal = intersects[0].face.normal.clone().applyQuaternion(intersects[0].object.quaternion);

    // Check if the slope is too steep
    if (groundNormal.angleTo(new THREE.Vector3(0, 1, 0)) <= MAX_SLOPE) {
      // Calculate the desired position above the ground
      const desiredPosition = groundPoint.clone().add(groundNormal.multiplyScalar(CAMERA_HEIGHT));

      // Apply "gravity" by interpolating towards the desired position
      targetPosition.lerp(desiredPosition, GRAVITY_STRENGTH);

      // Prevent clipping by ensuring minimum distance from surface
      const distanceToGround = targetPosition.distanceTo(groundPoint);
      if (distanceToGround < CAMERA_HEIGHT + COLLISION_PADDING) {
        targetPosition.copy(groundPoint.clone().add(groundNormal.multiplyScalar(CAMERA_HEIGHT + COLLISION_PADDING)));
      }

      // Calculate target quaternion to align with surface normal
      targetQuaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), groundNormal);
    }
  }

  // Smooth position transition
  smoothedPosition.lerp(targetPosition, SMOOTHING_FACTOR);
  camera.position.copy(smoothedPosition);

  // Smooth rotation transition
  camera.quaternion.slerp(targetQuaternion, ROTATION_SMOOTHING);

  // Calculate current velocity
  currentVelocity.subVectors(camera.position, previousPosition);
  const speed = currentVelocity.length();

  // Apply camera shake based on speed
  if (speed > SHAKE_THRESHOLD_SPEED) {
    const shakeAmount = Math.min((speed - SHAKE_THRESHOLD_SPEED) / 50, 1) * SHAKE_INTENSITY;
    shakeOffset.set(
      (Math.random() - 0.5) * shakeAmount,
      (Math.random() - 0.5) * shakeAmount,
      (Math.random() - 0.5) * shakeAmount
    );
    
    // Apply shake and decay
    camera.position.add(shakeOffset);
    shakeOffset.multiplyScalar(SHAKE_DECAY);
  }

  previousPosition.copy(camera.position);

  // Update the GUI values
  cameraPosition.x = camera.position.x;
  cameraPosition.y = camera.position.y;
  cameraPosition.z = camera.position.z;

  // Update the GUI controllers
  for (let i in cameraFolder.__controllers) {
    cameraFolder.__controllers[i].updateDisplay();
  }
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  updateCamera();
  
  // Update camera indicator position and rotation
  cameraIndicator.position.copy(camera.position);
  cameraIndicator.rotation.y = camera.rotation.y;
  
  // Render main scene
  renderer.render(scene, camera);
  
  // Render minimap
  minimapRenderer.render(scene, minimapCamera);
  
  // Render labels
  labelRenderer.render(scene, camera);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

animate();