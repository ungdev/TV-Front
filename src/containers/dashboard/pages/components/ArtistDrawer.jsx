import React from 'react'
import { connect } from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import { Drawer, Form, Button, Input, Checkbox } from 'antd'
import { createArtist, editArtist } from '../../../../modules/artist'
import { fetchArtists } from '../../../../modules/artist'
import './components.css'
import Uploader from '../../../../components/Uploader'

class ArtistDrawer extends React.Component {
  constructor(props) {
    super(props)
    const { artist } = props
    this.state = {
      artistVisible: artist ? artist.visible : true,
      image: artist ? artist.image : null,
      artist
    }
    props.fetchArtists()
  }
  addImage = image => this.setState({ image })

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!this.state.image) {
        this.props.sendError()
        return
      }
      if (!err) {
        let artist = {
          name: values.name,
          link: values.link,
          visible: this.state.artistVisible,
          image: this.state.image
        }
        if (this.props.artist)
          this.props.editArtist(this.props.artist.id, artist)
        else this.props.createArtist(artist)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.artist &&
      (!state.artist || props.artist.id !== state.artist.id)
    ) {
      return {
        artist: props.artist,
        image: props.artist.image,
        artistVisible: props.artist.visible
      }
    }
    return null
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { artist } = this.props
    return (
      <Drawer
        title={artist ? 'Modifier un artiste' : 'Créer un artiste'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label='Nom' style={{ marginBottom: 0 }}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Vous devez entrer un nom !' }
              ],
              initialValue: artist ? artist.name : ''
            })(<Input placeholder="Le nom de l'artiste" />)}
          </Form.Item>
          <Form.Item label="Lien vers la page de l'artiste">
            {getFieldDecorator('link', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un lien pour cet artiste !'
                }
              ],
              initialValue: artist ? artist.link : ''
            })(<Input placeholder="https://monartiste.com" />)}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={this.state.artistVisible}
              onChange={() =>
                this.setState({ artistVisible: !this.state.artistVisible })
              }
            >
              {this.state.artistVisible ? 'Visible' : 'Caché'}
            </Checkbox>
          </Form.Item>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span>Ajouter une image pour l'artiste : </span>
            <Uploader
              addImage={this.addImage}
              removeImage={() => this.setState({ image: null })}
              initialImage={artist && artist.image}
              buttonClickedTime={this.props.buttonClickedTime}
            />
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {artist ? 'Modifier' : 'Créer'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  createArtist: params => dispatch(createArtist(params)),
  editArtist: (id, params) => dispatch(editArtist(id, params)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message: 'Vous devez ajouter une image pour cet artiste',
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

const ArtistDrawerForm = Form.create()(ArtistDrawer)
export default connect(
  null,
  mapDispatchToProps
)(ArtistDrawerForm)