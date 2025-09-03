module.exports.loginPage = (req, res) => {
   try {
     return res.render('auth/login');
   }catch(err)
 {
    console.log(err);
    res.redirect('/admin');
 }
};

module.exports.loginUser = (req, res) => {
   try {
     console.log(req.body);
     
   }catch(err)
 {
    console.log(err);
    res.redirect('/admin');
 }
}