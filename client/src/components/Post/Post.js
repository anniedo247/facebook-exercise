import React, { useState } from "react";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import "./style.css";

import { commentActions, postActions } from "../../redux/actions";

const Avatar = (props) => {
  // return <img alt="profile" className="rounded-circle" src={props.url} />;
  return (
    <img
      alt="profile"
      className="rounded-circle"
      src="data:image/jpeg;base64,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"
    />
  );
};

/* STEP 4 */
const CommentForm = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentActions.createComment(props.postId, comment));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            onChange={onChange}
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, owner }) => {
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar url={owner.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{owner.name}</div>
          <p>{body}</p>
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments &&
          props.comments.map((c) => <Comment key={c.id} {...c} />)}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ title, icon, postId }) => {
  const dispatch = useDispatch();
  const onReact = (title) => {
    dispatch(postActions.createPostReaction("Post", postId, "Like"));
  };
  return (
    <Button
      onClick={() => onReact(title)}
      className="bg-light bg-white text-dark border-0"
    >
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon="thumbs-up"
        color="black"
        className="mr-2 action-icon"
      />
      Like
    </Button>
  );
};

const PostActions = (props) => {
  return (
    <ButtonGroup aria-label="Basic example">
      <PostActionButton postId={props.postId}/>
      <Button
      className="bg-light bg-white text-dark border-0"
    >
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon="comment"
        color="black"
        className="mr-2 action-icon"
      />
      Comment
    </Button>
    <Button
      className="bg-light bg-white text-dark border-0"
    >
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon="share"
        color="black"
        className="mr-2 action-icon"
      />
      Share
    </Button>
    </ButtonGroup>

    //   <ButtonGroup aria-label="Basic example">
    //     {POST_ACTIONS.map((a) => {
    //       return <PostActionButton postId={props.postId} key={a.title} {...a} />;
    //     })}
    //   </ButtonGroup>
  );
};

const PostReactions = (props) => {
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">Annie, Harry and {props.reactions.length} others</p>
      <p className="mb-0">{props.comments.length} comments</p>
    </div>
  );
};

function PostHeader({ userWhoCreatedPost }) {
  return (
    <div className="d-flex align-items-center p-3">
      <Avatar url="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685" />
      <h3 className="font-weight-bold ml-3">{userWhoCreatedPost.name}</h3>
    </div>
  );
}

export default function Post(props) {
  return (
    <Card className="p-3 mb-3 rounded">
      <PostHeader userWhoCreatedPost={props.owner} />
      {props.body}
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <PostReactions comments={props.comments} reactions={props.reactions} />
      <hr className="my-1" />
      <PostActions postId={props._id} />
      <hr className="mt-1" />

      <PostComments comments={props.comments} />

      <CommentForm postId={props._id} />
    </Card>
  );
}
