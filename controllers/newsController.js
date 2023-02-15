
exports.news = (req, res) => {
    res.render("news", { title: "Lista de Noticias", usuario: req.session.cuenta });
};