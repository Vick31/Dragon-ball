
$('#inicio').click(function () {
    iniciar();
    setTimeout(() => {
        juego();
    }, 1000)
});

function iniciar() {
    ganador = ``;
    aleatorio = 0;

    fatality = `💥💥💥💥💥💥💥`;
    powerup = `👵👵👵👵👵👵👵`;

    posicion = [11];
    posicion[0] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[1] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[2] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[3] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[4] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[5] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[6] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[7] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[8] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[9] = { pos: `🖕`, estado: `esquiva`, danio: 0 }; //ESQUIVA
    posicion[10] = { pos: `🙈`, estado: `esconde`, danio: 100 }; //ESCONDE

    // console.log(posicion);

    danio = [11];
    for (let i = 0; i <= 10; i++) {
        if (i <= 5) {
            danio[i] = { ataque: i * 3, tipo_ataque: `⚡`, nombre_ataque: `picotazo` }; //PICOTAZO
        }
        if (i >= 6) {
            danio[i] = { ataque: i * 3, tipo_ataque: `🔥`, nombre_ataque: `espuelazo` }; //ESPUELAZO
        }
    }
    // console.log(danio);
    //COMIENZA EL JUEGO
    gallos = {
        'gallo1': {
            posicion: ``,
            estado: ``,
            danio: ``,
            ataque: 0,
            tipo_ataque: ``,
            nombre_ataque: ``,
            danio_recibido: 0,
            vida: 100
        },
        'gallo2': {
            posicion: ``,
            estado: ``,
            danio: ``,
            ataque: 0,
            tipo_ataque: ``,
            nombre_ataque: ``,
            danio_recibido: 0,
            vida: 100
        }
    }
    rasengan = document.getElementById('rasengan');
    powerup = document.getElementById('powerup');
    opening = document.getElementById('opening');
    victoria = document.getElementById('victoria');
    triste = document.getElementById('triste');
    golpe = document.getElementById('golpe');

    triste.pause();
    triste.currentTime = 0;
}

function pos_gallos(i) {

    n = Math.round(Math.random() * (9 - 0) + 0); //entre 0 y 9
    gallos['gallo' + i].posicion = posicion[n].pos;
    gallos['gallo' + i].estado = posicion[n].estado;
    gallos['gallo' + i].danio = posicion[n].danio;
}

function ataque(i) {

    if (gallos['gallo' + i].posicion == `💥`) { //ATAQUE
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        gallos['gallo' + i].ataque = danio[n].ataque;
        gallos['gallo' + i].tipo_ataque = danio[n].tipo_ataque;
        gallos['gallo' + i].nombre_ataque = danio[n].nombre_ataque;



        let j = 0;
        if (i == 1)
            j = 2;

        if (i == 2)
            j = 1

        //FATALITY CUANDO EL ENEMIGO TIENE MENOS DEL 10% DE VIDA
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        if (gallos['gallo' + j].vida < 15 && n == 10) {
            gallos['gallo' + i].ataque = 99;
            gallos['gallo' + i].tipo_ataque = fatality;
            gallos['gallo' + i].nombre_ataque = `fatality`;

            rasengan.play();
        }

        //POWERUP CUANDO TIENE MENOS DE 20% DE VIDA
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        if (gallos['gallo' + i].vida < 20 && n == 10) {
            gallos['gallo' + i].vida += 50;
            gallos['gallo' + i].ataque = 99;
            gallos['gallo' + i].tipo_ataque = powerup;
            gallos['gallo' + i].nombre_ataque = `powerup`;

            powerup.play();
        }
    } else {
        gallos['gallo' + i].ataque = 0;
        gallos['gallo' + i].tipo_ataque = ``;
        gallos['gallo' + i].nombre_ataque = ``;
        gallos['gallo' + i].danio_recibido = 0;

    }

}

