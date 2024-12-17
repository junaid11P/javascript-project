document.addEventListener("DOMContentLoaded", fetchTables);

const form = document.getElementById("booking-form");
const tableSelection = document.getElementById("table-selection");
const tablesList = document.getElementById("tables-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const tableId = tableSelection.value;
    const peopleCount = document.getElementById("people-count").value;
    const bookingDate = document.getElementById("booking-date").value;
    const bookingTime = document.getElementById("booking-time").value;

    if (!tableId) {
        alert("Please select a table.");
        return;
    }

    const response = await fetch("api/book_table.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            phone,
            table_id: tableId,
            people_count: peopleCount,
            booking_date: bookingDate,
            booking_time: bookingTime,
        }),
    });

    const result = await response.json();
    if (result.success) {
        alert("Table booked successfully!");
        fetchTables();
    } else {
        alert("Failed to book table. Try again.");
    }
});

// Fetch available tables
async function fetchTables() {
    const response = await fetch("api/fetch_tables.php");
    const tables = await response.json();
    tableSelection.innerHTML = '<option value="">Select a Table</option>';
    tablesList.innerHTML = "";

    tables.forEach((table) => {
        // Populate table selection dropdown
        const option = document.createElement("option");
        option.value = table.id;
        option.textContent = `Table ${table.table_name} (${table.capacity} People)`;
        tableSelection.appendChild(option);

        // Populate table list section
        const li = document.createElement("li");
        li.classList.add(table.status);
        li.innerHTML = `
            <p>Table ${table.table_name}</p>
            <p>Capacity: ${table.capacity} People</p>
            <p>Status: ${table.status === 'available' ? 'Available' : 'Booked'}</p>
        `;
        tablesList.appendChild(li);
    });
}
