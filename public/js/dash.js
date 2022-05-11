$(document).ready(function () {

  axios.defaults.withCredentials = true;

  toastr.options = {
    "positionClass": "toast-top-right",
    "timeOut": 8000
  }
    
  axios.post(`${API_URL}/session`).then(res => {

    const message = res.data;

    if (message.success) {

      user = message.result;

      if (!user['phoneVerified']) {
        window.location.href = '/verifyPhone.html';
        return;
      }

      $('#photo_url').attr('src', user['photoURL']);
      $('#display_name').html(user['displayName']);
      $('#phoneNumber').html(user['phoneNumber']);

      if (!user['emailVerified']) {
        toastr.warning('email not verified, please check your mail box and verify.','Email Verification');
      }
      
      init_side_menu();

      $('.fullbox-loading').remove('.sk-loading');
    }else {
      
      // User is signed out
      // ...
      window.location.href = './login.html';
      // console.log(message.errors);
    }
  });
});

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
  add_submenu('fa-files-o', 'Posts', '/posts.html', pages);
  $(".metismenu").metisMenu();
}

$('.logout').click(function () {
    axios.get(`${API_URL}/logout`).then(res => {
      var message = res.data;
      if (message.success) {
        window.location.href = './login.html';
      }else {
        alert('error');
      }
    });
});