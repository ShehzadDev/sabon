const API_URL = "http://localhost:5000/profiles"; // Update with your API URL

// Fetch and display profiles
const fetchProfiles = async () => {
  const response = await fetch(API_URL);
  const profiles = await response.json();

  const profilesList = document.getElementById("profiles-list");
  profilesList.innerHTML = ""; // Clear existing profiles

  profiles.forEach((profile) => {
    const li = document.createElement("li");
    li.classList.add("profile-item");
    li.innerHTML = `
      <strong>${profile.name}</strong> - ${profile.title} (${profile.location})
      <p>${profile.summary || "No summary provided"}</p>
      <button class="update" onclick="updateProfile('${
        profile._id
      }')">Update</button>
      <button onclick="deleteProfile('${profile._id}')">Delete</button>
    `;
    profilesList.appendChild(li);
  });
};

// Add a new profile
document
  .getElementById("add-profile-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const summary = document.getElementById("summary").value;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, title, location, summary }),
    });

    if (response.ok) {
      alert("Profile added successfully!");
      fetchProfiles();
    } else {
      alert("Error adding profile.");
    }

    e.target.reset();
  });

// Delete a profile
const deleteProfile = async (id) => {
  if (confirm("Are you sure you want to delete this profile?")) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Profile deleted successfully!");
      fetchProfiles();
    } else {
      alert("Error deleting profile.");
    }
  }
};

// Update a profile (dummy implementation)
const updateProfile = async (id) => {
  const newTitle = prompt("Enter new title:");
  if (newTitle) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (response.ok) {
      alert("Profile updated successfully!");
      fetchProfiles();
    } else {
      alert("Error updating profile.");
    }
  }
};

// Initialize profiles on page load
fetchProfiles();
