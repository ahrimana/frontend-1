import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

import store from 'store'
import styles from './styles'


@observer
class Talk extends React.Component {
  handlePublished = () => {
    store.cfp.edit(
      this.props.talk.id,
      { published: !this.props.talk.published },
    )
  }

  handleStartTime = (time) => {
    const newTime = new Date(time)
    let oldTime
    if (store.cfp.talk.start) {
      oldTime = new Date(store.cfp.talk.start)
    } else {
      oldTime = new Date()
    }
    newTime.setFullYear(oldTime.getFullYear())
    newTime.setMonth(oldTime.getMonth())
    newTime.setDate(oldTime.getDate())
    const year = newTime.getFullYear()
    const month = newTime.getMonth()
    const day = newTime.getDay() + 1
    const hour = newTime.getHours()
    const minute = newTime.getMinutes()
    const timeString = `${year}-${month}-${day}T${hour}:${minute}:0`
    store.cfp.edit(
      this.props.talk.id,
      { start: timeString },
    )
  }

  handleDate = (date) => {
    const newDate = new Date(date)
    let oldDate
    if (store.cfp.talk.start) {
      oldDate = new Date(store.cfp.talk.start)
    } else {
      oldDate = new Date()
    }
    newDate.setHours(oldDate.getHours())
    newDate.setMinutes(oldDate.getMinutes())
    newDate.setSeconds(oldDate.getSeconds())
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDay() + 1
    const hour = newDate.getHours()
    const minute = newDate.getMinutes()
    const timeString = `${year}-${month}-${day}T${hour}:${minute}:0`
    store.cfp.edit(
      this.props.talk.id,
      { start: timeString },
    )
  }

  handleHall = (event) => {
    store.cfp.edit(
      this.props.talk.id,
      { hall: event.target.value },
    )
  }

  render() {
    return (
      <Paper style={styles.content}>
        Presentation Title:
        <h1 style={styles.title}>{this.props.talk.title}</h1>
        Presentation Description:
        <div style={styles.description}>
          {this.props.talk.description}
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="normal"
              label="Date picker"
              value={this.props.talk.start}
              onChange={this.handleDate}
            />
            <TimePicker
              margin="normal"
              label="Time picker"
              value={this.props.talk.start}
              onChange={this.handleStartTime}
            />
          </MuiPickersUtilsProvider>
        </div>
        Publish the talk
        <Switch
          checked={this.props.talk.published}
          onChange={this.handlePublished}
        />
        <InputLabel htmlFor="hall">Hall</InputLabel>
        <Select
          value={this.props.talk.hall || ''}
          onChange={this.handleHall}
          inputProps={{
            name: 'hall',
            id: 'hall',
          }}
        >
          <MenuItem value="saloon">Saloon</MenuItem>
          <MenuItem value="202">202</MenuItem>
          <MenuItem value="222">222</MenuItem>
        </Select>
      </Paper>
    )
  }
}


Talk.propTypes = {
  talk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    hall: PropTypes.string,
    published: PropTypes.bool.isRequired,
    start: PropTypes.shape({}),
    title: PropTypes.string.isRequired,
  }).isRequired,
}


export default Talk
