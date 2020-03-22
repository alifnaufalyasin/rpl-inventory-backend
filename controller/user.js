const bcrypt = require('bcrypt');
const { client } = require("../module/db");

const regisUser = async (req,res) => {
  const payload = req.body;
  await client.connect(async err => {
    const collection = client.db("inventory").collection("User");
    const id = await collection.countDocuments()
    let hash = bcrypt.hashSync(payload.password, 10);

    const myobj = { 
      id_user: id+1, 
      nama: payload.nama, 
      email: payload.email, 
      password: hash, 
      no_telp: payload.no_telp 
    };

    try {
      await collection.insertOne(myobj) 
      res.json({ status: 200, message:"Sukses melakukan registrasi", data: myobj });
    } catch (error) {
      throw err
    }
  
  })
  client.close();
}

const loginUser = async (req,res) => {
  const payload = req.body;
  await client.connect(async err => {
    const collection = client.db("inventory").collection("User");
    dataUser = await collection.findOne({email: payload.email})

    if(bcrypt.compareSync(payload.password, dataUser.password)) {
      res.json({ status: 200, message: "Sukses login", data: dataUser})
    } else {
      res.json({ status: 400, message: "Password Salah", data: null})
    }
  })
  client.close()
}

const detailUser = async (req, res) => {
  await client.connect(async err => {
    if (err) throw err;
    const collection = client.db("inventory").collection("User");
    const id = Number(req.params.id)
    dataUser = await collection.findOne({ id_user: id })
    if (!dataUser) {
      res.json({ status: 400, message: "User tidak ditemukan", data: null })
    } else {
      res.json({ status: 200, message: "success", data: dataUser })
    }
  })
  client.close()
}



module.exports = {
  regisUser,
  loginUser,
  detailUser
}