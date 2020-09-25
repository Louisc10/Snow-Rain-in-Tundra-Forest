import * as THREE from '../three.js/build/three.module.js';

var renderer, camera, scene;
var light;

var big_fire_array, small_fire_array;
var cur_rot = 0;
var holder_fire = 0;

var tree_array;

var snow_array;
let total_snow = 70;

var init = function() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x221f3b);

    const fov = 45;
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(new THREE.Vector3(60, 40, 60));
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //plane
    var geometry_plane = new THREE.PlaneGeometry(100, 100);
    var plane_material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry_plane, plane_material);
    plane.rotation.set(1.57, 0, 0);
    plane.position.set(0, 0, 0);
    scene.add(plane);

    var geometry_ring = new THREE.RingGeometry(2, 3, 8);
    var material_ring = new THREE.MeshLambertMaterial({ color: 0x838383, side: THREE.DoubleSide });
    var ring = new THREE.Mesh(geometry_ring, material_ring);
    ring.rotation.set(1.57, 0, 0);
    ring.position.set(0, 0, 0);
    scene.add(ring);



    //tree
    create_tree();
    create_snow();

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 0);
    scene.add(spotLight)

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    light = new THREE.PointLight(0xff0000, 1, 50);
    light.position.set(0, 0.5, 0);
    scene.add(light);

    var x = 0,
        y = 0;

    big_fire_array = new Array(6);
    var heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    var geometry = new THREE.ShapeGeometry(heartShape);
    var material = new THREE.MeshBasicMaterial({ color: 0xdd2c00, side: THREE.DoubleSide });
    for (let i = 0; i < 6; i++) {
        var fire = new THREE.Mesh(geometry, material);
        fire.rotation.set(0, i, 0);
        scene.add(fire);
        big_fire_array[i] = fire;
    }

    x = -0.5;
    y = -0.7;
    small_fire_array = new Array(12);
    heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    geometry = new THREE.ShapeGeometry(heartShape);
    material = new THREE.MeshBasicMaterial({ color: 0xfebf63, side: THREE.DoubleSide });
    for (let i = 0; i < 12; i++) {
        var fire = new THREE.Mesh(geometry, material);
        fire.rotation.set(0, i * 0.5, 0);
        scene.add(fire);
        small_fire_array[i] = fire;
    }


}

var update = function() {
    holder_fire++;
    if (holder_fire == 8) {
        light.intensity = Math.random();
        holder_fire = 0;
    }
    cur_rot += 0.0023;
    for (let i = 0; i < 6; i++) {
        big_fire_array[i].rotation.set(0, i + cur_rot, 0);
    }

    for (let i = 0; i < 12; i++) {
        small_fire_array[i].rotation.set(0, (i * 0.5) + cur_rot, 0);
    }


    for (let i = 0; i < total_snow; i++) {
        let y = snow_array[i].position.y;
        snow_array[i].position.y = (y - 0.08);
        if (snow_array[i].position.y <= 0) {
            let x = Math.random() * 90 - 45;
            let y = 90;
            let z = Math.random() * 90 - 45;
            snow_array[i].position.set(x, y, z);

        }
    }
}

var create_tree = function() {
    tree_array = new Array(85);
    for (let i = 0; i < 80; i++) {

        let x = 0;
        let z = 0;
        while (-15 <= x && x <= 15 && -15 <= z && z <= 15) {
            x = Math.random() * 90 - 45;
            z = Math.random() * 90 - 45;
        }

        var geometry_tree = new THREE.CylinderGeometry(1, 1, 5, 64);
        var material_tree = new THREE.MeshLambertMaterial({ color: 0x411f1f });
        var log = new THREE.Mesh(geometry_tree, material_tree);
        log.position.set(x, 2.5, z);
        var geometry_leaf1 = new THREE.ConeGeometry(2.5, 5, 64);
        var geometry_leaf2 = new THREE.ConeGeometry(2, 4, 64);
        var material_leaf = new THREE.MeshLambertMaterial({ color: 0x62760c });
        var leaf1 = new THREE.Mesh(geometry_leaf1, material_leaf);
        var leaf2 = new THREE.Mesh(geometry_leaf2, material_leaf);
        leaf1.position.set(0, 3, 0);
        leaf2.position.set(0, 5, 0);
        var geometry_overlayleaf1 = new THREE.CylinderGeometry(2, 2.6, 1, 64);
        var geometry_overlayleaf2 = new THREE.ConeGeometry(1.51, 3, 64);
        var material_overlayleaf = new THREE.MeshLambertMaterial({ color: 0xffffff });
        var overlayleaf1 = new THREE.Mesh(geometry_overlayleaf1, material_overlayleaf);
        var overlayleaf2 = new THREE.Mesh(geometry_overlayleaf2, material_overlayleaf);
        overlayleaf1.position.set(0, 1, 0);
        overlayleaf2.position.set(0, 5.5, 0);

        log.add(leaf1);
        log.add(leaf2);
        log.add(overlayleaf1);
        log.add(overlayleaf2);
        tree_array[i] = log;
    }
    render_tree();
};

var render_tree = function() {
    for (let i = 0; i < 80; i++) {
        scene.add(tree_array[i]);
    }
};

var create_snow = function() {
    snow_array = new Array(total_snow);
    for (let i = 0; i < total_snow; i++) {
        var geometry_snow = new THREE.SphereGeometry(0.3, 32, 32);
        var material_snow = new THREE.MeshLambertMaterial({ color: 0xffffff });
        snow_array[i] = new THREE.Mesh(geometry_snow, material_snow);
        let x = Math.random() * 90 - 45;
        let y = Math.random() * 90;
        let z = Math.random() * 90 - 45;
        snow_array[i].position.set(x, y, z);
        scene.add(snow_array[i]);
    }
};

var render = function() {
    renderer.clear();
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
};

var gameLoop = function() {
    requestAnimationFrame(gameLoop);
    update();
    render();
};

window.addEventListener('resize', () => {
    render();
}, false)

init();
gameLoop();