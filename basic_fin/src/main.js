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
import { Scene } from "three";

// 1. renderer를 먼저 생성해줘야 한다.
// 2. renderer 사이즈를 세팅해야한다.
// 3. renderer를 dom element에 추가시켜줘야 한다.

// 동적으로 canvas 생성
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.append(renderer.domElement);

// 정적으로 미리 canvas를 생성했다는 가정하에 three canvas 적용
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

// PerspectiveCamera( fov[시야각] : Number, aspect[가로-세로 비율] : Number, near[얼마나 가까운 거리에서 오브젝트가 보이게 할 것인지] : Number, far[얼마나 멀리있는 거리에서 오브젝트가 보이지 않게 할 것인지] : Number )
const camera = new THREE.PerspectiveCamera(
  75, // field of view, 시야각
  window.innerWidth / window.innerHeight, // aspect, 종횡비
  0.1, // near, 보통 near는 0.1로 설정함.
  1000 // far
);

// Tip. 거리 단위는 내가 어떤 것을 만드는지에 따라 상대적임. m(미터) 단위 기준으로 잡았다고 가정하고 cm나 inch 등을 단위 변환하여 적용하면 작업하기 쉬움
camera.position.z = 5; // 양수일 때, 앞으로 위치함.
scene.add(camera);

// 카메라 위치 설정을 하지 않으면 default location value는 [ 0,0,0 ] 이다.
