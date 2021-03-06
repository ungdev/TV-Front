import React from 'react'
import { connect } from 'react-redux'
import { fetchEvents, deleteEvent, editEvent } from '../../../modules/event'
import { fetchArtists } from '../../../modules/artist'
import { fetchPartners } from '../../../modules/partner'
import EventDrawer from './components/EventDrawer'
import { Button, List, Icon, Spin } from 'antd'
import moment from 'moment'

class Events extends React.Component {
  constructor(props) {
    super(props)
    props.fetchEvents()
    props.fetchArtists()
    props.fetchPartners()
    this.state = {
      event: null,
      visible: false
    }
  }

  editEvent = event => {
    this.setState({
      event,
      visible: true
    })
  }
  getDate = (start, end) => {
    return (
      <p>
        Début le {moment(start).format('DD/MM/YY [à] HH:mm')}
        <br />
        Fin le {moment(end).format('DD/MM/YY [à] HH:mm')}
      </p>
    )
  }

  getTitle = event => {
    let artist =
      event.artistId &&
      this.props.artists.find(artist => artist.id === event.artistId)
    let partner =
      event.partnerId &&
      this.props.partners.find(partner => partner.id === event.partnerId)
    let title = `${event.name} - ${event.place}`
    if (artist) title = title + ` - ${artist.name}`
    if (partner) title = title + ` - ${partner.name}`
    
    return title
  }

  render() {
    let { events, artists, partners } = this.props
    if (!events || !artists || !partners) return <Spin />
    events = events.map(event => {
      return {
        ...event,
        fulldate: this.getDate(event.start, event.end)
      }
    })
    return (
      <React.Fragment>
        <Button
          type='primary'
          onClick={() =>
            this.setState({
              visible: true,
              event: null,
              buttonClickedTime: moment()
            })
          }
        >
          <Icon type='plus' /> Ajouter un événement
        </Button>
        <EventDrawer
          event={this.state.event}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          buttonClickedTime={this.state.buttonClickedTime}
        />
        <List
          itemLayout='vertical'
          size='large'
          pagination={false}
          dataSource={events}
          renderItem={item => {
            const title = this.getTitle(item)
            return (
              <List.Item
                key={item.id}
                actions={[
                  <div
                    onClick={() => {
                      this.props.editEvent(item.id, {
                        name: item.name,
                        description: item.description,
                        place: item.place,
                        artist: item.artist,
                        partner: item.partner,
                        visible: !item.visible,
                        image: item.image,
                        start: item.start,
                        end: item.end
                      })
                    }}
                  >
                    <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
                    <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
                  </div>,
                  <div
                    onClick={() => {
                      this.editEvent(item)
                    }}
                  >
                    <Icon type='edit' />
                    <span> Modifier</span>
                  </div>,
                  <div
                    onClick={() => {
                      this.props.deleteEvent(item.id)
                    }}
                  >
                    <Icon type='stop' />
                    <span> Supprimer</span>
                  </div>
                ]}
                extra={
                  <img
                    width={272}
                    alt='logo'
                    src={process.env.REACT_APP_API + item.image}
                  />
                }
              >
                <List.Item.Meta
                  title={title}
                  description={item.fulldate}
                  extra='YOLO'
                />
                {item.description} <br />
                <br />
                {item.visible
                  ? 'Cet événement est affiché sur les écrans'
                  : "Cet événement n'est pas affiché sur les écrans"}
              </List.Item>
            )
          }}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.event.events,
  artists: state.artist.artists,
  partners: state.partner.partners
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchArtists: () => dispatch(fetchArtists()),
  fetchPartners: () => dispatch(fetchPartners()),
  deleteEvent: id => dispatch(deleteEvent(id)),
  editEvent: (id, params) => dispatch(editEvent(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
