const bcrypt = require('bcrypt');
const { client, assert } = require("../module/db");

const regisUser = async (req,res) => {
  const payload = req.body;
  await client.connect(async err => {
    const collection = client.db("inventory").collection("User");
    const id = await collection.countDocuments()
    let hash = bcrypt.hashSync(payload.password, 10);

    
    const myobj = { id_user: id+1, nama: payload.nama, email: payload.email, password: hash, no_telp: payload.no_telp };
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
    dataUser = await collection.find({email: payload.email}).toArray()

    if(bcrypt.compareSync(payload.password, dataUser[0].password)) {
      res.json({ status: 200, message: "Sukses login", data: dataUser})
    } else {
      res.json({ status: 400, data: "Password Salah"})
    }
  })
  client.close()
}

const regisOrganisasi = (req, res) => {

}

module.exports = {
  regisUser,
  regisOrganisasi,
  loginUser
}