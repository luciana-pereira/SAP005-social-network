import {
  logOut,
  deletePost,
} from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Post = () => {
  const post = document.createElement('div');
  post.classList.add('div-post');
  post.innerHTML = `
<div class='container'>

  <header class="header">
    <img src='./assets/logo/runners-40px.png' alt='Logo Runners' id='logo' class="logo" />
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">
      <li id='profile'><a href="#">Perfil</a></li>
      <li id='logOut'><a href="#">Sair</a></li>
    </ul>
  </header>

  <div class="form-login">
    <br />
    <section>
      <form class='form-review'>
        <textarea class='post' id='newPost'></textarea>
        <br />
        <button type='button' class='btnn' id='btn'>Postar</button>
      </form>
    </section>
  </div>
</div>

<div class='' id='post-content'></div>

<footer>
  <p>
    Made with <i class="fa fa-heart"></i> | Devas
    <i class="fab fa-github"></i>
    <a target="_blank" href="#">  Cris Mantovani</a>
    <i class="fab fa-github"></i>
    <a target="_blank" href="#"> Elis Brasil</a>
    <i class="fab fa-github"></i>
    <a target="_blank" href="#"> Luciana Pereira</a> @
    <i class="fab fa-dev">
    <a target="_blank" href="#"></i>&nbsp;< Laboratoria ></a>
  </p>
</footer>
`;

  const btnPost = post.querySelector('.btnn');
  const textPost = post.querySelector('#newPost');
  const postContent = post.querySelector('#post-content');
  // const btnDelete = post.querySelector('#delete');

  const addCardToScreen = (user) => {
    postContent.innerHTML += `
    <div class='container' id='postUser'>
      <img src='${user.photo || '../../assets/Photo_Default.png'}' alt='Imagem do Usuario' id='photo' />
      <h2 class='name'>${user.displayName}</h2>
      <p class='text'>${user.text}</p>
      <button id='delete' type="button" class='btnn' dt-delete='${user.id}><p id='show-like'>Deletar</p></button>
    </div>
    `;
  };

  const creatPost = () => {
    const infCreatUser = firebase.auth().currentUser;
    const textToSave = textPost.value;
    if (!textToSave) {
      alert('Campo de postagem está em branco');
    } else {
      const userPost = {
        displayName: infCreatUser.displayName,
        photo: infCreatUser.photoURL,
        id: infCreatUser.uid,
        text: textToSave,
        likes: [],
        date: new Date().toLocaleString(),
      };
      firebase.firestore().collection('posts').add(userPost).then(() => {
        addCardToScreen(userPost);
      })
        .catch(() => {
          alert('Opa! Algo deu errado em sua publicação, tente novamente!');
        });
    }
  };

  const obtainPost = () => {
    firebase.firestore()
      .collection('posts')
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postContent.prepend(addCardToScreen({
            displayName: doc.data().displayName,
            photo: doc.data().photo,
            id: doc.id,
            text: doc.data().text,
            likes: doc.data().likes,
            date: doc.data().date,
          }));
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  const dtPost = () => {
    // eslint-disable-next-line no-restricted-globals
    const postDelete = confirm('Deseja deletar a postagem?');
    if (postDelete === true) {
      deletePost(post.id);
      post.remove('#postUser');
    } else {
      alert('Ufa ... postagem permanece!');
    }
  };

  btnPost.addEventListener('click', (e) => {
    e.preventDefault();
    obtainPost();
    creatPost();
    dtPost();
  });

  const profile = post.querySelector('#profile');
  profile.addEventListener('click', () => {
    onNavigate('/profile');
  });

  const leave = post.querySelector('#logOut');
  leave.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      })
      .catch(() => {
        alert('Não conseguimos deslogar, por gentileza tentar novamente');
      });
  });

  obtainPost();

  return post;
};
