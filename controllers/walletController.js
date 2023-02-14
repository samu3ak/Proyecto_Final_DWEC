
exports.index = (req, res) => {
    res.render("wallet", { title: "Lista de Gastos", usuario: req.session.cuenta });
};