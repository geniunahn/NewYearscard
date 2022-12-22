$(function () {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    // direction: "vertical",  (세로 방향으로 이동시키고 싶으면 사용하세요. 사용하지 않으면 기본 설정인 수평 이동으로 실행됩니다.)
    loop: true,
    // loop 의 값을 false 로 지정할 경우 이미지가 좌우 끝에서 이동을 멈춥니다. 만약 계속 순환시키고 싶다면 true 로 지정해주세요.
    // If we need pagination (하단의 동그라미를 추가하고 싶다면 넣어주세요)
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows  (좌우 이동 화살표 버튼입니다.)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
});
