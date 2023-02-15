
exports.incidents = (req, res) => {
    res.render("incidents", { title: "Lista de Incidencias", usuario: req.session.cuenta });
};