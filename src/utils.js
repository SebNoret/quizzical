// Description: Utility functions
// Fisher-Yates shuffle algorithm
/**
 * 
 *Dans cet exemple, la fonction shuffleArray prend en entrée un tableau,
  et utilise l'algorithme de Fisher-Yates pour parcourir le tableau de la fin 
  vers le début. Pour chaque itération, un indice aléatoire est choisi à partir 
  de 0 à l'indice actuel, et les éléments à ces deux indices sont échangés. 
  Cela garantit que chaque élément a une chance égale d'apparaître à chaque position, 
  ce qui permet de mélanger aléatoirement les éléments dans le tableau.
 Il est important de noter que cette fonction modifie le tableau original, 
 si vous souhaitez conserver le tableau original vous pouvez utiliser la méthode slice()
 pour créer une copie du tableau avant de le mélanger.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
