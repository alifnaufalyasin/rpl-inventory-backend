const DataLine =  require('../models/dataLine')
const { response } = require('../helper/wrapper')


async function addDataLine (req,res) {
  let payload = req.body
  const { userId } = payload
  const data = await DataLine.findOne({ where: { userId } })
  if (data){
    if (payload.token) data.token = payload.token
    if (payload.id_admin) data.id_admin = payload.id_admin
    if (payload.id_organisasi) data.id_organisasi = Number(payload.id_organisasi)
    data.save()
    return response(res,true, data,'Berhasil',201)
  }else{
    const dataLine = new DataLine(payload)
    await dataLine.save()
    return response(res,true, dataLine,'Berhasil',201)
  } 
}

async function getDataLine (req,res) {
  const { userId } = req.params
  const data = await DataLine.findOne({ where: { userId } })
  if (!data) return response(res,true, null,'Belum terdaftar',401)
  return response(res,true, data,'Berhasil',201)
}


module.exports = {
  addDataLine,
  getDataLine
}