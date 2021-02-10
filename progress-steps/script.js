const progressBar = document.querySelector('.progress__bar');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const steps = document.querySelectorAll('.progress__items-step');
let currentStep = 1;

nextBtn.addEventListener('click', e => {
  currentStep++;
  if (currentStep > steps.length) {
    currentStep = steps.length;
  }
  activeStepAndProgressBar();
});

prevBtn.addEventListener('click', e => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }
  activeStepAndProgressBar();
});

const activeStepAndProgressBar = () => {
  steps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
    const activeSteps = document.querySelectorAll('.active');
    console.log(activeSteps);
    progressBar.style.width = (activeSteps.length - 1) / (steps.length - 1) * 100 + "%";
  });
};
