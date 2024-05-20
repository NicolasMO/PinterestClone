const grids = document.querySelectorAll('.grid')
const headings = document.querySelectorAll('.heading .wrapper .text')
const colors = {
    0: 'red',    // Primeiro conjunto
    1: 'blue',   // Segundo conjunto
    2: 'green',  // Terceiro conjunto
    3: 'orange'  // Quarto conjunto
};



function enterScreen(index) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')
    
    grid.classList.add('active')

    gridColumns.forEach(column => {
        const items = column.querySelectorAll('.item')
        items.forEach(item => {
            item.classList.add(colors[index])
        })

        column.classList.remove('animate-before', 'animate-after')
    }) 
    
    heading.classList.remove('animate-before', 'animate-after')
    heading.classList.add(colors[index])
}
function exitScreen(index, exitDelay) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')

    gridColumns.forEach(element => {
        element.classList.add('animate-after')
    }) 
    
    heading.classList.add('animate-after')

    setTimeout(() => {
        grid.classList.remove('active')
    }, exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
    const cycleTime = timePerScreen + exitDelay
    let nextIndex = 0

    function nextCycle() {
        const currentIndex = nextIndex

        enterScreen(currentIndex)

        setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)

        nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1
    }

    nextCycle()
    setInterval(nextCycle, cycleTime)    
    
}

setupAnimationCycle({
    timePerScreen: 2000,
    exitDelay: 200 * 7
})