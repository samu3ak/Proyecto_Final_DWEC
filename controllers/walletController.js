
exports.index = (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    res.render("wallet", { title: "Lista de Gastos", usuario: req.session.cuenta });
};