import React, { useState } from "react";
import {
  Col,
  Form,
  Card,
  Button,
  Modal,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import FacebookEmoji from 'react-facebook-emoji';
import { useDispatch } from "react-redux";

import "./style.css";

import { commentActions, postActions } from "../../redux/actions";

const Avatar = (props) => {
  // return <img alt="profile" className="rounded-circle" src={props.url} />;
  return (
    <img
      alt="profile"
      className="rounded-circle"
      src="https://garethbowley.files.wordpress.com/2015/09/puss_in_boots_1.jpg"/>
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

const PostActionButton = ({ title, emoji, postId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  
  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onReact = (emoji) => {
    dispatch(postActions.createPostReaction("Post", postId, emoji));
  };
  return (
    <div>
      <Button
      onClick={onToggleModal}
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
      <Modal
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header>
          <Modal.Title>
            Sign Up
            <p className="text-secondary font-weight-light p-modal">
              It's quick and easy.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <FacebookEmoji type="like"/>
        <FacebookEmoji type="love"/>
        <FacebookEmoji type="wow"/>
        <FacebookEmoji type="yay"/>
        <FacebookEmoji type="angry"/>
        <FacebookEmoji type="haha"/>
        <FacebookEmoji type="sad"/> */}
        </Modal.Body>
      </Modal>
    </div>
    
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
