export class tablero {
    public mesa: casillaInterface[] = [];
    public pj: pjInterface[] = [];

    constructor(tamMesa: number) {
        for (let index = 0; index < tamMesa; index++) {
            this.mesa.push({
                casilla: index,
                move: 0,
                type: 1
            });
        }
    }

    turnoGlobal() {
        this.pj.map(el => {
            if(el.casilla.casilla >=  this.mesa.length - 1){
                console.log(`!!!!!!!!! El jugador ${el.name} llego a la meta`);
                el.fin = true;
                return el;
            }

            const cas = el.casilla;
            const tir = this.tirarDado();
            console.log(`el dado callo en ${tir}`);
            let tempCas: casillaInterface | null = null;
            if ((cas.casilla + tir) <= (this.mesa.length - 1)) {
                tempCas = this.mesa[cas.casilla + tir];
               
            } else {
                tempCas = this.mesa[this.mesa.length - 1];
            }

            el.casilla = tempCas;

            switch (tempCas.type) {
                case 2:
                    console.log(`El jugador ${el.name} cayo en una escalera que lo movio ${tempCas.move}`);
                    el.casilla = this.mesa[el.casilla.casilla + tempCas.move];
                    break;

                case 3:
                    console.log(`El jugador ${el.name} cayo en una serpiente que lo movio ${tempCas.move}`);
                    el.casilla = this.mesa[el.casilla.casilla - tempCas.move];
                    break;
            }

            return el;
        })


        this.pj.forEach(el => {
            console.log(`El jugador ${el.name} ${el.fin? ` termino el juego`: ` quedo en la casilla ${el.casilla.casilla}`}`);
        })
    }

    tirarDado() {
        return Math.round(Math.random() * 5 + 1)
    }

    setJugadores(pjs: pjInterface[]){
        this.pj = pjs;
    }

    getCasillaInicial(){
        return this.mesa[0];
    }

    terminaronTodos(){
        return this.pj[0].fin;
    }

    setEspecialCasilla(index: number, type: number, move: number){
        if(index >= 0 && index <= this.mesa.length){
            this.mesa[index] = {...this.mesa[index], type: type, move: move};
        }else{
            console.log(`No es posible hacer esta asignacion`);
        }
    }

    getJugador(){
        return this.pj[0];
    }
}

export interface casillaInterface {
    casilla: number;
    type: number;
    move: number;
}

export interface pjInterface {
    casilla: casillaInterface;
    name: string;
    fin: boolean;
}

const main = () => {
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
   
    for (let index = 0; index < 25; index++) {
        newGame.turnoGlobal();
        if(newGame.terminaronTodos()){
            break;
        }
       
    }
}

main();