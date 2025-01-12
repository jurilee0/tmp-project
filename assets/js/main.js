$(document).ready(function () {
  // smooth scroll
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    smooth: true,
    smoothTouch: false,
    lerp: 0.1,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);
  // cursor
  const $cursor = $(".cursor");
  const $videoArea = $(".video_wrapper video");

  gsap.set($cursor, { xPercent: -50, yPercent: -50 });

  $(window).on("mousemove", (e) => {
    gsap.to($cursor, {
      duration: 0.5,
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out",
    });

    let mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    let mouseY = (e.clientY - window.innerHeight / 2) * 0.05;

    gsap.to($videoArea, {
      duration: 1.5,
      x: mouseX,
      y: mouseY,
      ease: "elastic.out(1, 0.3)",
    });
  });

  $("a").hover(
    () => {
      gsap.to($cursor, {
        duration: 0.5,
        scale: 5,
        ease: "power1",
      });
    },
    () => {
      gsap.to($cursor, {
        duration: 0.5,
        scale: 1,
        ease: "power1",
      });
    }
  );

  // preload
  const $countOdd = $(".preload_wrapper .count:nth-child(odd)");
  const $countEven = $(".preload_wrapper .count:nth-child(even)");
  let completedGroups = 0;

  gsap.to($countOdd, {
    duration: 4,
    innerText: 100,
    snap: {
      innerText: 1,
    },
    ease: "circ.inOut",
    onComplete: checkComplete,
  });

  gsap.to($countEven, {
    duration: 5,
    innerText: 100,
    snap: {
      innerText: 1,
    },
    ease: "circ.inOut",
    delay: 0.5,
    onComplete: checkComplete,
  });

  function checkComplete() {
    completedGroups++;
    if (completedGroups === 2) {
      removePreload();
    }
  }

  function removePreload() {
    $(window).scrollTop(0);
    $(".preload_wrapper").css("transform", "scale(5) rotate(-45deg)");
    $(".preload_wrapper").fadeOut(1000, function () {
      $(this).remove();
    });
  }

  gsap.fromTo(
    ".link_start",
    {
      scale: 2,
    },
    {
      scale: 1,
      scrollTrigger: {
        trigger: ".start",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      duration: 1,
      ease: "power1.out",
    }
  );

  const colors = gsap.utils
    .toArray(".work_item")
    .map((item) => item.getAttribute("data-bgcolor"));

  gsap.to(".work_wrapper", {
    scrollTrigger: {
      trigger: ".work_wrapper",
      start: "top top",
      end: () => "+=" + ($(".work_wrapper")[0].scrollWidth - $(window).width()),
      pin: true,
      scrub: 1,
      markers: true,
      toggleClass: {
        targets: "header",
        className: "is-hidden",
      },
      onUpdate: (self) => {
        let progress = self.progress * (colors.length - 1);
        let index = Math.floor(progress);
        let colorProgress = progress - index;
        let currentColor = gsap.utils.interpolate(
          colors[index],
          colors[index + 1] || colors[index],
          colorProgress
        );

        $(".featured").css({ background: currentColor });
      },
    },
    x: () => -($(".work_wrapper")[0].scrollWidth - $(window).width()),
    ease: "none",
  });

  // background 색상 물려있음 + header hidden
  gsap.to(".contact", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers: true,
    },
    backgroundColor: "#000",
    ease: "power1.out",
  });

  $(".btn_read").click(function () {
    $(this).toggleClass("is-active");
  });

  $(".form_item input").on({
    focus: function () {
      $(this).closest(".form_item").css("border", "1px solid #000");
    },
    blur: function () {
      $(this)
        .closest(".form_item")
        .css("border", "1px solid rgb(222, 222, 222)");
    },
  });

  $(".btn_submit").hover(
    () => {
      $(".point-color").css("color", "rgba(224,49,34)");
    },
    () => {
      $(".point-color").css("color", "rgba(0,0,0)");
    }
  );
});
