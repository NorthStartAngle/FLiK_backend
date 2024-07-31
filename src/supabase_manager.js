var _supabase = require('./supabase');

exports.login = async function(req,res){
    const {data,error} = await _supabase.auth.signInWithPassword({
        email: req.email,
        password: req.pwd,
    })

    if(error)
    {
        res.status(403).end("error");
    }else{
        res.status(200).end(JSON.stringify( {access_token:data.session.access_token,refresh_token:data.session.refresh_token,pwd:req.pwd}));
    }
}

exports.SignUp = async function(data,res){

}
