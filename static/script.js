

   function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      getFbUserData();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }





   function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }






    window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '1922372911393326', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.1' // use graph api version 2.8
    });


};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,picture'},
    function (response) {
        if (!response.email){
                var email = response.id
            }
        else{
               var email = response.email
            }
        var obj={
            id:response.id,
            username:response.first_name+' '+response.last_name,
            email:email,
            dp:response.picture.data.url
            };
            console.log(obj)
            var data_json = JSON.stringify(obj);
            $.ajax({
            url: "/fblogin",
            type: "POST",
            data: data_json,
            dataType: "json",
            async: false,
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (data == "yes") {
                    location.replace("/profile");
                }
                else if (data == "exist") {
                    location.replace("/");
                }
            }
        });
    });

}

function fblogout(){
FB.logout(function(response) {
   // Person is now logged out
});
}

