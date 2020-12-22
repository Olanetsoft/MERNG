import { useContext } from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import moment from 'moment';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

function PostCard({ post: { id, body, createdAt, commentCount, likes, likeCount, username } }) {

    //Initialize the context with useContext from react
    const { user } = useContext(AuthContext);


    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                    <Button color='teal' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username &&
                    (
                        <Button
                            as='div'
                            color='red'
                            floated='right'
                            onClick={() => console.log('Delete Post')}>
                            <Icon name='trash' style={{ margin: 0 }} />
                        </Button>
                    )}
            </Card.Content>
        </Card>
    )
}

export default PostCard;