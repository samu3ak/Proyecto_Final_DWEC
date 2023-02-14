exports.index = (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    res.render('index', { tituloWeb: "Inicio de sesión", title: 'Inicio', usuario: req.session.cuenta });
};