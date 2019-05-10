import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import MenuItem from '@material-ui/core/MenuItem'
import classnames from 'classnames'
import ItemContent from './ItemContent'
import Link from '../Link'

@inject('app')
@observer
export default class Leaf extends Component {
  render() {
    const { classes, item, app, trackSelected } = this.props

    return (
      <Link
        to={item.url}
        className={classes.link}
        server={item.server}
        state={item.state ? () => JSON.parse(item.state) : null}
        onClick={this.onClick}
      >
        <MenuItem
          button
          divider
          selected={trackSelected && app.location.pathname === item.url.replace(/\?.*/, '')}
          classes={{
            root: classnames(classes.listItem, classes.leaf, item.className)
          }}
        >
          <ItemContent {...this.props} item={item} showExpander={false} leaf />
        </MenuItem>
      </Link>
    )
  }

  onClick = () => {
    this.props.app.menu.close()
  }
}
