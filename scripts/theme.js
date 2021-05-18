loadTheme();

// Theme switch functionality
const toggleGroup = document.querySelector('.toggle__group');
toggleGroup.addEventListener('click', (e) => {
  if (e.target.name === 'theme') {
    document.body.className = e.target.value;
    saveTheme(e.target.id);
  }
});

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'theme1';
  document.getElementById(theme).checked = true;
  document.body.className = theme;
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}
