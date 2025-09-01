module.exports.admin = async(req,res) => {
   try {
     return res.render('dashboards');
   }catch(err)
 {
    console.log(err);
    res.redirect('/admin');
 }
    
 }

 module.exports.addForm = async(req,res) => {
   try {
     return res.render('addAdmin');
   }catch(err)
 {
    console.log(err);
    res.redirect('/admin');
 }
    
 }

 module.exports.viewForm = async(req,res) => {
    try{
        return res.render('viewAdmin');

    }catch(err){
        console.log(err);
        return res.redirect('/admin');
        
    }
 }