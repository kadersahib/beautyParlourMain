
export async function countryData(container = document) {
  const iconGroup = container.querySelector('.icon-group');
  const dropdown = container.querySelector('#countryDropdown');
  const phoneInput = container.querySelector('#phone');

  // console.log('countryData running...', { iconGroup, dropdown, phoneInput });

  if (!iconGroup || !dropdown || !phoneInput) return;

  if (iconGroup.dataset.listenerAttached === "true") return;
  iconGroup.dataset.listenerAttached = "true";

  iconGroup.addEventListener('click', async () => {
    // console.log('iconGroup clicked');

    // If dropdown already initialized, just toggle visibility
    if (dropdown.dataset.initialized === "true") {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      return;
    }

    try {
      const response = await fetch('./js/jsonData/countries.json');
      const countries = await response.json();
      // console.log('Loaded countries:', countries);

      dropdown.innerHTML = '';
      countries.sort((a, b) => a.name.localeCompare(b.name)).forEach(country => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span style="margin-right: 8px;">${country.flag}</span>
          ${country.name} (${country.dial_code})
        `;
        li.dataset.code = country.dial_code;
        li.addEventListener('click', () => {
          phoneInput.value = country.dial_code + ' ';
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(li);
      });

      dropdown.dataset.initialized = "true";
      dropdown.style.display = 'block';
    } catch (error) {
      console.error('Failed to load countries:', error);
    }
  });

  document.addEventListener('click', (e) => {
    if (!iconGroup.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}
