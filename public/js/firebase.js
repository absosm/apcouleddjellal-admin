function add_submenu(icon, title, href, menu, active = false) {
  const li = document.createElement('li');
  const a =  document.createElement('a');
  a.href = href;
  a.append(title);
  li.appendChild(a);
  if (href === window.location.pathname) menu.classList.add('in');
  if (active || href === window.location.pathname) li.classList.add('active');
  menu.append(li);
}

function add_menu_item(icon, title, href, active = false) {
  const li = document.createElement('li');
  const a =  document.createElement('a');
  const i = document.createElement('i');
  const span = document.createElement('span');
  a.href = href;
  i.classList.add('fa', icon);
  span.classList.add('nav-label');
  span.append(title);
  a.appendChild(i);
  a.append(' ');
  a.append(span);
  li.appendChild(a);
  if (active || href === window.location.pathname) li.classList.add('active');
  $('#side-menu').append(li);
}

function add_menu(icon, title, herf) {
  const li = document.createElement('li');
  const a =  document.createElement('a');
  const i = document.createElement('i');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  var ul = document.createElement('ul');
  a.href = herf;
  i.classList.add('fa', icon);
  span1.classList.add('nav-label');
  span2.classList.add('fa','arrow');
  ul.classList.add('nav', 'nav-second-level', 'collapse');
  span1.append(title);
  a.appendChild(i);
  a.append(' ');
  a.appendChild(span1);
  a.appendChild(span2);
  li.appendChild(a);
  li.appendChild(ul);
  $('#side-menu').append(li);
  return ul;
}

function init_side_menu(path) {
  $(".metismenu").metisMenu('dispose');
  add_menu_item('fa-home', 'Dashboard', '/');
  var pages = add_menu('fa-files-o', 'Pages', '#');
  add_submenu('fa-files-o', 'Posts', '/postes.html', pages);
  $(".metismenu").metisMenu();
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

      init_side_menu();

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