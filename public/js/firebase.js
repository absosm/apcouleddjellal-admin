function add_menu_item(icon, title, href) {
  const li = document.createElement('li');
  const a =  document.createElement('a');
  a.href = href;
  const i = document.createElement('i');
  i.classList.add('fa', icon);
  a.appendChild(i);
  a.append(title);
  li.appendChild(a);
  $('#side-menu').append(li);
}

function add_menu(icon, title, href) {
  const li = document.createElement('li');
  const a =  document.createElement('a');
  a.href = href;
  const i = document.createElement('i');
  i.classList.add('fa', icon);
  a.appendChild(i);
  a.append(title);
  li.appendChild(a);
  $('#side-menu').append(li);
}


function init_side_menu() {

  add_menu_item('fa-files-o', 'new menu item', '#');
}

$(document).ready(function () {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      $('#photo_url').attr('src', photoURL);
      $('#display_name').html(displayName);

      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });

      init_side_menu()

      $('.fullbox-loading').remove('.sk-loading');
      
    } else {
      // User is signed out
      // ...
      window.location.href = './login.html';
    }
  });

});

$('.logout').click(function () {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = './login.html';
  }).catch((error) => {
    // An error happened.
    console.log(error);

  });

});