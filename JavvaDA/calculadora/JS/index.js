//definir el objeto con las propiedades de la calculadora

var po = {
    teclas: document.querySelectorAll("#container ul li"),
    accion: null,
    digito:null,
    operaciones:document.querySelector("#operaciones"),
    cantising:0,
    cantdecimal:false,
    resultado:false,
    raiz:false
}

//el objeto con las funciones de la calculadora

var fun = {
    inicio:function()
    {
        for(var i = 0; i < po.teclas.length;i++)
        {
            po.teclas[i].addEventListener("click",fun.oprimirteclas)
        }
    },
    oprimirteclas:function(tecla)
    {
        po.accion = tecla.target.getAttribute("class");
        po.digito = tecla.target.innerHTML;
        fun.calculadora(po.accion, po.digito);
    },
    calculadora:function(accion, digito) {
        switch(accion) {

            case "numero":
                po.cantising = 0;
                if(po.operaciones.innerHTML == 0) {
                    po.operaciones.innerHTML = digito;
                }
                else {
                    po.operaciones.innerHTML += digito;
                }
                console.log("numero");
                break;
            case "simbolo":
                    po.cantising ++;
                    if (po.cantising == 1) {
                        if(po.operaciones.innerHTML == 0) {
                            po.operaciones.innerHTML = 0;
                        }
                        else {
                            po.operaciones.innerHTML += digito;
                            po.cantdecimal = false;
                            po.resultado = false;
                        }
                    }
                    console.log("simbolo");
                    break;
                case "decimal":
                    console.log("decimal");
                    if(!po.cantdecimal && po.cantising!=1) {
                        po.operaciones.innerHTML += digito;
                        po.cantdecimal = true;
                        po.resultado = false;
                    }
                        console.log("decimal");
                    break;
                    case "igual":
                        po.operaciones.innerHTML = eval(po.operaciones.innerHTML);
                        po.resultado = true;
                        console.log("igual");
                    break;
                    case "raiz":
                        po.operaciones.innerHTML = Math.sqrt(po.operaciones.innerHTML)
                        console.log("raiz")
                    break;
                    case "PI":
                        po.operaciones.innerHTML = Math.PI
                        console.log("PI")
                    break;
                    case "cubo":
                        po.operaciones.innerHTML = Math.pow(po.operaciones.innerHTML,3)
                        console.log("cubo")
        }
    },
    borrarcalculadora:function()
    {
        po.resultado = false
        po.operaciones.innerHTML = 0;
    },
    X:function()
    {
        po.resultado = false
        var X = po.operaciones.innerHTML
        X = X.slice(0, -1)
        po.operaciones.innerHTML = X;
    },
    deletenumero:function(string) {
        if (string.length <=1){
            return''
        }
        po.operaciones = po.operaciones.slice(0, -1);
    }
}
fun.inicio();