function pow() {

    if (gallos['gallo1'].estado == 'ataca' && gallos['gallo2'].estado == 'defiende' || gallos['gallo2'].estado == 'esquiva' || gallos['gallo2'].estado == 'esconde') {

        $('#pow').css('display', 'none');
        $('#pow2').css('display', 'block');

    }

    if (gallos['gallo2'].estado == 'ataca' && gallos['gallo1'].estado == 'defiende' || gallos['gallo1'].estado == 'esquiva' || gallos['gallo1'].estado == 'esconde') {

        $('#pow').css('display', 'none');
        $('#pow1').css('display', 'block');

    }

    if (gallos['gallo1'].estado == 'ataca' && gallos['gallo2'].estado == 'ataca') {
        $('#pow').css('display', 'block');
        $('#pow1').css('display', 'none');
        $('#pow2').css('display', 'none');
    }


}

function reducir_vida(i) {


    let j = 0;
    if (i == 1)
        j = 2;

    if (i == 2)
        j = 1

    if (gallos[`gallo` + i].posicion == `💪`) { //DEFIENDE

        if (gallos[`gallo` + j].tipo_ataque != fatality) {

            let d = Math.round(gallos['gallo' + j].ataque * 0.2);

            gallos['gallo' + i].danio_recibido = d;
            gallos['gallo' + i].vida -= d;


            $('#num-vida' + i).css('display', 'block');
            $('#num-vida' + i).html(-d);

        } else {
            let d = gallos['gallo' + j].ataque;

            gallos['gallo' + i].danio_recibido = d;
            gallos['gallo' + i].vida -= d;

            $('#num-vida' + i).css('display', 'block');
            $('#num-vida' + i).html(-d);
        }
    }

    if (gallos[`gallo` + i].posicion == `💥` ||
        gallos[`gallo` + i].posicion == `🙈`) { //ATAQUE O ESCONDE

        let d = gallos['gallo' + j].ataque;

        gallos['gallo' + i].danio_recibido = d;
        gallos['gallo' + i].vida -= d;

        $('#num-vida' + i).css('display', 'block');
        $('#num-vida' + i).html(-d);

        golpe.play();
    }
}

function barra_vida(i) {

    $('#f' + i).css({ animation: ' shake 300ms ease-in' });
    $('#f' + i).on('animationend', function () {
        $(this).css({ animation: 'none' });
    });

    $('#v' + i).css({ width: `${gallos['gallo' + i].vida}%` });

    if (gallos['gallo' + i].vida < 0) {
        gallos['gallo' + i].vida = 0;
    }
    $('#p-vida' + i).html(gallos['gallo' + i].vida + ' %');

    if (gallos['gallo' + i].vida <= 80) {
        $('#v' + i).css('background', '#B8EA00');
    }
    if (gallos['gallo' + i].vida <= 60) {
        $('#v' + i).css('background', '#F89816');
    }
    if (gallos['gallo' + i].vida <= 20) {
        $('#v' + i).css('background', '#EE0000');
    }
}

function quitar() {
    $('#inicio').css('display', 'none');
    $('#em').css('display', 'none');
    $('#vi1').css('display', 'none');
    $('#vi2').css('display', 'none');
    $('#muerte1').css('display', 'none')
    $('#muerte2').css('display', 'none')
}

function encontrar_ganador() {
    if (gallos[`gallo1`].vida <= 0) {
        ganador = `GALLO 2`;
        victoria.play();

    }

    if (gallos[`gallo2`].vida <= 0) {
        ganador = `GALLO 1`;
        victoria.play();

    }

    if (gallos['gallo1'].vida <= 0 && gallos['gallo2'].vida <= 0) {
        ganador = `EMPATE`;


        victoria.pause();
        victoria.currentTime = 0;
        triste.play();
    }

    //TERMINA EL JUEGO
    if (ganador != ``) {
        console.log(`El gandor es: ${ganador}`);

        opening.pause();
        opening.currentTime = 0;
    }
}

