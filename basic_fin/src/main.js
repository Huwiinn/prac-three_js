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

// 정적으로 미리 canvas를 생성했다는 가정하에 three canvas 적용
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
