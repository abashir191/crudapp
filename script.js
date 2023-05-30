// Define an array to store player statistics
let players = [];

// Track the index of the player being edited
let editIndex = -1;

// Function to add or update player statistics
function addPlayer(event) {
    event.preventDefault();

    const playerName = document.getElementById('playerName').value;
    const points = parseFloat(document.getElementById('points').value);
    const rebounds = parseFloat(document.getElementById('rebounds').value);
    const assists = parseFloat(document.getElementById('assists').value);

    if (
        isNaN(points) ||
        isNaN(rebounds) ||
        isNaN(assists) ||
        points < 0 ||
        rebounds < 0 ||
        assists < 0 ||
        points > 70 ||
        rebounds > 70 ||
        assists > 70
    ) {
        alert('Please enter valid statistics. Points, rebounds, and assists must be non-negative and not greater than 70.');
        return;
    }

    const player = {
        name: playerName,
        points: points,
        rebounds: rebounds,
        assists: assists
    };

    if (editIndex === -1) {
        // Add a new player
        players.push(player);
    } else {
        // Update an existing player
        players[editIndex] = player;
        editIndex = -1; // Reset the edit index
    }

    savePlayers(); // Save the updated players to local storage
    displayPlayers();
    resetForm();
}

// Function to display player statistics
function displayPlayers() {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Player Name</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Action</th>
        </tr>
    `;

    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.points}</td>
            <td>${player.rebounds}</td>
            <td>${player.assists}</td>
            <td>
                <button class="edit-button" onclick="editPlayer(${index})" ${player === examplePlayer ? 'disabled' : ''}>Edit</button>
                <button class="delete-button" onclick="deletePlayer(${index})" ${player === examplePlayer ? 'disabled' : ''}>Delete</button>
            </td>
        `;
        table.appendChild(row);
    });

    const statsTable = document.getElementById('statsTable');
    statsTable.innerHTML = '';
    statsTable.appendChild(table);
}

// Function to edit a player
function editPlayer(index) {
    const player = players[index];

    document.getElementById('playerName').value = player.name;
    document.getElementById('points').value = player.points;
    document.getElementById('rebounds').value = player.rebounds;
    document.getElementById('assists').value = player.assists;

    editIndex = index;
}

// Function to delete a player
function deletePlayer(index) {
    players.splice(index, 1);
    savePlayers(); // Save the updated players to local storage
    displayPlayers();
}

// Function to reset the form
function resetForm() {
    document.getElementById('playerName').value = '';
    document.getElementById('points').value = '';
    document.getElementById('rebounds').value = '';
    document.getElementById('assists').value = '';
    editIndex = -1; // Reset the edit index
}

// Function to save players to local storage
function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Function to load players from local storage
function loadPlayers() {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
        displayPlayers();
    }
}

// Attach event listener to the form submit event
const form = document.getElementById('statsForm');
form.addEventListener('submit', addPlayer);

// Example Player
const examplePlayer = {
    name: 'Michael Jordan(Example)',
    points: 30,
    rebounds: 6,
    assists: 5
};

players.push(examplePlayer);

// Load players from local storage
loadPlayers();
