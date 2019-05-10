/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import Branch from './Branch'
import Leaf from './Leaf'

@inject('app')
@observer
export default class Item extends Component {
  render() {
    const { item } = this.props

    if (item.items) {
      return <Branch {...this.props} item={item} />
    } else {
      return <Leaf {...this.props} item={item} />
    }
  }
}
