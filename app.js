const sideNav = document.querySelector(".menu");
const main = document.querySelector("main");
const navIcon = document.querySelector(".icon-sideNav");
const closeIcon = document.querySelector(".icon-sideNavClose");
const scrollOuter = document.querySelector(".cards");
const scroll = document.querySelector(".inner-card-slider");
const menuLinks = document.querySelectorAll(".menu__links li a");

function animateHome() {
  const leftHeader = document.querySelector(".hero-left");
  const heading = document.querySelectorAll(".heading--1 h1 span");

  const tl = new gsap.timeline();

  tl.fromTo(leftHeader, { scaleX: 0 }, { scaleX: 1, duration: 1.8 });
  tl.to(heading, { y: "0%", ease: "power2.easeOut", stagger: 0.04 });
  tl.to(".heroImage-overlay", { y: "-100%", duration: 1.4 });
  tl.fromTo(
    ".hero-image .img",
    { scale: 2 },
    { scale: 1, duration: 1 },
    "-=1.3"
  );

  ///

  gsap.fromTo(
    ".img--hero",
    1.5,
    { y: "10%" },
    {
      y: "-10%",
      scrollTrigger: {
        trigger: ".img--hero",
        scrub: true,
        start: "90% 100%",
      },
      ease: "power2.easeOut",
    }
  );

  const images = document.querySelectorAll(".prod img");
  gsap.fromTo(
    images,
    { x: "100%", opacity: 0 },
    { x: "0%", opacity: 1, stagger: 0.2, scrollTrigger: { trigger: ".prod" } }
  );

  gsap.fromTo(
    ".boost-img",
    1,
    { scale: 3 },
    { scale: 1, scrollTrigger: { trigger: ".boost-img", start: "30% 100%" } }
  );

  gsap.fromTo(
    ".boost-img",
    1.5,
    { y: "10%" },
    {
      y: "-10%",
      scrollTrigger: {
        trigger: ".boost-img",
        scrub: true,
        start: "90% 100%",
      },
      ease: "power2.easeOut",
    }
  );
  navIcon.addEventListener("click", () => {
    gsap.to(sideNav, 1, {
      clipPath: " circle(150% at 0% 0%)",
      ease: "power3.easeOut",
    });
  });

  closeIcon.addEventListener("click", () => {
    gsap.to(sideNav, 1, {
      clipPath: " circle(0% at 0% 0%)",
      ease: "power3.easeOut",
    });
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      gsap.to(sideNav, 1, {
        clipPath: " circle(0% at 0% 0%)",
        ease: "power3.easeOut",
      });
    });
  });

  var isDown = false;
  var scrollX;
  var scrollLeft;

  // Mouse Up Function
  scroll.addEventListener("mouseup", () => {
    isDown = false;
    scroll.classList.remove("active");
  });

  // Mouse Leave Function
  scroll.addEventListener("mouseleave", () => {
    isDown = false;
    scroll.classList.remove("active");
  });

  // Mouse Down Function
  scroll.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    scroll.classList.add("active");
    scrollX = e.pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
  });

  // Mouse Move Function
  scroll.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    var element = e.pageX - scroll.offsetLeft;
    var scrolling = (element - scrollX) * 2;
    scroll.scrollLeft = scrollLeft - scrolling;
  });
}

///barba js
barba.init({
  views: [
    {
      namespace: "home",
      afterEnter() {
        animateHome();
      },
    },
    {
      namespace: "contact",
    },
    {
      namespace: "about",
    },
    {
      namespace: "product",
    },
    {
      namespace: "shop",
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        const done = this.async();
        const tl = new gsap.timeline();

        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(".slider", 0.5, { y: "100%" }, { y: 0, onComplete: done });
      },
      enter({ current, next }) {
        const done = this.async();
        window.scrollTo(0, 0);
        const tl = new gsap.timeline();

        tl.fromTo(".slider", 0.5, { y: 0 }, { y: "-100%" });
        tl.fromTo(
          next.container,
          1,
          { opacity: 0 },
          { opacity: 1, onComplete: done }
        );
      },
    },
  ],
});
