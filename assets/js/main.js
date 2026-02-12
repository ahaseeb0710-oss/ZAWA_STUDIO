
document.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  if(window.scrollY > 50){
    nav.style.background = "rgba(0,0,0,0.8)";
  } else {
    nav.style.background = "rgba(0,0,0,0.4)";
  }
});


window.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  if(window.scrollY > 50){
    nav.style.background = "rgba(20,0,30,0.9)";
  } else {
    nav.style.background = "rgba(20,0,30,0.6)";
  }
});
const features = document.querySelectorAll('.feature');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.85; // when 85% of viewport height

  features.forEach(feature => {
    const featureTop = feature.getBoundingClientRect().top;

    if (featureTop < triggerBottom) {
      feature.classList.add('animate');
    } else {
      feature.classList.remove('animate'); // remove to re-trigger when scrolling back
    }
  });
}

// Run on scroll and on load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
