import * as THREE from "https://unpkg.com/three/build/three.module.js";
let n = 0
document.getElementById("addMod").addEventListener('click',(event)=>{
    if(event.target.id!=="vie")return 0
    else{
        let typeGeometry = document.getElementById("selectType").value
        let colorGeometry = document.getElementById("color").value
    let add = document.getElementById("form")
        if(!n){add.innerHTML+="<div id=\"canvas-wrapper\"></div>"
            n=1}
        else {let wr= document.getElementById("canvas-wrapper")
            wr.outerHTML = "<div id=\"canvas-wrapper\"></div>"
         }

let type = document.getElementById("type")

const canvasWrapper = document.getElementById("canvas-wrapper");

const clock = new THREE.Clock();

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");


let camera = new THREE.PerspectiveCamera(
    60,
    canvasWrapper.clientWidth / canvasWrapper.clientHeight,
    1,
    1000
);

let cameraTarget = new THREE.Vector3(0, 0, 0);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = -10;

camera.lookAt(cameraTarget);

// const geometry = new THREE.PlaneGeometry(10, 10);
// const material = new THREE.MeshPhongMaterial({
//     color: 'green',
//     dithering: true,
//     side: THREE.DoubleSide
// });
// const plane = new THREE.Mesh(geometry, material);
// plane.position.x = 0
// plane.position.y = 5
// plane.position.z = 5
// plane.receiveShadow = true;
//
// let vertices = [
//     0, 0, 0,
//     10, 0, 0,
//     10, 0, 10,
//     0, 0, 10
// ];
//
// let indices = [
//     2, 1, 0,
//     0, 3, 2
// ];
//ПЛОСКОСТЬ
// let geometry1 = new THREE.BufferGeometry();
// geometry1.setAttribute(
//     "position",
//     new THREE.BufferAttribute(new Float32Array(vertices), 3)
// );
// geometry1.setIndex(indices);
// geometry1.computeVertexNormals();
// let material1 = new THREE.MeshPhongMaterial({ color: "red", dithering: true, side: THREE.DoubleSide });
// let plane1 = new THREE.Mesh(geometry1, material1);
// plane1.position.set(-5, 0, -5);
// plane1.receiveShadow = true;

scene.add(camera);
//scene.add(plane);
//scene.add(plane1);

//КУБ
    if(typeGeometry === "cube") {
        const geometry2 = new THREE.BoxGeometry(3, 3, 3);
        const material2 = new THREE.MeshPhongMaterial({
            color: colorGeometry,
            dithering: true,
            specular: 0x111111,
            shininess: 200
        });
        let cube = null;
        cube = new THREE.Mesh(geometry2, material2);
        cube.position.y = 0;
        cube.position.x = 0;
        cube.position.z = 0;
        cube.castShadow = true;
        scene.add(cube);
    }
    if(typeGeometry === "sphere") {
    let sphere = null;
    const geometry = new THREE.SphereGeometry(3)
    const material = new THREE.MeshPhongMaterial( {
        color: colorGeometry,
        dithering: true,
        specular: 0x111111,
        shininess: 200
    } );

    sphere = new THREE.Mesh( geometry, material);
    sphere.position.y = 0;
    sphere.position.x = 0;
    sphere.position.z = 0;
    sphere.castShadow = true;
    scene.add( sphere );}
//ТЕТРАЭДР
// let vertices1 = [
//     0, 0, 0,
//     4, 0, 0,
//     2, 0, 4,
//     2, 4, 2
// ];
//
// let indices1 = [
//     2, 1, 0,
//     0, 3, 2,
//     1, 0, 3,
//     3, 2, 1
// ];
//
// let geometry3 = new THREE.BufferGeometry();
// geometry3.setAttribute(
//     "position",
//     new THREE.BufferAttribute(new Float32Array(vertices1), 3)
// );
// geometry3.setIndex(indices1);
// geometry3.computeVertexNormals();
// let material3 = new THREE.MeshPhongMaterial({ color: "BlueViolet", dithering: true, side: THREE.DoubleSide });
// let triangle = new THREE.Mesh(geometry3, material3);
// triangle.position.set(-4, 0.5, -2);
// triangle.castShadow = true;
// scene.add(triangle);

const light = new THREE.PointLight( "#fff", 1, 100);
light.position.set(0, 6, -15);
light.castShadow = true;
scene.add(light);

const spotLight = new THREE.SpotLight("#ffffff");
spotLight.position.set(0, 5, 0);
spotLight.castShadow = true;
spotLight.intensity = 2;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 25;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.bias = -0.01;
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvasWrapper.clientWidth, canvasWrapper.clientHeight);
canvasWrapper.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera);
}
animate()}
})
