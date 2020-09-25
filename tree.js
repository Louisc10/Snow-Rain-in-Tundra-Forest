var Tree = (scene, x, z) => {
    var geometry_tree = new THREE.CylinderGeometry(1, 1, 5, 64);
    var material_tree = new THREE.MeshLambertMaterial({ color: 0x411f1f });
    var tree = new THREE.Mesh(geometry_tree, material_tree);
    tree.position.set(x, 2.5, z);
    scene.add(tree);
    var geometry_leaf1 = new THREE.ConeGeometry(2.5, 5, 64);
    var geometry_leaf2 = new THREE.ConeGeometry(2, 4, 64);
    var material_leaf = new THREE.MeshLambertMaterial({ color: 0x62760c });
    var leaf1 = new THREE.Mesh(geometry_leaf1, material_leaf);
    var leaf2 = new THREE.Mesh(geometry_leaf2, material_leaf);
    leaf1.position.set(x, 6, z);
    leaf2.position.set(x, 8, z);
    scene.add(leaf1);
    scene.add(leaf2);
    var geometry_overlayleaf1 = new THREE.CylinderGeometry(2, 2.6, 1, 64);
    var geometry_overlayleaf2 = new THREE.ConeGeometry(1.51, 3, 64);
    var material_overlayleaf = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var overlayleaf1 = new THREE.Mesh(geometry_overlayleaf1, material_overlayleaf);
    var overlayleaf2 = new THREE.Mesh(geometry_overlayleaf2, material_overlayleaf);
    overlayleaf1.position.set(x, 4, z);
    overlayleaf2.position.set(x, 8.5, z);
    scene.add(overlayleaf1);
    scene.add(overlayleaf2);

}



module.exports = Tree