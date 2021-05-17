// Theme switch functionality
const toggleGroup = document.querySelector('.toggle__group');
toggleGroup.addEventListener('click', (e) => {
  if (e.target.name === 'theme') {
    const main = document.querySelector('main');
    main.className = e.target.value;
  }
});
