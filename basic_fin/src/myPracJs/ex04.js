import { render } from "react-dom";
import * as THREE from "three";

// ----- 주제: 브라우저 창 사이즈 변경에 대응하기

export default function Light() {
  // ✅ canvas
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 기기 성능을 고려할 때, 이렇게 설정하는 게 최적화
  renderer.setClearColor("violet"); // 캔버스 화면 색상 설정
  renderer.setClearAlpha(0.7); // 캔버스 화면 색상 불투명도 설정

  // ✅ Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("pink");
  // ✅ 바로 위 renderer에서 캔버스 색상을 설정했지만, scene에 적용해준 pink 값이 적용된 모습을 확인할 수 있음.

  // ✅ Camera
  const camera = new THREE.PerspectiveCamera(
    75, // field of view, 시야각
    window.innerWidth / window.innerHeight, // aspect, 종횡비
    0.1, // near, 보통 near는 0.1로 설정함.
    1000 // far
  );

  // Orthographic Camera(직교 카메라)
  // 렌더링된 이미지에서 객체의 크기는 카메라와의 거리에 관계없이 일정하게 유지됩니다.
  // 이 기능은 무엇보다도 2D 장면과 UI 요소를 렌더링하는 데 유용합니다.
  // OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
  // left — 카메라 절두체 좌평면.
  // right — 카메라 절두체 우평면.
  // top — 카메라 절두체 상평면.
  // bottom — 카메라 절두체 하평면.
  // near — 카메라 절두체 근평면.
  // far — 카메라 절두체 원평면.

  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), // left
  //   window.innerWidth / window.innerHeight, // right
  //   1, // top
  //   -1, // bottom
  //   0.1, // top
  //   1000 // bottom
  // );

  // // Tip. 거리 단위는 내가 어떤 것을 만드는지에 따라 상대적임. m(미터) 단위 기준으로 잡았다고 가정하고 cm나 inch 등을 단위 변환하여 적용하면 작업하기 쉬움
  // // ** 카메라 포지션 => 오른쪽으로 간다 ? 사물이 왼쪽에 있는 것 처럼 보인다
  // // Zoom out, in 기능은 z 속성으로 카메라를 위치시키는 것이 아니라 zoom과 updateProjectionMatrix 메서드를 사용하여 구현해야한다.
  // // z 속성으로 카메라 위치를 변경하여 줌아웃을 구현하게되면 사물이 이상하게 보이는 경우가 있기 때문임.
  camera.position.x = 2; // 양수일 때, (사물이) 왼쪽으로 위치함. - 카메라는 오른쪽으로 이동
  camera.position.y = 2; // 양수일 때, (사물이) 아래로 내려감. - 카메라는 위로 이동
  camera.position.z = 6; // 양수일 때, (사물이) 앞으로 위치함. - 카메라는 사물 가까이 이동
  camera.lookAt(0, 0, 0);
  camera.zoom = 2.5;
  camera.updateProjectionMatrix();
  scene.add(camera);

  // 카메라 조명 추가
  // 두 번째 인자로 빛의 강도 조절 가능
  const light = new THREE.DirectionalLight("#ffa520", 1);
  light.position.z = 22;
  light.position.x = 32;
  scene.add(light);

  // 카메라 위치 설정을 하지 않으면 default location value는 [ 0,0,0 ] 이다.

  // ✅ Mesh
  // Mesh = Geometry + Material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial << 조명의 영향을 받지 않음. MeshStandardMaterial로 변경하면 조명의 영향을 받는다.
  const material = new THREE.MeshStandardMaterial({
    // color: '#fff' rgb값, 16진수로 기입 가능함
    // color: '0x8729'
    color: "skyblue",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // ✅ 화면에 띄우기
  renderer.render(scene, camera);

  const setSize = () => {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    // 카메라 투영에 관련한 값이 변경되면, 변경값을 업데이트
    camera.updateProjectionMatrix();

    // 재구성
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  // 이벤트 추가
  window.addEventListener("resize", setSize);
}