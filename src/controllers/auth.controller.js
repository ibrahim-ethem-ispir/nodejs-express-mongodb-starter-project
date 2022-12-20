const user = require("../models/user.model")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const moment = require("moment");

const login = async (req, res) => {
    console.log("login");
    const { email, password } = req.body

    const userInfo = await user.findOne({email})

    if (!userInfo)
        throw new APIError("Email yada Şifre Hatalıdır !",401)

    const comparePassword = await bcrypt.compare(password, userInfo.password)
    console.log(comparePassword);

    if (!comparePassword)
        throw new APIError("Email yada Şifre Hatalıdır !",401)

    createToken(userInfo, res)
}

const register = async (req, res) => {
    const { email } = req.body

    const userCheck = await user.findOne({email})

    if (userCheck) {
        throw new APIError("Girmiş Olduğunuz Email Kullanımda !", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    console.log("hash şifre : ",req.body.password);

    const userSave = new user(req.body)

    await userSave.save()
        .then((data) => {
            return new Response(data, "Kayıt Başarıyla Eklendi").created(res)
        })
        .catch((err) => {
            throw new APIError("Kullanıcı Kayıt Edilemedi !", 400)
        })


}

const me = async (req, res) => {
    return new Response(req.user).success(res)
}

const forgetPassword = async (req, res) => {
    const { email } = req.body

    const userInfo = await user.findOne({email}).select(" name lastname email ")

    if (!userInfo) return new APIError("Geçersiz Kullanıcı",400)

    console.log("userInfo : ",userInfo);

    const resetCode = crypto.randomBytes(3).toString("hex")

    await sendEmail({
        from: "base.api.proje@outlook.com",
        to: userInfo.email,
        subject: "Şifre Sıfırlama",
        text: `Şifre Sıfırlama Kodunuz ${resetCode}`
    })

    await user.updateOne(
        {email},
        {
            reset: {
                code: resetCode,
                time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
            }
        }
    )

    return new Response(true, "Lütfen Mail Kutunuzu Kontrol Ediniz").success(res)
}

module.exports = {
    login,
    register,
    me,
    forgetPassword
}