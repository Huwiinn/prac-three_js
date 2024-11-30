// import example from "./myPracJs/ex01";
// // import example from './ex02';
// // import example from './ex03';
// // import example from './ex04';
// // import example from './ex05';
// // import example from './ex06';
// // import example from './ex06_02';
// // import example from './ex07';
// // import example from './ex08';

// example();

import * as THREE from "three";

// 1. renderer를 먼저 생성해줘야 한다.
// 2. renderer 사이즈를 세팅해야한다.
// 3. renderer를 dom element에 추가시켜줘야 한다.

// 동적으로 canvas 생성
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.append(renderer.domElement);

// ✅ canvas
// 정적으로 미리 canvas를 생성했다는 가정하에 three canvas 적용
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true, // antialias 활성. 계단현상 개선
});
renderer.setSize(window.innerWidth, window.innerHeight);

// ✅ Scene
const scene = new THREE.Scene();

// ✅ Camera
// PerspectiveCamera( fov[시야각] : Number, aspect[가로-세로 비율] : Number, near[얼마나 가까운 거리에서 오브젝트가 보이게 할 것인지] : Number, far[얼마나 멀리있는 거리에서 오브젝트가 보이지 않게 할 것인지] : Number )
const camera = new THREE.PerspectiveCamera(
  75, // field of view, 시야각
  window.innerWidth / window.innerHeight, // aspect, 종횡비
  0.1, // near, 보통 near는 0.1로 설정함.
  1000 // far
);

// Tip. 거리 단위는 내가 어떤 것을 만드는지에 따라 상대적임. m(미터) 단위 기준으로 잡았다고 가정하고 cm나 inch 등을 단위 변환하여 적용하면 작업하기 쉬움
// ** 카메라 포지션 => 오른쪽으로 간다 ? 사물이 왼쪽에 있는 것 처럼 보인다
camera.position.x = 2; // 양수일 때, (사물이) 왼쪽으로 위치함. - 카메라는 오른쪽으로 이동
camera.position.y = 2; // 양수일 때, (사물이) 아래로 내려감. - 카메라는 위로 이동
camera.position.z = 6; // 양수일 때, (사물이) 앞으로 위치함. - 카메라는 사물 가까이 이동
scene.add(camera);

// 카메라 위치 설정을 하지 않으면 default location value는 [ 0,0,0 ] 이다.

// ✅ Mesh
// Mesh = Geometry + Material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  // color: '#fff' rgb값, 16진수로 기입 가능함
  // color: '0x8729'
  color: "skyblue",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log("mesh :", mesh);

// renderer가 최종적으로 render해줘야 비로소 view에 나타난다.
// ✅ 화면에 띄우기
renderer.render(scene, camera);
