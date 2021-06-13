// // Puxar postagem da database
// export const getPosts = () => {
//   firebase.firestore().collection('posts').get();
// };

// // Deletar postagem
// export const deletePost = (id) => {
//   firebase.firestore().collection('posts').doc(id).delete()
//     .then(() => {
//       console.log('Publicação deletada com sucesso!');
//     })
//     .catch((error) => {
//       console.error('Erro ao excluir postagem: ', error);
//     });
// };

// Deslogar o usuario
export const logOut = () => firebase
  .auth()
  .signOut();

// Logar com email e senha
export const loginWithEmail = (email, password) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password);

// Logar com a conta Google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider);
};

// Criar um usuario com Email diferente
export const createProfile = (email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password);

// Criar um usuario no Firestore com Google
export const createuser = () => {
  const uid = firebase.auth().currentUser.uid;
  const user = {
    displayName: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    photoURL: firebase.auth().currentUser.photoURL,
  };
  return firebase
    .firestore().collection('users').doc(uid).set({ user });
};

// Enviar um e-mail de verificação a um usuário
export const confirmEmail = () => {
  firebase
    .auth()
    .currentUser
    .sendEmailVerification();
};

export const currentUser = () => firebase.auth().currentUser;

// Excluir um usuário
export const delUser = () => firebase.firestore().delete;

//   UID
export const userId = () => {
  const idUser = firebase.auth().currentUser.uid;
  const id = idUser.id;
  return id;
};

// export const getPost = (getAll) => {
//   let collection = firebase.firestore().collection('reviews');
//   const user = firebase.auth().currentUser;
//   if (!getAll && user) {
//     collection = firebase.firestore().collection('reviews').where('userInfo.id', '==', user.uid);
//   }
//   return collection.orderBy('date', 'desc').get().then((queryReview) => queryReview.docs);
// };
