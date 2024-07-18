const login = async (req, res) =>{
    res.send ("login page")
}

const register = async (req,res) =>{
    res.send("register page")
}

module.exports = {login, register}