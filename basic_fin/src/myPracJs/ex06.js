import * as THREE from "three";

// ----- 주제: 브라우저 창 사이즈 변경에 대응하기

export default function DevelopAnimation() {
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

  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 2.5;
  camera.updateProjectionMatrix();
  scene.add(camera);

  const light = new THREE.DirectionalLight("#fff", 1);
  light.position.z = 22;
  light.position.x = 32;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "skyblue",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기 && 성능 개선
  const clock = new THREE.Clock();

  function draw() {
    // 💡 방법 2️⃣. getDelta 메서드 사용. 시간 간격이기 때문에 증가값이 아닌 일정한 값임
    const delta = clock.getDelta();

    mesh.rotation.y += delta;
    mesh.position.y += delta;

    if (mesh.position.y > 2) {
      mesh.position.y = 0;
    }

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw); // window api. 웹 브라우저 한정
    renderer.setAnimationLoop(draw);
    // ⬆️ Three.js에서 제공하는 애니메이션 메서드 | AI나 VR 컨텐츠를 만들 때(WebXR), window api가 아닌 해당 메서드를 꼭 사용해야함.
  }

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

  draw();
}
