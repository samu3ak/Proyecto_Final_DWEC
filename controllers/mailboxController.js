
exports.index = (req, res) => {
    res.render("mailbox", { title: "Lista de Mensajes", usuario: req.session.cuenta });
};