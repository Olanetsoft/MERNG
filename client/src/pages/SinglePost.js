import React, { useContext, useState } from "react";
import {
  Card,
  Form,
  Button,
  Grid,
  Image,
  Icon,
  Label,
} from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import gql from "graphql-tag";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";


//import hooks
import { useForm } from "../utils/hooks";

function SinglePost(props) {
  const postId = props.match.params.postId;

  //Initialize the context with useContext from react
  const { user } = useContext(AuthContext);

  //Get data
  const {
    data: { getPost: getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading Post ....</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>
                  {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button
                  labelPosition="right"
                  as="div"
                  onClick={() => console.log("Comment on a Post")}
                >
                  <Button color="teal" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="teal" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
