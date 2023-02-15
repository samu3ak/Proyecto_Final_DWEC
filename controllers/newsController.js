const Noticia = require("../models/noticia");

exports.news = async (req, res) => {
    try {
        const arrayNoticias = await Noticia.find();
        res.render("news", { title: "Lista de Noticias", arrayNoticias: arrayNoticias, usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }
};

exports.news_create_new = (req, res) => {
    res.render("addnews", { tituloWeb: "Publicar noticia", error: false, success: false });
};

exports.news_create_new_post = async (req, res) => {
    const body = req.body;
    // Recuperacion de la fecha de publicacion de la noticia
    const date = new Date();
    body.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    try {
        if (body.titulo != "" && body.descripcion != "") {
            const nuevaNoticia = new Noticia(body);
            await nuevaNoticia.save();
            res.render("addnews", { tituloWeb: "Publicar noticia", error: false, success: true });
        } else {
            res.render("addnews", { tituloWeb: "Publicar noticia", error: true, success: false });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.news_edit_news = async (req, res) => {
    const id = req.params.id;
    try {
        const noticiaEditar = await Noticia.findById(id);
        res.render("editnews", { tituloWeb: "Editar noticia", noticiaEditar: noticiaEditar });
    } catch (error) {
        console.log(error);
    }
};

exports.news_edit_news_put = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (body.titulo != "" && body.descripcion != "") {
            const noticiaEditar = await Noticia.findByIdAndUpdate(
                id, {
                titulo: body.titulo,
                descripcion: body.descripcion
            }, { useFindAndModify: false }
            );
            res.json({
                estado: true,
                mensaje: 'Noticia editada'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'Problema al editar la noticia'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la noticia'
        })
    }
};

exports.news_edit_news_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const noticiaEditar = await Noticia.findByIdAndDelete(id);
        if (!noticiaEditar) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar la noticia'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Noticia eliminada'
            })
        }
    } catch (error) {
        console.log(error);
    }
};