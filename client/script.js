// ===============================
// DOM Elements
// ===============================

const fileInput = document.getElementById("csvFile");
const uploadBtn = document.getElementById("uploadBtn");

const totalRows = document.getElementById("totalRows");
const newSIMs = document.getElementById("newSIMs");
const duplicateSIMs = document.getElementById("duplicateSIMs");
const rejectedRows = document.getElementById("rejectedRows");

const voterIdInput = document.getElementById("voterIdInput");
const searchBtn = document.getElementById("searchBtn");

const citizenName = document.getElementById("citizenName");
const citizenVoterId = document.getElementById("citizenVoterId");

const simTableBody = document.getElementById("simTableBody");

const downloadBtn = document.getElementById("downloadBtn");

// ========================================
// Backend Base URL
// ========================================

const API_BASE = "http://localhost:3000/api";

// ========================================
// Upload CSV
// ========================================

uploadBtn.addEventListener("click", async () => {

    try {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select a CSV file.");
            return;
        }

        const formData = new FormData();

        formData.append("csvfile", file);

        uploadBtn.disabled = true;
        uploadBtn.innerText = "Uploading...";

        const response = await fetch(`${API_BASE}/upload`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json().catch(() => null);

        //console.log(result);

        if (!response.ok || !result?.success) {
            alert(result?.message || "Upload failed.");
            return;
        }

        const summary = result.summary || {};

        totalRows.textContent = summary.totalRows ?? 0;
        newSIMs.textContent = summary.newSIMs ?? 0;
        duplicateSIMs.textContent = summary.duplicateSIMs ?? 0;
        rejectedRows.textContent = summary.rejectedRows ?? 0;

        alert(result.message || "CSV uploaded successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Upload failed.");

    }

    finally {

        uploadBtn.disabled = false;
        uploadBtn.innerText = "Upload CSV";

        fileInput.value = "";

    }

});

// ========================================
// Search Citizen
// ========================================

searchBtn.addEventListener("click", async () => {

    try {

        const voterId = voterIdInput.value.trim();

        if (!voterId) {

            alert("Please enter a voter ID.");

            return;
        }

        const response = await fetch(
            `${API_BASE}/citizens/${voterId}`
        );

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            return;
        }

        citizenName.innerText =
            `${result.citizen.first_name} ${result.citizen.last_name}`;

        citizenVoterId.innerText =
            result.citizen.voter_id;

        renderSIMTable(result.sims);

    }

    catch (error) {

        console.error(error);

        alert("Search failed.");

    }

});

// ========================================
// Download CSV
// ========================================

downloadBtn.addEventListener("click", () => {

    const voterId = voterIdInput.value.trim();

    if (!voterId) {

        alert("Search a citizen first.");

        return;
    }

    window.open(
        `${API_BASE}/citizens/${voterId}/export`,
        "_blank"
    );

});

// ========================================
// Render SIM Table
// ========================================

function renderSIMTable(sims) {

    simTableBody.innerHTML = "";

    if (sims.length === 0) {

        simTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No SIM records found.
                </td>
            </tr>
        `;

        return;
    }

    sims.forEach(sim => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${sim.sim_company}</td>
            <td>${sim.sim_number}</td>
            <td>${formatDate(sim.registration_date)}</td>
            <td>${formatDate(sim.expiry_date)}</td>
        `;

        simTableBody.appendChild(row);

    });

}

// ========================================
// Format Date
// ========================================

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }

    return new Date(dateString)
        .toLocaleDateString("en-CA");

}

