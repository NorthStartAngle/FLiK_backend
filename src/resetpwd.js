exports.update = async function(req,res){
    let accessToken = req.body.access;
    let refreshToken = req.body.refresh;
    let newPwd = req.body.newpwd;
    let userid =global.userid;
    let useremail =global.resetemail;
    let email = global.resetemail;

    if (refreshToken && accessToken) 
    {
        let _user = null;
        const { data, error } = await supabase.auth.refreshSession({ refreshToken })
        const { session, user } = data
        if(session== null)
        {
            const respone= await supabase.auth.setSession({
                refresh_token: refreshToken,
                access_token: accessToken
            })
            if(respone.error == null)
            {
                _user =  respone.data.user;
            }
        }else{
            _user =  user;
        }
        
        if(_user != null)
        {
            let _id = _user.id;
            const _response= await supabase.auth.admin.updateUserById(
                _id,
                { password: newPwd }
            );
            
            if(_response.error == null)
            {
                global.resetresult = true;
                res.send({success:"ok"});
            }else
            {
                global.resetresult = false;
                res.send({error:"error occured while update"});
            }
        }else{
            global.resetresult = false;
            res.send({error:"Missing session"});
        }
    }else{
        console.log("error while setsession");
        global.resetresult = false;
        res.send({error:"Incorrect refreshToken or accessToken"});
    }
}

exports.result = function(req,res)
{
    console.log("Request result of reset password:",global.resetresult );
    if(global.resetresult)
    {
        res.send(global.resetresult);
    }else{
        next();
    }
}

exports.process = async function(req,res) {
    try {
        global.resetemail = req.body.email;

        const respone = await supabase.auth.resetPasswordForEmail(req.body.email,{
            redirectTo: "http://localhost:8000"});

        if(respone.error)
        {
            res.send({error : "failed"});
        }else{
            res.send({sucess : "ok"});
        }

    } catch (error) {
        console.log("error=",error);
        res.send({error : "failed"});
    }

    return;
    // if(req.body.email){
    //     res.json({
    //         status: true,
    //         message: "Request success.",
    //     });
    // }else{
    //     res.json({
    //         status: false,
    //         message: "Request failed.",
    //     });
    // }
    // if(req.body.social_info) {
    //     this.checkSocialUserExist(req,res,function(result) {
    //         if(result) {
    //             var social_info = JSON.parse(req.body.social_info)
    //             var params;
    //             if (social_info.type == "metamask") {
    //                 params = {'metamask_info.id':social_info.id}
    //             }
    //             this.loginUserWithSocial(params,req,res);
    //         } else {
    //             var social_info = JSON.parse(req.body.social_info)
    //             this.registerUser(req,res);
    //         }
    //     });
    // } else {
    //     res.json({
    //         status: false,
    //         message: "Request failed. register not accepted without connect wallet",
    //     });
    // } 
}


