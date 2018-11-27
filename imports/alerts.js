import swal from '/imports/sweetalert2.js';
import '/imports/sweetalert2.css';
//  Alerta
export function alerta(title, type, text) {
    return swal({
        title: title || 'Alerta!',
        type: type || 'info', //succss o errr
        text: text || '',
        timer: 2000,
    })
}
//      Confirm
export function confirmar(options, cb) {
    return swal({
            title: 'Esta Seguro?',
            text: options.text || 'Esto es ireversible',
            type: options.type || 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            timer: 4000
        })
        .then((result) => {
            if (result.value) {
                swal({
                    title: 'Realizado!',
                    type: 'success',
                    position: 'top-end',
                    timer: 1500,
                    animation: false,
                    customClass: 'animated tada',

                })
                return cb(null, true);
                // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            } else if (result.dismiss === 'cancel' || result.dismiss === 'timer') {
                return cb('No se hizo nada ', null);
            }
        })
}
//      Error
export function error(errorText) {
    return swal({
        title: errorText || 'Realizado!',
        type: 'error',
        position: 'top-end',
        timer: 1500,
        animation: false,
        customClass: 'animated tada',

    })
}
// INFO
export function info(text) {
    return swal({
        title: text || 'Realizado!',
        type: 'info',
        position: 'top-end',
        timer: 1500,
        animation: false,
        customClass: 'animated tada'
    })
}


///help us...!
const options = {
    position: 'top-end',
    type: 'success', //success,info,error,question
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
}
const optAnimateCss = {
    animation: false,
    customClass: 'animated tada'
}
/*
swal({
    title: 'Esta Seguro?',
    text: options.text || 'Esto es ireversible',
    type: options.type || 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    timer: 4000
})
.then((result) => {
    if (result.value) {
        swal({
            title: options.yesMsj || 'Hecho!',
            type: 'success',
            showConfirmButton: false,
            timer: 1000
        });
        

        // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
    } else if (result.dismiss === 'cancel' || result.dismiss === 'timer') {
        swal({
            title: options.notMsj || 'No se hicieron cambios!',
            type: 'info',
            showConfirmButton: false,
            timer: 1000
        });
    }
});*/