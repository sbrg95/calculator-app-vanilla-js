// Theme switch functionality
const toggleGroup = document.querySelector('.toggle__group');
toggleGroup.addEventListener('click', (e) => {
  if (e.target.name === 'theme') {
    document.body.className = e.target.value;
  }
});
