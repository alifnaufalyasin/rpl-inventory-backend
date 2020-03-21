const bcrypt = require('bcrypt');
const { client, assert } = require("../module/db");

const regisUser = async (req,res) => {
  const payload = req.body;
  var id
  var result = "test"
  await client.connect(async err => {
    const collection = client.db("inventory").collection("User");
    const id = await collection.countDocuments()
    let hash = bcrypt.hashSync(payload.password, 10);
    console.log(hash);
    const myobj = { id_user: id+1, nama: payload.nama, email: payload.email, password: hash, no_telp: payload.no_telp };
    await collection.insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted"); 
      res
    })
  })
  client.close();
  console.log("1 "+result);
  res.json({response: result});
}
const regisOrganisasi = (req,res) => {
  
}

const loginUser = async (req,res) => {
  const payload = req.body;
  let dataUser
  await client.connect(async err => {
    assert.equal(null, err);
    const collection = client.db("inventory").collection("User");
    dataUser = await collection.find({email: payload.email}).toArray()
    await client.close()
    if(bcrypt.compareSync(payload.password, dataUser[0].password)) {
      // Passwords match
      console.log('SAMA');
      res.json({response: "Sukses"})
    } else {
      // Passwords don't match
      console.log('beda');
      res.json({response: "Salah password"})
    }
  })
  // console.log(dataUser);
}


module.exports = {
  regisUser,
  regisOrganisasi,
  loginUser
}