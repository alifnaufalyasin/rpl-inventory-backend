const Organizations = require("../models/organisasi")
const Admin = require("../models/Admin")
const Organizations_Admin = require("../models/organisasi_admin")
const Item = require("../models/items")
const Logs = require("../models/log")
const Peminjaman = require("../models/peminjaman")
const User = require("../models/users")
const Category = require("../models/category")

Organizations.belongsToMany(Admin, {through: Organizations_Admin})
Admin.belongsToMany(Organizations, {through: Organizations_Admin})

Item.belongsTo(Organizations, { foreignKey: 'id_organisasi' })
Organizations.hasMany(Item, { foreignKey: 'id_organisasi' })

Logs.belongsTo(Item, { foreignKey: 'id_barang' })
Item.hasMany(Logs, { foreignKey: 'id_barang' })

Peminjaman.belongsTo(Item, { foreignKey: 'id_barang' })
Item.hasMany(Peminjaman, { foreignKey: 'id_barang'})

Peminjaman.belongsTo(Admin, { foreignKey: 'id_admin' })
Admin.hasMany(Peminjaman, { foreignKey: 'id_admin' })

Peminjaman.belongsTo(User, { foreignKey: 'id_user' })
User.hasMany(Peminjaman, { foreignKey: 'id_user' })

Item.belongsTo(Category, { foreignKey: 'id_kategori' })
Category.hasMany(Item, { foreignKey: 'id_kategori' })
