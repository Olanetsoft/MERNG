import { Card, Icon, Label } from 'semantic-ui-react'

function PostCard({ props: { id, body, createdAt, commentCount, likes, likeCount, username } }) {

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{createdAt}</Card.Meta>
                <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
            </Button>
                    <Button basic color='red'>
                        Decline
            </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard;