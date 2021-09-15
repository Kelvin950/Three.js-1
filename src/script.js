import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

//geometry 
// const geometry =  new THREE.TorusKnotGeometry(7 , 1.1 ,171 ,11);
// const geometry = new THREE.Geometry();

// // 

// for(let i=0 ;i<50 ;i++){
    
//     for(let j= 0;j<3;j++){

//         geometry.vertices.push( new THREE.Vector3(
//            ( Math.random()-0.5 ) * 4,
//              ( Math.random() -0.5) * 4,
//               (Math.random() -0.5)*4
//         ));
//     }

//     let index= i *3;
      

//  geometry.faces.push(new THREE.Face3(index , index+1 , index+2));
// }
// const geometry =  new THREE.BoxBufferGeometry(1 ,1 ,1,4,4,4);

// const positionsArray =  new Float32Array(9);
// positionsArray[0]= 0
// positionsArray[1]= 0
// positionsArray[2]= 0

// positionsArray[3]= 0
// positionsArray[4]= 1
// positionsArray[5]= 0

// positionsArray[6]= 1
// positionsArray[7]= 0
// positionsArray[8]= 0
// //material
// const positionsAttribute =  new THREE.BufferAttribute(positionsArray, 3);
// const count =  300;
// let positionsArray =  new Float32Array(count *3 *3);

// positionsArray =  positionsArray.map(position=>position=(Math.random()-0.5)*4);
// console.log(positionsArray.at(1));
// const positionsAttribute =  new THREE.BufferAttribute(positionsArray , 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position" , positionsAttribute)
// geometry.setAttribute("position" , positionsAttribute);

const particleGeometry =  new THREE.BufferGeometry;
const particleCount = 500;

let positionsArray = new Float32Array(particleCount*3*3);

positionsArray=  positionsArray.map(position=>{
    return position = (Math.random()-0.5)*10;
})

particleGeometry.setAttribute("position" , new THREE.BufferAttribute(positionsArray , 3));
const geometry =  new THREE.TorusGeometry(1.2 ,0.5 ,17,120);
const material =  new THREE.PointsMaterial({
    size:0.010,color:0xC0C0C0
});

const pointMaterial  = new THREE.PointsMaterial({
    size:0.005,color:0xfde0a9
})

const mesh =  new THREE.Points(geometry , material);
const particlesmesh=  new THREE.Points(particleGeometry ,pointMaterial );
scene.add(mesh);
scene.add(particlesmesh)

const size =  {
    width:window.innerWidth,
    height:window.outerHeight
}


const mouse = {
    x:0,
    y:0
}

window.addEventListener("mousemove" , (e)=>{
   mouse.x=e.clientX ;
   mouse.y = e.clientY
})

window.addEventListener("resize" , ()=>{
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect=  size.width/size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width,size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio , 1))
})

const camera=  new THREE.PerspectiveCamera(75 , size.width/size.height , .1, 100);
camera.position.x= 0;
camera.position.y=0
camera.position.z =  3;
scene.add(camera);


const renderer=  new THREE.WebGLRenderer({
    canvas:canvas,
 
});
renderer.setSize(size.width , size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//orbit controls 
// const controls =  new OrbitControls(camera , canvas);
// controls.enableDamping=true


const clock =  new THREE.Clock();
console.log(mouse.x);
function tick(){

    const elapsedtime =  clock.getElapsedTime();
 
mesh.rotation.y =  .5 *elapsedtime
particlesmesh.rotation.z=  elapsedtime * .2;



    particlesmesh.rotation.y=-(elapsedtime * mouse.x *0.0005);
particlesmesh.rotation.x =elapsedtime  *  mouse.y*0.0005


// controls.update();
    renderer.render(scene , camera);
 window.requestAnimationFrame(tick);
}

tick();