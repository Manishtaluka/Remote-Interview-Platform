export async function getstreamToken(req,res){
    try{
        //use clerkId for stream,(not mongodb id ) it should match the id in our dashboard of stream
        const token=chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userImage:req.user.image,
            userName:req.user.name,

        });

    }catch(error){
        console.log("Error in getstreamToken controller:",error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}