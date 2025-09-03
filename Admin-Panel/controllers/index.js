module.exports.loginPage = (req, res) => {
  try {
    return res.render('auth/login');
  } catch (err) {
    console.log(err);
    res.redirect('/admin');
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    console.log(req.body);
    let admin = await adminModel.findOne({ email: req.body.email });
    if (admin) {
      let matchpass = await bcrypt.compare(req.body.password, admin.password)
      if (matchpass) {
        res.cookie("admin", admin);
        return res.redirect("/admin");
      }
      else {
        console.log("invalid Credentiol");
        return res.await("/")
      }
    }
    else {
      return res.redirect("/")
    }
  } catch (err) {
    console.log(err);
    res.redirect('/admin');
  }
}