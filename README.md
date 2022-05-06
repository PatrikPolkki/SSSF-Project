# SSSF-project

All queries except register and login require token. Register new user and log in with it so you should get the token.

## Example queries

### Create a new user

```
mutation RegisterUser($username: String!, $password: String!, $fullName: String) {
  registerUser(username: $username, password: $password, full_name: $fullName) {
    id
    username
    token
  }
}
```

### Login
```
query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    username
    full_name
    token
  }
}
```
### get posts
```
query Posts {
  posts {
    id
    title
  }
}
```
### get post by id
```
query Post($postId: ID!) {
  post(id: $postId) {
        id
    title
  }
}
```
### get post by userid
```
query PostByUser($postByUserId: ID) {
  postByUser(id: $postByUserId) {
    id
    title
  }
}
```
### add post
```
mutation AddPost($postInfo: PostInfo) {
  addPost(postInfo: $postInfo) {
    id
    title
  }
}

"postInfo": {
    "owner": "some user id",
    "title": "something",
    "description": "something",
    "location": "something",
    "date": "something",
    "sport": "some sporttype id"
  }
```
### apply to post
```
mutation ApplyToPost($applyToPostId: ID!, $participantId: ID!) {
  applyToPost(id: $applyToPostId, participantId: $participantId) {
    id
    title
  }
}
```

