export const fb_userImage = async (id) => {

    const user = await fetch('https://graph.facebook.com/'+id+'/picture');
      console.log("user data", user.text());
  }