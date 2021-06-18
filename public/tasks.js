/*
1. Create a function that parses a string into an integer (like the js function parseInt, but without the base parameter)
* */

function myParseInt(str){
    return +str;
}


/*
2. Create a function that prints a given matrix in spiral the function should be accept any size matrix [N X M]
* */

const matrixInSpiral = (mat) => {
    let res = [];
    if(mat && mat.length && mat[0].length){
        const matrix = [...mat]
        res = [...res, ...matrix[0]]
        matrix.shift();
        matrix.forEach(item => {
            res.push(item.pop())
        });
        const reversedMatrix = reverseMatrix(matrix);
        res = [...res, ...matrixInSpiral(reversedMatrix)]
    }
    return res;
}
const reverseMatrix = (mat) => {
    return mat.map(item => item.reverse()).reverse();
}

const matrixInSpiralToString = (matrix) => {
    return matrixInSpiral(matrix).join(' ')
}


document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('#task-1').innerHTML = `<p>${myParseInt('123')+2}</p>`;

    const m3x3 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    const m4x4 = [
        [ 1, 2, 3, 4],
        [ 5, 6, 7, 8],
        [ 9,10,11,12],
        [13,14,15,16]
    ]

    document.querySelector('#task-2').innerHTML = `<p>${matrixInSpiralToString(m3x3)}</p>
        <p>${matrixInSpiralToString(m4x4)}</p>
    `;
})
