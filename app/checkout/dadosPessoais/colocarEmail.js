import { coletarEmail } from "../../utilidades";



export function colocarEmail (campo) {

    campo.value = coletarEmail();

}