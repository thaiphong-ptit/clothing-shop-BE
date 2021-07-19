const db = require("../models")

const Menu = db.menu

exports.addMenu = (req, res) => {
    const menu = new Menu({
        label: req.body.label,
        icon: req.body.icon,
        link: req.body.link,
        order: req.body.order,
        roleLevel: req.body.roleLevel,
    })

    menu.save((err, menu) => {
        if(err) {
            res.status(500).send({ message: err })
            return 
        }
        res.status(200).send(menu.label)
    }) 
}

exports.getAll = (req, res) => {
    Menu.find({}, "fullname username email roles", (err, menu) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({ menu: menu, total: menu.length })
    })
}

exports.getMenu = (req, res) => {
    Menu.find({ _id: req.params.id }, (err, menu) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        res.send(menu)
    })
}

exports.updateMenu = (req,res) => {
    if (!req.body){
        return res.status(500).send({ 
            message: "Data to update can not be empty"
        })
    }
    const id = req.params.id

    Menu.findByIdAndUpdate(id, req.body , { useFindAndModify: false})
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Menu Item with id=${id}. Maybe Menu Item was not found!`
            });
            } else res.send({ message: "Menu Item was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Menu Item with id=" + id
        })
    })
}

exports.deleteMenu = (req, res) => {
    const id = req.params.id
    Menu.findByIdAndRemove(id, { useFindAndModify: false}, (err) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({ message: "Menu Item was deleted successfully!" })
    })
}