function mostrar_ganador() {
    if (ganador != ``) {
        if (gallos[`gallo1`].vida <= 0) {

            $('#vi2').css('display', 'block')
            $('#gallo1').css('display', 'none')

            setTimeout(() => {
                $('#muerte1').css('display', 'block')
            }), 1000;

            $('#a1').css('display', 'block');

            $('#a1').css({ animation: ' explosion 1s ease-in' });

            $('#a1').on('animationend', function () {
                $(this).css({ animation: 'none' });
            });

        }

        if (gallos[`gallo2`].vida <= 0) {

            $('#vi1').css('display', 'block');
            $('#gallo2').css('display', 'none');

            setTimeout(() => {
                $('#muerte2').css('display', 'block');
            }), 1000;

            $('#a2').css('display', 'block');
            $('#a2').css({ animation: ' explosion 1s ease-in' });

            $('#a2').on('animationend', function () {
                $(this).css({ animation: 'none' });
                $('#a2').css({ display: 'none' });
            });
        }

        if (gallos['gallo1'].vida <= 0 && gallos['gallo2'].vida <= 0) {

            $('#vi1').css('display', 'none');
            $('#vi2').css('display', 'none');
            $('#em').css('display', 'block');

            setTimeout(() => {
                $('#muerte1').css('display', 'block')
                $('#muerte2').css('display', 'block')
            }), 1000;

            $('#gallo1').css('display', 'none');
            $('#gallo2').css('display', 'none');

            $('#a1').css('display', 'block');
            $('#a2').css('display', 'block');


            $('#a1').on('animationend', function () {
                $(this).css({ animation: 'none' });
                $('#a1').css('display', 'none');
            });

            $('#a2').on('animationend', function () {
                $(this).css({ animation: 'none' });
                $('#a2').css('display', 'none');
            });
        }

        //TERMINA EL JUEGO
        if (ganador != ``) {

            $('#inicio').css('display', 'block');
        }
    }
}

function aparecer() {
    $('#gallo1').css('display', 'block');
    $('#gallo2').css('display', 'block');
}

function animar_ataque(i) {

    pow()

    if (gallos['gallo' + i].estado == 'ataca') {
        let a = gallos['gallo' + i].nombre_ataque + i;
        $('#gallo' + i).css({ animation: a + ' 1s ease' });

        

        $('#gallo' + i).on('animationend', function () {
            $(this).css({ animation: 'none' });

            $('#pow').css('display', 'none');
            $('#pow1').css('display', 'none');
            $('#pow2').css('display', 'none');
            $('#num-vida1').css('display', 'none');
            $('#num-vida2').css('display', 'none');

            mostrar_ganador();
        });
    } else {
        let a = gallos['gallo' + i].estado + i;
        $('#gallo' + i).css({ animation: a + ' 1s ease' });
        $('#gallo' + i).on('animation', function () {
            $(this).css({ animation: 'none' });
            mostrar_ganador();
        });
    }
}

function juego() {

    quitar();
    aparecer();

    opening.play();

    console.log(`GALLO 1: ${gallos[`gallo1`].vida}% - GALLO 2: ${gallos[`gallo2`].vida}%`);

    pos_gallos(1);
    pos_gallos(2);

    ataque(1);
    ataque(2);

    animar_ataque(1);
    animar_ataque(2);

    reducir_vida(1)
    reducir_vida(2);

    barra_vida(1);
    barra_vida(2);

    encontrar_ganador();

    console.log(`GALLO 1: ${gallos[`gallo1`].posicion} ${gallos[`gallo1`].tipo_ataque} (${gallos[`gallo1`].ataque}%) - GALLO2: ${gallos[`gallo2`].posicion} ${gallos[`gallo2`].tipo_ataque} (${gallos[`gallo2`].ataque}%)`);
    console.log(`----------------------------------------------------------`);

    if (ganador == ``) {
        setTimeout(() => {
            juego();
        }, 2000);
    }
}
