const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Veritabanına Başarıyla Bağlandı");
    })
    .catch((err) => {
        console.log("Veritabanına bağlanırken hata çıktı : ", err);
    })