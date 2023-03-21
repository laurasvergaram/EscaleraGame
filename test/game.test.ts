import { pjInterface, tablero } from "../src/game";

const newGame = new tablero(25);
    const pj1: pjInterface = {
        casilla: newGame.getCasillaInicial(),
        fin: false,
        name: `laura`
    };

    newGame.setJugadores([pj1]);
    newGame.setEspecialCasilla(2, 2, 8);
    newGame.setEspecialCasilla(5, 2, 11);
    newGame.setEspecialCasilla(8, 2, 9);
    newGame.setEspecialCasilla(13, 3, 10);
    newGame.setEspecialCasilla(18, 3, 9);
    newGame.setEspecialCasilla(21, 3, 2);
    newGame.setEspecialCasilla(23, 3, 8);



describe("game tests", () => {
    test('el dado solo da numeros menores o igual a 6', () => {
      expect(newGame.tirarDado()).toBeLessThanOrEqual(6);
    });

    test('el jugador se mueve', () => {

      const prejugador = newGame.getJugador().casilla.casilla;
      newGame.turnoGlobal();
      const postjugador = newGame.getJugador().casilla.casilla;

      expect(postjugador).not.toBe(prejugador);
    });

    test('el juego termina', () => {

      for (let index = 0; index < 25; index++) {
        newGame.turnoGlobal();
        if(newGame.terminaronTodos()){
            break;
        }
    }
    const estadojuego = newGame.getJugador().fin

      expect(estadojuego).toBeTruthy();
    });
   })
