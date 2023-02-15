$(document).ready(function () {
    $(".eliminar").click(async function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        try {
            const data = await fetch(`/mailbox/${id}`, {
                method: "delete"
            });
            const res = await data.json();
            if (res.estado) {
                window.location.href = "/mailbox";
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    });
});