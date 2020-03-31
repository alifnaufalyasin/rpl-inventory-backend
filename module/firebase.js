const admin = require("firebase-admin")

const serviceAccount = {
  "type": "service_account",
  "project_id": "rpl-inventory",
  "private_key_id": "ab95d75be21c21fde7738621527fc264f9db3e33",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCSi+Mo9f/T5/ug\n0GI0EoRSL/Gb+aYgaBH30WubHzu7W7Rq7pMqv4K0GTPIdF27TeCLpOzVSqIDpR71\nonO3UP+fis1/oolmmBW7Aoc1mdIEuMZ4OdCP4c3IBEmCKOIxJkpev76Iw07H1oeq\nLVBUUyzC7u6+2+RPW1c5UTQYqjXCf8MgeIBMm9oLg2Z0NxHGTL3ZOGsTdzGi/s4r\n5296LyIVCu4ijrdNW3a/kQtaNHhkBXWYcwJAYSnkRqT6b9jmRpsa2LFO7CFiMUun\nUh2jGPkSTSnkrQDI2TXK00Sj06cAhM09j4VrZpmmMRq45uwRfFIrtc43l6F2f8x2\n+sxqwch/AgMBAAECggEAOCftvOEDjxba2EVyFEUyOnJP0fbI/6sRk5bG9tLxpzqd\neMqCT4PCmLP9oWdiEafmj2x8KsGmMuJf6j29vPYHdoIQfEPzBgLqdNajrFkM3y1V\nNHXnI3OiUO6/omZ7Qt1K62Lrpum8sxxUsVQa761Nvkcj6rRFmVlFo9unrHnxDt4k\n3PbECcPFb5fMtO1k3UA4MiAHWqMu8wNWWBJECyjzYFxQ7hBb68ci/RRCCKNK/HmR\nSyG383iZesYLZumH345fHS/TRy6tgbEfSAELACyyblZ60tzp2xD/iyDIpQqzXBsB\n9RytO7TlHZgVFveJbQKkCpQ4tPzwVg4UO9nnkBr63QKBgQDNNLfqOrmcIRbnaAao\nCMdL6aDIq7NpmWM78Vpyv7nvZKTddPvXshINvji25vrU26W/88mf2tszOkqGC3hu\nCTW69210Qg6PIm+qZn4d3nfE8rTLl55yCJ+vsKDjA2JxEkCQKfa2j+lHERSieerF\nWvpBeKtD7BuOVjAn2Wzsv57lowKBgQC20hfn1Vhep3v+Jprosk/6w0CgSIkye8Om\nNuUpZzDBylmVx1XdPDL7NNyRF/Zo8ljkbivGyEt6QYt6eoY35i6EY6E4PR4xRG8Y\nwg5C4Z5eYZHiLcPLbeBP96BmPwr1XZ0psSUDmIVFOUTUcp62Kd/0N0QuyzxpYBbH\njh1I8a0ndQKBgQDM3vM3IIYqwEZzpcHvhUQkIA3sCrBGn2MZd28L3SqvPNX0W1UM\nFbY8jktlH9oRJXGn4KbNt9zcmjfI+C61/O/tyBU42rJaaND/WPBUtcTxlja2hJsl\n0kJLT5ZwzvI7XTOkOqEbxzXpQ75MMFgZzSjIsMacO1+PjbDqOAKtounq7QKBgQCn\nPmDSG5CA3rSGVmil8OFLpCzNtC2WOjRMLLHNA3JOBb+YTkdVYQm+VqhkL0iizvjU\n15hCe97YU3e2Lrn0DyWExOOqX/br2Q/M1VFYi69l5dofz//qbHSkkwJwJsHunpn0\nlvImbPOV1QMLWmOof3w5nAlKyW9VcqrEGVTe8v+VNQKBgQCbiBUzzoRGdDcumvbO\nkJXkh0qPRUECJK8KGceuUz7Eq0RAe1L8wEWd/LkYIZIm9u+gw2w2H7u1fdmUp+H4\nHcDnraDl5EaQVR6z5WihyxZNG7T9vBpYrmW/N2PQQODDFRxtHNbBQv9qsp4fvx+B\nNJwgFoLWTqYg9rNMiWniwyXMvQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-gogud@rpl-inventory.iam.gserviceaccount.com",
  "client_id": "101961483433427468838",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gogud%40rpl-inventory.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rpl-inventory.firebaseio.com",
  databaseAuthVariableOverride: null,
  storageBucket: "rpl-inventory.appspot.com"
});

const fbstorage = admin.storage().bucket()

module.exports ={
  admin,
  fbstorage
}
