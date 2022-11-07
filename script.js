const rows = 10;
const columns = 10;

window.onload = function() {
    const table = document.getElementById("gameBoard");
    for (let i = 0; i < rows; ++i) {
        const row = document.createElement("tr");
        for (let i = 0; i < columns; ++i) {
            let cell = document.createElement("td");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}


