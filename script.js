let colleges = [];

async function fetchColleges() {
  const response = await fetch("data/colleges.json");
  colleges = await response.json();

  populateFilters();
  displayColleges(colleges);
}

function populateFilters() {
  const cities = [...new Set(colleges.map(c => c.city))];
  const courses = [...new Set(colleges.map(c => c.course))];

  const cityFilter = document.getElementById("cityFilter");
  const courseFilter = document.getElementById("courseFilter");

  cities.forEach(city => {
    cityFilter.innerHTML += `<option value="${city}">${city}</option>`;
  });

  courses.forEach(course => {
    courseFilter.innerHTML += `<option value="${course}">${course}</option>`;
  });
}

async function fetchColleges() {
  try {
    const response = await fetch("data/colleges.json");

    console.log("Response:", response);

    const data = await response.json();

    console.log("Data loaded:", data);

    colleges = data;

    populateFilters();
    displayColleges(colleges);

  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

function displayColleges(data) {
  const list = document.getElementById("collegeList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<h3>No colleges found</h3>";
    return;
  }

  data.forEach(college => {
    list.innerHTML += `
      <div class="card">
        <h3>${college.name}</h3>
        <p><strong>Location:</strong> ${college.city}</p>
        <p><strong>Course:</strong> ${college.course}</p>
        <p><strong>Fee:</strong> ₹${college.fee}</p>
        <p class="rating">⭐ ${college.rating}</p>
      </div>
    `;
  });
}

function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const city = document.getElementById("cityFilter").value;
  const course = document.getElementById("courseFilter").value;
  const maxFee = document.getElementById("maxFee").value;

  let filtered = colleges.filter(c => {
    return (
      (!search || c.name.toLowerCase().includes(search)) &&
      (!city || c.city === city) &&
      (!course || c.course === course) &&
      (!maxFee || c.fee <= maxFee)
    );
  });

  displayColleges(filtered);
}

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("cityFilter").addEventListener("change", applyFilters);
document.getElementById("courseFilter").addEventListener("change", applyFilters);
document.getElementById("maxFee").addEventListener("input", applyFilters);

fetchColleges();