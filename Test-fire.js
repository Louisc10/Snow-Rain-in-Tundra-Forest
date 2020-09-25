import * as THREE from './three.js/build/three.module.js';
import { Fire } from './three.js/examples/jsm/objects/Fire.js';

var camera, scene, renderer;

init();
animate();

function init() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 25;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    scene.add(camera);

    var plane = new THREE.PlaneBufferGeometry(40, 40);
    var fire = new Fire(plane, {
        textureWidth: 512,
        textureHeight: 512,
        debug: false
    });
    fire.position.z = -2;
    scene.add(fire);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);


    var Single = function() {
        fire.addSource(0.5, 0.2, 0.15, 1, 0, 5.0);

    };

    Single();
}

function animate() {

    requestAnimationFrame(animate);

    renderer.clear();
    renderer.render(scene, camera);

}