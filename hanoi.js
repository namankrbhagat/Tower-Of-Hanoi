// Tower of Hanoi logic with cost analysis
function towerOfHanoi(disks, src, dest, aux, movementCosts, costSummary, moves) {
    if (disks === 0) return;

    // Move n-1 disks from src to aux
    towerOfHanoi(disks - 1, src, aux, dest, movementCosts, costSummary, moves);

    // Calculate movement cost
    const cost = movementCosts[`${src},${dest}`] || 1;
    costSummary.totalCost += cost;

    // Log the move
    moves.push(`Move disk ${disks} from ${src} to ${dest} (Cost: ${cost})`);

    // Move n-1 disks from aux to dest
    towerOfHanoi(disks - 1, aux, dest, src, movementCosts, costSummary, moves);
}

document.getElementById('solverForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const disks = parseInt(document.getElementById('disks').value);
    const movementCostsInput = document.getElementById('movementCosts').value;

    // Parse movement costs
    const movementCosts = {};
    movementCostsInput.split(';').forEach((cost) => {
        const [key, value] = cost.split(':');
        if (key && value) {
            movementCosts[key.trim()] = parseInt(value.trim());
        }
    });

    // Initialize cost summary and moves list
    const costSummary = { totalCost: 0 };
    const moves = [];

    // Solve the Tower of Hanoi problem
    towerOfHanoi(disks, 'A', 'C', 'B', movementCosts, costSummary, moves);

    // Display results
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = moves.map((move) => `<li class="list-group-item">${move}</li>`).join('');

    document.getElementById('totalCost').textContent = costSummary.totalCost;
    document.getElementById('result').style.display = 'block';
});
