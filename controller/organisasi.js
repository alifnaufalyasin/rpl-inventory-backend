const { client } = require("../module/db");

const regisOrganisasi = async (req, res) => {
  const payload = req.body;
  await client.connect(async err => {
    const collection = client.db("inventory").collection("Organisasi");
    const id = await collection.countDocuments()
    
    const myobj = { 
      id_user: id+1, 
      nama: payload.nama, 
      logo: payload.logo, 
      alamat: payload.alamat 
    };

    try {
      await collection.insertOne(myobj) 
      res.json({ status: 200, message:"Sukses melakukan registrasi organisasi", data: myobj });
    } catch (error) {
      throw err
    }
  
  })
  client.close();

}

const getOrganisasi = async (req, res) => {
  await client.connect(async err => {
      const collection = client.db("inventory").collection("Organisasi");
      const total = await collection.countDocuments()
      if (total != 0){
          const organisasi = await collection.findOne({})
          res.json({ status: 200, message: "sukses", data: organisasi });
      } else {
          res.json({ status: 200, message: "sukses", data: null });
      }
  })
  client.close();
}

module.exports ={
  regisOrganisasi,
  getOrganisasi
}