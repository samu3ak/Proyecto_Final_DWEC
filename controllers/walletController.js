const Gasto = require("../models/gasto");

exports.wallet = async (req, res) => {
    try {
        const arrayGastos = await Gasto.find();
        res.render("wallet", { title: "Lista de Gastos", arrayGastos: arrayGastos, usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }
};

exports.wallet_create_spent = (req, res) => {
    res.render("addwallet", { tituloWeb: "Crear gasto", title: "Crear nuevo gasto", usuario: req.session.cuenta, error: false, success: false });
};

exports.wallet_create_spent_post = async (req, res) => {
    const body = req.body;
    try {
        if (body.nombre != "" && body.cantidad != "") {
            const nuevoGasto = new Gasto(body);
            await nuevoGasto.save();
            res.render("addwallet", { tituloWeb: "Crear gasto", title: "Crear nuevo gasto", usuario: req.session.cuenta, error: false, success: true });
        } else {
            res.render("addwallet", { tituloWeb: "Crear gasto", title: "Crear nuevo gasto", usuario: req.session.cuenta, error: true, success: false });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.wallet_edit_spent = async (req, res) => {
    const id = req.params.id;
    try {
        const gastoEditar = await Gasto.findById(id);
        res.render("editwallet", { tituloWeb: "Editar gassto existente", gastoEditar: gastoEditar, error: false, success: false });
    } catch (error) {
        console.log(error);
    }
};

exports.wallet_edit_spent_put = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (body.nombre != "" && body.cantidad != "") {
            const gastoEditar = await Gasto.findByIdAndUpdate(
                id, {
                nombre: body.nombre,
                cantidad: body.cantidad
            }, { useFindAndModify: false }
            );
            res.json({
                estado: true,
                mensaje: 'Gasto editado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'Problema al editar el gasto'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el gasto'
        })
    }
};

exports.wallet_spent_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const gastoBorrar = await Gasto.findByIdAndDelete(id);
        if (!gastoBorrar) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el gasto'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Gasto eliminado'
            })
        }
    } catch (error) {
        console.log(error);
    }
};