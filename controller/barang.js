const { client } = require("../module/db");

const addBarang = async (req,res) => {
  const payload = req.body;
  await client.connect(async err => {
    const collection = client.db("inventory").collection("Barang");

    const id = await collection.findOne({_id: "id_barang"})
    console.log(id);
    const idBarang = id.last + 1
    await collection.updateOne({_id: "id_barang"}, {$set: {last: idBarang}}, function(err, res) {
      if (err) throw err
    })

    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()

    const dateNow = dd +"-"+ mm +"-"+ yyyy

    const myobj = { 
      id_barang: idBarang,
      nama: payload.nama, 
      id_organisasi: payload.id_organisasi,
      id_kategori: payload.id_kategori,
      tgl_masuk: dateNow,
      tgl_produksi: payload.tgl_produksi,
      tgl_cek: dateNow,
      barcode: payload.barcode,
      deskripsi: payload.deskripsi,
      value: payload.value
    };

    try {
      await collection.insertOne(myobj) 
      res.json({ status: 200, message:"Sukses menambahkan barang", data: myobj });
    } catch (error) {
      throw err
    }
  
  })
  client.close();
}

const getBarang = async (req,res) => {
  await client.connect(async err => {
    const collection = client.db("inventory").collection("Barang");
    const total = await collection.countDocuments()
    if (total != 0){
        const barang = await collection.find({}).toArray()
        res.json({ status: 200, message: "sukses", data: barang  });
    } else {
        res.json({ status: 200, message: "Barang tidak ditemukan", data: null });
    }
  })
  client.close();
}



module.exports = {
  addBarang,
  getBarang
}