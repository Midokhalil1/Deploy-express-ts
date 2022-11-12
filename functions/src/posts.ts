import dbConnect from './dbConnect'
import { Request, Response } from 'firebase-functions/v1'


export function createNewPost(req: Request, res: Response) {
    const db = dbConnect()
    db.collection('posts')
    .add(req.body)
    //   .then(() => getAllPosts(req, res))
      .then(newPost => res.status(201).send({sucess: true, message: 'Post created' + newPost.id }))
      .catch(err => res.status(500).send({ success: false, message: err }))
  }

  export function getAllPosts(req: Request, res: Response) {
    const db = dbConnect()
    db.collection('posts').get()
      .then((collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
        console.log(collection.size)
        const postsArr = collection.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => {
          return { ...doc.data(), postId: doc.id }
        })
        res.send(postsArr)
      })
      .catch(err => res.status(500).send({ success: false, message: err }))
  }

  export async function updatePost(req: Request, res: Response) {
    const { uid } = req.params
    const db = dbConnect()
    await db.collection('posts').doc(uid).update(req.body)
        .catch(err => res.status(500).send({ success: false, message: err }))
    res.status(202).send({ success: true, message: 'post Updated ' + uid })
  }

